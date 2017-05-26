var moment = require('moment');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var user = require('./user.js');
mongoose.Promise = global.Promise;

var arr = [];
for (var i = 1; i <= 366; i++) {
    arr.push(i);
}
arr.sort(function () {
    return (0.5 - Math.random());
})
moment.locale('zh-cn');
test = moment().format('MMDD');
today = moment().format('YYYYMMDD');
dayOfYear = moment().dayOfYear();
if (moment().isLeapYear()) { //是否是闰年
    //是的话2.29后所有日子均-1
    if (dayOfYear > 60) {
        dayOfYear = dayOfYear - 1;
    } else if (dayOfYear) {
        dayOfYear = 366;
    }
}

console.log(arr[dayOfYear]);
app.get('/', function (req, res) {
    var query = user.findOne({
        username: 'bbb'
    });
    var Promise = query.exec();
    Promise.then(function (doc) {
        if (doc.lastupdate == today) {
            res.send('你今天写过了');
            return;
        }
        console.log(doc);
        if (!doc.data) doc.data = {};
        if (!doc.data[dayOfYear]) {
            doc.data[dayOfYear] = {};
            doc.data[dayOfYear].question = arr[dayOfYear];
            doc.data[dayOfYear]['2017'] = 'test';
        }
        doc.lastupdate = today;
        console.log(doc);
        doc.markModified('data');
        doc.save(function (err) {
            res.send('保存完了');
        });
    }, function (err) {
        res.send('出错');
    });
});

app.get('/home', function (req, res) {
    var writed;
    var query = user.findOne({
        username: 'bbb'
    });
    var Promise = query.exec();
    Promise.then(function (doc) {
        if (doc.lastupdate == today) {
            writed = true;
        }
        res.json({
            writed: writed,
            data: doc.data
        })
    }, function (err) {
        res.send('出错');
    });
});

app.get('/read', function (req, res) {
    //请求文章内容
});

app.get('/write', function (req, res) {
    //写作页面
});

app.post('/submit', function (req, res) {
    //发表
});

app.post('/calendar', function (req, res) {
    //日历
});

app.post('/history', function (req, res) {
    //历史
});

http.listen(80, function () {
    console.log('listening on *:' + 80);
});