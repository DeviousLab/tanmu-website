jQuery(function ($) {
  'use strict';

  var $window = $(window);

  function updateFixedHeaders() {
    var topBarHeight = $('.top-bar').outerHeight() || 0;
    var logoAreaHeight = $('.header-one .logo-area').outerHeight() || 0;
    var $headerOneNavigation = $('.header-one .site-navigation');
    var $headerTwoNavigation = $('.header-two .site-navigation');

    if ($window.scrollTop() > topBarHeight + logoAreaHeight) {
      $headerOneNavigation.addClass('navbar-fixed');
      $('.header-one').css('margin-bottom', $headerOneNavigation.outerHeight());
    } else {
      $headerOneNavigation.removeClass('navbar-fixed');
      $('.header-one').css('margin-bottom', 0);
    }

    if ($window.scrollTop() > topBarHeight) {
      $headerTwoNavigation.addClass('navbar-fixed');
      $('.header-two').css('margin-bottom', $headerTwoNavigation.outerHeight());
    } else {
      $headerTwoNavigation.removeClass('navbar-fixed');
      $('.header-two').css('margin-bottom', 0);
    }
  }

  function updateCounters() {
    var viewportBottom = $window.scrollTop() + $window.height();

    $('.counterUp').each(function () {
      var $counter = $(this);

      if ($counter.data('animated') || $counter.offset().top > viewportBottom) {
        return;
      }

      $counter.data('animated', true);
      $({ countNum: Number($counter.text()) || 0 }).animate(
        { countNum: Number($counter.attr('data-count')) || 0 },
        {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $counter.text(Math.floor(this.countNum));
          },
          complete: function () {
            $counter.text(this.countNum);
          }
        }
      );
    });
  }

  function updateBackToTopButton() {
    var $button = $('#back-to-top');

    if ($window.scrollTop() >= 50) {
      $button.fadeIn();
    } else {
      $button.fadeOut();
    }
  }

  function handleScroll() {
    updateFixedHeaders();
    updateCounters();
    updateBackToTopButton();
  }

  $window.on('scroll', handleScroll);
  handleScroll();

  $('.nav-search').on('click', function () {
    $('.search-block').fadeIn(350);
  });

  $('.search-close').on('click', function () {
    $('.search-block').fadeOut(350);
  });

  if ($window.width() < 992) {
    $('.site-navigation .dropdown-toggle').on('click', function () {
      $(this).siblings('.dropdown-menu').animate({ height: 'toggle' }, 300);
    });

    $('.site-navigation .navbar-collapse').css(
      'max-height',
      'calc(100vh - ' + $('.site-navigation').outerHeight() + 'px)'
    );
  }

  $('#back-to-top').on('click', function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({ scrollTop: 0 }, 800);
    return false;
  });

  $('.banner-carousel.banner-carousel-1')
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      dots: true,
      speed: 600,
      arrows: true,
      prevArrow:
        '<button type="button" class="carousel-control left" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="carousel-control right" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>'
    })
    .slickAnimation();

  $('.banner-carousel.banner-carousel-2, .page-slider').slick({
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    speed: 600,
    arrows: true,
    prevArrow:
      '<button type="button" class="carousel-control left" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="carousel-control right" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>'
  });

  if ($('.shuffle-wrapper').length) {
    var shuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
      itemSelector: '.shuffle-item',
      sizer: '.shuffle-sizer',
      buffer: 1
    });

    $('input[name="shuffle-filter"]').on('change', function (event) {
      if (event.currentTarget.checked) {
        shuffle.filter(event.currentTarget.value);
      }
    });

    $('.shuffle-btn-group label').on('click', function () {
      $('.shuffle-btn-group label').removeClass('active');
      $(this).addClass('active');
    });
  }

  $('.testimonial-slide').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    speed: 600,
    arrows: false
  });

  $('.team-slide').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    prevArrow:
      '<button type="button" class="carousel-control left" aria-label="Previous slide"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="carousel-control right" aria-label="Next slide"><i class="fas fa-chevron-right"></i></button>',
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 481, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  });

  $('.gallery-popup').colorbox({
    rel: 'gallery-popup',
    transition: 'slideshow',
    innerHeight: '500'
  });

  $('.popup').colorbox({
    iframe: true,
    innerWidth: 600,
    innerHeight: 400
  });
});
