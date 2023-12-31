import { BcryptAdapter } from './bcrypt-adapter'

import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => {
  return {
    async hash (): Promise<string> {
      return await new Promise((resolve) => { resolve('hashed_value') })
    }
  }
})

const makeSut = (salt: number): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const salt = 12
    const sut = makeSut(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throws if encrypt returns throws', async () => {
    const salt = 12
    const sut = makeSut(salt)
    jest.spyOn(sut, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
