$(document).ready(function() {

    $('.header-burger-link').click(function(e) {
        if ($('html').hasClass('menu-burger-open')) {
            $('html').removeClass('menu-burger-open');
            if ($(window).width() < 768) {
                $('meta[name="viewport"]').attr('content', 'width=device-width');
                $(window).scrollTop($('html').data('scrollTop'));
            }
        } else {
            var curWidth = $(window).width();
            if (curWidth < 375) {
                curWidth = 375;
            }
            var curScroll = $(window).scrollTop();
            $('html').addClass('menu-burger-open');
            if ($(window).width() < 768) {
                $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
                $('html').data('scrollTop', curScroll);
            }
        }
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('header').length == 0 && !$(e.target).is('header')) {
            if ($('html').hasClass('menu-burger-open')) {
                $('html').removeClass('menu-burger-open');
                if ($(window).width() < 768) {
                    $('meta[name="viewport"]').attr('content', 'width=device-width');
                    $(window).scrollTop($('html').data('scrollTop'));
                }
            }
        }
    });

    $.validator.addMethod('phoneRU',
        function(phone_number, element) {
            return this.optional(element) || phone_number.match(/^\+7 \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/);
        },
        'Ошибка заполнения'
    );

    $('body').on('click', '.form-input-clear', function(e) {
        const curField = $(this).parents().filter('.form-input');
        curField.find('input').val('').trigger('focus').addClass('focus');
        e.preventDefault();
    });

    $('.form-files').each(function() {
        var curFiles = $(this);
        if (curFiles.find('.form-files-list-item').length > 0) {
            curFiles.addClass('full');
            curFiles.find('.files-required').val('true');
        }
    });

    $('body').on('click', '.form-files-list-item-remove', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        $.ajax({
            type: 'GET',
            url: curLink.attr('href'),
            dataType: 'json',
            cache: false
        }).done(function(data) {
            curLink.parent().remove();
            if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
                curFiles.removeClass('full');
                curFiles.find('.files-required').val('');
            }
        });
        e.preventDefault();
    });

    $('body').on('click', '.form-files-list-item-cancel', function(e) {
        var curLink = $(this);
        var curFiles = curLink.parents().filter('.form-files');
        curLink.parent().remove();
        if (curFiles.find('.form-files-list-item-progress, .form-files-list-item').length == 0) {
            curFiles.removeClass('full');
            curFiles.find('.files-required').val('');
        }
        e.preventDefault();
    });

    $(document).bind('drop dragover', function (e) {
        e.preventDefault();
    });

    $(document).bind('dragover', function (e) {
        var dropZones = $('.form-files-dropzone'),
            timeout = window.dropZoneTimeout;
        if (timeout) {
            clearTimeout(timeout);
        } else {
            dropZones.addClass('in');
        }
        var hoveredDropZone = $(e.target).closest(dropZones);
        dropZones.not(hoveredDropZone).removeClass('hover');
        hoveredDropZone.addClass('hover');
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZones.removeClass('in hover');
        }, 100);
    });

    $('body').on('click', '.form-files-dropzone', function(e) {
        var curLink = $(this);
        var curFiles = $(this).parents().filter('.form-files');
        curFiles.find('.form-files-input input').click();
        e.preventDefault();
    });

    $('form').each(function() {
        initForm($(this));
    });

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

    $('.search-form-input input').each(function() {
        const curValue = $(this).val();
        if (curValue != '') {
            $('.search-form-input').addClass('full');
        }
    });

    $('.search-form-input-clear').click(function(e) {
        $('.search-form-input input').val('');
        $('.search-form-input').removeClass('full');
        e.preventDefault();
    });

    $('.search-form-input input').on('input', function() {
        const curValue = $(this).val();
        if (curValue != '') {
            $('.search-form-input').addClass('full');
        } else {
            $('.search-form-input').removeClass('full');
        }
    });

    $('.contacts-item-text-copy').click(function (e) {
        const curLink = $(this);
        navigator.clipboard.writeText(curLink.attr('data-clipboard-text'));
        alert(curLink.attr('data-clipboard-success'));
        e.preventDefault();
    });

});

$(window).on('load resize scroll', function() {

    const windowScroll = $(window).scrollTop();

    const windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    const windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();

});

function initForm(curForm) {
    curForm.find('input.phoneRU').attr('autocomplete', 'off');
    curForm.find('input.phoneRU').mask('+7 (000) 000-00-00');

    curForm.find('.form-input input, .form-input textarea').each(function() {
        if ($(this).val() != '') {
            $(this).parent().addClass('full');
        }
    });

    curForm.find('.form-input input, .form-input textarea').focus(function() {
        $(this).parent().addClass('focus');
    });

    curForm.find('.form-input input, .form-input textarea').blur(function(e) {
        $(this).parent().removeClass('focus');
        if ($(this).val() == '') {
            $(this).parent().removeClass('full');
        } else {
            $(this).parent().addClass('full');
        }
        if (e.originalEvent !== undefined && $(e.originalEvent.relatedTarget).hasClass('form-input-clear')) {
            $(this).parent().find('.form-input-clear').trigger('click');
        }
    });

    curForm.find('.form-input textarea').each(function() {
        $(this).css({'height': this.scrollHeight, 'overflow-y': 'hidden'});
        $(this).on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });

    curForm.find('input[autofocus]').trigger('focus');

    curForm.find('.form-select select').each(function() {
        var curSelect = $(this);
        var options = {
            minimumResultsForSearch: 10,
        };
        if (typeof(curSelect.attr('data-searchplaceholder')) != 'undefined') {
            options['searchInputPlaceholder'] = curSelect.attr('data-searchplaceholder');
        }
        if (curForm.hasClass('clinics-ctrl')) {
            options['allowClear'] = true;
        }
        curSelect.select2(options);
        curSelect.parent().find('.select2-container').attr('data-placeholder', curSelect.attr('data-placeholder'));
        curSelect.on('select2:select', function(e) {
            $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
            $(e.delegateTarget).parent().find('.select2-search--inline input').val('').trigger('input.search').trigger('focus');
            $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            curSelect.parent().find('select.error').removeClass('error');
            curSelect.parent().find('label.error').remove();
            curSelect.parent().find('select').addClass('valid');
        });
        curSelect.on('select2:unselect', function(e) {
            if (curSelect.find('option:selected').length == 0) {
                $(e.delegateTarget).parent().find('.select2-container').removeClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-placeholder'));
            } else {
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            }
        });
        if (typeof(curSelect.attr('multiple')) != 'undefined') {
            curSelect.on('select2:open', function(e) {
                $(e.delegateTarget).parent().find('.select2-container').addClass('select2-container--full');
                $(e.delegateTarget).parent().find('.select2-search--inline input').attr('placeholder', curSelect.attr('data-searchplaceholder'));
            });
        }
        if (curSelect.find('option:selected').length > 0 && curSelect.find('option:selected').html() != '') {
            curSelect.trigger({type: 'select2:select'})
        }
    });

    curForm.on('reset', function() {
        curForm.find('.form-files-list-item-remove').trigger('click');
        curForm.find('.form-select select').val(null).trigger('change');
    });

    curForm.find('.form-captcha').each(function() {
        if ($('script#smartCaptchaScript').length == 0) {
            $('body').append('<script src="https://captcha-api.yandex.ru/captcha.js?render=onload&onload=smartCaptchaLoad" defer id="smartCaptchaScript"></script>');
        } else {
            if (window.smartCaptcha) {
                var curID = window.smartCaptcha.render(this, {
                    sitekey: smartCaptchaKey,
                    callback: smartCaptchaCallback,
                    invisible: true,
                    hideShield: true,
                });
                $(this).attr('data-smartid', curID);
            }
        }
    });

    curForm.validate({
        ignore: '',
        submitHandler: function(form) {
            var curForm = $(form);

            var smartCaptchaWaiting = false;
            curForm.find('.form-captcha').each(function() {
                if (curForm.attr('form-smartcaptchawaiting') != 'true') {
                    var curBlock = $(this);
                    var curInput = curBlock.find('input[name="smart-token"]');
                    curInput.removeAttr('value');
                    smartCaptchaWaiting = true;
                    $('form[form-smartcaptchawaiting]').removeAttr('form-smartcaptchawaiting');
                    curForm.attr('form-smartcaptchawaiting', 'false');

                    if (!window.smartCaptcha) {
                        alert('Сервис временно недоступен');
                        return;
                    }
                    var curID = $(this).attr('data-smartid');
                    window.smartCaptcha.execute(curID);
                } else {
                    curForm.removeAttr('form-smartcaptchawaiting');
                }
            });

            if (!smartCaptchaWaiting) {
                form.submit();
            }
        }
    });
}

var smartCaptchaKey = 'uahGSHTKJqjaJ0ezlhjrbOYH4OxS6zzL9CZ47OgY';

function smartCaptchaLoad() {
    $('.form-captcha').each(function() {
        if (!window.smartCaptcha) {
            return;
        }
        var curID = window.smartCaptcha.render(this, {
            sitekey: smartCaptchaKey,
            callback: smartCaptchaCallback,
            invisible: true,
            hideShield: true,
        });
        $(this).attr('data-smartid', curID);
    });
}

function smartCaptchaCallback(token) {
    $('form[form-smartcaptchawaiting]').attr('form-smartcaptchawaiting', 'true');
    $('form[form-smartcaptchawaiting] input[type="submit"]').trigger('click');
}
