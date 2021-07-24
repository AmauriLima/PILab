const db = require('../../database');

class WalletsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT ie.*, users.name AS owner_name
      FROM incomes_and_expenses AS ie
      JOIN users ON ie.owner = users.id
    `);

    return rows;
  }

  async create({
    description, value, owner, type,
  }) {
    const [row] = await db.query(`
      INSERT INTO incomes_and_expenses(description, value, owner, type)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [description, value, owner, type]);

    return row;
  }
}

module.exports = new WalletsRepository();
