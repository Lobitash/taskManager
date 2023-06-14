import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
//import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {


    public async getUsers({ params }: HttpContextContract) {
        const { id } = params;
      
        let query = User.query().select('name', 'id', 'photo_path', 'created_at');
      
        if (id) {
          const user = await query.where('id', id).firstOrFail();
          return user;
        } else {
          const users = await query;
          return users;
        }
      }


    //Saving a User in DataBase
    //I added this to auth (Don't need it anymore )

    // public async store ({ request }: HttpContextContract) {
    //     const validatedData= await request.validate({schema : UserValidator.registerSchema})

    //     //const { name, email, password } = request.only(['name', 'email', 'password']);

    //     const user = new User();
    //     user.name = validatedData.name;
    //     user.email = validatedData.email;
    //     user.password = validatedData.password;
  
    
    //     await user.save();
  
    //      return user;
    // }    

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
