

function createStore(initStore) {
    var status = initStore || {},  // 公共状态对象
        list = [];                 // 某一个订阅了公共状态对象的方法列表
    
    // 返回公共状态对象
    function getStatus() {
        return status;
    }

    // 订阅公共状态对象（将订阅者（方法）添加到list数组中）
    function subscribe(func) {
        list.push(func);
    }

    // 更新公共状态对象属性，并调用订阅方法，实现状态的发布
    function dispatch(action) {
        status[action.type] = action.value;
        list.forEach(function (ele, index) {
            ele();
        });
    }

    return {
        getStatus,
        subscribe,
        dispatch
    }
}
