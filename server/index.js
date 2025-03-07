import express from 'express';
import cors  from 'cors'; 
import dotenv  from 'dotenv'; 
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const uri = process.env.DATABASE_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const stacksCollection = client.db("filterTest").collection("stack_items");

    app.get('/api/items',async(req,res)=>{
      const {search,category,sort} =req.query;
      let query={};
      let sortOption={};

      if(search){
        query.name = { $regex: search, $options: "i"}
      }
      if(category && category!== "all"){
        query.category = category;
      }
      if(sort ==="asc"){
        sortOption.name = 1;
      }else if (sort ==='desc'){
        sortOption.name = -1;
      }

      const result = await stacksCollection.find(query).sort(sortOption).toArray();
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})