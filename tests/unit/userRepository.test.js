const userRepository = require('../../src/repositories/userRepository');
const User = require('../../src/models/userModel');
const { Types } = require('mongoose');

// Mock dependencies
jest.mock('../../src/models/userModel');

describe('User Repository Tests', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('findByIdWithAgeFilter should call User.findOne with correct parameters', async () => {
    // Setup
    const userId = '507f1f77bcf86cd799439011';
    const minAge = 21;
    const mockUser = {
      _id: userId,
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };
    User.findOne.mockResolvedValue(mockUser);

    // Execute
    const result = await userRepository.findByIdWithAgeFilter(userId, minAge);

    // Assert
    expect(User.findOne).toHaveBeenCalledWith({ 
      _id: expect.any(Types.ObjectId),
      age: { $gt: minAge }
    });
    expect(result).toEqual(mockUser);
  });

  test('findByIdWithAgeFilter should propagate errors', async () => {
    // Setup
    const userId = '507f1f77bcf86cd799439011';
    const minAge = 21;
    const error = new Error('Database error');
    User.findOne.mockRejectedValue(error);

    // Execute and Assert
    await expect(userRepository.findByIdWithAgeFilter(userId, minAge))
      .rejects
      .toThrow('Database error');
  });
}); 