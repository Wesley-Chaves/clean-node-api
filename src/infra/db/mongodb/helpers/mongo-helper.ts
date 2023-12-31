import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {})
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...obj } = collection
    return Object.assign({}, { id: _id }, obj)
  }
}
