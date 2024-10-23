"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./schemas/task.schema");
let TasksService = TasksService_1 = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async getAll() {
        this.logger.log('Fetching all tasks');
        const tasks = await this.taskModel.find().exec();
        this.logger.log(`Fetched ${tasks.length} tasks`);
        return tasks;
    }
    async getById(id) {
        this.logger.log(`Fetching task by id: ${id}`);
        const task = await this.taskModel.findById(id);
        if (!task) {
            this.logger.warn(`Task with id ${id} not found`);
        }
        return task;
    }
    async create(taskDto) {
        this.logger.log(`Creating a new task: ${JSON.stringify(taskDto)}`);
        const newTask = new this.taskModel({
            ...taskDto,
            createdDate: new Date(),
            updatedDate: new Date(),
        });
        const savedTask = await newTask.save();
        this.logger.log(`Task created with id: ${savedTask._id}`);
        return savedTask;
    }
    async remove(id) {
        this.logger.log(`Removing task with id: ${id}`);
        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        if (deletedTask) {
            this.logger.log(`Task with id ${id} deleted`);
        }
        else {
            this.logger.warn(`Task with id ${id} not found for deletion`);
        }
        return deletedTask;
    }
    async update(id, updateTaskDto) {
        this.logger.log(`Updating task with id: ${id} with data: ${JSON.stringify(updateTaskDto)}`);
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, { $set: { ...updateTaskDto, updatedDate: new Date() } }, { new: true });
        if (updatedTask) {
            this.logger.log(`Task with id ${id} updated successfully`);
        }
        else {
            this.logger.warn(`Task with id ${id} not found for update`);
        }
        return updatedTask;
    }
    async updateTask(id, toggleTaskDone) {
        this.logger.log(`Updating task with id: ${id} with data: ${JSON.stringify(toggleTaskDone)}`);
        const updatedTask = await this.taskModel.findOneAndUpdate({ _id: id }, { $set: { ...toggleTaskDone, updatedDate: new Date() } }, { new: true });
        if (updatedTask) {
            this.logger.log(`Task with id ${id} updated successfully`);
        }
        else {
            this.logger.warn(`Task with id ${id} not found for update`);
        }
        return updatedTask;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map