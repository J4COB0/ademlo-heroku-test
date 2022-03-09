const { app } = require("./app");

// Utils
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

sequelize
  .authenticate()
  .then(() => console.log("Database authenticate"))
  .catch((err) => console.log(err));

//Models relations
initModels();

// syncronized the moldels if it doesn't exits sequelize will create a new model
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running ON PORT: ${PORT}`);
});