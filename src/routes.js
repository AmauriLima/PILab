const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController');
const WalletController = require('./app/controllers/WalletController');

const router = Router();

router.post('/auth/signup', AuthController.store);
router.post('/auth/login', AuthController.login);

router.get('/wallet', WalletController.index);
router.post('/wallet/deposit', WalletController.storeIncome);
router.post('/wallet/withdraw', WalletController.storeExpense);

module.exports = router;
