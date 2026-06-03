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
 *     responses:
 *       200:
 *         description: Lay profile thanh cong
 *       401:
 *         description: Token khong hop le hoac het han
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: testuser_updated
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Cap nhat profile thanh cong
 *       401:
 *         description: Token khong hop le hoac het han
 */
router.put("/", auth, updateProfile);

module.exports = router;
