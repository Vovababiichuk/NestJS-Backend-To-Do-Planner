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
    return this.taskModel.find().exec();
  }

  async getById(id: string): Promise<Task> {
    return this.taskModel.findById(id);
  }

  async create(taskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(taskDto);
    return newTask.save();
  }

  async remove(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  // async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
  //   return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
  //     new: true,
  //   });
  // }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    console.log('testBack - update', id, updateTaskDto)
    // Замість findByIdAndUpdate використовуємо findOneAndUpdate з $set
    // для часткового оновлення документа
    return this.taskModel.findOneAndUpdate(
      { _id: id }, // Знаходимо документ за _id
      { $set: updateTaskDto }, // Оновлюємо лише вказані поля
      { new: true }, // Повертаємо оновлений документ
    );
  }

  // async updateTask(id: string, toggleTaskDone: UpdateTaskDto): Promise<Task> {
  //   return await this.taskModel.findByIdAndUpdate(id, toggleTaskDone, {
  //     new: true,
  //   });
  // }

  async updateTask(id: string, toggleTaskDone: UpdateTaskDto): Promise<Task> {
    console.log('testBack - updateTask', id, toggleTaskDone)
    // Замість findByIdAndUpdate використовуємо findOneAndUpdate з $set
    // для часткового оновлення документа
    return this.taskModel.findOneAndUpdate(
      { _id: id }, // Знаходимо документ за _id
      { $set: toggleTaskDone }, // Оновлюємо лише вказані поля
      { new: true }, // Повертаємо оновлений документ
    );
  }
}
