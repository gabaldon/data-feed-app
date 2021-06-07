import { MongoManager } from './database'
import { createServer } from './server'

async function main () {
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const server = await createServer(db)

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
