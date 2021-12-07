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

const main = async () => {
    console.log("Hello World!")
    const db = new Database({
        url: "http://default:8529",
        databaseName: "my_database",
    })
    await connect(db)
}

main()
