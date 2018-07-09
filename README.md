/**
 * Created by divewang on 2017/1/18.
 * 日期处理工具类
 */
'use strict';
var DateUtil = function () {
}

/**
 * 判断闰年
 * @param date Date日期对象
 * @return boolean true 或false
 */
DateUtil.prototype.isLeapYear = function (date) {
    return (0 === date.getYear() % 4 && ((date.getYear() % 100 !== 0) || (date.getYear() % 400 === 0)));
}

/**
 * 日期对象转换为指定格式的字符串
 * @param f 日期格式,格式定义如下 yyyy-MM-dd HH:mm:ss
 * @param date Date日期对象, 如果缺省，则为当前时间
 *
 * YYYY/yyyy/YY/yy 表示年份
 * MM/M 月份
 * W/w 星期
 * dd/DD/d/D 日期
 * hh/HH/h/H 时间
 * mm/m 分钟
 * ss/SS/s/S 秒
 * @return string 指定格式的时间字符串
 */
DateUtil.prototype.dateToStr = function (formatStr, date) {
    formatStr = arguments[0] || "yyyy-MM-dd HH:mm:ss";
    date = arguments[1] || new Date();
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth());
    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
}


/**
 * 日期计算
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param num int
 * @param date Date 日期对象
 * @return Date 返回日期对象
 */
DateUtil.prototype.dateAdd = function (strInterval, num, date) {
    date = arguments[2] || new Date();
    switch (strInterval) {
        case 's' :
            return new Date(date.getTime() + (1000 * num));
        case 'n' :
            return new Date(date.getTime() + (60000 * num));
        case 'h' :
            return new Date(date.getTime() + (3600000 * num));
        case 'd' :
            return new Date(date.getTime() + (86400000 * num));
        case 'w' :
            return new Date(date.getTime() + ((86400000 * 7) * num));
        case 'm' :
            return new Date(date.getFullYear(), (date.getMonth()) + num, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
        case 'y' :
            return new Date((date.getFullYear() + num), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
    }
}

/**
 * 比较日期差 dtEnd 格式为日期型或者有效日期格式字符串
 * @param strInterval string  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtStart Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 * @param dtEnd Date  可选值 y 年 m月 d日 w星期 ww周 h时 n分 s秒
 */
DateUtil.prototype.dateDiff = function (strInterval, dtStart, dtEnd) {
    switch (strInterval) {
        case 's' :
            return parseInt((dtEnd - dtStart) / 1000);
        case 'n' :
            return parseInt((dtEnd - dtStart) / 60000);
        case 'h' :
            return parseInt((dtEnd - dtStart) / 3600000);
        case 'd' :
            return parseInt((dtEnd - dtStart) / 86400000);
        case 'w' :
            return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm' :
            return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
        case 'y' :
            return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}

/**
 * 字符串转换为日期对象
 * @param date Date 格式为yyyy-MM-dd HH:mm:ss，必须按年月日时分秒的顺序，中间分隔符不限制
 */
DateUtil.prototype.strToDate = function (dateStr) {
    var data = dateStr;
    var reCat = /(\d{1,4})/gm;
    var t = data.match(reCat);
    t[1] = t[1] - 1;
    eval('var d = new Date(' + t.join(',') + ');');
    return d;
}

/**
 * 把指定格式的字符串转换为日期对象yyyy-MM-dd HH:mm:ss
 *
 */
DateUtil.prototype.strFormatToDate = function (formatStr, dateStr) {
    var year = 0;
    var start = -1;
    var len = dateStr.length;
    if ((start = formatStr.indexOf('yyyy')) > -1 && start < len) {
        year = dateStr.substr(start, 4);
    }
    var month = 0;
    if ((start = formatStr.indexOf('MM')) > -1 && start < len) {
        month = parseInt(dateStr.substr(start, 2)) - 1;
    }
    var day = 0;
    if ((start = formatStr.indexOf('dd')) > -1 && start < len) {
        day = parseInt(dateStr.substr(start, 2));
    }
    var hour = 0;
    if (((start = formatStr.indexOf('HH')) > -1 || (start = formatStr.indexOf('hh')) > 1) && start < len) {
        hour = parseInt(dateStr.substr(start, 2));
    }
    var minute = 0;
    if ((start = formatStr.indexOf('mm')) > -1 && start < len) {
        minute = dateStr.substr(start, 2);
    }
    var second = 0;
    if ((start = formatStr.indexOf('ss')) > -1 && start < len) {
        second = dateStr.substr(start, 2);
    }
    return new Date(year, month, day, hour, minute, second);
}


/**
 * 日期对象转换为毫秒数
 */
DateUtil.prototype.dateToLong = function (date) {
    return date.getTime();
}

/**
 * 毫秒转换为日期对象
 * @param dateVal number 日期的毫秒数
 */
DateUtil.prototype.longToDate = function (dateVal) {
    return new Date(dateVal);
}

/**
 * 判断字符串是否为日期格式
 * @param str string 字符串
 * @param formatStr string 日期格式， 如下 yyyy-MM-dd
 */
DateUtil.prototype.isDate = function (str, formatStr) {
    if (formatStr === null) {
        formatStr = "yyyyMMdd";
    }
    var yIndex = formatStr.indexOf("yyyy");
    if (yIndex === -1) {
        return false;
    }
    var year = str.substring(yIndex, yIndex + 4);
    var mIndex = formatStr.indexOf("MM");
    if (mIndex === -1) {
        return false;
    }
    var month = str.substring(mIndex, mIndex + 2);
    var dIndex = formatStr.indexOf("dd");
    if (dIndex === -1) {
        return false;
    }
    var day = str.substring(dIndex, dIndex + 2);
    if (!this.isNumber(year) || year > "2100" || year < "1900") {
        return false;
    }
    if (!this.isNumber(month) || month > "12" || month < "01") {
        return false;
    }
    if (day > this.getMaxDay(year, month) || day < "01") {
        return false;
    }
    return true;
}

DateUtil.prototype.getMaxDay = function (year, month) {
    if (month === 4 || month === 6 || month === 9 || month === 11)
        return "30";
    if (month === 2)
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0)
            return "29";
        else
            return "28";
    return "31";
}
/**
 *   变量是否为数字
 */
DateUtil.prototype.isNumber = function (str) {
    var regExp = /^\d+$/g;
    return regExp.test(str);
}

/**
 * 把日期分割成数组 [年、月、日、时、分、秒]
 */
DateUtil.prototype.toArray = function (myDate) {
    myDate = arguments[0] || new Date();
    var myArray = Array();
    myArray[0] = myDate.getFullYear();
    myArray[1] = myDate.getMonth();
    myArray[2] = myDate.getDate();
    myArray[3] = myDate.getHours();
    myArray[4] = myDate.getMinutes();
    myArray[5] = myDate.getSeconds();
    return myArray;
}

/**
 * 取得日期数据信息
 * 参数 interval 表示数据类型
 * y 年 M月 d日 w星期 ww周 h时 n分 s秒
 */
DateUtil.prototype.datePart = function (interval, myDate) {
    myDate = arguments[1] || new Date();
    var partStr = '';
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    switch (interval) {
        case 'y' :
            partStr = myDate.getFullYear();
            break;
        case 'M' :
            partStr = myDate.getMonth() + 1;
            break;
        case 'd' :
            partStr = myDate.getDate();
            break;
        case 'w' :
            partStr = Week[myDate.getDay()];
            break;
       /* case 'ww' :
            partStr = myDate.WeekNumOfYear();
            break;*/
        case 'h' :
            partStr = myDate.getHours();
            break;
        case 'm' :
            partStr = myDate.getMinutes();
            break;
        case 's' :
            partStr = myDate.getSeconds();
            break;
    }
    return partStr;
}

/**
 * 取得当前日期所在月的最大天数
 */
DateUtil.prototype.maxDayOfDate = function (date) {
    date = arguments[0] || new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    var time = date.getTime() - 24 * 60 * 60 * 1000;
    var newDate = new Date(time);
    return newDate.getDate();
}
/**
 * 判断当前日期是本年的第几周
 * @param date
 * @returns {number}
 */
function weekNumOfMonth(date){
    var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);//本月的第一天
    var firstDay = firstDate.getDay() - 1;
    var diffDates = date.getDate() + firstDay ;
    var week = 0;
    if(diffDates % 7 !=0){
        week = diffDates / 7;//第几周
    }else{
        week = diffDates / 7 - 1;//第几周
    }
    week = week +'';
    var ret= week.indexOf('.') >0 ? week.split('.')[0] :week;
    return ret;
}

/**
 * 判断时长是否超过限制
 * @param data 格式：00:00:08
 * @param limit 单位s
 */
DateUtil.prototype.timeCompair = function (data,limit) {
    var arr = data.split(':');
    console.log('timeCompair data: ',parseInt(arr[0])*60*60 + parseInt(arr[1])*60 + parseInt(arr[2]));
    var time = parseInt(arr[0])*60*60 + parseInt(arr[1])*60 + parseInt(arr[2]);
    if(time > limit) {
        return false;
    }
    return true;
}

//返回时间字符串
//uncletang 更新于2017-04-01
/**
 * 模仿微信返回 时期
 * @param timestamp
 * @returns {string}
 */
DateUtil.prototype.analyzeTime = function(timestamp){
    if(timestamp.toString().length<11){
        timestamp = timestamp * 1000;
    }
    // timestamp = timestamp*1000;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var timeStr = "";
    var newDate = new Date();
    var stoday = new Date("00:00:00 " + newDate.getFullYear() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate());
    var syear = stoday.getFullYear();
    var timeData = new Date(timestamp);
    var timeyear = timeData.getFullYear();
    var sevenday = 24 * 60 * 60 * 1000 * 7;
    var oneday = 24 * 60 * 60 * 1000;

    if (syear - timeyear != 0 && stoday.getTime() - timestamp > sevenday) { //跨年大于七天
        timeStr = timeData.getFullYear() + "年" + (timeData.getMonth() + 1) + "月" + timeData.getDate() + "日";
        return timeStr;
    } else if (stoday.getTime() - timestamp > sevenday) { //大于七天不跨年
        timeStr = (timeData.getMonth() + 1) + "月" + timeData.getDate() + "日";
    } else if (stoday.getTime() - timestamp < sevenday && stoday.getTime() - timestamp > oneday) { //一周内不是昨天
        timeStr = '星期' + Week[timeData.getDay()] + ' ' + (timeData.getHours() > 9 ? timeData.getHours() : '0' + timeData.getHours()) + ":" + (timeData.getMinutes() > 9 ? timeData.getMinutes() : '0' + timeData.getMinutes());
    } else if (stoday.getTime() - timestamp < oneday && stoday.getTime() - timestamp > 0) { //昨天
        timeStr = '昨天 ' + (timeData.getHours() > 9 ? timeData.getHours() : '0' + timeData.getHours()) + ":" + (timeData.getMinutes() > 9 ? timeData.getMinutes() : '0' + timeData.getMinutes());
    } else { //今天
        timeStr = (timeData.getHours() > 9 ? timeData.getHours() : '0' + timeData.getHours()) + ":" + (timeData.getMinutes() > 9 ? timeData.getMinutes() : '0' + timeData.getMinutes());
    }

    return timeStr;

}

/**
 * 返回日期不带时分秒
 * @param timestamp
 * @returns {string}
 */
DateUtil.prototype.analyzeData = function(timestamp){
    if(timestamp.toString().length<11){
        timestamp = timestamp * 1000;
    }
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var timeStr = "";
    var newDate = new Date();
    var stoday = new Date("00:00:00 " + newDate.getFullYear() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getDate());
    var syear = stoday.getFullYear();
    var timeData = new Date(timestamp);
    var timeyear = timeData.getFullYear();
    var sevenday = 24 * 60 * 60 * 1000 * 7;
    var oneday = 24 * 60 * 60 * 1000;

    if (syear - timeyear != 0 && stoday.getTime() - timestamp > sevenday) { //跨年大于七天
        timeStr = timeData.getFullYear() + "年" + (timeData.getMonth() + 1) + "月" + timeData.getDate() + "日";
        return timeStr;
    } else if (stoday.getTime() - timestamp > sevenday) { //大于七天不跨年
        timeStr = (timeData.getMonth() + 1) + "月" + timeData.getDate() + "日";
    } else if (stoday.getTime() - timestamp < sevenday && stoday.getTime() - timestamp > oneday) { //一周内不是昨天
        timeStr = '星期' + Week[timeData.getDay()];
    } else if (stoday.getTime() - timestamp < oneday && stoday.getTime() - timestamp > 0) { //昨天
        timeStr = '昨天 ';
    } else { //今天
        timeStr = '今天';
    }

    return timeStr;

}


module.exports = new DateUtil();
