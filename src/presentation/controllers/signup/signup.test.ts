import { EmailValidator, SignUpController } from './signup'
import { serverError } from '../../helpers/http-helper'

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

const makeEmailValidatorStub = (): EmailValidator => {
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: SignUpController
  emailValidatorAdapter: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorAdapter = makeEmailValidatorStub()
  const sut = new SignUpController(emailValidatorAdapter)

  return {
    sut,
    emailValidatorAdapter
  }
}

describe('SignUpController', () => {
  test('Should returns error with status code if no name is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('Should returns error with status code 400 if no email is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })

  test('Should returns error with status code 400 if no password is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: password'))
  })

  test('Should returns error with status code 400 if no passwordConfirmation is provided', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: passwordConfirmation'))
  })

  test('Should returns error with status code 400 if no passwordConfirmation match with password', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid param: passwordConfirmation'))
  })

  test('Should returns error with status code 400 if email is invalid', () => {
    const { sut, emailValidatorAdapter } = makeSut()

    jest.spyOn(emailValidatorAdapter, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@mail',
        password: 'correct_password',
        passwordConfirmation: 'correct_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Invalid param: email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorAdapter } = makeSut()

    const isValidSpy = jest.spyOn(emailValidatorAdapter, 'isValid')

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail',
        password: 'correct_password',
        passwordConfirmation: 'correct_password'
      }
    }

    sut.handle(httpRequest)

    const { email } = httpRequest.body
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }

    const emailValidatorStub = new EmailValidatorStub()

    const sut = new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'correct_email@mail',
        password: 'correct_password',
        passwordConfirmation: 'correct_password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(serverError())
  })
})
