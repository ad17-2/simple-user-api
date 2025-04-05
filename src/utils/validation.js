const { z } = require('zod');
const { Types } = require('mongoose');

// Validate MongoDB ObjectId
const ObjectIdSchema = z.string().refine(
  (id) => {
    try {
      return Types.ObjectId.isValid(id);
    } catch (error) {
      return false;
    }
  },
  {
    message: 'Invalid ObjectId format'
  }
);

// User validator schema
const UserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().min(0, 'Age must be a positive number')
});

module.exports = {
  ObjectIdSchema,
  UserSchema
}; 