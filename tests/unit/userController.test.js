const userController = require('../../src/controllers/userController');
const userService = require('../../src/services/userService');

// Mock dependencies
jest.mock('../../src/services/userService');

describe('User Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup request and response objects
    req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('getUserById should return a user when found', async () => {
    // Mock userService.getUserById to return a user
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };
    userService.getUserById.mockResolvedValue(mockUser);

    // Call the controller
    await userController.getUserById(req, res);

    // Assertions
    expect(userService.getUserById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('getUserById should return 404 when user not found', async () => {
    // Mock userService.getUserById to throw a not found error
    const error = new Error('User with the specified ID not found or age is not greater than 21');
    error.statusCode = 404;
    userService.getUserById.mockRejectedValue(error);

    // Call the controller
    await userController.getUserById(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'User not found',
      message: error.message
    });
  });

  test('getUserById should return 400 when ID format is invalid', async () => {
    // Mock userService.getUserById to throw a validation error
    const error = new Error('Invalid user ID format');
    error.statusCode = 400;
    error.details = [{ message: 'Invalid ObjectId' }];
    userService.getUserById.mockRejectedValue(error);

    // Call the controller
    await userController.getUserById(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Invalid user ID format',
      message: error.message,
      details: error.details
    });
  });

  test('getUserById should return 500 on server error', async () => {
    // Mock userService.getUserById to throw a generic error
    const errorMessage = 'Database connection error';
    userService.getUserById.mockRejectedValue(new Error(errorMessage));

    // Call the controller
    await userController.getUserById(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Server error',
      message: errorMessage
    });
  });
}); 