const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts;
    if (filterParams.mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    else if (filterParams.equipment) {
      return DB.workouts.filter((workout) =>
        workout.equipment.toLowerCase().includes(filterParams.equipment)
      );
    }
    // other if staetements for other paramters can go here
    return workouts;
  } catch (error) {
    throw { status: 500, message: `Invalid or unsupported query parameter` };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 600,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 600,
        message: `Can't find workout with the given id '${workoutId}'`,
      };
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

/** Documentation using swagger
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 33dbae02-c147-4e28-863c-db7bd472b2d6
 *         name: 
 *           type: string
 *           example: Winston H  
 *         mode:
 *           type: string
 *           example: push
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "dumbbells"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Barbell Bench Press (5x5)", "Dumbbell Shoudler Press (3x8)", "Dumbbell Lateral Raise (3x10)"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Bench working sets: 75-80% 1rep max weight", "2 minute rest between bench sets", "1 min rest between accessory sets"]
 */

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};