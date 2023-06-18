import Application from '@ioc:Adonis/Core/Application';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Task from 'App/Models/Task';
import TaskValidator from 'App/Validators/TaskValidator';
import TaskFileValidator from '../../Validators/TaskFileValidator';
import TaskFile from 'App/Models/TaskFile';

export default class TasksController {
  public async Tasks({ params, request }: HttpContextContract) {
    const { id } = params;

    if (id) {
      const task = await Task.findOrFail(id);
      return task;
    } else {
      const page = request.input('page', 1);
      const limit = request.input('limit', 10);
      const tasks = await Task.query().paginate(page, limit);
      return tasks;
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const validatedData = await request.validate({ schema: TaskValidator.storeSchema });
    const user = auth.user!;
    const task = new Task();
    task.name = validatedData.name;
    task.description = validatedData.description;
    task.userId = user.id;

    await task.save();

    return task;
  }

  public async TaskAttachement({ params, request, response }: HttpContextContract) {
    const validatedData = await request.validate({ schema: TaskFileValidator.storeSchema });
    const attachement = validatedData.Task_Attachement;
    const taskId = params.taskId;

    if (!attachement) return response.badRequest({ message: 'Something Went Wrong' });
    await attachement.move(Application.tmpPath('Task_Attachement'));

    const task = await Task.findOrFail(taskId);

    const TaskFiles = new TaskFile();

    TaskFiles.file_name = attachement.fileName as string;
    TaskFiles.file_path = attachement.filePath as string;
    TaskFiles.file_extension = attachement.extname as string;
    TaskFiles.taskId = task.id;
    await TaskFiles.save();

    return response.created({
      message: 'File Uploaded Successfully',
    });
  }

  public async update({ params, request, response }) {
    const { id } = params;
    const data = request.only(['name', 'description']);

    const task = await Task.findOrFail(id);
    task.merge(data);
    await task.save();

    return response.json(task);
  }

  public async destroy({ params, response }) {
    const { id } = params;

    const task = await Task.findOrFail(id);
    await task.delete();

    return response.json({ message: 'Task deleted successfully' });
  }
}
