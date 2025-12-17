const AssessmentModel = require("../models/assessmentModel");

const AssessmentController = {
  // ✅ CREATE
  async create(req, res) {
    try {
      const { title, description, duration_minutes, created_by_user_id } = req.body;

      if (!title || !created_by_user_id) {
        return res.status(400).json({
          error: "title and created_by_user_id are required",
        });
      }

      console.log("CREATE BODY:", req.body);

      const assessment = await AssessmentModel.create({
        title,
        description,
        duration_minutes,
        created_by_user_id,
      });

      return res.status(201).json(assessment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // ✅ GET ALL
  async getAll(req, res) {
    try {
      const data = await AssessmentModel.getAll();
      return res.json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // ✅ GET BY ID
  async getById(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid assessment id" });
      }

      const assessment = await AssessmentModel.getById(id);
      if (!assessment) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      return res.json(assessment);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // ✅ UPDATE BY ID
  async updateById(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid assessment id" });
      }

      const updated = await AssessmentModel.updateById(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      return res.json(updated);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  // ✅ DELETE BY ID
  async deleteById(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid assessment id" });
      }

      const deleted = await AssessmentModel.deleteById(id);
      if (!deleted) {
        return res.status(404).json({ error: "Assessment not found" });
      }

      return res.json({
        message: "Assessment deleted successfully",
        assessment_id: deleted.assessment_id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = AssessmentController;
