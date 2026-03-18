require("dotenv").config();
const app = require("./app");
const sequelize = require("./utils/db");
require("./models/User");
require("./models/Task");

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log("DB Connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error("DB connection error:", err));