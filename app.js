const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const apps = require('./app-data.js');




app.get('/apps', (req, res) => {
    const {sort, genres} = req.query;
    let results = apps.filter(apps =>
                        apps["App"]);

    let genreResultsFiltered = results.filter(results => 
                            results["Genres"] === genres)

    if(sort){
        if(!['Rating', 'App'].includes(sort)) {
            return res.status(400).send('Sort must be one of rating or app');
        }
    }
    

    if(genres) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res.status(400).send('Genre must be one of action, puzzle, stratedy, casual, arcade, or card')
        }
    }

   if(sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })

    }

    if(sort) {
        genreResultsFiltered
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })

    }
    
   if(genres) {
       return res.json(genreResultsFiltered);
   }
    
    res.json(results)
});


module.exports = app;


