const TaskSchema = require('../models/task.model'); 
const Utils = require('../utils');

exports.addTask = async (req, res) => {
    try {
        if (!req.body.task_name || !req.body.plan_id || !req.body.date)
            throw { message: 'please send required data' };
        req.body.task_name = req.body.task_name.toLowerCase();
        req.body.date = new Date(req.body.date);
        let isTask = await TaskSchema.findOne({ plan_id: req.body.plan_id, task_name: req.body.task_name });
        if (isTask)
            throw { message: 'this task already present' };
        let newTask = new TaskSchema(req.body);
        await newTask.save();
        return Utils.sendSuccessResponse(req, res, 200, { message: "successfully created", success: true, data: newTask });
    }
    catch (e) {
        return Utils.sendErrorResponse(req, res, 400, {message : e.message, success : false});
    }
}

exports.getTask = async (req, res) => {
    try {
        let { plan_id } = req.params;
        const tasks = await TaskSchema.find({ plan_id });
        return Utils.sendSuccessResponse(req, res, 200, { data: tasks, success: true });

    }
    catch (e) {
        return Utils.sendErrorResponse(req, res, 400, { message : e.message , success : false})
    }
}