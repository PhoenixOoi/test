const express = require('express');
const app = express();
const axios = require('axios');
var News = require('./News').newsCollection;
const apiKey = `fbe98ca17e3e4caebd82477e9fc43f87`;
  
if(process.env.NODE.env ==="production"){
  app.use(express.static('client/build'))
  const path =require('path');

  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}

app.get('http://localhost:5000/getmovie', (req, res) => {
  const title = req.query.title;
  const querystr = `http://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      const movie = new Movie({
        title: response.data.Title,
        year: response.data.Year,
        genre: response.data.Genre,
        actors: response.data.Actors,
        plot: response.data.Plot,
        poster: response.data.Poster
      });
      if (!movie.title) {
        res.status(200).json('Not found');
        return;
      }
      movie
        .save()
        .then(response => {
          res.status(200).json(response);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getHistory - get all search history
app.get('/getHistory', (req, res) => {
  News.find({})  
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

//localhost:5000/getHistory - get all search history
app.get('/deleteHistory', async (req, res) => {
  // res.send(req.query.id)
  res.send(await News.findByIdAndDelete(req.query.id))
});

//localhost:5000/getNews with country code
app.get('/getNews', async (req, res) => 
{
  try {

    // ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za
    var country = req.query.country; 

     var url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
            //  res.send(url)
          axios.get(url) 
          .then(response => {
          res.send(response.data.articles);
          })
          .catch(error => {
            res.send(error.message);
          });
    
  } catch (error) {
      res.send(error)
  }
});
 
//localhost:5000/getNews
app.get('/searchNews', async (req, res) => {
  try {
    var q = req.query.q; 
    var url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${apiKey}`;
          axios.get(url) .then(response => {
            res.send(response.data.articles);
          })
          .catch(error => {
            res.send(error.message);
          });
    
    var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var model = new News({'search':q, 'updated': date}); 
    model.save();
    
  } catch (error) {
      res.send(error)
  }
});

app.delete('/deleteNews', async (req,res) =>{
    var remove = await News.remove()
    res.json(remove);
}) 


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server listening on port 5000');
});



