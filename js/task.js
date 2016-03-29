/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var tip=function(element, value){
    var display = element.currentStyle ? element.currentStyle.display :
        getComputedStyle(element, null).display;
    display=value==="none"?"display":"none";
};


var addEvent=function(event, element, func) {
    if (element.addEventListener)  // W3C DOM
        element.addEventListener(event, func);
    else if (element.attachEvent) { // IE DOM
        element.attachEvent("on"+event, func);
    }
    else { // No much to do
        element[event] = func;
    }
};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input");
    var value=document.getElementById("aqi-value-input");
    var tips=document.querySelectorAll("label+div");
    var isCity=city.trim().match(/^[a-zA-Z\u4E00-\u9FA5]+$/);
    var isValue=value.trim().match(/^\d+$/);
    addEvent("blur", city, function(){
        isCity?tip(tips[0],"none"):tip(tips[0],"display");
    });
    addEvent("blur", value, function(){
        isValue?tip(tips[1],"none"):tip(tips[1],"display");
    });
    if(isCity&&isValue){
        aqiData[city]=value;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tbody="";
    if(aqiData){
        tbody="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        for(var city in aqiData){
            tbody+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td></tr>";
        }
    }else{
        tbody="";
    }
    document.getElementById("aqi-table").innerHTML+=tbody;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.
    delete aqiData[this];
    renderAqiList();
}

function init() {
    var addBtn=document.getElementById("add-btn");
    var deleteBtn=document.querySelectorAll("#aqi-table button");
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent("click", addBtn, addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    Array.prototype.forEach.call(deleteBtn,addEvent("click", this, delBtnHandle));
}

init();

