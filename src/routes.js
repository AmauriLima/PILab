const { Router } = require('express');
const AuthController = require('./app/controllers/AuthController');
const WalletController = require('./app/controllers/WalletController');

const router = Router();

router.post('/auth/signup', AuthController.store);
router.post('/auth/login', AuthController.login);
router.get('/auth/verifytoken', AuthController.verifyToken);

router.get('/wallet/', WalletController.index);
router.get('/wallet/withdraws', WalletController.getAllWithdraws);
router.get('/wallet/deposits', WalletController.getAllDeposits);
router.post('/wallet/deposit', WalletController.store);
router.post('/wallet/withdraw', WalletController.store);

module.exports = router;
