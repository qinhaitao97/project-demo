
var doubanSearch = {
    oSearch: $('.wd'),
    renderCount: 5,

    init: function() {
        this.bindEvent();
    },
    
    bindEvent: function() {
        var _this = this;
        _this.oSearch.on('input', function () {
            _this.getData(this.value);
        });
    },

    getData: function(inputData) {
        $.ajax({
            type: 'GET',
            url: './php/getPics.php',
            // url: 'https://music.douban.com/j/subject_suggest',
            // url: 'https://api.douban.com/v2/music/search',
            data: inputData,
            // dataType: 'jsonp',
            context: this,
            success: this.renderList
        });
    },

    renderList: function (retData) {
        console.log(typeof retData);
        retData = JSON.parse(retData);
        var str = '',
            type;
        
        retData.forEach(function (ele, index) {
            // switch (ele.type) {
            //     case 'a':
            //         type = '音乐人';
            //     case 'l': 

            // }
            str += '<li>\
                        <div class="info">\
                            <a href="' + ele.url + '">\
                                <img src="' + ele.pic + '">\
                                <span class="title">' + ele.title + '</span>\
                                <span class="type">' + ele.type + '</span>\
                                <span class="desc">' + ele.en_name + '</span>\
                            </a>\
                        </div>\
                    </li>';
        });
        $('.info-list ul').html(str);      
    }
}

doubanSearch.init();


