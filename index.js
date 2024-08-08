import express from 'express';

const app = express();
const port = 3500;

const userRoutes = require('./routes/users');

app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});