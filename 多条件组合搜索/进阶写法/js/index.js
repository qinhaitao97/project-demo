
var oFoodName = document.getElementsByClassName('foodName')[0],
    oType = document.getElementsByClassName('type')[0],
    oInfo = document.getElementsByClassName('info')[0];

function render(list) {
    var str = '';
    list.forEach(function (ele, index){
        str += '<li>\
                <img src="' + ele.src + '">\
                <span>' + ele.name + '</span>\
                <span>' + ele.type + '</span>\
                </li>';
    });
    oInfo.innerHTML = str;
}
render(food);

// 初始化状态机
var store = createStore({text: '', type: 'all'});

// 添加订阅方法
store.subscribe(function () {
    render(lastFilter());
});

// 当用户输入信息后，更新状态机中的公共状态对象，并调用订阅函数实现发布
oFoodName.addEventListener('input', function () {
    store.dispatch({type: 'text', value: this.value});
}, true);

oType.addEventListener('click', function (e) {
    var event = e || window.event,
        target = event.target || event.srcElement;

    if (target.tagName == 'LI') {
        var oActive = document.getElementsByClassName('active')[0];
        document.getElementsByClassName('active')[0].classList.remove('active');
        target.classList.add('active');
        store.dispatch({type: 'type', value: target.getAttribute('type')});
    }
}, true);