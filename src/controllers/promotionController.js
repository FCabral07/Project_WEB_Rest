const Promotion = require('../models/promotionModel');
const Product = require('../models/productModel');

module.exports = {
    createPromotion: async (req, res) => {
        try {
            const { name, products, discount } = req.body;
            
            // Converte os nomes dos produtos em IDs procurando no banco de dados
            const productIds = await Product.find({ name: { $in: products } }, '_id');
            
            // Crie a promoção usando os IDs dos produtos encontrados
            const newPromotion = await Promotion.create({
                name,
                products: productIds,
                discount,
            });
    
            // Atualiza o campo promotionPrice dos produtos associados
            for (const productId of productIds) {
                const product = await Product.findById(productId);
                if (product) {
                    product.promotionPrice = product.price * (1 - discount / 100).toFixed(2);
                    await product.save();
                }
            }
            
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

    // Deletando de acordo com o ID auto incrementável criado no model
    deletePromotion: async (req, res) => {
        try {
            const deletedPromotion = await Promotion.findOneAndDelete({ id: req.params.id });
    
            if (!deletedPromotion) {
                return res.status(404).json({ message: 'Promoção não encontrada' });
            }
    
            // Obtém a lista de IDs dos produtos associados à promoção
            const productIds = deletedPromotion.products;
    
            // Atualiza cada produto para definir promotionPrice como null
            await Product.updateMany({ _id: { $in: productIds } }, { promotionPrice: null });
    
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

