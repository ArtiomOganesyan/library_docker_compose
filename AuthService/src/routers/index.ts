import * as express from 'express'
import authRouter from '../api/Auth/auth.router'
import Middleware from '../types/middleware.type'

const routers:[string, ...Middleware[], express.Router][] = [['/auth', authRouter]]

export const setRouters = (app:express.Express):express.Express => {
  const prefix = '/api'

  routers.forEach(([routerPath, router]) => {
    app.use(prefix + routerPath, router)
  })

  return app
}
