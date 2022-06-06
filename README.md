# Powerbuilding Workout of the Day API
By: Winston Hsiao

Last Updated: June 2022

### What is powerbuilding?
Powerbuilding is a combination of two different training styles: powerlifting and bodybuilding. It uses three compound exercises — the deadlift, bench press and squat — to build strength, while bodybuilding exercises help grow muscle size and definition.

---
## About the API
- Allows users to view, create, update, and delete workouts through various endpoints
    -  Parameters such as workout id, or workout mode/type can be used to view, update or delete     specific workouts
- A UUID (universally unique identifier) is generated for each workout
- Features caching for faster load times
- **Usage & documentation info below**

---
## How to Use API
### Testing Locally
*This project uses Node.js and Express.js along with various package/dependencies please ensure that required packages are installed on your local device before proceeding*

1. Clone Repository
2. Navigate to folder in terminal
3. enter `$ npm run dev ` into terminal

You should see:
>`API is listening on port 3000`
 `Version 1 Docs are available on http://localhost:3000/api/v1/docs`

inside your terminal if everything is working correctly.

4. Once the API is running locally, open up web browser and go to [http://localhost:3000/api/v1/workouts](http://localhost:3000/api/v1/workouts)

Here you should see the workouts formatted in json, located in the local db.json folder `/src/database/db.json`

### Example Use Cases
*API utilizes http requests such as GET, POST, PATCH, DELETE, etc...*

**Retrieve all workouts (GET)**
[http://localhost:3000/api/v1/workouts](http://localhost:3000/api/v1/workouts)

**Retrieve a specific workout using a workout id (GET)**
[http://localhost:3000/api/v1/workouts/workoutid](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6) 
[http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6)

**Create a workout (POST)**
Send a post request to [http://localhost:3000/api/v1/workouts](http://localhost:3000/api/v1/workouts) with a request body containing a json object (workout info)
Below is an example of an acceptable workout in json:
> {
  "name": "Bench Day",
  "mode": "AMRAP 20",
  "equipment": [
    "rack",
    "barbell"
   ],
   "exercises": [
    "45lbs 1x8",
    "95lbs 1x8",
    "135lbs 1x8",
    "165lbs 1x5"
   ],
   "trainerTips": [
    "RPE 8"
   ]
}

**Update a workout (PATCH)**
Similar usage as when creating a workout except PATCH is used instead of POST
see `Create a workout` above for details
[http://localhost:3000/api/v1/workouts/workoutid](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6)
[http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6)

**Delete a workout (DELETE)**
Request sent with DELETE using the workout's UUID as a path
[http://localhost:3000/api/v1/workouts/workoutid](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6)
[http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6](http://localhost:3000/api/v1/workouts/33dbae02-c147-4e28-863c-db7bd472b2d6)

## Documentation
**Further documentation such as error codes/status messages for various endpoints** can be found hosted locally along with the API using middleware [swagger.io](https://swagger.io/)
You can view documentation at http://localhost:3000/api/v1/docs while the API runs locally on your device
>enter `$ npm run dev` in terminal while in the project's folder to run API locally

> `API is listening on port 3000
Version 1 Docs are available on http://localhost:3000/api/v1/docs`

should be visible in terminal when running successfully

---
## To Do
- Add further documentation for ease of use/modification
- Implement caching for other endpoints (caching is currently  only implemented with retrieving all workouts)
- Implement functionality for security/permissions
- Discuss usage of external database options such as MongoDB, etc instead of storing workout info locally in repo file
- Add more functionality regarding users/members and records (WIP)
---
## References
[REST API Design Best Practices Handbook – How to Build a REST API with JavaScript, Node.js, and Express.js](https://www.freecodecamp.org/news/rest-api-design-best-practices-build-a-rest-api/)
[API Cache](https://www.npmjs.com/package/apicache)
[Swagger.io](https://swagger.io/)