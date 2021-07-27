const WalletsRepository = require('../repositories/WalletsRepository');

class WalletController {
  async index(request, response) {
    const wallet = await WalletsRepository.findAll(request.userId);
    response.json(wallet);
  }

  async store(request, response) {
    const {
      description, value,
    } = request.body;

    const owner = request.userId;

    const [,, typeName] = request.url.split('/');

    // 1 -> withdraw
    // 2 -> deposit
    const type = (typeName === 'withdraw') ? '1' : '2';

    if (!value) {
      return response.status(400).json({ error: 'Value is required' });
    }

    const register = await WalletsRepository.create({
      description, value, owner, type,
    });

    response.status(201).json(register);
  }
}

module.exports = new WalletController();
