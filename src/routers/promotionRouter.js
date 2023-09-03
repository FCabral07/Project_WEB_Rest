'use strict';

const express = require('express');
const promotionController = require('../controllers/promotionController');
const authMiddleware = require('../authMiddleware');

const promotionRouter = express.Router();

// Middleware de autenticação aplicado a todas as rotas de promoção
promotionRouter.use(authMiddleware);

promotionRouter.route('/promotions')
    .post((req, res) => promotionController.createPromotion(req, res));

promotionRouter.route('/promotions/:id')
    .get((req, res) => promotionController.getPromotion(req, res))
    .put((req, res) => promotionController.updatePromotion(req, res))
    .delete((req, res) => promotionController.deletePromotion(req, res));

promotionRouter.route('/preferred-promotions')
    .get((req, res) => promotionController.getPreferredPromotions(req, res));

module.exports = promotionRouter;
