const express = require("express");
const Books = require("./models/books");
const User = require("./models/user");
const cors = require("cors");
const app = express();
const sequelize = require("./util/db");
const libraryRoutes = require("./routes/libraryBooks");

app.use(cors());

app.use(express.json());

// Books.belongsTo(User);
// User.hasMany(Books);

app.use(libraryRoutes);

sequelize
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((student) => {
    if (!student) {
        return User.create({ name: "Max", email: "user1@test.com" });
    }
  })
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.error("Unable to sync database:", error);
    process.exit(1);
  });
