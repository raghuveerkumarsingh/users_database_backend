const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const swaggerConfig = require('./swagger');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', userRoutes);
app.use('/api-docs', swaggerConfig.serve, swaggerConfig.setup);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
