import Vue from "vue";

/**
 * 转换前先替换为 IE 可识别的格式
 * @param time
 * @returns {string}
 */
const replaceTime = (time) => {
  return typeof time === "string" ? time.replace(/-/g, "/") : time;
};

/**
 * 静态数据
 */


Vue.prototype.J_options = {

};

Vue.filter("empty", (val) => {
  switch (val) {
    case null:
    case undefined:
    case "":
    case "null":
    case "undefined":
      return "-";
    default:
      return val;
  }
});

Vue.filter('date', (val) => {//date 横杆年月日格式
  switch (val) {
    case null:
    case undefined:
    case '':
      return '-';
    default:
      return new Date(replaceTime(val)).format('yyyy-MM-dd')
  }
});

Vue.filter('datetime', (val) => {//date 横杆年月日时分秒格式
  switch (val) {
    case null:
    case undefined:
    case '':
      return '-';
    default:
      return new Date(replaceTime(val)).format('yyyy-MM-dd hh:mm:ss')
  }
});

Vue.filter('date2', (val) => {//date 斜杆年月日格式
  switch (val) {
    case null:
    case undefined:
    case '':
      return '-';
    default:
      return new Date(replaceTime(val)).format('yyyy/MM/dd')
  }
});

Vue.filter('datetimeType', (val, type) => {//自定义 date、datetime格式显示
  switch (val) {
    case null:
    case 'null':
    case undefined:
    case 'undefined':
    case '':
      return '-';
    default:
      return new Date(replaceTime(val)).format(type)
  }
});
