$(document).ready(function() {

    $('.main-welcome').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0],
            },
            pagination: {
                el: curSlider.find('.swiper-pagination')[0],
                clickable: true
            }
        });
    });

    $('.main-digits-list').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            autoHeight: true,
            slidesPerView: 1,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0],
            },
        });
    });

    $('.main-news').each(function() {
        var curSlider = $(this);
        var swiper = new Swiper(curSlider.find('.swiper')[0], {
            loop: true,
            spaceBetween: 60,
            slidesPerView: 4,
            navigation: {
                nextEl: curSlider.find('.swiper-button-next')[0],
                prevEl: curSlider.find('.swiper-button-prev')[0],
            },
        });
    });

    $('.tabs').each(function() {
        const curTabs = $(this);
        let menuHTML =  '<ul>';
        curTabs.find('> .tabs-container > .tabs-content').each(function() {
            menuHTML +=     '<li><a href="#">' + $(this).attr('data-title') + '</a></li>';
        });
        menuHTML +=     '</ul>';
        curTabs.find('> .tabs-menu').html(menuHTML);
        curTabs.find('> .tabs-menu li').eq(0).addClass('active');
        curTabs.find('> .tabs-container > .tabs-content').eq(0).addClass('active');
        curTabs.addClass('with-right');
    });

    $('body').on('click', '.tabs-menu ul li a', function(e) {
        const curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            var curTabs = curItem.parent().parent().parent();
            curTabs.find('> .tabs-menu ul li.active').removeClass('active');
            curItem.addClass('active');
            const curIndex = curTabs.find('> .tabs-menu ul li').index(curItem);
            curTabs.find('> .tabs-container > .tabs-content.active').removeClass('active');
            curTabs.find('> .tabs-container > .tabs-content').eq(curIndex).addClass('active');
            let curLeft = 0;
            for (let i = 0; i < curIndex; i++) {
                curLeft += curTabs.find('> .tabs-menu ul li').eq(i).outerWidth(true);
            }
            const curWidth = curTabs.find('> .tabs-menu ul li').eq(curIndex).width();
            const curMenuWidth = curTabs.find('> .tabs-menu ul').outerWidth(true);
            const curMenuWrapWidth = curTabs.find('> .tabs-menu').outerWidth();
            if (curMenuWidth > curMenuWrapWidth) {
                curTabs.find('> .tabs-menu').animate({'scrollLeft': (curLeft + 17 - curMenuWrapWidth / 2  + curWidth / 2) + 'px'});
            }
        }
        e.preventDefault();
    });

    $('.tabs-menu').on('scroll', function() {
        const curMenu = $(this);
        const curTabs = curMenu.parent();
        const curLeft = curMenu.scrollLeft();
        const curWidth = curMenu.outerWidth();
        const menuWidth = Math.floor(curMenu.find('> ul').outerWidth(true));
        if (curLeft == 0) {
            curTabs.removeClass('with-left');
        } else {
            curTabs.addClass('with-left');
        }
        if (curWidth + curLeft >= menuWidth) {
            curTabs.removeClass('with-right');
        } else {
            curTabs.addClass('with-right');
        }
    });

});

$(window).on('load resize scroll', function() {

    const windowScroll = $(window).scrollTop();

    const windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    const windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

});