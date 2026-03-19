/* Constants & Configs */

const myNav = document.querySelector("#nav-bar");
const mobileNav = document.querySelector("#mobile-nav");
const navMenu = document.querySelector("#nav-menu");
const menuToggle = document.querySelector("#nav-toggle");
const menuLinks = navMenu ? navMenu.querySelectorAll(".nav-link") : [];

/* supports both old and newer logo IDs */
const whiteLogo = myNav
  ? myNav.querySelector("#white-nav-logo") || myNav.querySelector("#logonav")
  : null;

const redLogo = myNav
  ? myNav.querySelector("#red-nav-logo") || myNav.querySelector("#nav-logo")
  : null;

const logoContainer = myNav ? myNav.querySelector("#logo") : null;
const activeNavLink = myNav ? myNav.querySelector(".active") : null;

let isMenuOpen = false;

// Uses Lightbox scripts
var SimpleLightbox = window.SimpleLightbox;

/* Navigation Bar */

// Sticky navigation bar.
// These changes are toggled whenever the 10px threshold is scrolled past.
window.addEventListener("load", () => {
  setNavbarTransparency();
  initRevealAnimation();
});

window.addEventListener("scroll", () => {
  setNavbarTransparency();
});

function setNavbarTransparency() {
  if (!myNav) return;

  if (window.scrollY <= 10) {
    setSolidNavbar();
  } else {
    setTransparentNavbar();
  }
}

function setSolidNavbar() {
  if (!myNav) return;

  myNav.classList.remove("scroll");

  if (whiteLogo) {
    whiteLogo.classList.remove("transparent");
  }

  if (redLogo) {
    redLogo.classList.add("transparent");
  }

  Array.from(menuLinks).forEach((menuLink) =>
    menuLink.classList.remove("black")
  );

  if (activeNavLink) {
    activeNavLink.classList.remove("underlined");
  }
}

function setTransparentNavbar() {
  if (!myNav) return;

  myNav.classList.add("scroll");

  if (whiteLogo) {
    whiteLogo.classList.add("transparent");
  }

  if (redLogo) {
    redLogo.classList.remove("transparent");
  }

  Array.from(menuLinks).forEach((menuLink) =>
    menuLink.classList.add("black")
  );

  if (activeNavLink) {
    activeNavLink.classList.add("underlined");
  }
}

/* Mobile Menu */

// Toggle Menu Active State.
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    isMenuOpen = !isMenuOpen;

    // Toggle ally attributes and active class
    menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
    navMenu.hidden = !isMenuOpen;

    if (mobileNav) {
      mobileNav.classList.toggle("nav--open");
    }

    if (logoContainer) {
      logoContainer.classList.toggle("mobile-nav");
    }

    if (redLogo) {
      redLogo.classList.toggle("mobile-nav");
    }
  });
}

// Trap tab inside when open.
if (mobileNav && menuToggle && menuLinks.length > 0) {
  mobileNav.addEventListener("keydown", (e) => {
    // Abort if menu isn't open or modifier keys are pressed.
    if (!isMenuOpen || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }

    // Listen for tab press and move focus,
    // if we're on either end of the navigation.
    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === menuLinks[0]) {
          menuToggle.focus();
          e.preventDefault();
        }
      } else if (document.activeElement === menuToggle) {
        menuLinks[0].focus();
        e.preventDefault();
      }
    }
  });
}

$(document).ready(function () {
  if ($("#popup-reviews").length) {
    $("#popup-reviews").magnificPopup({
      delegate: "a", // child items selector, by clicking on it popup will open.
      type: "image",
      reviews: {
        enabled: true
      },
      preload: [0, 2]
    });
  }
});

/* Coaching Navigation */

/* Scoll to coaching comparisons depending on whether the navigation bar is present or not. */
$(".coaching-scroll").click(function () {
  if ($("#comparison-tabs").length) {
    if ($("#nav-bar.scroll").css("background") == "rgb(255, 255, 255)") {
      $("html, body").animate(
        {
          scrollTop: $("#comparison-tabs").offset().top - 65
        },
        "slow"
      );
    } else {
      $("html, body").animate(
        {
          scrollTop: $("#comparison-tabs").offset().top
        },
        "slow"
      );
    }
  }
});

/* Remove active classes from the tab and tab-pane. */
function removeActiveClass() {
  $(".active-tab").removeClass("active-tab");
  $(".active-item").removeClass("active-item");
}

/* Display stretch tab. */
$("#stretch-tab").click(function () {
  removeActiveClass();
  $('a[href*="#stretch"]').addClass("active-item");
  $("#stretch").addClass("active-tab");
});

/* Display Personal-tr tab. */
$("#Personal-tr-tab").click(function () {
  removeActiveClass();
  $('a[href*="#Personal-tr"]').addClass("active-item");
  $("#Personal-tr").addClass("active-tab");
});

/* Display Online tab. */
$("#online-tab").click(function () {
  removeActiveClass();
  $('a[href*="#online"]').addClass("active-item");
  $("#online").addClass("active-tab");
});

/* Scroll Reveal Animation */
function initRevealAnimation() {
  const revealElements = document.querySelectorAll(".reveal-left, .reveal-right, .hero-reveal, .reveal-up");

  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}
