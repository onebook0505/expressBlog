var path = require('path');

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session); // MongoDB session store for Express
var flash = require('connect-flash'); // combination with redirects，message 會在下一頁呈現，用來做提示訊息

var route = require('./routes/index');
var config = require('./config');

var app = express();

app.set('views', path.join(__dirname, 'views')); // 全局變量 __dirname 代表當前目錄
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
config.session.store = new MongoStore(config.mongo);
app.use(session(config.session));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public'))); // 設定 pubilc 為存放靜態文件的目錄

route(app);

app.listen(process.env.PORT || config.app, function () {
  console.log('blog listening on port ' + (process.env.PORT || config.app));
});