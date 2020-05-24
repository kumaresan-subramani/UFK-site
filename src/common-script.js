    $(function () {
    $('#animate-icon').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('#platform').offset().top }, 1100, 'swing');
    });
    $('#animate-icon1').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $('#platform').offset().top }, 1300, 'swing');
    });

});

$(document).ready(function () {
    var $bar,
        $mobbar,
        $slick,
        isPause;

    $slick = $('.slider');
    $slick.slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }
        ]
    });

    $bar = $('.slider-progress .progress');
    $mobbar = $('.mob-slider-progress .mob-progress');
    $bar.data("origWidth", $($bar).width());
    $mobbar.data("origWidth", $($mobbar).width());
    function startProgressbar() {
        var prevButton = document.getElementsByClassName('slick-prev slick-arrow');
        var nextButton = document.getElementsByClassName('slick-next slick-arrow');
        for (var j = 0; j <= prevButton.length; j++) {
            if (prevButton[j] !== null && prevButton[j] !== undefined && nextButton[j] !== null && nextButton[j] !== undefined) {
                prevButton[j].textContent = '';
                prevButton[j].classList.add('sb-icons');
                nextButton[j].textContent = '';
                nextButton[j].classList.add('sb-icons');
            }
        }
        if(document.getElementsByClassName('slider-wrapper mob-slide')[0]) {
            document.getElementsByClassName('slider-wrapper mob-slide')[0].classList.add('mobile-mode');
        }
        isPause = false;
        interval();
    }
    function interval() {
        if (isPause === false) {
            $bar.width(0).animate({
                width:  $($bar).data("origWidth")
                }, 50000, function(){
                    $slick.slick('slickNext');
                    startProgressbar();
                    $bar.css("width","0px");
                });
            $mobbar.width(0).animate({
                width:  $($mobbar).data("origWidth")
                }, 50000, function(){
                    $slick.slick('slickNext');
                    startProgressbar();
                    $mobbar.css("width","0px");
                });
        }
    }
    startProgressbar();
    $('.slick-next, .slick-prev').click(function () {
        $bar.width(0);
        $mobbar.width(0);
        $bar.stop();
        $mobbar.stop();
        startProgressbar();
    });

});
var fixedelementPosition = document.getElementById('platform').offsetTop;

function fixedmenu() {
    var ele = document.getElementById('platform');
    var EletopPosition = ele.offsetTop;
    var screnPosition = $(window).scrollTop();

    if (screnPosition > EletopPosition && screnPosition >= fixedelementPosition) {
        ele.classList.add('fixed-menu');
    } else {
        ele.classList.remove('fixed-menu');
    }
}

