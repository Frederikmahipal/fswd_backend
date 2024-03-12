import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import errorHandler from './middleware/error_handler.js';
import userRoutes from './routes/user_routes.js';
import compayRoutes from './routes/company_routes.js';

const app = express();
const port = 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/users', userRoutes);
app.use('/companies', compayRoutes);

app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

export default app;