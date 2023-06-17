import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import profilePictureValidator from '../../Validators/profilePictureValidation';
//import UserValidator from 'App/Validators/UserValidator';
import ProfilePicture from '../../Models/ProfilePicture';
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


    public async uploadProfilePicture({ auth, request , response }: HttpContextContract) {
      
      const validatedData = await request.validate({ schema: profilePictureValidator.storeSchema})
      const file = validatedData.Profile_Picture
      const user = auth.user!

      if(!file)return response.badRequest({ message : "Something Wenr Wrong"})
      await file.move(Application.tmpPath('profile_picture'))
      
      const profilePicture = new ProfilePicture()

      profilePicture.file_name= file.fileName  as string
      profilePicture.file_path = file.filePath  as string
      profilePicture.file_extension = file.extname  as string
      profilePicture.userId = user.id
      await profilePicture.save()


      return response.created({
        message: 'File Uploaded Successfully'
      })
     
  } 




    
  public async downloadProfilePicture({ params, response }: HttpContextContract) {
    const { userId } = params
    const user = await User.findOrFail(userId)

    const filePath = Application.tmpPath(`uploads/profiles/profile_picture.jpg`)

    return response.attachment(filePath, user.profilePictureFileName)
  }


} 
