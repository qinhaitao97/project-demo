
var food = [
    {'name': '苹果', 'type': '水果', 'src': 'img/icon-apple.png'},
    {'name': '香蕉', 'type': '水果', 'src': 'img/icon-banana.png'},
    {'name': '卷心菜', 'type': '蔬菜', 'src': 'img/icon-cabbage.png'},
    {'name': '胡萝卜', 'type': '蔬菜', 'src': 'img/icon-carrot.png'},
    {'name': '樱桃', 'type': '水果', 'src': 'img/icon-cherry.png'},
    {'name': '黄瓜', 'type': '蔬菜', 'src': 'img/icon-cuke.png'},
    {'name': '茄子', 'type': '蔬菜', 'src': 'img/icon-eggplant.png'},
    {'name': '奇异果', 'type': '水果', 'src': 'img/icon-kifi.png'},
    {'name': '生菜', 'type': '蔬菜', 'src': 'img/icon-lettuce.png'},
    {'name': '土豆', 'type': '蔬菜', 'src': 'img/icon-patato.png'},
    {'name': '木瓜', 'type': '水果', 'src': 'img/icon-pawpaw.png'},
    {'name': '豌豆', 'type': '蔬菜', 'src': 'img/icon-pea.png'},
    {'name': '桃子', 'type': '水果', 'src': 'img/icon-peach.png'},
    {'name': '南瓜', 'type': '蔬菜', 'src': 'img/icon-pumpkin.png'},
    {'name': '草莓', 'type': '水果', 'src': 'img/icon-strawberry.png'},
    {'name': '番茄', 'type': '蔬菜', 'src': 'img/icon-tomato.png'},
    {'name': '西瓜', 'type': '水果', 'src': 'img/icon-watermelon.png'}
];

var oInfo = document.getElementsByClassName('info')[0],
    oFoodName = document.getElementsByClassName('foodName')[0],
    oType = document.getElementsByClassName('type')[0];

// 根据传来的参数（数组）渲染展示列表
function render(list) {
    var str = '';
    list.forEach(function (ele, index) {
        str += '<li>\
                    <img src="' + ele.src + '">\
                    <span>' + ele.name + '</span>\
                    <span>' + ele.type + '</span>\
                </li>';
    });
    oInfo.innerHTML = str;
}
render(food);

// 公共状态，参数的值随着筛选的条件的改变而改变
var state = {
    inputText: '',
    type: 'all'
}

// 当输入事件触发后，更新公共状态属性inputText
oFoodName.oninput = function () {
    state.inputText = this.value;
    combineRender();
}

// 根据输入的内容筛选
function textFilter(text, list) {
    return list.filter(function (ele, index) {
        if (ele.name.indexOf(text) != -1) {
            return true;
        }
    });
}

// 当点击事件触发后，更新公共状态属性type
oType.addEventListener('click', function (e) {
    var event = e || window.event,
        target = event.target || event.srcElement;
    if (target.tagName == 'LI') {
        // 更改被选中元素的样式
        document.getElementsByClassName('active')[0].classList.remove('active');
        target.classList.add('active');

        state.type = target.getAttribute('type');
        combineRender();
    }
}, true);

// 根绝选择的种类筛选
function typeFilter(type, list) {
    if (type == 'all') {
        return list;
    } else {
        return list.filter(function (ele, index) {
            if (ele.type == type) {
                return true;
            }
        });
    }
}

// 组合筛选条件，组合筛选后进行渲染
function combine(obj, list) {
    return function () {
        var ret = list;
        for(var prop in obj) {
            ret = obj[prop](state[prop], ret);
        }
        render(ret);
    }
}

var combineRender = combine({inputText: textFilter, type: typeFilter}, food);
