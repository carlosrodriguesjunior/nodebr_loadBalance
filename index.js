const Koa = require('koa');
const app = new Koa();
const MongoClient = require('mongodb');
const router = require('koa-route');


app.use(router.get('/alive', async function (ctx) {
   ctx.body = true;
}));

app.use(router.get('/teste', async function (ctx) {

    try {
        let db = await connectMongoDB();
        let result = await getCollectionList(db);
        ctx.body = result[0];
    } catch (error) {
        ctx.body = error;
    }

}));


app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})


let connectMongoDB = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://user:teste123@ds155490.mlab.com:55490/demo', (err, db) => {
            if (err) reject(err)
            resolve(db)

        })
    })
}

let getCollectionList = (db) => {
    return new Promise((resolve, reject) => {
        db.collection('teste').find().toArray((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}