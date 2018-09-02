
var waterfall = {
    // 请求数据中的参数，具体功能用法查看接口文档
    cpage: 0,

    // 用来展示图片的四个 li 结构
    oLi: document.getElementsByTagName('li'),

    // 每一张图片的宽度，这个值是固定的，它的功能是用来计算每张图片相对应比例的高度
    initWidth: 205,

    // 请求锁，当正在处理一个请求时，不能发送下一个请求
    requestKey: true,

    // 页面底部用来展示当前请求状态的元素
    infoText: document.getElementsByClassName('info-text')[0],

    // 入口函数，用来进行一些初始化方法
    init: function () {
        if (this.requestKey) {
            this.requestKey = false;
            this.getData();
        }
        this.bindEvent();
    },

    // 封装ajax方法
    ajax: function (method, url, data, flag, callback) {
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
        
        method = method.toUpperCase();
        if (method == 'GET') {
            xhr.open('GET', url + '?' + data, flag);
            xhr.send();
        } else if (method == 'POST') {
            xhr.open('POST', url, flag);
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                // console.log('error');
            }
        }
    },


    // 发送ajax请求，获取数据
    getData: function () {
        var _this = this;
        _this.cpage++;

        // 在将要请求数据前，将展示信息更换为 "正在请求数据"
        _this.changeInfo(0);
        _this.ajax('get', './php/getPics.php', 'cpage=' + this.cpage, true, function (data) {
            _this.render(JSON.parse(data));
        });
    },

    render: function (data) {
        var _this = this;
        
        // 响应数据不为空时，将数据渲染在页面中
        if (data.length > 0) {
            // 在请求数据结束后，将展示信息更换为 "查看更多"
            _this.changeInfo(1);

            // 循环遍历数组，将每一个元素添加到页面中
            data.forEach(function (ele, index) {
                var oImg = new Image(),
                    oSpan = document.createElement('span'),
                    oContent = document.createElement('div');
                
                oContent.className = 'content';
                oSpan.innerText = ele.title;
                oImg.src = ele.preview;

                // 因为异步加载的原因，图片资源可能还没有加载完成就进行其他的操作了，而其他的操作要依赖于图片的大小
                // 所以不管图片有没有加载完成，我们都先把图片的宽、高设置好，使其他依赖图片大小的操作可以正常进行，
                // 至于图片什么时候加载完成就不影响我们其他的操作了
                oImg.width = _this.initWidth;
                oImg.height = (_this.initWidth / ele.width) * ele.height;
    
                oContent.appendChild(oImg);
                oContent.appendChild(oSpan);

                // 因为每一张图片的高度是不一样的，为了防止出现某一列过长的情况，我们每次插入图片的位置，应该是当前的四列
                // li中最短的那一列
                _this.oLi[_this.getShortest()].appendChild(oContent);
    
                // 如果某一张图片加载失败，我们展示图片丢失的信息提示用户
                oImg.onerror = function () {
                    oImg.src = './img/error.png';


                    // 下面的代码是想要去掉img加载失败时，自带的边框，但是没有成功
                    // this.width += 20;
                    // this.height += 20;
                    // this.style.width = this.width + 2 + 'px';
                    // this.style.height = this.height + 2 + 'px';
                    // this.style.margin = '-1px';
                }
            });

            // 所有图片添加到页面中后，将请求锁打开
            _this.requestKey = true;
        } else {
            // 当没有数据返回时，说明已经没有更多的数据了，这时将展示信息更换为 "没有更多"
            _this.changeInfo(2);
        }
    },

    // 用来获取最短的li的下标
    getShortest: function () {
        var len = this.oLi.length,
            min = 0;
        for (var i = 1; i < len; i++) {
            if (this.oLi[min].offsetHeight > this.oLi[i].offsetHeight) {
                min = i;
            }
        }
        return min;
    },

    bindEvent: function () {
        var _this = this;

        // 当鼠标滚动到底部时，请求下一页的资源
        window.onscroll = function () {
            var clientHeight = document.documentElement.clientHeight || document.body.clientHeight,
                overHeight = document.documentElement.scrollTop || document.body.scrollTop,
                scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight,
                shortestLi = _this.oLi[_this.getShortest()].offsetHeight;

            // 这种方法不是当滚动条滚动到底部才请求新的资源，而是当滚动条超过最短的那一列li时，就请求新的资源
            // if (shortestLi <= (clientHeight + overHeight)) {
            //     if (_this.requestKey) {
            //         _this.requestKey = false;
            //         _this.getData();
            //     }
            // }

            if (overHeight + clientHeight == scrollHeight) {
                if (_this.requestKey) {
                    _this.requestKey = false;
                    _this.getData();
                }
            }
        }
    },

    // 用来更改展示信息
    changeInfo: function (status) {
        var text;
        switch (status) {
            case 0:
                text = '正在加载,请稍后...';
                break;
            case 1:
                text = '查看更多';
                break;
            case 2:
                text = '没有更多了';
                break;
        }
        this.infoText.innerText = text;
    }
}

waterfall.init();