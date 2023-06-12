import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {

    //Get a user by Id
    public async show({ params }: HttpContextContract) {
        const { id } = params;
    
        const user = await User.findOrFail(id);
    
        return user;
    }

    //Saving a User in DataBase

    public async store ({ request }: HttpContextContract) {
        const validatedData= await request.validate({schema : UserValidator.registerSchema})

        //const { name, email, password } = request.only(['name', 'email', 'password']);

        const user = new User();
        user.name = validatedData.name;
        user.email = validatedData.email;
        user.password = validatedData.password;
  
    
        await user.save();
  
         return user;
    }    

    // Update a user
    
    public async update({ params, request }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        user.name = request.input('name', user.name)
        user.email = request.input('email', user.email)
        user.password = request.input('password', user.password)

        await user.save()

         return user
    }

    // Delete a user
    
    public async destroy({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        await user.delete()

        return { message: 'User deleted successfully' }
    }


} 
