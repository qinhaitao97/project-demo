
var imgList = [
    './img/1.webp',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.webp'
]

var slideImg = {
    // 要展示的图片的数量(不包括最后一张重复的图片)
    len: 4,
    // 当前展示的图片索引
    nowIndex: 0,
    // 展示图片的宽度
    imgWidth: $('.show').width(),
    // 每一张图片被展示时，它的left值
    loc: [],
    // 切换展示时，给按钮上锁
    key: true,
    timer: null,
    
    // 初始函数，调用完成此项目功能必要的方法
    init: function () {
        this.createDom();
        this.addLoc();
        this.bindEvent();
        this.auto();
    },

    // 用来创建一系列DOM结构
    createDom: function () {
        this.createImgList();
    },

    // 根据后台传来的图片数据，生成相应的要展示的轮盘
    createImgList: function () {
        var str = '';
        for (var i = 0; i < this.len; i++) {
            // 这里的 a 标签的地址也应该是后台传来的数据，这里不实现点击跳转功能，所以这样写
            str += '<li><a href="javascript:void(0);"><img src="' + imgList[i] + '"></li>';
        }
        str += '<li><a href="javascript:void(0);"><img src="' + imgList[0] + '"></li>';
        $('.show .img-list').append(str);
    },

    // 计算每一张图片被展示时，它的left值
    addLoc: function () {
        for (var i = 0; i <= this.len; i++) {
            this.loc.push(-(i * this.imgWidth) + 'px');
        }  
    },

    // 绑定一系列事件
    bindEvent: function () {
        var _this = this,
            attr;
        $('.left-btn').add($('.right-btn')).add('.slide-index li').on('click', function () {
            if ($(this).attr('class') == 'left-btn') {
                attr = 'left';
            } else if ($(this).attr('class') == 'right-btn') {
                attr = 'right';
            } else {
                attr = $(this).index();
            }

            if (_this.key) {
                // 上锁
                _this.key = false;
                // 调用一系列方法
                _this.tool(attr);
            }
        });

        // 当鼠标以上时清空定时器，鼠标移开时设置定时器
        $('.wrapper')
            .on('mouseover', function () {
                $('.btn').css('display', 'block');
                clearTimeout(_this.timer);
            })
            .on('mouseleave', function () {
                $('.btn').css('display', 'none');
                _this.auto();
            });
    },
    
    tool: function (attr) {
        this.skip(attr);
        this.getIndex(attr);
        this.changeIndex();
        this.move();
    },

    // 更新索引前先判断边界条件：已经点击了切换展示的按钮(左、右、索引)，但还没有切换前，根据点击的是哪一种按钮和当前的索引处理一些边界条件
    skip: function (attr) {
        // 如果点击'left-btn'且当前的索引值为0,说明在切换样式前轮盘处于第一张图片的位置，这时要把轮盘移动到重置页所在的位置
        if (attr == 'left' && this.nowIndex == 0) {
            this.nowIndex = this.len;
            $('.img-list').css('left', this.loc[this.nowIndex]);
        }

        // 如果点击 'right-btn'且当前的索引值为len(重置页),这时要把轮盘整体移动到第一张所在的位置
        if (attr == 'right' && this.nowIndex == this.len) {
            this.nowIndex = 0;
            $('.img-list').css('left', this.loc[this.nowIndex]);
        }
    },

    getIndex: function (attr) {
        if (attr == 'left' || attr == 'right') {
            // this.skip(attr);
            this.nowIndex = attr == 'left' ? --this.nowIndex : ++this.nowIndex;
        } else {
            this.nowIndex = attr;
        }
    },

    // 根据当前的索引值改变轮播索引的样式，这个项目中一共有要展示4张图片，因为有一张重置页，
    // 所以一共是5张图片，this.nowIndex 的取值是 0, 1, 2, 3, 4; 点击 'left-btn' 时this.nowIndex
    // 在 0,1,2,3 中取值，点击 'right-btn' 时this.nowIndex在 1,2,3,4中取值，轮播索引按钮只有4个，
    // this.nowIndex = 4时按照0设置样式
    changeIndex: function () {
        $('.slide-index .active').removeClass('active');
        if (this.nowIndex == this.len) {
            $('.slide-index li').eq(0).addClass('active');
        } else {
            $('.slide-index li').eq(this.nowIndex).addClass('active');
        }
    },

    // 根据当前索引，将轮盘移动到相应的位置上
    move: function (loc) {
        var _this = this;
        $('.img-list').animate({left: this.loc[this.nowIndex]}, 300, function () {
            _this.key = true;
            _this.auto();
        });
    },

    // 自动轮播
    auto: function () {
        var _this = this;
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function () {
            if (_this.key) {
                _this.key = false;
                _this.tool('right');
            }
        }, 2500);
    }
}

slideImg.init();