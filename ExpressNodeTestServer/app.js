const express = require('express');
let bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = 3001;

//.use
app.use(bodyParser.json({ extended: false }));
app.use(express.static("public"));

routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

