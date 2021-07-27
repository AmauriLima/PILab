const bcrypt = require('bcryptjs');
const db = require('../../database');

class UsersRepository {
  async create({
    name, email, password,
  }) {
    const passwordEncrypted = await bcrypt.hash(password, 10);

    const [row] = await db.query(`
      INSERT INTO users(name, email, password)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, email, passwordEncrypted]);

    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return row;
  }

  async authenticatePassword(user, password) {
    const validPassword = await bcrypt.compare(password, user.password);
    return validPassword;
  }
}

module.exports = new UsersRepository();
