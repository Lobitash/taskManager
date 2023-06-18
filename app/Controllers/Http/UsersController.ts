import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import User from 'App/Models/User'
import profilePictureValidator from '../../Validators/profilePictureValidation'
import ProfilePicture from '../../Models/ProfilePicture'
import fs from 'fs'
//import Drive from '@ioc:Adonis/Core/Drive';

export default class UsersController {
  public async users({ params, request }: HttpContextContract) {
    const { id } = params

    let query = User.query().select('name', 'id', 'photo_path', 'created_at')

    if (id) {
      const user = await query.where('id', id).firstOrFail()
      return user
    } else {
      //const users = await query;
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)

      const users = await query.paginate(page, limit)
      return users
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['name', 'email', 'password', 'role_id'])
    user.merge(data)

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return { message: 'User deleted successfully' }
  }

  public async uploadProfilePicture({ auth, request, response }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: profilePictureValidator.storeSchema,
    })
    const file = validatedData.Profile_Picture
    const user = auth.user!

    if (!file) return response.badRequest({ message: 'Something Wenr Wrong' })
    await file.move(Application.tmpPath('profile_picture'))

    const profilePicture = new ProfilePicture()

    profilePicture.file_name = file.fileName as string
    profilePicture.file_path = file.filePath as string
    profilePicture.file_extension = file.extname as string
    profilePicture.userId = user.id
    await profilePicture.save()

    return response.created({
      message: 'File Uploaded Successfully',
    })
  }

  public async downloadPicture({ params, response }: HttpContextContract) {
    const { userId } = params
    const user = await User.query().where('id', userId).first()
    if (!user) {
      return response.status(404).send('User not found')
    }
    try {
      const profilePicture = await ProfilePicture.findBy('user_id', userId)
      // console.log(profilePicture)
      if (!profilePicture) {
        return response.status(404).send('Photo metadata not found')
      }

      // Get the file path or filename from the photo metadata
      const filePath = profilePicture.file_path // Replace 'filePath' with the actual field name in your table

      // Check if the file exists
      const fileExists = fs.existsSync(filePath)
      if (!fileExists) {
        return response.status(404).send('File not found')
      }

      const fileStream = fs.createReadStream(filePath)
      //const fileStream = await Drive.getStream(filePath);
      console.log(filePath)

      // Set the appropriate headers for file download
      response.header('Content-Disposition', `attachment; filename="${filePath}"`)
      response.header('Content-Type', 'application/octet-stream')

      // Pipe the file stream to the response
      response.stream(fileStream)
    } catch (error) {
      return response.status(404).send('User not found')
    }
  }
}
