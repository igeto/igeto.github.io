var navbar = $(".navbar");

$(window).scroll(function() {
    if ($(this).scrollTop() > 706) {
        navbar.addClass("navbar-scrolled");
    } else {
        navbar.removeClass("navbar-scrolled");
    }
});

$('body').scrollspy({ target: '#navbar' });

$(window).scroll(function() {
    if ($(this).scrollTop() > 1500) {
        $(".html").addClass("html_progress-bar");
        $(".css").addClass("css_progress-bar");
        $(".js").addClass("js_progress-bar");
        $(".bs").addClass("bs_progress-bar");
        $(".jquery").addClass("jquery_progress-bar");
    } else {
        $(".html").removeClass("html_progress-bar");
        $(".css").removeClass("css_progress-bar");
        $(".js").removeClass("js_progress-bar");
        $(".bs").removeClass("bs_progress-bar");
        $(".jquery").removeClass("jquery_progress-bar");
    }
});

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
