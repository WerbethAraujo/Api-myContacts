const db = require("../../database/index");

class CategoriesRepository {
  async findAll() {
    const rows = await db.query(`SELECT * FROM categories`);
    return rows;
  }
  async create({ name }) {
    const [row] = await db.query(
      `
       INSERT INTO categories(name)
       VALUES($1)
       RETURNING *
      `,
      [name]
    );
    return row;
  }
  async update(id, { name }) {
    const [row] = await db.query(
      `
      UPDATE categories
      SET name=$1
      WHERE id = $2
      RETURNING *
      `,
      [name, id]
    );

    return row;
  }
  async delete(id) {
    const categoryDelected = await db.query(
      `DELETE FROM categories WHERE id= $1`,
      [id]
    );
    return categoryDelected;
  }
}

module.exports = new CategoriesRepository();
