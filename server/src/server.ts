require("dotenv").config();

import routes from "./routes";

const express = require("express")
const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(routes)

app.listen(PORT, ()=>{
  console.log(`Server running in localhost:${PORT}`);
})

