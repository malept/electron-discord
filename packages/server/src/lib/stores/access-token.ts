import * as express from 'express'
import * as uuid from 'uuid'
import { AccessToken } from '../../entities/access-token'

export class AccessTokenStore {
  public async createAccessToken(req: express.Request) {
    const { name, user_id } = req.body

    if (!name || !user_id) {
      return {
        status: 400,
        message: 'Some data is missing',
      }
    }

    const token = AccessToken.create({
      name: name,
      user_id: user_id,
      token: uuid.v4(),
    })

    await token.save()

    return token
  }

  public async validateToken(token: string) {
    const found = await AccessToken.findOne({ where: { token: token } })

    if (!found) {
      return false
    }

    return true
  }
}
