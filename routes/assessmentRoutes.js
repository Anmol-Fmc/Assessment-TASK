const express = require("express");
const AssessmentController= require("../controllers/assessmentController");
const authenticateJWT=require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authenticateJWT,AssessmentController.create);
router.get("/",AssessmentController.getAll);
router.get("/:id",AssessmentController.getById);
router.put("/:id",AssessmentController.updateById);
router.delete("/:id",authenticateJWT,AssessmentController.deleteById);

module.exports = router;