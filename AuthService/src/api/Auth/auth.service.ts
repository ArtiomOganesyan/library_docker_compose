import * as bcrypt from 'bcrypt'
import connection from '../../db/sequelize/sequelize'
import ServiceFactory from '../../utils/ServiceFactory'
import { User as UserModel } from '../../db/models/user'

const { User } = connection

class AuthService extends ServiceFactory<UserModel> {
  check (req) {
    return req.session?.user || null
  }

  async signUp (req) {
    const { password, username } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = (await this.create({
      username, password: hashedPassword
    })).get()
    delete user.password
    delete user.createdAt
    delete user.updatedAt
    req.session.user = user
    return user
  }

  async signIn (req) {
    const { password, username } = req.body
    const user = await User.findOne({ where: { username }, attributes: ['id', 'username', 'password'], raw: true })
    if (!user) {
      return { msg: 'Try again' }
    }
    const isUser = await bcrypt.compare(password, user.password)
    if (isUser) {
      delete user.password
      req.session.user = user
      return user
    }
    return { msg: 'Try again' }
  }

  singOut (req) {
    req.session.destroy()
  }
}

export default new AuthService(User)
