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
        return this.taskModel.find().exec();
    }
    async getById(id) {
        return this.taskModel.findById(id);
    }
    async create(taskDto) {
        this.logger.log('testBack - create', taskDto);
        const newTask = new this.taskModel(taskDto);
        return newTask.save();
    }
    async remove(id) {
        return this.taskModel.findByIdAndDelete(id);
    }
    async update(id, updateTaskDto) {
        console.log('testBack - update', id, updateTaskDto);
        this.logger.log('testBack - update', id, updateTaskDto);
        return this.taskModel.findOneAndUpdate({ _id: id }, { $set: updateTaskDto }, { new: true });
    }
    async updateTask(id, toggleTaskDone) {
        console.log('testBack - updateTask', id, toggleTaskDone);
        return this.taskModel.findOneAndUpdate({ _id: id }, { $set: toggleTaskDone }, { new: true });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map