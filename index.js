const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/EMC").then((res) => { console.log("Database Connected") }).catch((err) => {
    console.log("connection failed")
})

const productSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        image_path: String
    }
)

const Product = mongoose.model("products", productSchema)

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        address: String,
        phone_number: String,
        product_id: [String],
        isAdmin: Boolean
    }
)

const User = mongoose.model('users', userSchema)

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.send({ message: "Welcome to Backend" })
})

app.post("/save-product", (req, res) => {
    console.log(req.body)

    var newProduct = new Product(
        {
            title: req.body.title,
            description: req.body.desc,
            price: req.body.price,
            image_path: req.body.imagePath
        }
    )

    newProduct.save()
    console.log("Product Saved")
    res.send({ message: "Product Saved Successfully" })
})

app.get("/show-products", (req, res) => {
    Product.find().then((response) => {
        res.send(response)
    })
})

app.post('/register', (req, res) => {
    console.log(req.body)
    const newUser = new User(
        {
            name: req.body.userName,
            email: req.body.email,
            address: req.body.address,
            phone_number: req.body.phoneNumber,
            product_id: [],
            isAdmin: false
        }
    )
    newUser.save()
    console.log("Register Successfully...!");
    res.send({ message: "Register Successfully...!" })
})

app.post('/user-check', (req, res) => {
    console.log(req.body)
    User.findOne({
        email: req.body.email
    }).then((response) => {
        res.send({ message: "Login True...!" })
    }).catch((err) => {
        res.send({ message: "Login failed...!" })
    })

})

app.listen(8000, (err) => console.log("Server is Running...."))