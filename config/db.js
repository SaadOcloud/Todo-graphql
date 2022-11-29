const {Sequelize}= require('sequelize');
const connectionString = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username : process.env.DB_USER,
  database : process.env.DB_NAME,
  password : process.env.DB_PASSWORD,
});


const connectDB = async () => {
try {
  await connectionString.authenticate();
  console.log("Database Connected");
} catch (error) {
  console.log(error);
}
};

module.exports = {connectDB, connectionString};
