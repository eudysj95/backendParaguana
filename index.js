const { conectionDb } = require("./database/paraguanaDB");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/user")

const app = express();
const port = 3900;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use("/api", routes);

app.get("/prueba", (req, res) => {
    return res.status(200).send({
        message: "Prueba de backend"
    })
})

app.listen(port, ()=> {
    conectionDb();
    console.log("servidor escuchando en el puerto: "+ port);
})