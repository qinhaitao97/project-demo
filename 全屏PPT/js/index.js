
var ppt = {
    // 要展示的PPT的个数
    len: $('.show-page li').length,
    // 上一张展示的PPT
    lastIndex: 0,
    // 当前正在展示的PPT
    nowIndex: 0,
    // 自动轮播的计时器
    autoTimer: null,
    // 更换展示的锁
    key: true,

    // 初始化函数：调用一些初始的功能函数
    init: function () {
        // 当展示PPT的个数大于1时，才生成按钮、索引等DOM元素
        if (this.len > 1) {
            this.createDom();
            this.bindEvent();
            this.auto();
        }
    },

    // 生成按钮、索引等DOM结构
    createDom: function () {
        var indexStr = '',
            btnStr = '';
        btnStr = '<div class="btn">\
                      <span class="left-btn"></span>\
                      <span class="right-btn"></span>\
                  </div>';
        for (var i = 0; i < this.len; i++) {
            if (i == 0) {
                indexStr += '<li class="active">' + (i + 1) + '</li>';
            } else {
                indexStr += '<li>' + (i + 1) + '</li>';
            }        
        }
        indexStr = '<div class="index"><ul>' + indexStr + '</ul></div>';
        $('.wrapper').append(btnStr).append(indexStr);
    },

    // 给左右切换按钮、轮播索引按钮绑定事件
    bindEvent: function () {
        var _this = this,
            attr;
        $('.index li').add($('.left-btn')).add($('.right-btn')).on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                attr = 'left';
            } else if ($(this).attr('class') == 'right-btn') {
                attr = 'right';
            } else {
                attr = $(this).index();
            }
            // 如果更换展示的锁是开着的，才可以更换展示，否则说明当前已经处于更换的过程中，不能再次进行更换
            if (_this.key) {
                _this.key = false;
                // 调用一系列更换展示PPT需要的方法
                _this.tool(attr);
            }
        });
    },

    // 根据不同事件类型，将索引值更新到当前展示的PPT
    getIndex: function (direc) {
        // 记录上一张展示的PPT的索引
        this.lastIndex = this.nowIndex;
        if (direc == 'left' || direc == 'right') {
            if (direc == 'left') {
                this.nowIndex = this.nowIndex == 0 ? this.len - 1 : this.nowIndex - 1;
            } else {
                this.nowIndex = this.nowIndex == this.len - 1 ? 0 : this.nowIndex + 1;
            }
        } else {
            this.nowIndex = direc;
        }
    },

    changeActive: function () {
        $('.index .active').removeClass('active');
        $('.index li').eq(this.nowIndex).addClass('active');
    },

    action: function () {
        var _this = this;
        // show-page 的动画效果
        $('.show-page li').eq(_this.lastIndex).fadeOut(function (){
            $('.show-page li').eq(_this.nowIndex).fadeIn(function () {
                _this.key = true;
                _this.auto();
            });
        });
        
        // 小图片的动画效果
        $('.pic li').eq(_this.lastIndex).slideToggle(function (){
            $('.pic li').eq(_this.nowIndex).slideToggle();
        });

        // 文字效果
        $('.page .info').animate({width: '0%', height: '0%'}, function (){
            $(this).animate({width: '20%', height: '35%'});
        });
    },
    
    tool: function (attr) {
        // 更换索引
        this.getIndex(attr);
        // 更改索引列表样式
        this.changeActive();
        // 执行更改动画
        this.action();
    },

    auto: function () {
        var _this = this;
        // 清除上一个正在工作的计时器
        clearTimeout(_this.autoTimer);
        // 自动轮播

        if (_this.key) {
            _this.autoTimer = setTimeout(function () {
                _this.key = false;
                _this.tool('right');
            }, 2500);
        }
    }
}

ppt.init();
