import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator';


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

}
 