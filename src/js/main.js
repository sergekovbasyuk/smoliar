$(document).ready(function() {
    var burger = $('.burger'),
        mainMenu = $('.main-menu');

    $('#fullpage').fullpage({
      menu: '#menu',
      anchors:['first', 'about', 'works', 'contact'],
      css3: true,
      slidesNavigation: true,
      slidesNavPosition: 'bottom'
    });

    burger.on('click', function () {
      mainMenu.addClass('is-open');
      burger.hide();
    });

    $('.close-icon').on('click', function () {
      mainMenu.removeClass('is-open');
      burger.show();
    });

    $('.arrow-up').on('click', function (e) {
      e.preventDefault();
      $.fn.fullpage.moveSectionUp();
    });

    $('.arrow-down, .link--scroll').on('click', function (e) {
      e.preventDefault();
      $.fn.fullpage.moveSectionDown();
    });
});
