'use strict';

const express = require('express');
const promotionController = require('../controllers/promotionController');
const authMiddleware = require('../authMiddleware');
const roleMiddleware = require('../roleMiddleware');

const promotionRouter = express.Router();

// Middleware de autenticação aplicado a todas as rotas de promoção
promotionRouter.use('/promotion', authMiddleware, roleMiddleware);

promotionRouter.route('/promotions')
.get((req, res) => promotionController.getPromotion(req, res))

promotionRouter.route('/promotion')
.post((req, res) => promotionController.createPromotion(req, res));

promotionRouter.route('/promotion/:id')
.put((req, res) => promotionController.updatePromotion(req, res))
.delete((req, res) => promotionController.deletePromotion(req, res));

promotionRouter.route('/preferred-promotions')
.get((req, res) => promotionController.getPreferredPromotions(req, res));


module.exports = promotionRouter;
