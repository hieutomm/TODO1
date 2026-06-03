const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  addTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../Controllers/taskController");
/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Tạo task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo task thành công
 */

router.post("/", auth, addTask);
/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Cập nhật task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Learn NodeJS
 *               done:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Update task thành công
 *       404:
 *         description: Không tìm thấy task
 *       500:
 *         description: Server error
 */
router.put("/", updateTask);
/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Xóa task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của task
 *     responses:
 *       200:
 *         description: Xóa task thành công
 *       404:
 *         description: Không tìm thấy task
 *       500:
 *         description: Server error
 */
router.delete("/", deleteTask);
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lấy danh sách task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
router.get("/", getTask);

module.exports = router;
