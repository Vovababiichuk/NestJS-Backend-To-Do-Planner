import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';
export declare class TasksService {
    private taskModel;
    private readonly logger;
    constructor(taskModel: Model<TaskDocument>);
    getAll(): Promise<Task[]>;
    getById(id: string): Promise<Task>;
    create(taskDto: CreateTaskDto): Promise<Task>;
    remove(id: string): Promise<Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    updateTask(id: string, toggleTaskDone: UpdateTaskDto): Promise<Task>;
}
