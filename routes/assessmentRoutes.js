const express = require("express");
const AssessmentController= require("../controllers/assessmentController");

const router = express.Router();

router.post("/",AssessmentController.create);
router.get("/",AssessmentController.getAll);
router.get("/:id",AssessmentController.getById);
router.put("/:id",AssessmentController.updateById);
router.delete("/:id",AssessmentController.deleteById);

module.exports = router;