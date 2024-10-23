import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAll(): Promise<Task[]> {
    this.logger.log('Fetching all tasks');
    const tasks = await this.taskModel.find().exec();
    this.logger.log(`Fetched ${tasks.length} tasks`);
    return tasks;
  }

  async getById(id: string): Promise<Task> {
    this.logger.log(`Fetching task by id: ${id}`);
    const task = await this.taskModel.findById(id);
    if (!task) {
      this.logger.warn(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    this.logger.log(`Creating a new task: ${JSON.stringify(taskDto)}`);
    const newTask = new this.taskModel(taskDto);
    const savedTask = await newTask.save();
    this.logger.log(`Task created with id: ${savedTask._id}`);
    return savedTask;
  }

  async remove(id: string): Promise<Task> {
    this.logger.log(`Removing task with id: ${id}`);
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if (deletedTask) {
      this.logger.log(`Task with id ${id} deleted`);
    } else {
      this.logger.warn(`Task with id ${id} not found for deletion`);
    }
    return deletedTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.logger.log(`Updating task with id: ${id} with data: ${JSON.stringify(updateTaskDto)}`);
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
    if (updatedTask) {
      this.logger.log(`Task with id ${id} updated successfully`);
    } else {
      this.logger.warn(`Task with id ${id} not found for update`);
    }
    return updatedTask;
  }

  async updateTask(id: string, toggleTaskDone: UpdateTaskDto): Promise<Task> {
    this.logger.log(`Updating task with id: ${id} with data: ${JSON.stringify(toggleTaskDone)}`);
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: id },
      { $set: toggleTaskDone },
      { new: true },
    );
    if (updatedTask) {
      this.logger.log(`Task with id ${id} updated successfully`);
    } else {
      this.logger.warn(`Task with id ${id} not found for update`);
    }
    return updatedTask;
  }
}
