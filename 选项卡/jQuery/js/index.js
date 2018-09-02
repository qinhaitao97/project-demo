
$('.navi li').click(function () {
    // 更换选项样式
    $('.navi .active').removeClass('active');
    $(this).addClass('active');

    var index = $(this).index();

    $('.show img').css('display', 'none');
    $('.show img').eq(index).css('display', 'block');
});
