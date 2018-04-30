const express = require('express');
const app = express();

require('./routes/uploadRoutes')(app);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('I hear you');
})

app.listen(PORT, console.log('listening on port 5000'));