const userService = require('../../src/services/userService');
const userRepository = require('../../src/repositories/userRepository');
const { Types } = require('mongoose');

// Mock dependencies
jest.mock('../../src/repositories/userRepository');

describe('User Service Tests', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  test('getUserById should return a user when found with age > 21', async () => {
    // Mock repository to return a user
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };
    userRepository.findByIdWithAgeFilter.mockResolvedValue(mockUser);

    // Call the service
    const result = await userService.getUserById('507f1f77bcf86cd799439011');

    // Assertions
    expect(userRepository.findByIdWithAgeFilter).toHaveBeenCalledWith(
      '507f1f77bcf86cd799439011', 
      21
    );
    expect(result).toEqual(mockUser);
  });

  test('getUserById should throw 404 error when user not found', async () => {
    // Mock repository to return null (user not found)
    userRepository.findByIdWithAgeFilter.mockResolvedValue(null);

    // Call the service and expect it to throw
    await expect(userService.getUserById('507f1f77bcf86cd799439011'))
      .rejects
      .toThrow('User with the specified ID not found or age is not greater than 21');

    // Check that the thrown error has the correct status code
    try {
      await userService.getUserById('507f1f77bcf86cd799439011');
    } catch (error) {
      expect(error.statusCode).toBe(404);
    }
  });

  test('getUserById should throw 400 error when ID format is invalid', async () => {
    // Call the service with invalid ID and expect it to throw
    await expect(userService.getUserById('invalid-id'))
      .rejects
      .toThrow('Invalid user ID format');

    // Check that the thrown error has the correct status code and details
    try {
      await userService.getUserById('invalid-id');
    } catch (error) {
      expect(error.statusCode).toBe(400);
      expect(error.details).toBeDefined();
    }
  });

  test('getUserById should propagate repository errors', async () => {
    // Mock repository to throw an error
    const dbError = new Error('Database connection failed');
    userRepository.findByIdWithAgeFilter.mockRejectedValue(dbError);

    // Call the service and expect it to throw the same error
    await expect(userService.getUserById('507f1f77bcf86cd799439011'))
      .rejects
      .toThrow('Database connection failed');
  });
}); 