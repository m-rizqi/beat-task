const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

router.post("/", activityController.addActivity);
router.put("/:id", activityController.updateActivity);
router.delete("/:id", activityController.deleteActivity);
router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivity);

module.exports = router;
