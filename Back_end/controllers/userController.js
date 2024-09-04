const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../models/userModel');
const logger = require('../config/logger')
const JWT_SECRET = "CRMPROJECT";
const client = require('../config/dbConfig');
const { createLogger } = require('winston');
const generateAccessToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
};


const register = async (req, res) => {
    const { username, password, email, phone, rolename, confirmpassword } = req.body;

    try {
        const checkUsername = await Model.checkUsername(username);
        if (checkUsername.rows.length !== 0) {
            return res.status(400).send('Username exists');
        }
        const checkemail = await Model.checkEmail(email);
        if (checkemail.rows.length !== 0) {
            return res.status(400).send('Email exists');
        }
        const checkphone = await Model.checkPhone(phone);
        if (checkphone.rows.length !== 0) {
            return res.status(400).send('Phone number already exists');
        }

        let role_Id;

        if (rolename === 'ADMIN') {
            role_Id = 0;
        }
        else {
            const roleResult = await Model.getRoleId(rolename);
            if (roleResult.rows.length === 0) {
                return res.status(400).send('Role does not exist');
            }


            role_Id = roleResult.rows[0].role_id;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword2 = hashedPassword
        const accessToken = generateAccessToken({ username, rolename });
        const result = await Model.createUser(username, hashedPassword, hashedPassword2, email, phone, role_Id, accessToken);

        res.status(200).send(result.rows[0]);

    } catch (err) {
        logger.error('Error:', err);
        res.status(500).send('Server error');
    }
}




const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await Model.getUserByUsername(username);

        if (userResult.rows.length === 0) {
            return res.status(404).send('Invalid username or password');
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send('Invalid username or password');
        }

        const token = await Model.generateAccessToken(username)
        await Model.updateUserToken(username)
        const access = token.rows[0]
        res.status(200).json(access);

    } catch (err) {
        logger.error('Error:', err);
        res.status(500).send('Server error');
    }
}

const roleMapping = {
    1: 'CEO',
    2: 'HR',
    3: 'Team Manager',
    4: 'Team Lead',
    5: 'Employee'
};

const postComplaint = async (req, res) => {
    const { title, description, additional_text, media } = req.body;
    try {
        const token = req.headers['access_token'];
        
        if (token == null) return res.status(401).send('Unauthorized');
        const result2 = await Model.getuserbytoken(token);
        const user_id = result2.rows[0].user_id;
        const assigned_to = (result2.rows[0].role_id)-1
        const status = 'open'


      
        const result = await Model.insertComplaints( user_id, title, description, status, assigned_to, additional_text, media);
        const complaint_id = result.rows[0].complaint_id;
        await Model.insertpostComplaint(complaint_id,assigned_to)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while inserting data', err });
    }
};

const getTeamLeadComplaints = async (req, res) => {
    try {
        const result = await Model.getComplaintsByRole('V5'); // Employee role (v5)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints for Team Lead', err });
    }
};
const getComplaints = async (req, res) => {
    try {
        const token = req.headers['access_token'];

        if (!token) {
            return res.status(401).send('Unauthorized');
        }

        // Retrieve the user's role based on the token
        const userResult = await Model.getuserbytoken(token);
        if (!userResult.rows.length) {
            return res.status(404).json({ error: 'User not found' });
        }

        const role_id = userResult.rows[0].role_id;
        console.log('Role ID:', role_id);

        let query = '';
        switch (role_id) {

            case 4: // Team Lead role
                query = `SELECT * FROM complaints WHERE assigned_to = '4'`;
                break;
            case 3: // Team Manager role
                query = `SELECT * FROM complaints WHERE assigned_to = '3'`;
                break;
            case 2: // HR role
                query = `SELECT * FROM complaints WHERE assigned_to = '2'`;
                break;
            case 1: // CEO role
                query = `SELECT * FROM complaints WHERE assigned_to = '1'`;
                break;
            default:
                return res.status(400).json({ error: 'Invalid role' });
        }

        // Execute the query
        const result = await client.query(query);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error('Error in getComplaints:', err);
        res.status(500).json({ error: 'An error occurred while retrieving complaints', err });
    }
};

const updateComplaintController = async (req, res) => {
    const id = req.params.id;
    const { title, description, additional_text, media, assigned_to } = req.body;

    const fields = [];
    const values = [];

    if (title) fields.push('title = $' + (fields.length + 1)), values.push(title);
    if (description) fields.push('description = $' + (fields.length + 1)), values.push(description);
    if (additional_text) fields.push('additional_text = $' + (fields.length + 1)), values.push(additional_text);
    if (media) fields.push('media = $' + (fields.length + 1)), values.push(media);
    if (assigned_to) fields.push('assigned_to = $' + (fields.length + 1)), values.push(assigned_to);

    if (fields.length === 0) {
        return res.status(400).send('No fields to update');
    }

    try {
        const result = await Model.updateComplaint(id, fields, values);
        if (result.rowCount === 0) {
            return res.status(404).send('Complaint not found');
        }
        res.status(200).send('Complaint updated');
    } catch (err) {
        logger.error('Error:', err);
        res.status(500).send('Internal server error');
    }
};
const getTeamManagerComplaints = async (req, res) => {
    try {
        const result = await Model.getComplaintsByRole('V4'); // Team Lead role (v4)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints for Team Lead', err });
    }
};

const getHrComplaints = async (req, res) => {
    try {
        const result = await Model.getComplaintsByRole('V3'); // Team Manager role (v3)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints for Team Lead', err });
    }
};

const getCEOComplaints = async (req, res) => {
    try {
        const result = await Model.getComplaintsByRole('V2'); // HR role (v2)
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints for Team Lead', err });
    }
};
const getAllComplaints = async (req, res) => {
    try {
        const result = await Model.getComplaints();
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints', err });
    }
};

const getuserbytoken = async (req, res) => {
    const accessToken = req.headers['access_token'];
    try {
        const result = await Model.userbytoken(accessToken);
        res.status(200).json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while retrieving complaints', err });
    }
};

const forwardComplaint = async (req, res) => {
    const { complaint_id } = req.body;

    // Validate input data
    if (!Number.isInteger(complaint_id)) {
        return res.status(400).json({ error: 'Invalid complaint_id' });
    }

    try {
        // Retrieve the complaint from the database
        const complaintResult = await Model.getComplaintById(complaint_id);
        const complaint = complaintResult.rows[0];

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Fetch the user who posted the complaint
        const userResult = await Model.getUserById(complaint.user_id);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get the current user's role
        const currentUserRoleResult = await Model.getUserRoleById(user.user_id);
        const currentUserRole = currentUserRoleResult.rows[0].role_id;

        // Fetch roles and hierarchy from the database
        const rolesResult = await Model.getRoles();
        const roleHierarchy = {};
        const roleNames = {};
        rolesResult.rows.forEach(role => {
            roleHierarchy[role.role_id] = role.hierarchy_level; // Map role_id to hierarchy_level
            roleNames[role.role_id] = role.role_name; // Map role_id to role_name
        });

        // Convert hierarchy_level to a sortable format (numeric level)
        const hierarchyLevels = {
            'V5': 5,
            'V4': 4,
            'V3': 3,
            'V2': 2,
            'V1': 1
        };

        // Ensure valid role hierarchy configuration
        if (!(currentUserRole in roleHierarchy) || !(complaint.assigned_to in roleHierarchy)) {
            return res.status(400).json({ error: 'Invalid role hierarchy configuration' });
        }

        // Convert role IDs to hierarchy levels
        const currentUserLevel = hierarchyLevels[roleHierarchy[currentUserRole]];
        const assignedLevel = hierarchyLevels[roleHierarchy[complaint.assigned_to]];

        // Check if the role levels are valid
        if (currentUserLevel === undefined || assignedLevel === undefined) {
            return res.status(400).json({ error: 'Invalid role level configuration' });
        }

        // Check if the complaint is already at the highest level
        if (assignedLevel === 1) { // CEO level
            return res.status(400).json({ error: 'Complaint is already at the highest level (CEO)' });
        }

        // Determine the next role based on hierarchy
        const nextLevel = assignedLevel - 1;
        const nextHierarchyLevel = Object.keys(hierarchyLevels).find(level => hierarchyLevels[level] === nextLevel);

        // Validate next role
        if (nextHierarchyLevel === undefined) {
            return res.status(400).json({ error: 'Invalid role configuration' });
        }

        // Find the next role_id based on the next hierarchy level
        const nextRoleIdResult = await Model.getRoleIdByHierarchyLevel(nextHierarchyLevel);
        const nextRoleId = nextRoleIdResult.rows[0]?.role_id;

        if (!nextRoleId) {
            return res.status(400).json({ error: 'Next role not found' });
        }

        // Get the name of the next role
        const nextRoleName = roleNames[nextRoleId];
        const currentRoleName=roleNames[nextRoleId+1]
        

        if (!nextRoleName) {
            return res.status(404).json({ error: 'Next role name not found' });
        }
        

    
        // Update the complaint status and assigned role
        const updatedComplaintResult = await Model.updateComplaintStatusAndAssignee(
            complaint_id,
           `Forwarded by ${currentRoleName}`,
          //  `Forwarded  to ${nextRoleName}` , // Set status to the role name of the next role
            nextRoleId
        );
        await Model.insertComplaintHistory(
            complaint_id,
            complaint.assigned_to,    // previously_assigned_to (current role level)
            nextRoleId                // newly_assigned_to (upper hierarchy level)
        );

        return res.status(200).json(updatedComplaintResult.rows[0]);

    } catch (err) {
        console.error('Error in forwardComplaint:', err);
        res.status(500).json({ error: 'An error occurred while forwarding the complaint', details: err.message });
    }
};


const getComplaintsByAccessToken = async (req, res) => {
  const accessToken = req.headers['access_token'];
  console.log(accessToken)
  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const user = await Model.userbytoken(accessToken);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const complaints = await Model.getComplaintByuserId(user.rows[0].user_id);
    
    res.status(200).json(complaints.rows);
  } catch (error) {
    console.error('Error retrieving complaints:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
 

// const reinvestigateComplaint = async (req, res) => {
//     const { complaint_id, directToEmployee } = req.body;

//     if (!Number.isInteger(complaint_id)) {
//         return res.status(400).json({ error: 'Invalid complaint_id' });
//     }

//     try {
//         const complaintResult = await Model.getComplaintById(complaint_id);
//         const complaint = complaintResult.rows[0];

//         if (!complaint) {
//             return res.status(404).json({ error: 'Complaint not found' });
//         }

//         const userResult = await Model.getUserById(complaint.user_id);
//         const user = userResult.rows[0];

//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         const currentUserRoleResult = await Model.getUserRoleById(user.user_id);
//         const currentUserRole = currentUserRoleResult.rows[0].role_id;

//         const rolesResult = await Model.getRoles();
//         const roleHierarchy = {};
//         const roleNames = {};
//         rolesResult.rows.forEach(role => {
//             roleHierarchy[role.role_id] = role.hierarchy_level;
//             roleNames[role.role_id] = role.role_name;
//         });

//         const hierarchyLevels = {
//             'V5': 5, // INTERN
//             'V4': 4, // EMPLOYEE
//             'V3': 3, // TEAM_MANAGER
//             'V2': 2, // HR
//             'V1': 1  // CEO
//         };

//         if (!(currentUserRole in roleHierarchy) || !(complaint.assigned_to in roleHierarchy)) {
//             return res.status(400).json({ error: 'Invalid role hierarchy configuration' });
//         }

//         const assignedLevel = hierarchyLevels[roleHierarchy[complaint.assigned_to]];
       
//         if (assignedLevel === undefined) {
//             return res.status(400).json({ error: 'Invalid role level configuration' });
//         }

//         let targetRoleId, targetRoleName;

//         // Check if the complaint should be sent directly to the user who posted it
//         if (directToEmployee) {
//             targetRoleId = user.role_id - 1; // Assign to the user who posted the complaint
//             targetRoleName = 'User'; // Set status indicating it's assigned to the original poster
//         } else {
//             if (assignedLevel === 5) {
//                 return res.status(400).json({ error: 'Complaint is already at the lowest level (Employee)' });
//             }

//             // Move down one level in the hierarchy
//             const previousLevel = assignedLevel + 1;
//             const previousHierarchyLevel = Object.keys(hierarchyLevels).find(level => hierarchyLevels[level] === previousLevel);
              
//             if (previousHierarchyLevel === undefined) {
//                 return res.status(400).json({ error: 'Invalid role configuration' });
//             }

//             const previousRoleIdResult = await Model.getRoleIdByHierarchyLevel(previousHierarchyLevel);
//             targetRoleId = previousRoleIdResult.rows[0]?.role_id;

//             if (!targetRoleId) {
//                 return res.status(400).json({ error: 'Previous role not found' });
//             }

//             targetRoleName = roleNames[targetRoleId];
//         }

//         if (!targetRoleName) {
//             return res.status(404).json({ error: 'Target role name not found' });
//         }
   

//         // Update complaint to reflect that it has been sent back for reinvestigation
//         const updatedComplaintResult = await Model.updateComplaintStatusAndAssignee(
//             complaint_id,
//             `Reinvestigation to ${targetRoleName}`, // Update status to reflect reinvestigation
//             targetRoleId
//         );

//         return res.status(200).json(updatedComplaintResult.rows[0]);

//     } catch (err) {
//         console.error('Error in reinvestigateComplaint:', err);
//         res.status(500).json({ error: 'An error occurred while reinvestigating the complaint', details: err.message });
//     }
// };

const reinvestigateComplaint = async (req, res) => {
    const { complaint_id, directToEmployee } = req.body;

    if (!Number.isInteger(complaint_id)) {
        return res.status(400).json({ error: 'Invalid complaint_id' });
    }

    try {
        const complaintResult = await Model.getComplaintById(complaint_id);
        const complaint = complaintResult.rows[0];

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        const userResult = await Model.getUserById(complaint.user_id);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const currentUserRoleResult = await Model.getUserRoleById(user.user_id);
        const currentUserRole = currentUserRoleResult.rows[0].role_id;

        const rolesResult = await Model.getRoles();
        const roleHierarchy = {};
        const roleNames = {};
        rolesResult.rows.forEach(role => {
            roleHierarchy[role.role_id] = role.hierarchy_level;
            roleNames[role.role_id] = role.role_name;
        });

        const hierarchyLevels = {
            'V5': 5, // INTERN
            'V4': 4, // EMPLOYEE
            'V3': 3, // TEAM_MANAGER
            'V2': 2, // HR
            'V1': 1  // CEO
        };

        if (!(currentUserRole in roleHierarchy) || !(complaint.assigned_to in roleHierarchy)) {
            return res.status(400).json({ error: 'Invalid role hierarchy configuration' });
        }

        const assignedLevel = hierarchyLevels[roleHierarchy[complaint.assigned_to]];
       
        if (assignedLevel === undefined) {
            return res.status(400).json({ error: 'Invalid role level configuration' });
        }

        let targetRoleId, targetRoleName;

        // Check if the complaint should be sent directly to the user who posted it
        if (directToEmployee) {
            targetRoleId = user.role_id ; // Assign to the user who posted the complaint
            targetRoleName = roleNames[targetRoleId]; // Set status indicating it's assigned to the original poster
        } else {
            if (assignedLevel === 5) {
                return res.status(400).json({ error: 'Complaint is already at the lowest level (Employee)' });
            }

            // Move down one level in the hierarchy
            const previousLevel = assignedLevel + 1;
            const previousHierarchyLevel = Object.keys(hierarchyLevels).find(level => hierarchyLevels[level] === previousLevel);
              
            if (previousHierarchyLevel === undefined) {
                return res.status(400).json({ error: 'Invalid role configuration' });
            }

            const previousRoleIdResult = await Model.getRoleIdByHierarchyLevel(previousHierarchyLevel);
            targetRoleId = previousRoleIdResult.rows[0]?.role_id;

            if (!targetRoleId) {
                return res.status(400).json({ error: 'Previous role not found' });
            }

            targetRoleName = roleNames[targetRoleId];

            // Additional condition: prevent reassignment to a lower level if the complaint was posted by the current user
            if (user.role_id === complaint.assigned_to && roleHierarchy[user.role_id] <= roleHierarchy[targetRoleId]) {
                return res.status(400).json({ error: 'You cannot reassign a complaint to a lower level if you posted it.' });
            }
        }

        if (!targetRoleName) {
            return res.status(404).json({ error: 'Target role name not found' });
        }

        // Update complaint to reflect that it has been sent back for reinvestigation
        const updatedComplaintResult = await Model.updateComplaintStatusAndAssignee(
            complaint_id,
            `Reinvestigation to ${targetRoleName}`, // Update status to reflect reinvestigation
            targetRoleId
        );
        await Model.insertComplaintHistory(
            complaint_id,
            
            complaint.assigned_to,
            targetRoleId  // previously_assigned_to (current role level)
                         // newly_assigned_to (upper hierarchy level)
        );

        return res.status(200).json(updatedComplaintResult.rows[0]);

    } catch (err) {
        console.error('Error in reinvestigateComplaint:', err);
        res.status(500).json({ error: 'An error occurred while reinvestigating the complaint', details: err.message });
    }
};



const acceptComplaint = async (req, res) => {
    const complaintId = req.params.id;
    try {
      const result = await client.query(
        'UPDATE complaints SET status = $1 WHERE complaint_id = $2 RETURNING *',
        ['Accepted', complaintId]
      );
      console.log("before 404")
      if (result.rows.length === 0) {
        console.log("in 404")
        return res.status(404).json({ message: 'Complaint not found' });
      }
      res.json({ message: 'Complaint accepted', complaint: result.rows[0] });
    } catch (error) {
      console.error('Error accepting complaint:', error);
      res.status(500).send('Server Error');
    }
  };
  
  // Reject a complaint
  const rejectComplaint = async (req, res) => {
    const complaintId = req.params.id;
    try {
      const result = await client.query(
        'UPDATE complaints SET status = $1 WHERE complaint_id = $2 RETURNING *',
        ['Rejected', complaintId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
      res.json({ message: 'Complaint rejected', complaint: result.rows[0] });
    } catch (error) {
      console.error('Error rejecting complaint:', error);
      res.status(500).send('Server Error');
    }
  };

  const getRoleIdByUserId = async (req, res) => {
    console.log('Request parameters:', req.params);
    const user_id = req.params.userId;

    if (!user_id) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try {
        // Query to fetch role_id by user_id
        const result = await client.query('SELECT role_id FROM users WHERE user_id = $1', [user_id]);

        // Log the result for debugging purposes
        console.log('Query result:', result);

        if (result.rows.length > 0) {
            // Send the role_id as JSON response
            res.json({ role_id: result.rows[0].role_id });
        } else {
            // Handle the case where no user is found
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Log error details for debugging
        console.error('Error fetching role ID:', error);

        // Send a 500 Internal Server Error response
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    postComplaint,
    getTeamLeadComplaints,
    getTeamManagerComplaints,
    getHrComplaints,
    getCEOComplaints,
    forwardComplaint,
    login,
    register, getAllComplaints,
    getuserbytoken,
    getComplaintsByAccessToken,
    getComplaints,
    updateComplaintController,
    reinvestigateComplaint,
    rejectComplaint,
    acceptComplaint,
    getRoleIdByUserId

};