/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var CERegex = /^[a-zA-Z\u4E00-\u9FA5]+$/,numericRegex = /^[0-9]+$/;

function addEvent(event, element, func) {
    if (element.addEventListener)  // W3C DOM
        element.addEventListener(event, func);
    else if (element.attachEvent) { // IE DOM
        element.attachEvent("on"+event, func);
    }
    else { // No much to do
        element[event] = func;
    }
};
// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
function validate(re, id){
    // Check input
    if(re.test(document.getElementById(id).value.trim())){
        // Style green
        document.getElementById(id).style.background ='#ccffcc';
        // Hide error prompt
        document.getElementById(id + 'Error').style.display = "none";
        return true;
    }else{
        // Style red
        document.getElementById(id).style.background ='#e35152';
        // Show error prompt
        document.getElementById(id + 'Error').style.display = "block";
        return false;
    }
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {

    var error = 0;
    var city=document.getElementById('aqi-city-input').value.trim();
    var value=document.getElementById('aqi-value-input').value.trim();
    if(!validate(CERegex,'aqi-city-input')){
        document.getElementById('aqi-city-inputError').style.display = "block";
        error++;
    }

    if(!validate(numericRegex,'aqi-value-input')){
        document.getElementById('aqi-value-inputError').style.display = "block";
        error++;
    }

    error>0?aqiData={}:aqiData[city]=value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var tbody="";
    if(!isEmpty(aqiData)){
        tbody="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
        for(var city in aqiData){
            tbody+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button id='"+city+"'>删除</button></td></tr>";
        }
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
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    var addBtn=document.getElementById("add-btn");
    var deleteBtn=document.querySelectorAll("#aqi-table button");
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addEvent("click", addBtn, addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    for(var btn in deleteBtn){
        addEvent("click", deleteBtn[btn], function(e){
            delBtnHandle(this.id);
            e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
        })
    }
}

init();

