const express = require ("express");
const db = require("./database.js");
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();
app.use(cors())

const port = 3000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get("/", (req,res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("App is listening on port" + port);
});

//Creates Database
app.get("/db", (req,res) => {
    db.run()
    res.send("Database Online")
})


//Endpoints
require("./Routes/users.routes")(app);
require("./Routes/match.routes.js")(app);
require("./Routes/tournament.routes.js")(app);