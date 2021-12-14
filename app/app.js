import { Database, aql } from "arangojs";

/*//////////////////////////////////////////////////////////////////////////////////
Example migration
const migrate = async () => {
    try {
        await db.createDatabase('social')
        await db.createEdgeCollection('friendships')
        await db.createCollection('people')
        await db.createGraph('graph', {
            collection : 'friendships',
            from : 'people',
            to : 'people'
        })
    } catch(err) {
        console.log('Failed to recreate database.')
        console.log(err)
    }
}
//////////////////////////////////////////////////////////////////////////////////*/

const connect = async (db) => {
    try {
        const people = await db.query(aql`
            FOR person IN people
                RETURN person
        `)
        console.log('PEOPLE')
        people.forEach((s) => {console.log(s)})
        const relations = await db.query(aql`
            FOR friendship IN friendships 
                RETURN friendship 
        `)
        console.log('RELATIONS')
        relations.forEach((s) => {console.log(s)})
        const graph = await db.query(aql`
            FOR vertex IN OUTBOUND "people/Arthur" GRAPH "network"
                RETURN vertex
        `)
        console.log('GRAPH TRAVERSAL from Arthur')
        graph.forEach((s) => {console.log(s)})
    } catch (err) {
        console.log(err)
    }
}

console.log('Starting demo!')
let db = new Database({url: 'http://db:8529'})
db = db.database('social')

console.log(`
Edges collections:
    ${await db.graph('network').listEdgeCollections()}
Vertices collections:
    ${await db.graph('network').listVertexCollections()}
`)

await connect(db)
