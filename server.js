const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
//const app = require("./app");
const express = require("express");
const app = express();
const config = require("./config/var");
const {
  app: { port },
} = config;
const debug = require("debug")("node-angular");
const {
  db: { host, username, password, name },
} = config;
const routes = require("./routes/index");


// const onError = (error) => {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privilages");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// };

// const onListening = () => {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
//   debug("Listening on " + bind);
// };

// app.set("port", port);
// const server = http.createServer(app);
// server.on("error", onError);
// server.on("listening", onListening);
// server.listen(port);

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
const PORT = process.env.PORT || 8080;
mongoose
    .connect(`mongodb+srv://ronak8532:Mahadev@123@cluster0.7q6p6.mongodb.net/dashboard`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to database!");
        // set port, listen for requests
        
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    });

    app.use(cors());

    app.use((req, res, next) => {
        console.log(req);
        console.log("res", res);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
        next();
    });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require('./routes/index')(app);


