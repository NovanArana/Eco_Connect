const slides = document.querySelectorAll('.hero-bg-layer');
let currentSlideIndex = 0;

function rotateHeroBackground() {
  const nextSlideIndex = (currentSlideIndex + 1) % slides.length;
  const currentSlide = slides[currentSlideIndex];
  const nextSlide = slides[nextSlideIndex];
  
  nextSlide.classList.remove('hidden-slide');
  
  setTimeout(() => {
    currentSlide.classList.add('hidden-slide');
  }, 50);

  currentSlideIndex = nextSlideIndex;
}

if (slides.length > 0) {
  setInterval(rotateHeroBackground, 5000);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    } else {
      entry.target.classList.remove('reveal');
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(element => {
  observer.observe(element);
});

const btnSeeAll = document.getElementById("btnSeeAll");
if (btnSeeAll) {
  btnSeeAll.addEventListener("click", function() {
    const hiddenElements = document.querySelectorAll(".hidden-destination");
    hiddenElements.forEach(el => {
      el.style.display = ""; 
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("show-smooth");
        });
      });
    });
    this.style.display = "none";
  });
}

const cardsGrid = document.querySelector("#destinations .row.g-4");
const sectionHeader = document.querySelector("#destinations .d-flex.justify-content-between");
const detailView = document.getElementById("destination-detail-view");

document.querySelectorAll(".destination-card").forEach(card => {
  card.addEventListener("click", function() {
    const imgSub = this.querySelector(".destination-img").src;
    const titleSub = this.querySelector("h3").innerText;
    const ratingSub = this.querySelector(".badge-rating").innerText;
    const priceSub = this.querySelector(".badge-price").innerText;
    const regionSub = this.querySelector("p").innerText;
    const descSub = this.getAttribute("data-desc") || "Description of environmental preservation contributions.";
    const mapSub = this.getAttribute("data-map") || "";

    document.getElementById("detail-target-img").src = imgSub;
    document.getElementById("detail-title").innerText = titleSub;
    document.getElementById("detail-rating").querySelector("span").innerText = ratingSub;
    document.getElementById("detail-price").innerText = priceSub;
    document.getElementById("detail-region").querySelector("span").innerText = regionSub;
    document.getElementById("detail-desc-text").innerText = descSub;
    document.getElementById("detail-target-map").src = mapSub;

    if (cardsGrid) cardsGrid.classList.add("fade-out-grid");
    if (sectionHeader) sectionHeader.classList.add("fade-out-grid");

    setTimeout(() => {
      if (cardsGrid) cardsGrid.style.display = "none";
      if (sectionHeader) sectionHeader.style.display = "none";
      
      if (detailView) {
        detailView.classList.remove("reveal");
        detailView.classList.add("animate-on-scroll");
        detailView.style.display = "flex";
        
        if (typeof observer !== "undefined") {
          observer.observe(detailView);
        }
      }
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const destSection = document.getElementById("destinations");
          if (destSection) {
            const sectionTop = destSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: sectionTop - 100,
              behavior: "smooth"
            });
          }
        });
      });
    }, 400); 
  });
});

const btnCloseDetail = document.getElementById("btn-close-detail");
if (btnCloseDetail) {
  btnCloseDetail.addEventListener("click", function() {
    if (detailView) detailView.classList.remove("reveal");

    setTimeout(() => {
      if (detailView) detailView.style.display = "none";
      
      if (cardsGrid) cardsGrid.style.display = "flex";
      if (sectionHeader) sectionHeader.style.display = "flex";
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (cardsGrid) cardsGrid.classList.remove("fade-out-grid");
          if (sectionHeader) sectionHeader.classList.remove("fade-out-grid");
          
          const destSection = document.getElementById("destinations");
          if (destSection) {
            const sectionTop = destSection.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
              top: sectionTop - 100,
              behavior: "smooth"
            });
          }
        });
      });
    }, 400);
  });
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function handlePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const navEntries = performance.getEntriesByType('navigation');
  const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

  const pathname = window.location.pathname;
  const isMainPage = pathname.endsWith('index.html') || pathname === '/' || pathname.endsWith('/') || pathname === '';

  if (!isReload && !isMainPage) {
    preloader.style.display = 'none';
    document.body.classList.remove('preloading');
    return;
  }

  if (isReload && !isMainPage) {
    window.location.href = 'index.html';
    return;
  }

  document.body.classList.add('preloading');
  window.scrollTo(0, 0);

  const startTime = Date.now();
  const MIN_DISPLAY_TIME = 2000;

  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

    setTimeout(() => {
      preloader.classList.add('fade-out');
      document.body.classList.remove('preloading');

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1200);
    }, remainingTime);
  };

  if (document.readyState === 'complete') {
    dismiss();
  } else {
    window.addEventListener('load', dismiss);
  }

  setTimeout(dismiss, 3500);
}

handlePreloader();

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
    document.body.classList.remove('preloading');
  }
});