import { Database, aql } from "arangojs";

const connect = async (db) => {
    const now = Date.now()
    try {
        const cursor = await db.query(aql`
            RETURN${now}
        `)
        const result = await cursor.next()
    } catch (err) {
        console.log(err)
    }
}

const migrate = async (dbName, collectionName) => {
    try {
        await db.createDatabase(dbName)
        await db.createCollection(collectionName)
    } catch(err) {
        console.log(`Failed to recreate database '${dbName}'.`)
    }
}

console.log('Starting demo!')
const dbName = 'kitchen'
const collectionName = 'recipies'

const db = new Database({url: 'http://db:8529'})
migrate(dbName, collectionName)
db.database(dbName)
db.coll
await connect(db)
