import { checkSchema } from 'express-validator'

const authValidation = {
  signUp: checkSchema({
    username: {
      in: 'body',
      errorMessage: 'username should be a string',
      isString: true
    },
    password: {
      in: 'body',
      errorMessage: 'Year should be numeric',
      isInt: true
    }
  }),
  signIn: checkSchema({
    username: {
      in: 'body',
      errorMessage: 'username should be a string',
      isString: true
    },
    password: {
      in: 'body',
      errorMessage: 'password should be numeric',
      isInt: true
    }
  })
}

export default authValidation
