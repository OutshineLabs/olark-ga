var express = require("express")
const uuid = require('uuid/v4');
var ua = require('universal-analytics');

var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())

app.get('/', function(res, res) {
  res.send('Hello!');

});

app.post('/olark', function (req, res) {
  console.log('hitting post function');
  console.log(req.body);
  if(req.body && req.body.visitor && req.body.visitor.customFields.googleClientId) {
    var visitor = ua(process.env.UAID);
    var session_id = Date.now() * 1000 + "" + uuid()

    var params = {
        'cid': req.body.visitor.customFields.googleClientId,
        'ec': 'olark lead',
        'ea': 'lead - olark lead',

        'cd1': req.body.visitor.customFields.googleClientId

    };

    visitor.event(params, function(err, data) {
      res.send(200);
    })
  } else {
    res.send(200);
  }
})

app.listen(8080, function () {
  console.log('server started on port 80')
})
