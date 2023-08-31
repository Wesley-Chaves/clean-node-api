import { AddAccount, AddAccountModel, AccountModel, Encrypter } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor (encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const { name, email, password } = account

    await this.encrypter.encrypt(password)

    const dataAccount = { id: 'id_value', name, email, password }
    return await new Promise((resolve) => { resolve(dataAccount) })
  }
}
