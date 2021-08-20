
var express = require('express');
var app = express();

console.log("hello")

app.use(requireHTTPS);

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}


app.use(express.static('./dist/kanban'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root:'./dist/kanban'});
});

app.listen(process.env.PORT || 8080);