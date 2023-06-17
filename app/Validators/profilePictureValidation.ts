
import { schema } from '@ioc:Adonis/Core/Validator'

export default class profilePictureValidator {
  public static storeSchema = schema.create({
    Profile_Picture: schema.file({
      size: '2mb',
      extnames: ['jpg', 'gif', 'png', 'txt'],
    }),
  })
}