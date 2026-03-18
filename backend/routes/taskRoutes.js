const express = require("express");
const { addTask, getTasks, markDone } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id/done", markDone);

module.exports = router;