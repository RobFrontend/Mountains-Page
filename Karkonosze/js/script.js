///////////////////////////////////////////////////////////
// Curent year
const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  document.querySelector(".main-nav").addEventListener("click", function () {
    headerEl.classList.remove("nav-open");
  });
});

///////////////////////////////////////////////////////////

const allLinks = document.querySelectorAll(".smooth");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

//////////////////////////////////////////
// Reveal sections

const sections = document.querySelectorAll(".section");

const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("reveal");
  observer.unobserve(entry.target);
};

const sectionRevealObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.1,
});

sections.forEach((section) => {
  sectionRevealObserver.observe(section);
  section.classList.add("reveal");
});

// Reveal Legends

const legends = document.querySelectorAll(".legends-box");

const legendsReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  }
  entry.target.classList.remove("legends-reveal");
  observer.unobserve(entry.target);
};

const legendsRevealObserver = new IntersectionObserver(legendsReveal, {
  root: null,
  threshold: 0.1,
});

legends.forEach((legend) => {
  legendsRevealObserver.observe(legend);
  legend.classList.add("legends-reveal");
});

// Reveal Text

// const legendsText = document.querySelectorAll(".legends-description");

// const legendsTextReveal = function (entries, observer) {
//   const [entry] = entries;
//   console.log(entry);
//   if (!entry.isIntersecting) {
//     return;
//   }
//   entry.target.classList.remove("legends-desc-reveal");
//   observer.unobserve(entry.target);
// };

// const legendsTextRevealObserver = new IntersectionObserver(legendsTextReveal, {
//   root: null,
//   threshold: 0.5,
// });

// legendsText.forEach((legendTxt) => {
//   legendsTextRevealObserver.observe(legendTxt);
//   legendTxt.classList.add("legends-desc-reveal");
// });
