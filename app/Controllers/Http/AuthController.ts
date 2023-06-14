import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'


export default class AuthController {

    public async register( {request , auth} : HttpContextContract){
        const validatedData = await request.validate({ schema : UserValidator.registerSchema })

        const user = await User.create(validatedData) 
        await auth.login(user)

        return "User is registered successfully"
    }


    public async login({request , auth } : HttpContextContract){
        const { email, password } = request.only(['email', 'password'])


        try{ 
         const token= await auth.use ('api').attempt(email , password, {
            expiresIn: '7 days'
          })
         return token.toJSON()

        } catch(error) { 
            return error
        }

        


        //In case above didn't work

        // try { 
        //     await auth.attempt(email , password)
        // } catch (_error){
        //     //return 'Email or password is incorrect'
        // }

        // return "logged in Successfully"
    }

    public async logout({auth}: HttpContextContract){
        await auth.logout()
        return "You Logged Out of your Account"
    }

}
 