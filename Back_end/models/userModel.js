const client = require('../config/dbConfig');
const { DB_COMMANDS } = require('../utils/queries');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "CRMPROJECT";

const checkUsername = async (username) => {
  return client.query(DB_COMMANDS.CHECK_USERNAME, [username]);
}
const checkEmail = async (email) => {
  return client.query(DB_COMMANDS.CHECK_EMAIL, [email]);
}
const checkPhone = async (phone) => {
  return client.query(DB_COMMANDS.CHECK_PHONE, [phone]);
}

const getRoleId = async (roleName) => {
  return client.query(DB_COMMANDS.GET_ROLE_ID, [roleName]);
}

const createUser = async (username, hashedPassword, hashedPassword2, email, phone, roleId, accessToken) => {
  return client.query(DB_COMMANDS.INSERT_USER, [username, hashedPassword, hashedPassword2, email, phone, roleId, accessToken]);
}
const userbytoken = async ( accessToken) => {
  return client.query(DB_COMMANDS.GET_USER_BY_TOKEN, [accessToken]);
}

const getUserByUsername = async (username) => {
  return client.query(DB_COMMANDS.GET_USER_BY_USERNAME, [username]);
}

const updateUserToken = async (username) => {
  return client.query(DB_COMMANDS.UPDATE_TIMESTAMP, [username]);
}
const generateAccessToken = async (username) => {
  return client.query(DB_COMMANDS.GET_ACCESS_TOKEN, [username])
}

const getAllUsers = async () => {
  return client.query(DB_COMMANDS.GET_ALL_USERS);
}

const getUserById = async (userId) => {
  return client.query(DB_COMMANDS.GET_USER_BY_ID, [userId]);
}
const getRoles = async () => {
  const query = 'SELECT role_id, role_name, hierarchy_level FROM roles';
  return await client.query(query);
};
const deleteUser = async (userId) => {
  return client.query(DB_COMMANDS.DELETE_USER, [userId]);
}
const getuserbytoken = async (token) => {
  return client.query(DB_COMMANDS.GET_USER_BY_TOKEN, [token]);
}

const updateUser = async (id, fields, values) => {
  let query = DB_COMMANDS.UPDATE_USER + ' ' + fields.join(', ') + ' WHERE user_id = $' + (fields.length + 1);
  return client.query(query, [...values, id]);
}



const insertComplaints = async ( user_id, title, description, status, assigned_to, additional_text, media) => {
  return client.query(DB_COMMANDS.INSERT_INTO, [ user_id, title, description, status, assigned_to, additional_text, media]

  );
};

const insertpostComplaint = async (complaint_id,newly_assigned_to) => {
  return client.query(DB_COMMANDS.INSERT_POST, [complaint_id,newly_assigned_to]

  );
};
const insertComplaintHistory= async (complaint_id,previously_assigned_to,newly_assigned_to) => {
  return client.query(DB_COMMANDS.FORWARD_HISTORY, [complaint_id,previously_assigned_to,newly_assigned_to]
  );
};

// Get complaints based on user role
const getComplaintsByRole = async (hierarchy_level) => {
  return client.query(DB_COMMANDS.COMPLAINTS_BY_ROLE, [hierarchy_level]

  );
};

// Function to insert a new complaint


// Function to get a complaint by its ID
const getComplaintById = async (complaint_id) => {
  try {
    return await client.query(DB_COMMANDS.COMPLAINT_BY_ID, [complaint_id]
    );
  } catch (error) {
    console.error('Error retrieving complaint by ID:', error);
    throw error;
  }
};
const getComplaintByuserId = async (user_id) => {
  try {
    return await client.query(DB_COMMANDS.COMPLAINT_BY_USERID, [user_id]
    );
  } catch (error) {
    console.error('Error retrieving complaint by ID:', error);
    throw error;
  }
};

// Function to update the status and assigned role of a complaint
const updateComplaintStatusAndAssignee = async (complaint_id, status, assigned_to) => {
  try {
    return await client.query(DB_COMMANDS.UPDATECOMPLAINT_ASSIGN_STATUS, [status, assigned_to, complaint_id]
    );
  } catch (error) {
    console.error('Error updating complaint status and assignee:', error);
    throw error;
  }
};

const getRoleIdByHierarchyLevel = async (hierarchyLevel) => {
  return client.query(DB_COMMANDS.GET_ROLE_BY_HIERARCHY, [hierarchyLevel]
  );
};

const getUserRoleById = async (user_id) => {
  try {
    return await client.query(DB_COMMANDS.GET_ROLE_BY_ID, [user_id]
    );
  } catch (error) {
    console.error('Error retrieving user role by ID:', error);
    throw error;
  }
};

const getComplaints = async () => {
  try {
    return await client.query(DB_COMMANDS.GET_ALL_COMPLAINTS);
  }
  catch (error) {
    console.log(error);
    throw error;
  }
};

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

//   if (token == null) return res.status(401).send('Unauthorized');

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).send('Forbidden');
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;
// Function to get a user's role by user_id
const updateComplaint = async (id, fields, values) => {
  let query = 'UPDATE complaints SET ' + fields.join(', ') + ' WHERE complaint_id = $' + (fields.length + 1);
  return client.query(query, [...values, id]);
};

const getUserPhoneNumberByRole = async (role_id) => {
  try {
      // Replace 'your_database_client' with your actual database client
      // Assuming 'users' table has columns 'role_id' and 'phone_number'
      const result = await client.query(
          `SELECT phone FROM users WHERE role_id = $1`,
          [role_id]
      );
      console.log(result);

      // Check if a phone number was found
      if (result.rows.length === 0) {
          throw new Error('No phone number found for the specified role');
      }

      // Return the phone number from the query result
      return result;
  } catch (error) {
      console.error('Error in getUserPhoneNumberByRole:', error);
      throw error;
  }
};

module.exports = {
  insertComplaints,
  getComplaintsByRole,
  getComplaintById,
  updateComplaintStatusAndAssignee,
  getUserRoleById,
  checkUsername,
  getRoleId,
  createUser,
  getAllUsers,
  getUserByUsername,
  updateUserToken,
  getUserById,
  deleteUser,
  updateUser,
  generateAccessToken,
  checkEmail,
  checkPhone,
  getuserbytoken,
  getRoleIdByHierarchyLevel,
  getRoles,
  getComplaints,
  userbytoken,
  getComplaintByuserId,
  updateComplaint,getUserPhoneNumberByRole,
  insertpostComplaint,
  insertComplaintHistory

};