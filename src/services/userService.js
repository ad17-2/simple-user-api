const userRepository = require('../repositories/userRepository');
const { ObjectIdSchema } = require('../utils/validation');

/**
 * User Service
 * Handles business logic for user operations
 */
class UserService {
  /**
   * Get a user by ID with age restriction
   * @param {string} id - User ID
   * @returns {Promise<Object>} User object
   * @throws {Error} If user ID is invalid or user not found
   */
  async getUserById(id) {
    // Validate ObjectId format
    const validationResult = ObjectIdSchema.safeParse(id);
    if (!validationResult.success) {
      const error = new Error('Invalid user ID format');
      error.statusCode = 400;
      error.details = validationResult.error.issues;
      throw error;
    }
    
    // Set minimum age requirement (business rule)
    const MIN_AGE = 21;
    
    // Get user with age filter
    const user = await userRepository.findByIdWithAgeFilter(id, MIN_AGE);
    
    // Throw error if user not found
    if (!user) {
      const error = new Error('User with the specified ID not found or age is not greater than 21');
      error.statusCode = 404;
      throw error;
    }
    
    return user;
  }
}

module.exports = new UserService(); 