$(document).ready(function () {
    svg4everybody({});
});


// Полифилы

// forEach IE 11
if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

// closest IE 11
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

// matches IE 11
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

//Array.form IE 11
if (!Array.from) {
    Array.from = function (object) {
        'use strict';
        return [].slice.call(object);
    };
}


$(document).ready(function () {

//Мобильное меню
if (window.matchMedia("(max-width: 770px)").matches) {
    $(function() {
      $(document).on("click", ".menu-container .nav-menu__item-parent a", function(e) {
          e.preventDefault();
          $(".menu-container .activity").removeClass("activity");
          $(this).siblings("ul").addClass("loaded").addClass("activity");
      });
      $(document).on("click", ".menu-container .nav-submenu__item-back a", function(e) {
          e.preventDefault();
          $(".menu-container .activity").removeClass("activity");
          $(this).parent().parent().removeClass("loaded");
          $(this).parent().parent().parent().parent().addClass("activity");
      });
      $(document).on("click", ".toolbar__burger", function(e) {
          e.preventDefault();
          $(".menu-container").addClass("loaded");
          $(".mobile-menu__overlay").fadeIn();
      });
      $(document).on("click", ".mobile-menu__overlay", function(e) {
          $(".menu-container").removeClass("loaded");
          $(this).fadeOut(function() {
              $(".menu-container .loaded").removeClass("loaded");
              $(".menu-container .activity").removeClass("activity");
          });
      });
  });
}


//Слайдер на первом экране главной страницы
$('.hero-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    fade: true,
    cssEase: 'linear',
    dots: true,
    dotsClass: "hero-dots",
    //autoplay: true,
    //autoplaySpeed: 3000,
    nextArrow: document.querySelector('#hero-next'),
    prevArrow: document.querySelector('#hero-prev')
  });


//Слайдер с отзывами на главной странице
$('.review-slider___list').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    fade: true,
    cssEase: 'linear',
    dots: true,
    appendDots: $('.reviews-slider__dots'),
    //autoplay: true,
    //autoplaySpeed: 3000,
    nextArrow: document.querySelector('#reviews-next'),
    prevArrow: document.querySelector('#reviews-prev')
  });
 

//Слайдер с категориями товаров
var catLength = $('.index-category__item').length;
var catSlider = $('[data-slider="category"]');

$('.index-category__list').slick({
  infinite: true,
  slidesToShow: catLength,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  autoplay: true,
  autoplaySpeed: 2000,
  focusOnSelect: true,
  asNavFor: catSlider
});

catSlider.slick({
  draggable: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  cssEase: 'linear',
  asNavFor: '.index-category__list'
});

//Выводим номер текущего слайда
$(".index-category__list").on('afterChange', function(event, slick, currentSlide){
  $("#current").text(currentSlide + 1);
});

//Выводим общее кол-во слайдов
$("#total").text(catLength)

//Кастомный autoplay для слайдера с категориями
function autoplayCategorySlider() {
  $( ".index-category .slick-next" ).trigger( "click" );
}
setInterval(autoplayCategorySlider, 10000);


//Слайдер с постами из блога
var blogLength = $('.blog-preview__item').length;
var blogSlider = $('[data-slider="blog"]');

$('.blog-preview__list').slick({
  arrows: true,
  infinite: true,
  slidesToShow: blogLength,
  slidesToScroll: 1,
  focusOnSelect: true,
  asNavFor: blogSlider
});

blogSlider.slick({
  arrows: true,
  draggable: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  cssEase: 'linear',
  asNavFor: '.blog-preview__list'
});

$('#blog-next').click(function() {
  $( ".blog .slick-next" ).trigger( "click" );
});

$('#blog-prev').click(function() {
  $( ".blog .slick-prev" ).trigger( "click" );
});

function autoplayBlobSlider() {
  $( ".blog .slick-next" ).trigger( "click" );
}
setInterval(autoplayBlobSlider, 10000);



//Слайдер с товарами + прогресс бар
  function setProgressProduct(index) {
    const calc = ((index + 1) / ($sliderProduct.slick('getSlick').slideCount)) * 100;
  
    $progressBarProduct
      .css('background-size', `${calc}% 100%`)
      .attr('aria-valuenow', calc);

  }
  
  const $sliderProduct = $('.product-slider__list');
  const $progressBarProduct = $('#progressBarProduct');
  
  $sliderProduct.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    setProgressProduct(nextSlide);
  });
  
  $sliderProduct.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 0,
    //autoplay: true,
    //autoplaySpeed: 3000,
    nextArrow: document.querySelector('#catalog-next'),
    prevArrow: document.querySelector('#catalog-prev')
  });  
  
  setProgressProduct(0);


//Слайдер с постами из инсты + прогресс бар
function setProgressInstagram(index) {
    const calc = ((index + 1) / ($sliderInstagram.slick('getSlick').slideCount)) * 100;
  
    $progressBarInstagram
      .css('background-size', `${calc}% 100%`)
      .attr('aria-valuenow', calc);

  }
  
  const $sliderInstagram = $('.instagram-slider__list');
  const $progressBarInstagram = $('#progressBarInstagram');
  
  $sliderInstagram.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    setProgressInstagram(nextSlide);
  });
  
  $sliderInstagram.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    rows: 0,
    //autoplay: true,
    //autoplaySpeed: 3000,
    nextArrow: document.querySelector('#inst-next'),
    prevArrow: document.querySelector('#inst-prev')
  });  
  
  setProgressInstagram(0);


  $('.accordion-item__title').click(function () {

    var faqItemIcon = $(this).find('.accordion-item__icon');

    if(faqItemIcon.hasClass('accordion-item__icon_active')) {
        faqItemIcon.removeClass('accordion-item__icon_active');
    } else {
        faqItemIcon.addClass('accordion-item__icon_active');
    }

    $(this).parent().toggleClass('accordion-item_active');
  });


  $("#ConsultSubmit").click(function() {
    $.fancybox.close($('#consult'));
    $.fancybox.open($('#success'));

    setTimeout(function() {
      $.fancybox.close($('#success'));
    }, 5000);

  }); 
  
  $("#actionSubmit").click(function() {
    $('.action-form__success').addClass('action-form__success-show');
    setTimeout(function() {
      $('.action-form__success').removeClass('action-form__success-show');
    }, 10000);
  }); 

  //Кнопка "Наверх"
  (function () {
    $(document).on('scroll', function () {
      if ($(document).scrollTop() > 400) {
        $('.back-top').show();
      } else {
        $('.back-top').hide();
      }
    });
    $('.back-top').on('click', function () {
      $('html, body').animate({
        scrollTop: 0
      }, 'slow');
      return false;
    });
  })();

  $('.seo-open').click(function () {
    $('.seo-wrapper__hidden').slideToggle('slow');
    $('.seo-open').toggleClass('seo-close');
  });


});



