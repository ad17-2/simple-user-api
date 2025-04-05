const User = require('../models/userModel');
const { Types } = require('mongoose');

/**
 * User Repository
 * Handles data access operations for the User model
 */
class UserRepository {
  /**
   * Find a user by ID with age filter
   * @param {string} id - User ID
   * @param {number} minAge - Minimum age
   * @returns {Promise<Object|null>} User object or null if not found
   */
  async findByIdWithAgeFilter(id, minAge) {
    try {
      const objectId = new Types.ObjectId(id);
      return await User.findOne({ 
        _id: objectId,
        age: { $gt: minAge } 
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository(); 