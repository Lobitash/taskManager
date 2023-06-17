import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator';
import TaskFileValidator from '../../Validators/TaskFileValidator'
import TaskFile from 'App/Models/TaskFile';

export default class TasksController {



    public async getTask({ params }: HttpContextContract) {
        const { id } = params;
    
        const task = await Task.findOrFail(id);
    
        return task;
    }

 

    public async store ({ request, auth }: HttpContextContract) {

        const validatedData = await request.validate({ schema: TaskValidator.storeSchema})
        const user = auth.user!

        const task = new Task();
        task.name = validatedData.name
        task.description= validatedData.description
         
        if (!user) {
            throw new Error('User not authenticated');
          }
        task.userId = user.id
       
        // if (auth.isLoggedIn) {
        //     await auth.user?.related('tasks')
        //   }
        await task.save();
  
         return task;
    } 

    //public Async 


    public async uploadTaskFile({ params, request , response }: HttpContextContract) {
      
      const validatedData = await request.validate({ schema: TaskFileValidator.storeSchema})
      const attachement = validatedData.Task_Attachement
      const taskId = params.taskId

      if(!attachement)return response.badRequest({ message : "Something Went Wrong"})
      await attachement.move(Application.tmpPath('Task_Attachement'))
      
      const task = await Task.findOrFail(taskId)

      const TaskFiles = new TaskFile()

      TaskFiles.file_name= attachement.fileName  as string
      TaskFiles.file_path = attachement.filePath  as string
      TaskFiles.file_extension = attachement.extname  as string
      TaskFiles.taskId = task.id
      await TaskFiles.save()
      

      return response.created({
        message: 'File Uploaded Successfully'
      })
     
  } 



    public async uploadTaskAttachment({ request }: HttpContextContract) {
        const profilePicture = request.file('profile_picture')
    
        if(profilePicture){await profilePicture.move(Application.tmpPath('uploads'))}
      } 
}
 