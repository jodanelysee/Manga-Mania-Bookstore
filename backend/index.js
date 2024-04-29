const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')


//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb config
//username: main_user
//password: 6SmlX8XD4x2yHBzx


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://main_user:6SmlX8XD4x2yHBzx@bookstore.efiopqc.mongodb.net/?retryWrites=true&w=majority&appName=Bookstore";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // create a collection of documents
    const bookCollections = client.db("BookInventory").collection("books");
    const userCollections = client.db("UsersInventory").collection("users");
    const cardCollections = client.db("CardInventory").collection("cards");
    const cartCollections = client.db("CartInventory").collection("carts");
    const orderCollections = client.db("OrderInventory").collection("orders");
    const ObjectId = require('mongodb').ObjectId;

app.post("/cart", async (req, res) => {
  const data = req.body;
  const userId = data.userId;
  const bookId = data.bookId;
  try {
    // Check if the cart exists for the user
    const existingCart = await cartCollections.findOne({ user: new ObjectId(userId) });
    if (!existingCart) {
      console.log("User's cart not found.");
      return res.status(404).send("User's cart not found.");
    }
    // Check if the book ID exists in any other cart
    const bookExistsInOtherCarts = await cartCollections.findOne({
      books: new ObjectId(bookId)
    });
    if (bookExistsInOtherCarts) {
      console.log("Book already exists in another cart.");
      return res.status(400).send("Book already exists in another cart.");
    }
    // Check if the book ID is already in the user's cart
    const bookExistsInCart = existingCart.books.includes(new ObjectId(bookId));
    if (bookExistsInCart) {
      console.log("Book already exists in the user's cart.");
      return res.status(400).send("Book already exists in the user's cart.");
    }
    // Update the existing cart with the new book ID
    const updatedCart = await cartCollections.updateOne(
      { user: new ObjectId(userId) },
      { $push: { books: new ObjectId(bookId) } }
    );
    console.log("Cart updated:", updatedCart.modifiedCount);
    return res.send(updatedCart);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).send("Failed to update cart.");
  }
});

app.get("/cart/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { user: new ObjectId(id) };
  const result = await cartCollections.findOne(filter);
  
  if (result) {
    res.send(result);
  } else {
    res.status(404).send("Cart not found for the user ID.");
  }
});

app.get("/cart/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const userCart = await cartCollections.findOne({ user: new ObjectId(userId) });
    if (userCart) {
      res.send(userCart.books);
    } else {
      res.status(404).send("User's cart not found.");
    }
  } catch (error) {
    console.error("Error fetching user's cart:", error.message);
    res.status(500).send("Failed to fetch user's cart.");
  }
});

app.get("/user/:userId/credit-cards", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userCollections.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).send("User not found.");
    }
    const creditCards = user.credit_cards; // Assuming user.credit_cards is an array of card IDs
    res.send(creditCards);
  } catch (error) {
    console.error("Error fetching credit cards:", error.message);
    res.status(500).send("Failed to fetch credit cards.");
  }
});

    app.post("/:id/add-card", async (req, res) => {
      try {
        const data = req.body;
        data.user = new ObjectId(data.user);
        const result = await cardCollections.insertOne(data);
        if (!result.insertedId) {
          throw new Error("Failed to insert card");
        }
        console.log(result.insertedId);
        res.send(result);
      } catch (error) {
        console.error("Error adding card to user:", error);
        res.status(500).send({ error: "Failed to add card to user" });
      }
    });

    app.delete("/cart/:userId/:bookId", async (req, res) => {
      const userId = req.params.userId;
      const bookId = req.params.bookId;
    
      try {
        // Find the user's cart
        const existingCart = await cartCollections.findOne({ user: new ObjectId(userId) });
        if (!existingCart) {
          return res.status(404).send("User's cart not found.");
        }
        // Check if bookId exists in the user's cart document field 
        const bookExistsInCart = existingCart.books.map(String).includes(bookId);
        if (!bookExistsInCart) {
          return res.status(404).send({error:"Book not found in the user's cart."});
        }
        // Update the cart in the database
        const updatedCart = await cartCollections.updateOne(
          { user: new ObjectId(userId) },
          { $set: { books: 
            existingCart.books.filter(id => String(id) !== bookId)} }
        );
    
        res.send("Book removed from cart.");
      } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).send("Failed to remove book from cart.");
      }
    });

    app.patch("/delete-cart/:userId", async (req, res) => {
      const userId = req.params.userId;
      try {
        const existingCart = await cartCollections.findOne({user: new ObjectId(userId) });
        if (!existingCart) {
          return res.status(404).send("User's cart not found")
        }
        const updateCart = await cartCollections.updateOne({user: new ObjectId(userId)}, {$set: {books: []}})
      } catch (error) {
        console.error("Error:", error.message)
        return res.status(500).send("Failed clear cart")
      }
    })

    app.post("/place-order", async (req, res) => {
      try {
        const data = req.body;
        data.user = new ObjectId(data.user);
        data.card = new ObjectId(data.card)
        const result = await orderCollections.insertOne(data);
        console.log(result.insertedId)
        res.send(result)
      } catch (error) {
        console.error(error + "Error adding order to user")
        res.status(500).send({ error: "failed to add order to user"})
      }
    });
    
    


    app.post("/register", async (req, res) => {
      // check if email already exists
      const data = req.body;
      const existing = await userCollections.findOne({ email: data.email });
      if (existing) {
        res.status(400).send("Email already exists");
        return;
      }
      const result = await userCollections.insertOne(data);
      console.log(result)
      const cartResult = await cartCollections.insertOne({books: [], user: result.insertedId})
      res.send(result)
    })

    app.post("/login", async (req, res) => {
      const { email, password } = req.body;

      // Perform validation or authentication logic here
      // For simplicity, I'll assume you have a MongoDB collection named userCollections

      const user = await userCollections.findOne({ email, password });

      if (user) {
        // User exists and credentials are correct
        res.status(200).json({ success: true, message: "Login successful", user });
      } else {
        // User does not exist or credentials are incorrect
        res.status(401).json({ success: false, message: "Incorrect email or password" });
      }
    });

    app.get("/all-users", async (req, res) => {
      const users = userCollections.find();
      const result = await users.toArray();
      res.send(result);
    })


    // insert a book to the db: post method
    app.post("/upload-book", async (req, res) => {
      try {
      const data = req.body;
      data.user = new ObjectId(data.user);
      const result = await bookCollections.insertOne(data);
      if (!result.insertedId) {
        throw new Error("Failed to insert card");
      }
      console.log(result.insertedId);
      res.send(result)
    } catch (error) {
      console.error("error adding book to user, error")
      res.status(500).send({ error: "failed to add book to user"})
    }
  })

    // update a book : patch or update methods
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id);
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateBookData
        },
      }
      const options = { upsert: true };
      // update
      const result = await bookCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    app.patch("/card/:id", async (req, res) => {
      const id = req.params.id;
      const updateCardData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateCardData
        },
      }
      const options = { upsert: true };
      // update
      const result = await cardCollections.updateOne(filter, updateDoc, options);
      res.send(result)
    })

    //update user information : patch or update methods
    app.patch("/admin/:id", async (req, res) => {
      const id = req.params.id;
      const updateUserData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...updateUserData
        },
      }
      const options = { upsert: true };
      // update
      const result = await userCollections.updateOne(filter, updateDoc, options);
      res.send(result);
    })

    // delete a book
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      // delete
      const result = await bookCollections.deleteOne(filter, options);
      res.send(result);
    })

    // delete a card
    app.delete("/card/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      // delete
      const result = await cardCollections.deleteOne(filter, options);
      res.send(result);
    })

    // get all books from database
    // find by genre
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.userID) {
        query.user = new ObjectId(req.query.userID);
      }
      if (req.query?.genre) {
        query.genre = req.query.genre;
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    })

    //get all cards from database
    app.get("/all-cards", async (req, res) => {
      let query = {};
      if (req.query?.userID) {
        query.user = new ObjectId(req.query.userID);
      }
      const result = await cardCollections.find(query).toArray();
      res.send(result);
    })

    //get all orders from database
    app.get("/all-orders", async (req, res) => {
      let query = {};
      if (req.query?.userID) {
        query.user = new ObjectId(req.query.userID);
      }
      const result = await orderCollections.find(query).toArray();
      res.send(result)
    })

    // to get a single order
    app.get("/order/:id", async (req, res) => {
      const id = req.params.id;
      const filter = {_id: new Object(id) };
      const result = await orderCollections.findOne(filter);
      res.send(result)
    })

    // to get single book
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);
      res.send(result);
    })

    // to get single card
    app.get("/card/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cardCollections.findOne(filter);
      res.send(result);
    })

    // to get single admin
    app.get("/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await userCollections.findOne(filter);
      res.send(result);
    })

    app.get("/book-search", async (req, res) => {
      const query = req.query.search;
      const result = await bookCollections.aggregate([{
         $search: { "index": "default", "phrase": { "query": query, "path": ["title", "author", "genre"], "slop": 2 } } }]).toArray();
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})