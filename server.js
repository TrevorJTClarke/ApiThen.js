var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

app.all('/*', function(req, res){
    res.sendFile(__dirname + '/test.html');
});

app.set('port', process.env.PORT || 1111);
http.createServer(app).listen(app.get('port'), function(){
    console.log("ApiThen.js");
    console.log("http://localhost:" + app.get('port'));
});
