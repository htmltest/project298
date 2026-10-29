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

    $('body').on('click', '.window-link', function(e) {
        var curLink = $(this);
        windowOpen(curLink.attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close, .window-close-btn', function(e) {
        windowClose();
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
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

    $('.up-link').click(function(e) {
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

});

$(window).on('load resize scroll', function() {

    const windowScroll = $(window).scrollTop();

    const windowWidth = $(window).width();

    $('body').append('<div id="body-test-height" style="position:fixed; left:0; top:0; right:0; bottom:0; z-index:-1"></div>');
    const windowHeight = $('#body-test-height').height();
    $('#body-test-height').remove();
    
    if (windowScroll > 0) {
        $('header').addClass('fixed');
    } else {
        $('header').removeClass('fixed');
    }

    if ($('.up-link').length == 1) {
        if (windowScroll > windowHeight / 2) {
            $('.up-link').addClass('visible');
        } else {
            $('.up-link').removeClass('visible');
        }

        if (windowScroll + windowHeight > $('footer').offset().top) {
            $('.up-link').css({'margin-bottom': (windowScroll + windowHeight) - $('footer').offset().top});
        } else {
            $('.up-link').css({'margin-bottom': 0});
        }
    }

    $('.animated-block').each(function() {
        const curBlock = $(this);
        if (windowScroll + windowHeight > curBlock.offset().top) {
            curBlock.addClass('start');
        } else {
            curBlock.removeClass('start');
        }
    });

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

    curForm.find('.form-files').each(function() {
        var curFiles = $(this);
        var curInput = curFiles.find('.form-files-input input');

        var uploadURL = curInput.attr('data-uploadurl');
        var uploadFiles = curInput.attr('data-uploadfiles');
        var removeURL = curInput.attr('data-removeurl');
        curInput.fileupload({
            url: uploadURL,
            dataType: 'json',
            dropZone: curFiles.find('.form-files-dropzone'),
            pasteZone: curFiles.find('.form-files-dropzone'),
            add: function(e, data) {
                if (typeof curInput.attr('multiple') !== 'undefined') {
                    curFiles.find('.form-files-list').append('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></span></div>');
                } else {
                    curFiles.find('.form-files-list').html('<div class="form-files-list-item-progress"><span class="form-files-list-item-cancel"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></span></div>');
                }
                data.submit();
                curFiles.addClass('full');
            },
            done: function (e, data) {
                curFiles.find('.form-files-list-item-progress').eq(0).remove();
                if (data.result.status == 'success') {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.2857 0H21.7063L32 11.215V37.5C32 38.8812 30.9761 40 29.7143 40H2.2857C1.02395 40 0 38.8812 0 37.5V2.49998C0 1.11877 1.02406 0 2.2857 0Z" fill="#F0F0F7"/><path d="M31.9674 11.2494H24.0005C22.7388 11.2494 21.7148 10.1295 21.7148 8.74943V0.0244141L31.9674 11.2494Z" fill="#C7C7D9"/></svg><span>' + data.result.ext + '</span></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item"><div class="form-files-list-item-icon"><svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.2857 0H21.7063L32 11.215V37.5C32 38.8812 30.9761 40 29.7143 40H2.2857C1.02395 40 0 38.8812 0 37.5V2.49998C0 1.11877 1.02406 0 2.2857 0Z" fill="#F0F0F7"/><path d="M31.9674 11.2494H24.0005C22.7388 11.2494 21.7148 10.1295 21.7148 8.74943V0.0244141L31.9674 11.2494Z" fill="#C7C7D9"/></svg><span>' + data.result.ext + '</span></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name"><a href="' + data.result.url + '" download>' + data.result.path + '</a></div><div class="form-files-list-item-size">' + Number(data.result.size).toFixed(2) + ' Мб</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></a></div>');
                    }
                    curFiles.find('.files-required').val('true');
                    curFiles.find('label.error').remove();
                } else {
                    if (typeof curInput.attr('multiple') !== 'undefined') {
                        curFiles.find('.form-files-list').append('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.28613 0.5H21.4863L31.5 11.4082V37.5C31.5 38.648 30.6584 39.5 29.7139 39.5H2.28613C1.34161 39.5 0.5 38.648 0.5 37.5V2.5C0.5 1.352 1.34171 0.5 2.28613 0.5Z" fill="#F0F0F7" stroke="#BC3F46" /><path d="M31.9655 11.2494H23.9986C22.7368 11.2494 21.7129 10.1295 21.7129 8.74943V0.0244141L31.9655 11.2494Z" fill="#BC3F46" /><path d="M16.4782 26.7475C16.6086 26.6171 16.6738 26.4579 16.6738 26.2698C16.6738 26.0818 16.6086 25.9226 16.4782 25.7923C16.3479 25.662 16.1887 25.5969 16.0007 25.5969C15.8126 25.5969 15.6534 25.662 15.5232 25.7923C15.3927 25.9226 15.3275 26.0818 15.3275 26.2698C15.3275 26.4579 15.3927 26.6171 15.5232 26.7475C15.6534 26.8778 15.8126 26.9429 16.0007 26.9429C16.1887 26.9429 16.3479 26.8778 16.4782 26.7475ZM15.3757 23.8982H16.6257V18.8982H15.3757V23.8982ZM16.0021 30.9173C14.9071 30.9173 13.8779 30.7095 12.9144 30.294C11.9509 29.8784 11.1129 29.3145 10.4002 28.6021C9.6876 27.8897 9.12336 27.052 8.70753 26.089C8.29183 25.1259 8.08398 24.097 8.08398 23.0021C8.08398 21.9071 8.29176 20.8779 8.70732 19.9144C9.12287 18.9509 9.68683 18.1129 10.3992 17.4002C11.1116 16.6876 11.9493 16.1234 12.9123 15.7075C13.8754 15.2918 14.9043 15.084 15.9992 15.084C17.0942 15.084 18.1234 15.2918 19.0869 15.7073C20.0504 16.1229 20.8884 16.6868 21.6011 17.3992C22.3137 18.1116 22.8779 18.9493 23.2938 19.9123C23.7095 20.8754 23.9173 21.9043 23.9173 22.9992C23.9173 24.0942 23.7095 25.1234 23.294 26.0869C22.8784 27.0504 22.3145 27.8884 21.6021 28.6011C20.8897 29.3137 20.052 29.8779 19.089 30.2938C18.1259 30.7095 17.097 30.9173 16.0021 30.9173ZM16.0007 29.6673C17.8618 29.6673 19.4382 29.0215 20.7298 27.7298C22.0215 26.4382 22.6673 24.8618 22.6673 23.0007C22.6673 21.1395 22.0215 19.5632 20.7298 18.2715C19.4382 16.9798 17.8618 16.334 16.0007 16.334C14.1395 16.334 12.5632 16.9798 11.2715 18.2715C9.97982 19.5632 9.33398 21.1395 9.33398 23.0007C9.33398 24.8618 9.97982 26.4382 11.2715 27.7298C12.5632 29.0215 14.1395 29.6673 16.0007 29.6673Z" fill="#BC3F46" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></a></div>');
                    } else {
                        curFiles.find('.form-files-list').html('<div class="form-files-list-item error"><div class="form-files-list-item-icon"><svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.28613 0.5H21.4863L31.5 11.4082V37.5C31.5 38.648 30.6584 39.5 29.7139 39.5H2.28613C1.34161 39.5 0.5 38.648 0.5 37.5V2.5C0.5 1.352 1.34171 0.5 2.28613 0.5Z" fill="#F0F0F7" stroke="#BC3F46" /><path d="M31.9655 11.2494H23.9986C22.7368 11.2494 21.7129 10.1295 21.7129 8.74943V0.0244141L31.9655 11.2494Z" fill="#BC3F46" /><path d="M16.4782 26.7475C16.6086 26.6171 16.6738 26.4579 16.6738 26.2698C16.6738 26.0818 16.6086 25.9226 16.4782 25.7923C16.3479 25.662 16.1887 25.5969 16.0007 25.5969C15.8126 25.5969 15.6534 25.662 15.5232 25.7923C15.3927 25.9226 15.3275 26.0818 15.3275 26.2698C15.3275 26.4579 15.3927 26.6171 15.5232 26.7475C15.6534 26.8778 15.8126 26.9429 16.0007 26.9429C16.1887 26.9429 16.3479 26.8778 16.4782 26.7475ZM15.3757 23.8982H16.6257V18.8982H15.3757V23.8982ZM16.0021 30.9173C14.9071 30.9173 13.8779 30.7095 12.9144 30.294C11.9509 29.8784 11.1129 29.3145 10.4002 28.6021C9.6876 27.8897 9.12336 27.052 8.70753 26.089C8.29183 25.1259 8.08398 24.097 8.08398 23.0021C8.08398 21.9071 8.29176 20.8779 8.70732 19.9144C9.12287 18.9509 9.68683 18.1129 10.3992 17.4002C11.1116 16.6876 11.9493 16.1234 12.9123 15.7075C13.8754 15.2918 14.9043 15.084 15.9992 15.084C17.0942 15.084 18.1234 15.2918 19.0869 15.7073C20.0504 16.1229 20.8884 16.6868 21.6011 17.3992C22.3137 18.1116 22.8779 18.9493 23.2938 19.9123C23.7095 20.8754 23.9173 21.9043 23.9173 22.9992C23.9173 24.0942 23.7095 25.1234 23.294 26.0869C22.8784 27.0504 22.3145 27.8884 21.6021 28.6011C20.8897 29.3137 20.052 29.8779 19.089 30.2938C18.1259 30.7095 17.097 30.9173 16.0021 30.9173ZM16.0007 29.6673C17.8618 29.6673 19.4382 29.0215 20.7298 27.7298C22.0215 26.4382 22.6673 24.8618 22.6673 23.0007C22.6673 21.1395 22.0215 19.5632 20.7298 18.2715C19.4382 16.9798 17.8618 16.334 16.0007 16.334C14.1395 16.334 12.5632 16.9798 11.2715 18.2715C9.97982 19.5632 9.33398 21.1395 9.33398 23.0007C9.33398 24.8618 9.97982 26.4382 11.2715 27.7298C12.5632 29.0215 14.1395 29.6673 16.0007 29.6673Z" fill="#BC3F46" /></svg></div><div class="form-files-list-item-detail"><div class="form-files-list-item-name">' + data.result.path + '</div><div class="form-files-list-item-size">' + data.result.text + '</div></div><a href="' + removeURL + '?file=' + data.result.path + '" class="form-files-list-item-remove"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.6155 20.0002C7.168 20.0002 6.78683 19.8429 6.472 19.5282C6.15733 19.2134 6 18.8322 6 18.3847V6.00021H5V5.00021H9V4.23096H15V5.00021H19V6.00021H18V18.3847C18 18.845 17.8458 19.2294 17.5375 19.5377C17.2292 19.846 16.8448 20.0002 16.3845 20.0002H7.6155ZM17 6.00021H7V18.3847C7 18.5642 7.05767 18.7117 7.173 18.8272C7.2885 18.9425 7.436 19.0002 7.6155 19.0002H16.3845C16.5385 19.0002 16.6796 18.9361 16.8077 18.808C16.9359 18.6798 17 18.5387 17 18.3847V6.00021ZM9.80775 17.0002H10.8078V8.00021H9.80775V17.0002ZM13.1923 17.0002H14.1923V8.00021H13.1923V17.0002Z" /></svg></a></div>');
                    }
                }
                curFiles.addClass('full');
            }
        });
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
                if (curForm.hasClass('ajax-form')) {
                    windowOpen(curForm.attr('action'), new FormData(form));
                    curForm.trigger('reset');
                } else {
                    form.submit();
                }
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

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'padding-right': curPadding});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
    } else {
        $('.window').append('<div class="window-loading"></div>')
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
        }
        $('.window .window-loading').remove();
        window.setTimeout(function() {
            $('.window-container').removeClass('window-container-preload');
        }, 100);

        $('.window form').each(function() {
            initForm($(this));
        });
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        var isEmptyForm = true;
        $('.window:last .form-input input, .window:last .form-input textarea, .window:last .form-select select').each(function() {
            if ($(this).val() != '') {
                isEmptyForm = false;
            }
        });
        if (isEmptyForm) {
            $('.window').remove();
            $('html').removeClass('window-open');
            $('body').css({'padding-right': 0});
            $('.wrapper').css({'top': 'auto'});
            $(window).scrollTop($('.wrapper').data('curScroll'));
        } else {
            $('.window .form-input input, .window .form-input textarea, .window .form-select select').val('');
            windowClose();
        }
    }
}