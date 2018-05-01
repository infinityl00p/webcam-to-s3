const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const keys = require('../config/keys');

require('./models/Images');
mongoose.connect(keys.mongoURI);

app.use(cors());
require('./routes/uploadRoutes')(app);
require('./routes/imageRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('listening on port 5000'));