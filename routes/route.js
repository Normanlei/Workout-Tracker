const router = require("express").Router();
const db = require("../models");


router.get("/exercise",(req,res)=>{
    res.sendFile("../public/exercise.html");
});



router.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({ day: 1 })
        .then(workouts => {
            res.json(workouts);
        });
});


router.put("/api/workouts/:id", (req, res) => {
    var currWorkoutId = req.params.id;
    var newExercise = res.body;
    db.Workout.findOneAndUpdate({
        _id: ObjectId(currWorkoutId)
    },{$push:{ exercises: newExercise}},{new:true})
    .then(update => {
        res.json(update);
    })
});

router.post("/api/workouts",(req,res)=>{
    db.Workout.create({
        exercises:[res.body]
    }).then (newWorkout=>{
        res.json(newWorkout);
    });
});

module.exports = router;