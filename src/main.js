var express = require('express');
var fs = require("fs");
var app = express();
const port = 5000;

app.get('/', async (req, res) => {
    res.send({ word: "Not Found", pronunciation: "NOT'FOUND", definition: { type: "error", text: "Word '' is not in this dictionary." } })
})

app.get('/:word', async (req, res) => {
    await fs.readFile(`./src/words/${req.params.word}.json`, function(err, data) {
        if (err) {
            data = { word: "Not Found", pronunciation: "NOT'FOUND", definition: { type: "error", text: `Word '${req.params.word}' is not in this dictionary.` } }
        }
        else{
            data = JSON.parse(data);
        }
        res.send(data)
    });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})