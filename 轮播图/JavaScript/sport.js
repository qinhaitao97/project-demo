
/*
    获取元素样式
    @function: getStyle(ele, prop) {}
    @param: ele --- 元素对象
    @param: prop --- 需要获取的属性
*/
function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}

/*  
    多物体多值链式运动(运动状态为减速缓冲运动，可根据情况调整)
    @function: move(ele, tarObj, callback) {}
    @param: ele --- 元素对象
    @param: tarObj --- 目标值集合对象
    @param: callback --- 回调函数
*/
function move(ele, tarObj, callback) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var stop = true;
        for (var prop in tarObj) {
            var curValue = (prop == 'opacity') ? parseFloat(getStyle(ele, prop)) : parseInt(getStyle(ele, prop)),
                speed = (prop == 'opacity') ? ((tarObj[prop] - curValue) * 100 / 7) : ((tarObj[prop] - curValue) / 7);
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (prop == 'opacity') {
                ele.style[prop] = curValue + speed / 100;
            } else {
                ele.style[prop] = curValue + speed + 'px';
            }
            if (curValue != tarObj[prop]) {
                stop = false;
            }
        }
        if (stop) {
            clearInterval(ele.timer);
            typeof(callback) == 'function' ? callback() : '';
        }
    }, 30);
}