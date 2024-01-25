require("dotenv").config();

import routes from "./routes";

const cors = require("cors");
const express = require("express")
const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(PORT, ()=>{
  console.log(`Server running in localhost:${PORT}`);
})

