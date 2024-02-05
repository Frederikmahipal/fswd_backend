import express from "express"


const app = express()
const port = 8080


app.use('/', require('./routes/index'));

app.listen(port, function () {
    console.log('app listening on port ' + port);
  });

