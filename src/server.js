const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

const allowedOrigin = 'http://localhost:3000'; 
app.use(cors({ origin: allowedOrigin }));
app.use(bodyParser.json());

app.post('/updateMappings', (req, res) => {
  const data = req.body; 

  fs.writeFileSync('./src/catalogue/colourMappings.json', JSON.stringify(data, null, 2)); // Save to data.json
  res.status(200).send({ message: 'Mappings saved successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
