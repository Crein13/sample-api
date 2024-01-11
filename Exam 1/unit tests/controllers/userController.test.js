const supertest = require('supertest');
const app = require('../../app');
const { userSchema } = require('../../models/user');

jest.mock('../../models/user');

describe('UserController', () => {
  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const mockUser = { name: 'Test User', email: 'test@example.com', password: 'test123' };
      userSchema.createUser.mockResolvedValue(mockUser);

      const response = await supertest(app).post('/users').send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'User created successfully', user: mockUser });
      expect(userSchema.createUser).toHaveBeenCalledWith(mockUser);
    });

    it('should throw error for duplicate email', async () => {
      const mockUser = { name: 'Test User', email: 'duplicate@example.com', password: 'test123' };
      userSchema.createUser.mockRejectedValue(new Error('Email already exists'));

      const response = await supertest(app).post('/users').send(mockUser);

      expect(response.status).toBe(409);
      expect(response.body).toEqual({ message: 'Email already exists' });
    });
  });

  describe('getUsers', () => {
    it('should retrieve all users', async () => {
      const mockUsers = [{ name: 'User 1', email: 'user1@example.com' }, { name: 'User 2', email: 'user2@example.com' }];
      userSchema.getUsers.mockResolvedValue(mockUsers);

      const response = await supertest(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });

  describe('getOneUser', () => {
    it('should retrieve a specific user by ID', async () => {
      const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' };
      userSchema.getOneUser.mockResolvedValue(mockUser);

      const response = await supertest(app).get('/users/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
    });

    it('should return 404 for non-existent user', async () => {
      userSchema.getOneUser.mockResolvedValue(null);

      const response = await supertest(app).get('/users/invalid-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update a user with valid data', async () => {
      const mockUser = { id: '123', name: 'Updated Name' };
      userSchema.updateUser.mockResolvedValue(mockUser);

      const response = await supertest(app).put('/users/123').send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User updated successfully', user: mockUser });
    });

    it('should return 404 for non-existent user', async () => {
      userSchema.updateUser.mockResolvedValue(null);

      const response = await supertest(app).put('/users/invalid-id').send({});

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      userSchema.deleteUser.mockResolvedValue();

      const response = await supertest(app).delete('/users/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'User deleted successfully' });
    });

    it('should return a 404 error if the user is not found', async () => {
      const response = await request(app).delete('/users/invalid-id');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });
});
