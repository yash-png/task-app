 const express = require('express');
 const router = new express.Router();
 const Task = require('../models/task');
 const auth = require('../middleware/auth');

 router.post('/tasks', auth, async(req, res) => {
     //  const task = new Task(req.body);
     const task = new Task({
         ...req.body,
         Owner: req.user._id
     });

     try {
         const task1 = await task.save();
         res.status(200).send(task1);
         //  console.log(task1);
     } catch (error) {
         res.status(500).send(error);
         console.log(error);
     }
     // task.save().then(() => {
     //     res.send(task);
     // }).catch(err =>  {
     //     res.status(400).send(err);
     // });
 });
 //  pagination:
 // setting limit the no of results of any given requests.
 //  limit = value  and skip = skips the as much of value initilised.
 //  GET/tasks?limit=10&skip=0
 // GET/tasks?sortBy=createdAt:asc or desc
 router.get('/tasks', auth, async(req, res) => {
     //  req.query.completed
     const match = {};
     const sort = {}
     if (req.query.completed) {
         match.completed = req.query.completed === 'true';
     }
     if (req.query.sortBy) {
         const parts = req.query.sortBy.split(':');
         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
     }
     try {
         await req.user.populate({
             path: 'tasks',
             match,
             options: {
                 limit: parseInt(req.query.limit),
                 skip: parseInt(req.query.skip),
                 sort
                 //ascending=1 and descending=-1

             }
         }).execPopulate();
         res.status(200).send(req.user.tasks);
         console.log(req.user.tasks);
     } catch (e) {
         res.status(404).send(e);

     }
     // Task.find({}).then((tasks) => {
     //     res.send(tasks);;
     // }).catch((e) => {
     //     res.status(500).send(e);
     // });
 });

 router.get('/tasks/:id', auth, async(req, res) => {
     const _id = req.params.id;

     try {
         const tasks = await Task.findOne({ _id, owner: req.user._id });
         if (!tasks) {
             return res.status(404).send();
         }
         res.status(200).send();

     } catch (e) {
         res.status(500).send(e);
         console.log(e);
     }
     // Task.findById(_id).then((tasks) => {
     //     if (!tasks) {
     //         return res.send("There is no any task! please add task first");
     //     }
     //     res.send(tasks);
     // }).catch((err) => {
     //     res.send(err);
     // });
 });
 router.patch('/tasks/:id', auth, async(req, res) => {
     const updates = Object.keys(req.body);
     const allowedUpdates = ['description', 'completed'];
     const validOperation = updates.every((update) => allowedUpdates.includes(update));
     if (!validOperation) {
         res.status(404).send('Error : Invalid Updates! ');
     }
     try {
         //  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
         const task = await Task.findOne({
                 _id: req.params.id,
                 owner: req.user._id
             })
             //  updates.forEach(updates => task[update] = req.body[update]);
         await task.save();
         if (!task)
             res.status(404).send();
         res.status(200).send(task);
     } catch (e) {
         res.status(400).send(e);
     }
 })

 router.delete('/tasks/:id', auth, async(req, res) => {
     try {
         const task = await Task.findOneAndDelete({
             _id: req.params.id,
             owner: req.user.id
         });
         console.log(task);
         if (!task) {
             res.status(404).send();
         }
         res.status(200).send();
     } catch (e) {
         res.status(500).send(e);
     }
 });

 module.exports = router;