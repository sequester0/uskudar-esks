const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

app.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});