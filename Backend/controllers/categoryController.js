import Category from "../models/categories.js";

export const addCategories = async (req, res, next) => {
    const { category } = req.body;

    try {
        const existingCategory  = await Category.findOne({ category });
        if (!existingCategory) {
            await Category.create({ category });
            res.status(201).json({ message: 'Category added successfully' });
        } else {
            res.status(400).json({ message: 'Category aleady exists or invalid.' });
        }
    } catch (err) {
        console.error(err)
        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch(err) {
        console.error(err)
        next(err);
    }
};

export const updateCategories = async (req, res, next) => {
    const { category } = req.body;

    try {
        const existingCategory = await Category.findById(req.params.id);
        if(!existingCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }
        existingCategory.category = category;
        await existingCategory.save();
        res.status(200).json({ message: 'Category updated successfully'});
    } catch (err) {
        console.error(err)
        next(err);
    }
}

export const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};