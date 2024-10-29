import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks;
  }

  async getById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    return task;
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({
      ...taskDto,
      createdDate: new Date(),
      updatedDate: new Date(),
    });
    const savedTask = await newTask.save();
    return savedTask;
  }

  async remove(id: string): Promise<Task> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    return deletedTask;
  }

  async updateFull(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      { $set: { ...updateTaskDto, updatedDate: new Date() } },
      { new: true },
    );
    return updatedTask;
  }

  async patchTask(id: string, toggleTaskDone: UpdateTaskDto): Promise<Task> {
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { $set: { ...toggleTaskDone, updatedDate: new Date() } },
      { new: true },
    );
    return updatedTask;
  }
}
