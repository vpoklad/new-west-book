function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha:
      'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation:
      'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = 'data:image/webp;base64,' + kTestImages[feature];
}
function isWebp(feature, result) {
  document.body.classList.add(result ? 'webP' : 'noWebp');
}
check_webp_feature('lossy', isWebp);

const newWest = {
  init() {
    newWest.binds();
  },
  binds() {
    document
      .querySelectorAll('.toggle-activity-btn')
      .forEach(btn => btn.addEventListener('click', toggleActivityVisible));
    let scrollToTopBtn = document.querySelector('.scrollup');

    const menuBtnRef = document.querySelector('[data-menu-button]');
    const mobileMenuRef = document.querySelector('[data-menu]');
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

    menuBtnRef.addEventListener('click', () => {
      menuBtnRef.classList.toggle('is-open');
      menuBtnRef.setAttribute('aria-expanded', !expanded);

      mobileMenuRef.classList.toggle('is-open');
      document.body.classList.toggle('is-open');
    });
    mobileMenuRef.addEventListener('click', () => {
      menuBtnRef.classList.toggle('is-open');
      menuBtnRef.setAttribute('aria-expanded', !expanded);

      mobileMenuRef.classList.toggle('is-open');
      document.body.classList.toggle('is-open');
    });

    window.onscroll = throttle(scrollFunction, 500);

    function throttle(func, ms) {
      let isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {
        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;
          return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function () {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    }
    function scrollFunction() {
      if (
        document.body.scrollTop > 466 ||
        document.documentElement.scrollTop > 466
      ) {
        document.querySelector('.nav').classList.add('nav--sticky');

        scrollToTopBtn.classList.add('showBtn');
      } else {
        document.querySelector('.nav').classList.remove('nav--sticky');

        scrollToTopBtn.classList.remove('showBtn');
      }
      function scrollToTop() {
        document.querySelector('.hero').scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
      scrollToTopBtn.addEventListener('click', scrollToTop);
    }
    function toggleActivityVisible() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    }
  },
};
document.addEventListener('DOMContentLoaded', newWest.init);
