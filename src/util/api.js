import { Message, Loading, MessageBox } from 'element-ui'
import axios from 'axios'
import bus from "./bus";


const app = {
  request: function (url, data, type = 'get') {
    let temp = data
 


    // let ApiUrl = 'http://192.168.0.119:6969/' //本地
    let ApiUrl = "/api" //vue 反向代理


   



    let str = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    var promise = new Promise((resolve, reject) => {
      let obj = {
        method: type,
        url: ApiUrl + url,
        headers: {
          "Authorization": 'Bearer ' + str
        }
      }
      if (type == 'get') {
        obj.params = data

      } else {
        obj.data = data


      }

      axios(obj).then(function (response) {
        console.log(response,'却不敢')
        if (response.data.code == 200) {
          resolve(response.data);


        } else {
         
          var load = Loading.service({})
          load.close()
     
          Message.error(response.data.message)
        }
      })
        .catch(function (error) {
          console.log(error);
        });

    })
    return promise
  },
  getuploadinfo(aliyunaddress,cb){
    let data ={
        dir:aliyunaddress
      }
    app.request('api/getGetkey', data,'post').then(res => {
      cb(res.data)
   
    })
  },
  uploadimg(file,uploadinfo,callback){
if (!file) {
    return
  }


  let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
  
  if(file.size/1024/1024>2){
    app.toast('请选择2M以下的图片','error')
    return
  }
  const ossData = new FormData()
   var server = uploadinfo.host;
  

  let stroeAs = uploadinfo.dir  +   parseInt(Math.random()*1000) +'pc-xrzww' + new Date().getTime()    + '.' + testmsg;
  ossData.append('policy', uploadinfo.policy)
  ossData.append('OSSAccessKeyId',uploadinfo.accessid)
  ossData.append('signature', uploadinfo.signature)
  ossData.append('key',stroeAs )
  ossData.append('success_action_status', 200)
  ossData.append('file', file.raw)
    axios.post(server, ossData).then(res => {
  
    var sendurl ='/'+ stroeAs
    callback(sendurl)
  });
  
  },
  stampToDate: function (time) {
    var date = null
    if(String(time).length == 10){
      date = new Date(Number(time * 1000));//将接收到的的String类型的时间转为数字类型

    }else{
      date = new Date(Number(time ))
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var hour = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    var seconds = date.getSeconds().toString();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + " " + hour + ":" + minutes + ":" + seconds;
  },
  toThousands: function (nStr) {
    var x, x1, x2
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },

  toast: function (title, type = '', duration = 2500) {
    if (type) {
      Message({
        message: title,
        type: type,
        offset: 100,
        duration: duration
      })
    } else {
      Message({
        offset: 100,

        message: title,
        duration: duration
      })
    }
  },
  stoast: function (title, duration = 2500) {
    Message({
      offset: 100,
      type: 'success',
      message: title,
      duration: duration
    })
  },
  etoast: function (title, duration = 2500) {
    Message({
      offset: 100,
      type: 'error',
      message: title,
      duration: duration
    })
  },
  load: function (title = '加载中...') {
    Loading.service({
      text: title
    })
  },
  hide: function () {
    var load = Loading.service({})
    load.close()
  },
  // nto: function (url, id) {
  //     if (id) {
  //         uni.navigateTo({
  //             url: '/pages/' + url + '?id=' + id
  //         })
  //     } else {
  //         uni.navigateTo({
  //             url: '/pages/' + url
  //         })
  //     }
  // },
  // back: function () {
  //     uni.navigateBack({
  //         delta: 1
  //     });
  // },
  // ntobj: function (url, obj) {


  //     uni.navigateTo({
  //         url: '/pages/' + url + '?data=' + JSON.stringify(obj)
  //     })

  // },
  // snto: function (url, id) {
  //     if (id) {
  //         uni.switchTab({
  //             url: '/pages/' + url + '?id=' + id
  //         })
  //     } else {
  //         uni.switchTab({
  //             url: '/pages/' + url
  //         })
  //     }
  // },
  confirm: function (content, submit, title = '提示') {
    MessageBox.confirm(content, title, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(res => {
      submit()
    }).catch(() => {
      app.toast('您已取消')
    })


  },
  isphoneNumber: function (tel) {
    var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
    return reg.test(tel);

  },
  save: function (key, data) {
    localStorage.setItem(key, data)
  },
  gets: function (key) {
    return localStorage.getItem(key)

  },
  timeago: function (timestamp) { //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var dateTimeStamp = new Date(timestamp * 1000).getTime()


    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;

    var month = day * 30;
    var year = month * 12;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    var result = ""
    if (diffValue < 0) {
      return;
    }


    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var yearC = diffValue / year
    if (yearC >= 1) {
      return "" + parseInt(yearC) + "年前";
    }
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else {
      result = "刚刚";
    }

    return result;
  },
  randomSort: function (a, num) {
    var arr = a,
      random = [],
      len = arr.length;
    for (var i = 0; i < len; i++) {
      var index = Math.floor(Math.random() * (len - i));
      random.push(a[index]);
      arr.splice(index, 1);
    }
    if (num) {
      return random.splice(0, num);
    } else {
      return random.splice(0, 3)
    }
  }


}
export default app
