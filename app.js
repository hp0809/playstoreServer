const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./app-data.js');




app.get('/apps', (req, res) => {
    const {sort, genre} = req.query;

    if(sort){
        if(!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app');
        }
    }

    if(sort) {
        apps
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }

    if(genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res.status(400).send('Genre must be one of action, puzzle, stratedy, casual, arcade, or card')
        }
    }

    if(genre) {
        apps
            .sort((a, b) => {
                return a[genre] > b[genre] ? 1 : a[genre] < b[genre] ? -1 : 0;
            })

    }

    res.json(apps)
});

app.listen(8000, () => {
    console.log('Server started on PORT 8000')
});