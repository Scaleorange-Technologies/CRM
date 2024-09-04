const UserModel = require('../models/userModel');
const logger = require('../config/logger')
const authController = {
  async getAllUsers(req, res) {
    try {
      const result = await UserModel.getAllUsers();
      res.status(200).send(result.rows);
    } catch (err) {
      logger.error('Error:', err);
      res.status(500).send('Retrieve error');
    }
  },

  async getUserById(req, res) {
    const id = req.params.id;
    try {
      const result = await UserModel.getUserById(id);
      res.status(200).send(result.rows);
    } catch (err) {
      logger.error('Error:', err);
      res.status(500).send('Retrieve error');
    }
  },

  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      await UserModel.deleteUser(id);
      res.status(200).send("Deleted");
    } catch (err) {
      logger.error('Error:', err);
      res.status(500).send('Error deleting user');
    }
  },

  async updateUser(req, res) {
    const id = req.params.id;
    const { username, password, email, phone, role_id, access_token } = req.body;

    const fields = [];
    const values = [];

    if (username) fields.push('username = $' + (fields.length + 1)), values.push(username);
    if (password) fields.push('password = $' + (fields.length + 1)), values.push(password);
    if (email) fields.push('email = $' + (fields.length + 1)), values.push(email);
    if (phone) fields.push('phone = $' + (fields.length + 1)), values.push(phone);
    if (role_id) fields.push('role_id = $' + (fields.length + 1)), values.push(role_id);
    if (access_token) fields.push('access_token = $' + (fields.length + 1)), values.push(access_token);

    if (fields.length === 0) {
      return res.status(400).send('No fields to update');
    }

    try {
      const result = await UserModel.updateUser(id, fields, values);
      if (result.rowCount === 0) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User updated');
    } catch (err) {
      logger.error('Error:', err);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = authController;