
var images = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './img/11.jpg',
    './img/12.jpg',
    './img/13.jpg',
];

var photo = {
    len: images.length,
    index: 0,
    screenWidth: $(window).width(),
    screenHeight: $(window).height(),
    init: function () {
        this.createDom();
        this.bindEvent();
    },

    createDom: function () {
        var str = '';
        for (var i = 0; i < this.len; i++) {
            str += '<li><img src="' + images[i] + '"></li>';
        }
        $('.photos').append(str);
        $('.photos li').css('height', $('.photos li').width());
    },

    bindEvent: function () {
        var _this = this;
        $('.photos').on('tap', 'li', function () {
            $('.show').fadeIn(300);
            _this.index = $(this).index();
            _this.show();
        });

        $('.show').
            on('tap', function () {
                $(this).fadeOut(300);
            }).
            on('swipeLeft', function () {
                if (_this.index < _this.len - 1) {
                    _this.index++;
                    _this.show();
                }
            }).
            on('swipeRight', function () {
                if (_this.index > 0) {
                    _this.index--;
                    _this.show();
                }
            });
    },

    show: function () {
        var _this = this;
        $('.show img').attr('src', images[this.index]).on('load', function () {
            var imgWidth = $(this).width(),
                imgHeight = $(this).height();
            if (_this.screenWidth / _this.screenHeight > imgWidth / imgHeight) {
                $(this).css({width: 'auto', height: '100%'});
            } else {
                $(this).css({width: '100%', height: 'auto'});
            }
        });
    }
}

photo.init();