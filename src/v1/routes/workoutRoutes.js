const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();
const cache = apicache.middleware;

router.get("/", cache("3 minutes"), workoutController.getAllWorkouts);

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.get("/:workoutId/records", recordController.getRecordForWorkout);

router.post("/", workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

/** Documentation using swagger
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: query
 *         name: mode
 *         schema:
 *           type: string
 *         description: mode of a workout (push, pull, legs)
 *                      (example - /api/v1/workouts?mode=push)
 *       - in: path
 *         name: workout id
 *         schema:
 *           type: UUID
 *         description: universally universally unique identifier
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       600:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Can't find workout with ID"
 * /api/v1/workouts/:
 *   post:
 *     tags:
 *       - Workouts
 *     parameters:
 *       - in: request
 *         name: workout info
 *         schema:
 *           type: json object
 *         description: create new workout, request body is workout info in json format
 *     responses:
 *       400:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Workout with name already exists"
 *       500:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Error creating, updating or deleting workout" 
 */


module.exports = router;

