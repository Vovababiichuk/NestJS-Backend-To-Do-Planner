import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAll(): Promise<Task[]>;
    getOne(id: string): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    remove(id: string): Promise<Task>;
    update(updateTaskDto: UpdateTaskDto, id: string): Promise<Task>;
    updateTask(toggleTaskDone: UpdateTaskDto, id: string): Promise<Task>;
}
