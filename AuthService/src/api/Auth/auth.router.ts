import * as express from 'express'
import { validationResult } from 'express-validator'
import authService from './auth.service'
import authValidation from './auth.validation'

const authRouter = express.Router()

authRouter
  .route('/')
  .get((req, res, next) => {
    try {
      const user = authService.check(req)
      res.json(user)
    } catch (error) {
      next(error)
    }
  })
  .post(
    authValidation.signUp,
    (req, res, next) => {
      const errors = validationResult(req).array()
      if (errors.length) {
        next(errors)
        return
      }
      authService.signUp(req).then(data => res.json(data)).catch(err => next(err))
    })
  .delete((req, res, next) => {
    try {
      authService.singOut(req)
      res.clearCookie('libraryAuth')
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })

authRouter
  .route('/signin')
  .post(authValidation.signIn, (req, res, next) => {
    const errors = validationResult(req).array()
    if (errors.length) {
      next(errors)
      return
    }
    authService.signIn(req).then(data => res.json(data)).catch(err => next(err))
  })

export default authRouter
