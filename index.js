var moment = require('moment');

var mongoose = require('mongoose');
var user = require('user.js');
mongoose.Promise = global.Promise;

newUser = new user({
    
})
var arr = [];
for (var i = 1; i <= 366; i++) {
    arr.push(i);
}
arr.sort(function () {
    return (0.5 - Math.random());
})
moment.locale('zh-cn');
test = moment().format('MMDD');
dayOfYear = moment().dayOfYear();
if (moment().isLeapYear()) {//是否是闰年
    //是的话2.29后所有日子均-1
    if (dayOfYear > 60) {
        dayOfYear = dayOfYear - 1;
    } else if (dayOfYear) {
        dayOfYear = 366;
    }
}
console.log(arr[dayOfYear]);