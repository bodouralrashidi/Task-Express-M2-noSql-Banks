let accounts = require('./accounts');
const express = require('express');
const connectDb = require('./db/connections');



const accountsRoutes = require('./api/accounts/accounts.routes');
connectDb();
const app = express();
app.use(express.json());
app.use('/api/accounts', accountsRoutes);

app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});
