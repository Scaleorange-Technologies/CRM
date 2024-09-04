const DB_COMMANDS = {
  CHECK_USERNAME: 'SELECT * from users where username =$1',
  CHECK_EMAIL: 'SELECT * from users where email =$1',
  CHECK_PHONE: 'SELECT * from users where phone =$1',
  GET_ROLE_ID: 'SELECT role_id FROM roles WHERE role_name = $1',
  INSERT_USER: 'INSERT INTO users (username, password,confirmpassword,email, phone, role_id,access_token,created_at) VALUES ($1, $2, $3, $4, $5,$6,$7,NOW()) RETURNING *;',
  GET_USER_BY_USERNAME: 'SELECT * FROM users WHERE username = $1;',
  UPDATE_TIMESTAMP: 'UPDATE users SET updated_at = NOW() WHERE username = $1',
  GET_ALL_USERS: 'SELECT * FROM users',
  GET_USER_BY_ID: 'SELECT * FROM users where user_id=$1',
  DELETE_USER: 'DELETE FROM users where user_id=$1',
  UPDATE_USER: 'UPDATE users SET',
  GET_ACCESS_TOKEN: 'SELECT access_token from users where username = $1 ',
  GET_USER_BY_TOKEN: 'SELECT * FROM users WHERE access_token=$1',
  INSERT_INTO: 'INSERT INTO COMPLAINTS (user_id,title,description,status,assigned_to,additional_text,media)values($1,$2,$3,$4,$5,$6,$7) RETURNING *',
  COMPLAINTS_BY_ROLE: 'SELECT complaints .* FROM complaints INNER JOIN users ON complaints.user_id = users.user_id INNER JOIN roles ON users.role_id = roles.role_id WHERE roles.hierarchy_level = $1',
  COMPLAINT_BY_ID: 'SELECT * FROM complaints WHERE complaint_id = $1',
  COMPLAINT_BY_USERID: 'SELECT * FROM complaints WHERE user_id = $1',
  UPDATECOMPLAINT_ASSIGN_STATUS: 'UPDATE complaints SET status = $1, assigned_to = $2 WHERE complaint_id = $3 RETURNING *',
  GET_ROLE_BY_HIERARCHY: 'SELECT role_id FROM roles WHERE hierarchy_level = $1',
  GET_ROLE_BY_ID: 'SELECT role_id FROM users WHERE user_id = $1',
  GET_ALL_COMPLAINTS: 'SELECT * FROM complaints',
  INSERT_POST:'INSERT INTO complaint_history(complaint_id,newly_assigned_to) values($1,$2) RETURNING *',
  FORWARD_HISTORY:'INSERT INTO complaint_history(complaint_id,previously_assigned_to,newly_assigned_to) values($1,$2,$3) RETURNING *'
};

module.exports = { DB_COMMANDS };