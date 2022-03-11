const axios = require('axios');
const qs = require("qs");

const url = 'http://api.lngqt.shechem.cn'
const headers_template = {
    "Host": "api.lngqt.shechem.cn",
    "Connection": "keep-alive",
    "Accept": "application/json, text/plain, */*",
    "Origin": "http://websecond.lngqt.shechem.cn",
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x6305002e)",
    "Content-Type": "application/x-www-form-urlencoded",
    "Referer": "http://websecond.lngqt.shechem.cn/index",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    "Cookie": ""
}
var headers = {}
axios.defaults.baseURL = url;

var mycookie = "BDed_HeaderKey=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
var mycookie = "BDed_HeaderKey=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"; //#gitignore



function getUserInfo() {
    axios.get("/user/user/find").then(function (res) {
        console.log(res.data.msg)
        if (res.data.errCode == 0) {
            console.log("欢迎回来，" + res.data.data.name + "同学！");
            getNowLearn()
        } else {
            console.log("请尝试更换cookies")
        }
    })
}

function getNowLearn(){
    console.log("正在获取最新学习...")
    axios.get("/webapi/learn/getnowlearn").then(function (res) {
        console.log(res.data.msg)
        if (res.data.errCode == 0) {
            console.log("最新学习为："+res.data.data.title);
            if(res.data.data.is_learn){
                console.log("您已完成本期学习！");
                study(res.data.data.id)
            }else{
                console.log("本期尚未学习");
                study(res.data.data.id)
            }
        } else {
            
        }
    })
}

function study(id){
    console.log("开始学习...");
    let data = {lid:id}
    axios.post("/webapi/learn/addlearnlog",qs.stringify(data))
    .then(function (res) {
        console.log(res.data.msg)
        if(res.data.errCode==0){
            console.log("学习完成！");
            console.log("----------------分割线--------------------");
        }
    })
}

function bigBigStudy(cookie){
    headers = headers_template;
    headers.Cookie = cookie;
    axios.defaults.headers = headers;
    console.log(headers)
    getUserInfo();
}

bigBigStudy(mycookie)