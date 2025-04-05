const userService = require('../services/userService');

/**
 * User Controller
 * Handles HTTP requests and responses for user operations
 */
class UserController {
  /**
   * Get user by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      
      // Use error status code if provided by service layer, default to 500
      const statusCode = error.statusCode || 500;
      const errorResponse = {
        error: statusCode === 400 ? 'Invalid user ID format' :
               statusCode === 404 ? 'User not found' : 'Server error',
        message: error.message
      };
      
      // Add validation details if available
      if (error.details) {
        errorResponse.details = error.details;
      }
      
      return res.status(statusCode).json(errorResponse);
    }
  }
}

module.exports = new UserController(); 