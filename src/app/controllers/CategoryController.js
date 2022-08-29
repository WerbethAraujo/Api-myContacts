const CategoriesRepository = require("../Repositories/CategoriesRepository");

class CategoryController {
  async index(req, res) {
    const categories = await CategoriesRepository.findAll();
    res.json(categories);
  }
  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ Error: "Name is required" });
    }
    const category = await CategoriesRepository.create({ name });
    res.json(category);
  }
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ Error: "Name is required" });
    }

    const categoryUpdeted = await CategoriesRepository.update(id, { name });
    res.json(categoryUpdeted);
  }
  async delete(req, res) {
    const { id } = req.params;

    await CategoriesRepository.delete(id);
    res.sendStatus(204);
  }
}

module.exports = new CategoryController();
