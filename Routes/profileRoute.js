const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
} = require("../Controllers/profileController");
/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Lấy profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 */

router.get("/", auth, getProfile);
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Cập nhật profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 */
router.put("/", auth, updateProfile);

module.exports = router;
