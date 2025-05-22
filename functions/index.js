//const {onRequest} = require("firebase-functions/v2/https");
//const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const stripe = require("stripe")("")

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => { response.send('hello world');})

app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
    console.log(total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd",
    });

    // OK - Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

// - Listen command
//exports.api = functions.https.onRequest(app)
app.listen(5000);

//Example endpoint
//http://127.0.0.1:5001/challenge-db720/us-central1/api