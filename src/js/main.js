$(document).ready(function() {
    var burger = $('.burger'),
        mainMenu = $('.main-menu');

    $('#fullpage').fullpage({
      menu: '#menu',
      anchors:['first', 'about', 'works', 'contact'],
      css3: true,
      slidesNavigation: true,
      slidesNavPosition: 'bottom',
      afterRender: function(){
				$('video').get(0).play();
			},
      afterLoad: function(){
        $('video').get(0).play();
      }
    });

    burger.on('click', function () {
      mainMenu.addClass('is-open');
      burger.hide();
    });

    $('.close-icon, .main-menu__link').on('click', function () {
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
