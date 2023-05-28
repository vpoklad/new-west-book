const spreadsheetId = "1vqU_ckx97T2bnGuhAU5ihsOUyV7ZJqgSJhpwOTIl71k";
const parser = new PublicGoogleSheetsParser();

const onlineStoreList = document.querySelector(".online-store-list");
const bookStoreList = document.querySelector(".book-store-list");
const citySelect = document.querySelector("#city");
var bookStoreArr = [];
var renderOfflineArr = [];
var filter = "Київ";
parser
  .parse(spreadsheetId, "book-store")
  .then((items) => {
    if (items.length === 0) {
      return;
    }
    renderSelectOptions(items, citySelect);

    bookStoreArr = items;
    renderOfflineArr = filterStoreList(bookStoreArr, filter);
    renderOfflineStore(renderOfflineArr);
  })
  .catch((e) => console.log(e));

parser
  .parse(spreadsheetId, "online-store")
  .then((items) => {
    if (items.length === 0) {
      return;
    }
    renderOnlineStore(items);
  })
  .catch((e) => console.log(e));

citySelect.addEventListener("change", (e) => {
  renderOfflineArr = filterStoreList(bookStoreArr, e.target.value);
  renderOfflineStore(renderOfflineArr);
});

function renderSelectOptions(items, select) {
  const cities = items.map((el) => el.city);
  const sortedUniqCities = [...new Set(cities)].sort((a, b) =>
    a.localeCompare(b)
  );
  const options = sortedUniqCities.map((el) =>
    el === "Київ"
      ? `<option value="${el}" selected >${el}</option>}`
      : `<option value="${el}">${el}</option>}`
  );
  select.innerHTML = options.join(" ");
}

function renderOnlineStore(data) {
  const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
  const items = sortedData.map(
    (store) => `<li class="online-store-item">
     <a
       href="${store.link}"
       class="online-store-link link"
       target="_blank"
       rel="noopener noreferrer">
       ${store.name}
     </a>
   </li>`
  );
  onlineStoreList.innerHTML = items.join(" ");
}
function renderOfflineStore(data) {
  const items = data.map(
    (store) => `<li class="online-store-item">
              <address>
                <p class="offline-store__name">${store.name}</p>
                <p class="offline-store__address">${store.adress}</p>
              </address>
            </li>`
  );
  bookStoreList.innerHTML = items.join("");
}

function filterStoreList(array, filter) {
  return array.filter((el) => el.city === filter);
}

function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha:
      "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation:
      "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
  };
  var img = new Image();
  img.onload = function () {
    var result = img.width > 0 && img.height > 0;
    callback(feature, result);
  };
  img.onerror = function () {
    callback(feature, false);
  };
  img.src = "data:image/webp;base64," + kTestImages[feature];
}
function isWebp(feature, result) {
  document.body.classList.add(result ? "webP" : "noWebp");
}
check_webp_feature("lossy", isWebp);

const newWest = {
  init() {
    newWest.binds();
  },
  binds() {
    document
      .querySelectorAll(".toggle-activity-btn")
      .forEach((btn) => btn.addEventListener("click", toggleActivityVisible));
    let scrollToTopBtn = document.querySelector(".scrollup");
    let header = document.querySelector(".header");
    let sections = document.querySelectorAll("section[id]");

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }

    const menuBtnRef = document.querySelector("[data-menu-button]");
    const mobileMenuRef = document.querySelector("[data-menu]");
    const expanded =
      menuBtnRef.getAttribute("aria-expanded") === "true" || false;

    menuBtnRef.addEventListener("click", () => {
      menuBtnRef.classList.toggle("is-open");
      menuBtnRef.setAttribute("aria-expanded", !expanded);

      mobileMenuRef.classList.toggle("is-open");
      document.body.classList.toggle("is-open");
    });
    mobileMenuRef.addEventListener("click", () => {
      menuBtnRef.classList.toggle("is-open");
      menuBtnRef.setAttribute("aria-expanded", !expanded);

      mobileMenuRef.classList.toggle("is-open");
      document.body.classList.toggle("is-open");
    });

    window.onscroll = throttle(scrollFunction, 250);

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
      let scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 70;
        let sectionId = current.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".navigation__list a[href*=" + sectionId + "]")
            .classList.add("active");
        } else {
          document
            .querySelector(".navigation__list a[href*=" + sectionId + "]")
            .classList.remove("active");
        }
      });

      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        header.classList.add("fixed");

        scrollToTopBtn.classList.add("showBtn");
      } else {
        header.classList.remove("fixed");

        scrollToTopBtn.classList.remove("showBtn");
      }
      function scrollToTop() {
        document.querySelector(".hero-section").scrollTo({
          top: 0,
          behavior: "smooth",
        });
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
      scrollToTopBtn.addEventListener("click", scrollToTop);
    }
    function toggleActivityVisible() {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  },
};
document.addEventListener("DOMContentLoaded", newWest.init);
