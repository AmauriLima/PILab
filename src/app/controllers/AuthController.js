const jwt = require('jsonwebtoken');
const UsersRepository = require('../repositories/UsersRepository');

const authConfig = require('../../config/auth.json');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

class AuthController {
  async store(request, response) {
    const {
      name, email, password,
    } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({ error: 'Required arguments missing' });
    }

    const userExists = await UsersRepository.findByEmail(email);
    if (userExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const user = await UsersRepository.create({
      name, email, password,
    });

    user.password = undefined;
    const token = generateToken({ id: user.id });

    request.headers.authorization = token;

    response.send({
      user,
      token,
    });
  }

  async login(request, response) {
    const { email, password } = request.body;

    const user = await UsersRepository.findByEmail(email);

    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    const validPassword = await UsersRepository.authenticatePassword(user, password);

    if (!validPassword) {
      return response.status(400).json({ error: 'Invalid password' });
    }

    user.password = undefined;

    response.json({
      user,
      token: generateToken({ id: user.id }),
    });
  }
}

module.exports = new AuthController();
