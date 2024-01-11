const userModel = require('../../models/user');

jest.mock('../models/user');

//Create User
it('should create a new user successfully', async () => {
  const mockUser = { name: 'Test User', email: 'test@example.com', password: '123456' };
  // Mock your database interaction (e.g., using sinon)
  const createdUser = await userModel.createUser(mockUser);

  expect(createdUser).toHaveProperty('id'); // Assert ID is generated
  expect(createdUser.name).toBe(mockUser.name);
  expect(createdUser.email).toBe(mockUser.email);
  // Test password hashing, if implemented
  expect(createdUser.password).not.toBe(mockUser.password);
});

it('should throw an error for missing required fields', async () => {
  await expect(userModel.createUser({})).rejects.toThrowError('Missing required field');
});

it('should throw an error for duplicate email', async () => {
  // Mock existing user with same email
  const error = new Error('Email already exists');
  // Mocked database interaction throws the error
  await expect(userModel.createUser(mockUser)).rejects.toThrow(error);
});

//Get User List
it('should retrieve all users', async () => {
  const mockUsers = [{ name: 'User 1', email: 'user1@example.com' }, { name: 'User 2', email: 'user2@example.com' }];
  // Mock database interaction to return mock users
  const users = await userModel.getUsers();

  expect(users).toEqual(mockUsers);
});

it('should return an empty array if no users exist', async () => {
  // Mock database interaction to return an empty array
  const users = await userModel.getUsers();

  expect(users).toEqual([]);
});

//Get One User
it('should retrieve a specific user by ID', async () => {
  const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' };
  // Mock database interaction to return mock user based on ID
  const user = await userModel.getOneUser('123');

  expect(user).toEqual(mockUser);
});

it('should return null for non-existent user', async () => {
  // Mock database interaction to return null
  const user = await userModel.getOneUser('invalid-id');

  expect(user).toBeNull();
});

//Update User
it('should update a user with valid data', async () => {
  const mockUser = { id: '123', name: 'Updated Name' };
  // Mock database interaction to update user
  const updatedUser = await userModel.updateUser(mockUser);

  expect(updatedUser).toEqual(mockUser); // Assuming update returns updated user
});

it('should throw an error for non-existent user', async () => {
  // Mock database interaction to return null
  const error = new Error('User not found');
  await expect(userModel.updateUser(mockUser)).rejects.toThrow(error);
});

//Delete User
it('should delete a user successfully', async () => {
  const userId = '123';
  // Mock database interaction to delete user
  await userModel.deleteUser(userId);

  // Further asserts may depend on your implementation (e.g., checking return value)
});

it('should throw an error for non-existent user', async () => {
  const error = new Error('User not found');
  await expect(userModel.deleteUser('invalid-id')).rejects.toThrow(error);
});
