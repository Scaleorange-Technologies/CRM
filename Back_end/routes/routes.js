const express = require('express');
const cors = require('cors')
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const {
    authenticateToken,
    authorizeRole,
    validate,
    validateRegistration,
    validateComplaint,

} = require('../middlewares/middleware');

const router = express.Router();
router.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'access_token']
}));

router.post('/register', validateRegistration, validate, userController.register);
router.post('/login', userController.login);
router.get('/users', authenticateToken, authorizeRole('ADMIN'), authController.getAllUsers);
router.get('/users/:id', authenticateToken, authorizeRole('ADMIN'), authController.getUserById);
router.delete('/users/:id', authenticateToken, authorizeRole('ADMIN'), authController.deleteUser);
router.put('/users/:id', authenticateToken, authorizeRole('ADMIN'), authController.updateUser);
router.post('/complaints', authenticateToken, validateComplaint, validate, userController.postComplaint);
router.get('/complaints/v4', authenticateToken, authorizeRole('TEAM_LEAD'), userController.getTeamLeadComplaints);
router.get('/complaints/v3', authenticateToken, authorizeRole('TEAM_MANAGER'), userController.getTeamManagerComplaints);
router.get('/complaints/v2', authenticateToken, authorizeRole('HR'), userController.getHrComplaints);
router.get('/complaints/v1', authenticateToken, authorizeRole('CEO'), userController.getCEOComplaints);
router.post('/complaints/forward', authenticateToken, userController.forwardComplaint);
router.get('/getallcomplaints', authenticateToken, authorizeRole('ADMIN'), userController.getAllComplaints);
router.get('/getuser',userController.getuserbytoken)
router.get('/mycomplaints',userController.getComplaintsByAccessToken)
router.get('/getcomplaints', authenticateToken, userController.getComplaints)
router.put('/complaints/:id', userController.updateComplaintController);
router.post('/postreinvestigation', authenticateToken, userController.reinvestigateComplaint);
router.post('/complaints/:id/accept',authenticateToken,authorizeRole('CEO'),userController.acceptComplaint);
router.post('/complaints/:id/reject', authenticateToken,authorizeRole('CEO'),userController.rejectComplaint);
router.get('/role/:userId',userController.getRoleIdByUserId)
module.exports = router;