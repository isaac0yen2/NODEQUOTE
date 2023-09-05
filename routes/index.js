var express = require('express');
var router = express.Router();
const sqliteMiddleware = require('../sqliteMiddleware');

router.use(sqliteMiddleware);

/* GET home page. */
router.get('/', function (req, res, next) {
  const selectQuery = 'SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1'

  req.db.get(selectQuery, function (err, row) {
    let data
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving random quote');
    } else if (row) {
        data = row.quote_text

      } else {
        res.status(404).send('No quotes found');
        data = 'No quotes found'
      }
    res.render('index', {
      randomQuote: data
    });
  })



});
router.get('/inputquote', (req, res, next) => {
  res.render('input-page')
})
router.post('/submit-quote', (req, res, next) => {
  const db = req.db;
  const insertQuery = 'INSERT INTO quotes (quote_text) VALUES (?)';
  const params = req.body.quote;


  db.run(insertQuery, params, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Inserted quote with ID: ${this.lastID}`);
    }
  });


  res.redirect('/')
})

router.post('/backToHome', (req, res, next) => {
  //the database function

  res.redirect('/')
})
module.exports = router;