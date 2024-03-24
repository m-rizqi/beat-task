const config =  require('./config/config.js');

const app = require('./app');

console.log(`Environment = ${config.NODE_ENV}`);

const PORT = config.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${config.HOST}:${PORT}`);
});