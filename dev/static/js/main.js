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



});
