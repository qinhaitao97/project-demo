
(function () {
    var $wrapper = $('.wrapper');
    
    $('.grid').on('click', function () {
        $wrapper.addClass('active-wrapper');
        $(this).addClass('active-grid');
    });

    $('.close').on('click', function (e) {
        e.stopPropagation();
        $('.active-grid').removeClass('active-grid');
        $wrapper.removeClass('active-wrapper');
    });
}());