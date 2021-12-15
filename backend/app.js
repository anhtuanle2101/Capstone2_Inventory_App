"use strict";

// Express for inventory app

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventories");
const templateRoutes = require("./routes/templates");
const itemRoutes = require("./routes/items");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/inventories", inventoryRoutes);
app.use("/templates", templateRoutes);
app.use("/items", itemRoutes);




// Handle 404 errors -- this matches everything left
app.use((req, res, next)=>{
    return next(new NotFoundError());
})

// Generic error handler; anything unhandled goes here.
app.use((err, req, res, next)=>{
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status }
    })
})

module.exports = app;