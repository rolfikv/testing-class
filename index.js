import express from 'express';
import userRoutes from './routes/users.js';

const app = express();
const port = 3500;



app.use(express.json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});