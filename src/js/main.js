$(document).ready(function() {
    $('#fullpage').fullpage({
      menu: '#menu',
      anchors:['first', 'about', 'works', 'contact'],
      css3: true,
      navigation: true,
      navigationPosition: 'right'
    });

    $('.burger').on('click', function () {
      $('.main-menu').addClass('is-open');
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
