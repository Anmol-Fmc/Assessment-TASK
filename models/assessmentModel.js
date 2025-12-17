const pool = require("../config/db");

const AssessmentModel = {
  // ✅ CREATE
  async create({ title, description, duration_minutes, created_by_user_id }) {
    const sql = `
      INSERT INTO assessments (title, description, duration_minutes, created_by_user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING assessment_id, title, description, duration_minutes, created_by_user_id
    `;

    const values = [
      title,
      description ?? null,
      duration_minutes ?? null,
      created_by_user_id,
    ];

    const { rows } = await pool.query(sql, values);
    return rows[0];
  },

  // ✅ GET ALL
  async getAll() {
    const { rows } = await pool.query(`
      SELECT assessment_id, title, description, duration_minutes, created_by_user_id
      FROM assessments
      ORDER BY assessment_id DESC
    `);
    return rows;
  },

  // ✅ GET BY ID
  async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT assessment_id, title, description, duration_minutes, created_by_user_id
      FROM assessments
      WHERE assessment_id = $1
      `,
      [id]
    );
    return rows[0] || null;
  },

  // ✅ UPDATE BY ID
  async updateById(id, data) {
    const { title, description, duration_minutes, created_by_user_id } = data;

    const { rows } = await pool.query(
      `
      UPDATE assessments
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        duration_minutes = COALESCE($3, duration_minutes),
        created_by_user_id = COALESCE($4, created_by_user_id)
      WHERE assessment_id = $5
      RETURNING assessment_id, title, description, duration_minutes, created_by_user_id
      `,
      [
        title ?? null,
        description ?? null,
        duration_minutes ?? null,
        created_by_user_id ?? null,
        id,
      ]
    );

    return rows[0] || null;
  },

  // ✅ DELETE BY ID
  async deleteById(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM assessments
      WHERE assessment_id = $1
      RETURNING assessment_id
      `,
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = AssessmentModel;
