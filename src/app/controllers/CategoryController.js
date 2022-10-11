const CategoriesRepository = require('../repositories/CategoriesRepository');
const isValidUUID = require('../utils/isValidUUID');

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();
    res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ Error: 'Name is required' });
    }
    const category = await CategoriesRepository.create({ name });
    res.json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ Error: 'Category id invalid' });
    }

    if (!name) {
      return res.status(400).json({ Error: 'Name is required' });
    }

    const categoryUpdeted = await CategoriesRepository.update(id, { name });
    res.json(categoryUpdeted);
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!isValidUUID(id)) {
      return res.status(400).json({ Error: 'Contact id invalid' });
    }

    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
