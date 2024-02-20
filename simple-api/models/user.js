const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); 

const pool = new Pool({
  connectionString: 'postgres://user:password@host:port/database',
});

const userSchema = {
  tableName: 'users',
  primaryKey: 'id',
  attributes: {
    id: { type: 'uuid', primaryKey: true },
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true }, // Hashed password
  },
};

const createUser = async (user) => {
  // Hash password before saving
  user.password = await hashPassword(user.password);

  const query = `INSERT INTO ${userSchema.tableName} (
    ${Object.keys(userSchema.attributes).join(', ')}
  ) VALUES ($1, $2, ..., $N) RETURNING *`;
  const params = Object.values(user);

  try {
    const { rows } = await pool.query(query, params);
    return rows[0];
  } catch (error) {
    throw new Error('Error creating user');
  }
};
async function getUsers() {
  try {
    const query = `SELECT * FROM ${userSchema.tableName}`;
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error('Error retrieving users');
  }
}

async function getOneUser(userId) {
  try {
    const query = `SELECT * FROM ${userSchema.tableName} WHERE id = $1`;
    const params = [userId];
    const { rows } = await pool.query(query, params);

    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('User not found');
    }

  } catch (error) {
    throw new Error('Error retrieving user');
  }
}

async function updateUser(user) {
  try {
    // Hash password if provided (only for updates with password change)
    user.password = user.password && (await hashPassword(user.password));

    const query = `UPDATE ${userSchema.tableName} SET ${Object.keys(userSchema.attributes).map(key => `${key} = $${Object.keys(userSchema.attributes).indexOf(key) + 1}`).join(', ')} WHERE id = $${Object.keys(userSchema.attributes).length + 1}`;
    const params = Object.values(user).concat(user.id);

    const result = await pool.query(query, params);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error('Error updating user');
  }
}

async function deleteUser(userId) {
  try {
    const query = `DELETE FROM ${userSchema.tableName} WHERE id = $1`;
    const params = [userId];

    const result = await pool.query(query, params);
    return result.rowCount > 0;
  } catch (error) {
    throw new Error('Error deleting user');
  }
}

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

module.exports = {
  userSchema,
  createUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};

// Include password hashing library (e.g., bcryptjs)
