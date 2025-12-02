const app = require('./app'); // Import the app definition

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
