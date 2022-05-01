const express = require("express");
const app = express();
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
require("dotenv").config();

const userRoutes = require("./app/routes/user.routes");
const subjectRoutes = require("./app/routes/subject.routes");
const courseRoutes = require("./app/routes/course.routes");

const Role = db.role;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.mongoose
  .connect(
    process.env.MONGO_URI ||
      `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initializeRoles();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initializeRoles() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

app.get("/", (req, res) => {
  res.send("Training Management System");
});

userRoutes(app);
subjectRoutes(app);
courseRoutes(app);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
