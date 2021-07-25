const WalletsRepository = require('../repositories/WalletsRepository');

class WalletController {
  async index(request, response) {
    const wallet = await WalletsRepository.findAll(request.userId);

    response.json(wallet);
  }

  async storeIncome(request, response) {
    const {
      description, value,
    } = request.body;

    const owner = request.userId;
    const type = '2';

    if (!value) {
      return response.status(400).json({ error: 'Value is required' });
    }

    const income = await WalletsRepository.create({
      description, value, owner, type,
    });

    response.status(201).json(income);
  }

  async storeExpense(request, response) {
    const {
      description, value,
    } = request.body;

    const owner = request.userId;
    const type = '1';

    if (!value) {
      return response.status(400).json({ error: 'Value is required' });
    }

    const expense = await WalletsRepository.create({
      description, value, owner, type,
    });

    response.status(201).json(expense);
  }
}

module.exports = new WalletController();
