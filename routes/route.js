const router = require("express").Router();
const db = require("../models");
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/index.html"));
});


router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({ day: 1 })
        .then(workouts => {
            console.log(workouts);
            res.json(workouts);
        });
});


router.put("/api/workouts/:id", (req, res) => {
    var currWorkoutId = req.params.id;
    console.log(currWorkoutId);
    var newExercise = req.body;
    console.log(newExercise);
    db.Workout.findOneAndUpdate({
        _id: currWorkoutId
    }, { $push: { exercises: newExercise } }, { new: true })
        .then(update => {
            res.json(update);
        })
});

router.post("/api/workouts", (req, res) => {
    db.Workout.create({
        exercises: [req.body]
    }).then(newWorkout => {
        res.json(newWorkout);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(workouts => {
            console.log(workouts);
            res.json(workouts);
        });
});

module.exports = router;