import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import TaskValidator from 'App/Validators/TaskValidator';


export default class TasksController {



    public async showTask({ params }: HttpContextContract) {
        const { id } = params;
    
        const task = await Task.findOrFail(id);
    
        return task;
    }



    public async store ({ request }: HttpContextContract) {

        const validatedData = await request.validate({ schema: TaskValidator.storeSchema})
       
        const task = new Task();
        task.name = validatedData.name
        task.description= validatedData.description
        //task.id=validatedData.userId
       
        await task.save();
  
         return task;
    } 

}
 