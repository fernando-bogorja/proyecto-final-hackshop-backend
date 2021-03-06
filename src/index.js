require("dotenv").config();
const express = require("express");
const app = express();
const APP_PORT = process.env.APP_PORT;
const cors = require("cors");


app.use(express.json());
const routes = require("./routes");
const morgan = require('morgan')

app.use(morgan('dev'));
app.use(cors());
//Set up all the routes
routes(app);

//Set the port
app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
