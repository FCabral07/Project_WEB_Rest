const Promotion = require('../models/promotionModel');

module.exports = {
    createPromotion: async (req, res) => {
        try {
            const newPromotion = await Promotion.create(req.body);
            res.status(201).json({ message: 'Promoção cadastrada com sucesso!', promotion: newPromotion });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível cadastrar a promoção', error: err.message });
        }
    },

    updatePromotion: async (req, res) => {
        try {
            const updatedPromotion = await Promotion.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            if (!updatedPromotion) {
                return res.status(404).json({ message: 'Promoção não encontrada' });
            }
            res.status(200).json({ message: 'Promoção atualizada com sucesso!', promotion: updatedPromotion });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível atualizar a promoção', error: err.message });
        }
    },

    getPromotion: async (req, res) => {
        try {
            const promotion = await Promotion.findById(req.params.id);
            if (!promotion) {
                return res.status(404).json({ message: 'Promoção não encontrada' });
            }
            res.status(200).json({ promotion });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível recuperar a promoção', error: err.message });
        }
    },

    deletePromotion: async (req, res) => {
        try {
            const deletedPromotion = await Promotion.findByIdAndDelete(req.params.id);
            if (!deletedPromotion) {
                return res.status(404).json({ message: 'Promoção não encontrada' });
            }
            res.status(200).json({ message: 'Promoção removida com sucesso!' });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível remover a promoção', error: err.message });
        }
    },

    getPreferredPromotions: async (req, res) => {
        try {
            const userPreferences = req.user.preferences; 

            const preferredPromotions = await Promotion.find({ category: { $in: userPreferences } });
            
            res.status(200).json({ preferredPromotions });
        } catch (err) {
            res.status(500).json({ message: 'Não foi possível recuperar as promoções preferidas', error: err.message });
        }
    },
};


// FALTA CRIAR



// Dar a opção para o usuário poder atualizar um conjunto de itens
// de uma só vez (aplicar um desconto por exemplo em todos os itens 
// do tipo chocolate)
