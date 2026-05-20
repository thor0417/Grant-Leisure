/* ============================================================
   main.js -- Grant Leisure "Visible Dominance" v2
   Handles: marquee, nav scroll state, counter animation
   GSAP and ScrollTrigger loaded via CDN in index.html
   ============================================================ */

/* -- Marquee: JS-driven infinite scroll ------------------- */

const marqueeTrack = document.getElementById('marquee-track');

if (marqueeTrack) {
  const clone = marqueeTrack.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  marqueeTrack.parentElement.appendChild(clone);

  let position = 0;
  const speed = 0.5;

  function animateMarquee() {
    position -= speed;

    const trackWidth = marqueeTrack.offsetWidth;
    if (Math.abs(position) >= trackWidth + 64) {
      position = 0;
    }

    marqueeTrack.style.transform = 'translateX(' + position + 'px)';
    clone.style.transform = 'translateX(' + position + 'px)';

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
}

/* -- Nav: background on scroll ---------------------------- */

const siteNav = document.querySelector('.site-nav');

if (siteNav) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      siteNav.classList.add('is-scrolled');
    } else {
      siteNav.classList.remove('is-scrolled');
    }
  });
}

/* -- Nav: mobile toggle ----------------------------------- */

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    const isOpen = navToggle.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navLinks.classList.toggle('is-open');
  });
}

/* -- Team carousel ---------------------------------------- */

const teamTrack = document.getElementById('team-carousel-track');
const teamPrev = document.getElementById('team-prev');
const teamNext = document.getElementById('team-next');
const teamDots = document.getElementById('team-dots');

if (teamTrack && teamPrev && teamNext) {
  const teamCards = teamTrack.querySelectorAll('.team-card');
  let teamIndex = 0;

  function getTeamVisible() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function getTeamMax() {
    return Math.max(0, teamCards.length - getTeamVisible());
  }

  /* Builds one dot per valid index. Count differs between mobile (9 stops)
     and desktop (7 stops), so this re-runs on resize. */
  function renderTeamDots() {
    if (!teamDots) return;
    teamDots.innerHTML = '';
    const stopCount = getTeamMax() + 1;
    for (let i = 0; i < stopCount; i++) {
      const dot = document.createElement('button');
      dot.classList.add('team-carousel__dot');
      dot.setAttribute('aria-label', 'Go to team slide ' + (i + 1));
      if (i === teamIndex) dot.classList.add('is-active');
      dot.addEventListener('click', function () {
        teamIndex = i;
        updateTeamCarousel();
      });
      teamDots.appendChild(dot);
    }
  }

  function syncTeamDots() {
    if (!teamDots) return;
    const dots = teamDots.children;
    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('is-active', i === teamIndex);
    }
  }

  function updateTeamCarousel() {
    const cardWidth = teamCards[0].offsetWidth + parseInt(getComputedStyle(teamTrack).gap || '0');
    teamTrack.style.transform = 'translateX(-' + (teamIndex * cardWidth) + 'px)';
    /* Arrows always enabled -- index wraps via modulo, no dead ends */
    teamPrev.disabled = false;
    teamNext.disabled = false;
    syncTeamDots();
  }

  teamPrev.addEventListener('click', function () {
    /* Modulo wrap: stepping back from 0 lands on the last valid index */
    teamIndex = (teamIndex - 1 + getTeamMax() + 1) % (getTeamMax() + 1);
    updateTeamCarousel();
  });

  teamNext.addEventListener('click', function () {
    /* Modulo wrap: stepping past the last index returns to 0 */
    teamIndex = (teamIndex + 1) % (getTeamMax() + 1);
    updateTeamCarousel();
  });

  window.addEventListener('resize', function () {
    teamIndex = Math.min(teamIndex, getTeamMax());
    renderTeamDots();
    updateTeamCarousel();
  });

  renderTeamDots();
  updateTeamCarousel();
}

/* -- Bio modal -------------------------------------------- */

const bioData = {
  'bio-01': {
    name: 'Robert Liljenwall',
    title: 'Managing Director',
    body: '<p>Robert has been a long-time principal of Grant Leisure, serving as head of its marketing and branding services and providing initial concept and creative direction for a broad spectrum of leisure attractions, visitor services, and integrated marketing communications programs.</p><p>His career as a themed entertainment industry executive began with Disney and he has since worked on leisure and entertainment projects spanning a variety of themed attractions, zoological parks, resorts, film studios, themed entertainment centers, and new urban developments.</p><p>Robert is an expert with developing a project\'s customer marketing matrix, identifying how best to serve visitors, maximize revenue streams, and ensure the highest degree of customer satisfaction.</p>'
  },
  'bio-02': {
    name: 'Keith Robertson',
    title: 'Co-Managing Director',
    body: '<p>Keith is a well-rounded senior executive with over 40 years of international project management experience in design, engineering, and operations for the development of major electrical power systems, commercial, industrial and residential construction, theme parks, water parks, tourism, and hospitality.</p><p>His high-energy approach and diversified experience in strategic planning, training, staffing, maintenance, and operations has proven invaluable for his clients as he continues driving innovative engineering and management solutions.</p>'
  },
  'bio-03': {
    name: 'Andy Grant',
    title: 'Founder Emeritus and Director',
    body: '<p>Andy\'s 50+ year career began at Universal Studios Hollywood, where he holds claim to being one of the park\'s first-ever studio tour guides.</p><p>After climbing the ranks of Universal Studios to senior management, Andy went on to become the managing director for Busch Gardens, Squaw Valley Ski Resort, and the San Diego Zoo and Safari Park -- and spent 12 years in charge of Leeds Castle in the United Kingdom.</p><p>It was during Andy\'s tenure in London that Grant Leisure was founded and grew to become the foremost consultancy for English Heritage and a globally recognized operator for the themed entertainment industry.</p>'
  },
  'bio-04': {
    name: 'Raul Rios',
    title: 'Director Consulting Operations, Europe',
    body: '<p>Raul brings over 15 years of industry experience and manages the consulting back-office for Grant Leisure\'s operations outside the US. Initially acting as Director of Projects and Commercial Controller, he was later appointed as Director for an international marketing services group.</p><p>Working as a consultant, his input ranges from preparing financial feasibilities, business and operational plans, and overseeing attraction construction projects for clients including Olympic Park Legacy Company, Ferrari World Abu Dhabi, Carlsberg, NBC Universal, and BBC.</p>'
  },
  'bio-05': {
    name: 'Clive Jones',
    title: 'Director Strategic Planning',
    body: '<p>Clive has evaluated investment programs and solicited investors and operators for major hotels, resorts, and casinos throughout Asia-Pacific, the Americas, and Europe. His expertise in market and investment analysis, development programming, and database marketing has earned him a sterling reputation within the attractions, hospitality, and tourism industries.</p><p>Notable clients include the US National Park Service, Hong Kong Tourism Board, Canadian Tourism Board, the state of California, and the city of San Francisco. His ability to create market-driven value for clients is the common denominator across all his successful assignments.</p>'
  },
  'bio-06': {
    name: 'Claus Frimand',
    title: 'Director Operations',
    body: '<p>Claus brings 35 years of experience in the service and leisure industry and has been an expat for over 25 years, living in ten different countries working across Europe, the Middle East, and Asia. He was responsible for opening Ferrari World in Abu Dhabi.</p><p>His breadth of expertise and insight for recruitment and operations has been an asset to Grant Leisure, having worked for organizations such as IKEA, Disneyland Paris, the Olympics, EXPO 2000, and several international traveling exhibitions.</p>'
  },
  'bio-07': {
    name: 'Philip Kwong',
    title: 'Compliance and Operations Consultant',
    body: '<p>Philip Kwong is a compliance and operations consultant with eight years of experience in highly regulated and emerging industries. Having held leadership roles in the development of international standards bodies, including Vice Convener of ISO IWA 37 and Chair of UL Canada\'s TG 4400-2, he has contributed to regulatory frameworks, worked with publicly traded companies, and taken complex projects from inception through to completion.</p>'
  },
  'bio-08': {
    name: 'Andrew Coates',
    title: 'Director Zoological Operations',
    body: '<p>Andrew delivers hands-on operational experience paired with an architectural background, working across the full range of disciplines in the visitor attractions industry.</p><p>Beginning his career as Operations Manager for the Zoological Society of London, he moved on to become a Director for Grant Leisure Group, Managing Director for MICE Group, and CEO for WARGM Co. Ltd, a UK charity organization for ensuring the long-term sustainability of the Royal Gunpowder Mills. Andrew is known for his pragmatic approach, able to balance the various tensions impacting projects to ensure results-driven solutions.</p>'
  },
  'bio-09': {
    name: 'Edmund Rowley Williams',
    title: 'Director Business Development',
    body: '<p>Edmund has enjoyed over 25 years as a business development and management consultant, specializing in improving access to cultural visitor destinations. He has led over 150 projects for Grant Leisure, with clients ranging from leisure enterprises and financial institutions to non-profit and government agencies such as Tate Modern, Victoria and Albert Museum, Windsor Castle, the London Eye, Legoland, and Babelsberg Studios.</p><p>Several of Edmund\'s projects including Our Dynamic Earth, The Royal Armouries, and Tower of London have involved multi-year assignments engaging all stages of planning, development, and operations.</p>'
  }
};

const bioOverlay = document.getElementById('bio-modal-overlay');
const bioClose = document.getElementById('bio-modal-close');
const bioModalNumber = document.getElementById('bio-modal-number');
const bioModalTitle = document.getElementById('bio-modal-title');
const bioModalBody = document.getElementById('bio-modal-body');

function openBioModal(id) {
  const data = bioData[id];
  if (!data) return;
  bioModalNumber.textContent = data.title;
  bioModalTitle.textContent = data.name;
  bioModalBody.innerHTML = data.body;
  bioOverlay.classList.add('is-open');
  bioOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  bioClose.focus();
}

function closeBioModal() {
  bioOverlay.classList.remove('is-open');
  bioOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (bioOverlay) {
  document.querySelectorAll('.team-card__bio-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openBioModal(btn.getAttribute('data-bio'));
    });
  });

  bioClose.addEventListener('click', closeBioModal);

  bioOverlay.addEventListener('click', function (e) {
    if (e.target === bioOverlay) closeBioModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeBioModal(); closeModal(); }
  });
}

/* -- Testimonials carousel -------------------------------- */

const testimonialItems = document.querySelectorAll('.testimonial');
const testPrev = document.getElementById('test-prev');
const testNext = document.getElementById('test-next');
const dotsContainer = document.getElementById('testimonials-dots');

if (testimonialItems.length && testPrev && testNext) {
  let testIndex = 0;

  testimonialItems.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.classList.add('testimonials__dot');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', function () { goToTestimonial(i); });
    dotsContainer.appendChild(dot);
  });

  function goToTestimonial(index) {
    testimonialItems[testIndex].classList.remove('is-active');
    dotsContainer.children[testIndex].classList.remove('is-active');
    /* Modulo wrap -- index always stays within bounds */
    testIndex = (index + testimonialItems.length) % testimonialItems.length;
    testimonialItems[testIndex].classList.add('is-active');
    dotsContainer.children[testIndex].classList.add('is-active');
    /* Arrows always enabled -- no dead ends */
    testPrev.disabled = false;
    testNext.disabled = false;
  }

  testimonialItems[0].classList.add('is-active');

  testPrev.addEventListener('click', function () {
    goToTestimonial(testIndex - 1);
  });

  testNext.addEventListener('click', function () {
    goToTestimonial(testIndex + 1);
  });
}

const serviceData = {
  'modal-01': {
    number: '01',
    title: 'Market Analysis',
    body: '<p>Grant Leisure assesses market support by evaluating overall market trends and growth in targeted markets. Available market support is determined by analyzing occupancy rates for hotels and condominiums, absorption rates and sales prices for real estate products, and utilization and revenue generated by attractions, support facilities, and amenities.</p><p>Consumer surveys, focus groups, and other market research techniques are used to test and refine demand estimates and market profiles.</p>'
  },
  'modal-02': {
    number: '02',
    title: 'Development Planning',
    body: '<p>Grant Leisure works directly with architects, planners, engineers, and other professionals to achieve the optimum balance between economic planning and physical design, resulting in real estate products and creative development programs that are responsive to the market and financially viable.</p><p>Based on the identified target markets, competitive supply, location, and concept of the proposed project, we recommend an appropriate mix of units and amenities, sizing of attractions and accommodations, amount and type of facilities, requirements for food and beverage space, and phasing for the overall program.</p>'
  },
  'modal-03': {
    number: '03',
    title: 'Financial Feasibility',
    body: '<p>Grant Leisure has created proprietary financial models for preparing cash flow and income projections, determining financial rates of return, and sensitivity testing of multi-use community development, income properties, and portfolio disposition programs.</p><p>Our feasibility studies cover land development projects such as new towns, resort communities, and residential developments - as well as income-producing properties including hotel, office, retail, and residential uses. Model users range from small investment syndicates to large development corporations.</p>'
  },
  'modal-04': {
    number: '04',
    title: 'Funding Assistance',
    body: '<p>Grant Leisure identifies and evaluates acquisition and investment opportunities for our clients and provides assistance in purchase, sale, lease, and financing transaction negotiations.</p><p>We additionally reach out to our own network of investors and financiers to evaluate interest and make introductions.</p>'
  },
  'modal-05': {
    number: '05',
    title: 'Operational Planning',
    body: '<p>Grant Leisure reviews performance, examines areas for expansion and revitalization, prepares pricing strategies and marketing programs, assists in operator selection and tenant negotiation, and evaluates financial restructuring and disposition alternatives.</p><p>Our services generally extend to: visitor circulation and services, marketing and branding, staff recruitment and training, development of operating manuals, communications systems, food and beverage, entertainment, and education.</p>'
  },
  'modal-06': {
    number: '06',
    title: 'Turnkey Management',
    body: '<p>Clients profit from the opportunity to utilize Grant Leisure\'s decades of operating experience and apply it to the policies and procedures that will become the operational foundation for their venture.</p><p>We recruit executive staff as needed and consult with the selected operating team on best practices from Pre&#8209;Opening preparation through Grand Opening and beyond. Team members are reserved for 2 years following opening to monitor operations and make adjustments towards stabilization.</p>'
  }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalNumber = document.getElementById('modal-number');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

function openModal(id) {
  const data = serviceData[id];
  if (!data) return;
  modalNumber.textContent = data.number;
  modalTitle.textContent = data.title;
  modalBody.innerHTML = data.body;
  modalOverlay.classList.add('is-open');
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modalOverlay) {
  document.querySelectorAll('.bento__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-modal'));
    });
  });

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* -- Proof counters: animate on scroll -------------------- */

const proofNumbers = document.querySelectorAll('.proof-number');

if (proofNumbers.length && typeof gsap !== 'undefined') {
  proofNumbers.forEach(function (el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';

    gsap.fromTo(
      el,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true
        },
        onUpdate: function () {
          el.textContent = Math.floor(parseFloat(el.innerText)) + suffix;
        }
      }
    );
  });
}

/* -- Hero video: parallax on scroll (desktop only) -------- */

ScrollTrigger.matchMedia({
  '(min-width: 1024px)': function () {
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo && typeof gsap !== 'undefined') {
      heroVideo.style.willChange = 'transform';

      gsap.to(heroVideo, {
        /* 30vh = 30% of viewport height -- video is full-bleed */
        y: '30vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
});

/* -- Map image: parallax on scroll (desktop only) --------- */

ScrollTrigger.matchMedia({
  '(min-width: 1024px)': function () {
    const reachMap = document.querySelector('.reach-map');

    if (reachMap && typeof gsap !== 'undefined') {
      reachMap.style.willChange = 'transform';

      gsap.to(reachMap, {
        /* -8vh pulls map upward against scroll -- classic parallax depth */
        y: '-8vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '#reach',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }
});

/* ============================================================
   PHASE 1 MOTION LAYER
   Lenis v5 smooth scroll + GSAP ScrollTrigger heading reveals
   ============================================================ */

/* -- Lenis: smooth scroll wired to GSAP ticker ------------ */

if (typeof gsap !== 'undefined' && typeof Lenis !== 'undefined') {

  const lenis = new Lenis({
    duration: 1.2,
    easing: function (t) {
      /* Exponential ease-out: fast start, smooth deceleration */
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    },
    smoothWheel: true
  });

  /* Expose Lenis to window so the BLEED LAYER block at the bottom of this
     file can install ScrollTrigger.scrollerProxy against it on mobile.
     Cross-scope access -- this is the minimal-coupling way to share the
     single Lenis instance without restructuring file ordering. */
  window.__lenis = lenis;

  /* Proxy Lenis into GSAP ScrollTrigger so all existing
     triggers (proof counters, etc.) keep accurate positions */
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });

  /* lagSmoothing intentionally omitted -- default prevents snap-to-bottom
     caused by large ticker deltas after tab switches or resizes */

  /* Stop Lenis inside open modals so they can scroll independently */
  const modalOverlayEl = document.getElementById('modal-overlay');
  if (modalOverlayEl) {
    modalOverlayEl.addEventListener('wheel', function (e) {
      e.stopPropagation();
    }, { passive: true });
  }

  /* Refresh all ScrollTrigger instances once Lenis is live */
  ScrollTrigger.refresh();

  /* -- Nav scroll state via Lenis (authoritative over native listener) -- */

  if (siteNav) {
    lenis.on('scroll', function (e) {
      if (e.scroll > 50) {
        siteNav.classList.add('is-scrolled');
      } else {
        siteNav.classList.remove('is-scrolled');
      }
    });
  }

  /* -- Heading fade-up reveals ----------------------------- */

  const fadeHeadings = document.querySelectorAll(
    '#hero h1, .about-heading, .expertise__heading, .leadership__heading, .engage__heading'
  );

  if (fadeHeadings.length) {
    fadeHeadings.forEach(function (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true
          }
        }
      );
    });
  }

}

/* About section content reveal -- opacity and rise, scrub 1 */
const aboutRevealEls = document.querySelectorAll('.about-reveal');
if (aboutRevealEls.length && typeof gsap !== 'undefined') {
  aboutRevealEls.forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 55%',
        scrub: 1
      }
    });
  });
}
/* Content reveal -- opacity + rise, reveal once and stay */
const revealElements = document.querySelectorAll('.reveal-content');
if (revealElements.length && typeof gsap !== 'undefined') {
  revealElements.forEach(function (el) {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none'
      }
    });
  });
}

/* ============================================================
   MOBILE ADDITIONS -- Grant Leisure "Visible Dominance" v2
   Scope: touch / mobile-only behaviour. Appended below the
   existing desktop logic. Nothing above this line is modified.
   Last Updated: 2026-05-17
   ============================================================ */

/* ------------------------------------------------------------
   JS FIX 1 -- Reusable swipe binding
   Touchstart/touchend delta with 50px threshold. Passive
   listeners -- no scroll-locking, never blocks the timeline.
   Wired to every mobile carousel below.
   ------------------------------------------------------------ */
function addSwipeSupport(container, onSwipeLeft, onSwipeRight) {
  if (!container) return;
  let startX = 0;
  const threshold = 50;

  container.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', function (e) {
    const delta = startX - e.changedTouches[0].clientX;
    if (Math.abs(delta) < threshold) return;
    if (delta > 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }, { passive: true });
}


/* ------------------------------------------------------------
   JS FIX 2 -- Swipe on team + testimonials carousels
   Existing carousel logic untouched. Swipe simply dispatches
   click events on the existing prev/next buttons so behaviour
   stays identical to tapping the arrows -- modulo wrap, focus
   states, the lot.
   ------------------------------------------------------------ */
(function wireCarouselSwipe() {
  const teamCarousel = document.getElementById('team-carousel-track');
  const teamPrevBtn  = document.getElementById('team-prev');
  const teamNextBtn  = document.getElementById('team-next');

  if (teamCarousel && teamPrevBtn && teamNextBtn) {
    addSwipeSupport(
      teamCarousel,
      function () { teamNextBtn.click(); },
      function () { teamPrevBtn.click(); }
    );
  }

  const testTrack    = document.getElementById('testimonials-track');
  const testPrevBtn  = document.getElementById('test-prev');
  const testNextBtn  = document.getElementById('test-next');

  if (testTrack && testPrevBtn && testNextBtn) {
    addSwipeSupport(
      testTrack,
      function () { testNextBtn.click(); },
      function () { testPrevBtn.click(); }
    );
  }
}());


/* ------------------------------------------------------------
   JS FIX 3 -- Bento services carousel (mobile only)
   Six .bento__card elements become a single-card stack on
   mobile (CSS in mobile.css does the layering). This block
   injects the prev/next + dot controls, tracks the index with
   modulo wrap, and wires swipe via the helper above.

   Guarded by viewport width so the carousel only initialises
   when mobile.css is active. Read More buttons are untouched --
   they delegate to the existing service modal handler upstream.
   ------------------------------------------------------------ */
(function initBentoCarousel() {
  const MOBILE_MAX = 767;
  const bento = document.querySelector('.bento');
  if (!bento) return;

  const cards = bento.querySelectorAll('.bento__card');
  if (cards.length < 2) return;

  let controls = null;
  let prevBtn  = null;
  let nextBtn  = null;
  let dots     = [];
  let index    = 0;
  let mounted  = false;

  /* Kill any GSAP ScrollTriggers attached to bento cards and strip the
     inline opacity/transform GSAP slammed onto them. Without this, all six
     cards render simultaneously on mobile because GSAP's inline opacity:1
     beats our CSS. Runs every time the carousel mounts. */
  function purgeGsapStateFromCards() {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(function (st) {
        if (st.trigger && st.trigger.classList && st.trigger.classList.contains('bento__card')) {
          st.kill();
        }
      });
    }
    cards.forEach(function (card) {
      if (typeof gsap !== 'undefined') {
        gsap.killTweensOf(card);
      }
      card.style.removeProperty('opacity');
      card.style.removeProperty('transform');
      card.style.removeProperty('translate');
      card.style.removeProperty('y');
    });
  }

  function setActive(i) {
    cards.forEach(function (card, idx) {
      card.classList.toggle('is-active', idx === i);
    });
    dots.forEach(function (dot, idx) {
      dot.classList.toggle('is-active', idx === i);
    });
    index = i;
  }

  function buildControls() {
    controls = document.createElement('div');
    controls.className = 'bento-controls';

    prevBtn = document.createElement('button');
    prevBtn.className = 'bento-arrow bento-arrow--prev';
    prevBtn.setAttribute('aria-label', 'Previous service');
    prevBtn.innerHTML = '&#8592;';

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'bento-dots';

    cards.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.className = 'bento-dot';
      dot.setAttribute('aria-label', 'Go to service ' + (i + 1));
      dot.addEventListener('click', function () {
        setActive(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });

    nextBtn = document.createElement('button');
    nextBtn.className = 'bento-arrow bento-arrow--next';
    nextBtn.setAttribute('aria-label', 'Next service');
    nextBtn.innerHTML = '&#8594;';

    controls.appendChild(prevBtn);
    controls.appendChild(dotsWrap);
    controls.appendChild(nextBtn);
    bento.parentElement.appendChild(controls);

    prevBtn.addEventListener('click', function () {
      /* Modulo wrap: from card 0 we land on the last card */
      setActive((index - 1 + cards.length) % cards.length);
    });

    nextBtn.addEventListener('click', function () {
      setActive((index + 1) % cards.length);
    });

    addSwipeSupport(
      bento,
      function () { nextBtn.click(); },
      function () { prevBtn.click(); }
    );
  }

  function mount() {
    if (mounted) return;
    purgeGsapStateFromCards();
    buildControls();
    setActive(0);
    mounted = true;
    /* GSAP may fire its reveal ScrollTrigger on the very next frame as the
       user scrolls toward the section. Re-purge a moment later to clean any
       inline opacity it slammed on after our initial purge. */
    setTimeout(purgeGsapStateFromCards, 100);
    setTimeout(purgeGsapStateFromCards, 500);
  }

  function unmount() {
    if (!mounted) return;
    cards.forEach(function (card) { card.classList.remove('is-active'); });
    if (controls && controls.parentElement) {
      controls.parentElement.removeChild(controls);
    }
    controls = null;
    prevBtn  = null;
    nextBtn  = null;
    dots     = [];
    index    = 0;
    mounted  = false;
  }

  function syncToViewport() {
    if (window.innerWidth <= MOBILE_MAX) {
      mount();
    } else {
      unmount();
    }
  }

  syncToViewport();
  window.addEventListener('resize', syncToViewport);
}());


/* ------------------------------------------------------------
   JS FIX 4 -- Reveal animation: matchMedia split
   The existing .reveal-content ScrollTrigger block (above) was
   opacity + y rise -- no clip-path was ever in this codebase,
   so there is no clip-path to disable. We still split desktop
   and mobile via gsap.matchMedia for parity with the brief.

   On mobile we kill the desktop triggers attached to
   .reveal-content elements and re-bind a lighter 0.6s fade --
   opacity only, no transform, no scrub. This also covers the
   bento cards on viewport rotation: mobile.css hides them by
   default, so we make sure they're not stuck at opacity 0
   waiting on a trigger that already fired off-screen.
   ------------------------------------------------------------ */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  const mm = gsap.matchMedia();

  mm.add('(max-width: 767px)', function () {
    const els = document.querySelectorAll('.reveal-content');
    if (!els.length) return;

    /* Kill any ScrollTriggers the desktop block bound to these
       elements -- avoids two competing tweens on resize. */
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.trigger && st.trigger.classList && st.trigger.classList.contains('reveal-content')) {
        st.kill();
      }
    });

    els.forEach(function (el) {
      gsap.set(el, { y: 0 });
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return function cleanup() {
      /* matchMedia auto-reverts on breakpoint exit -- nothing else needed */
    };
  });
}

/* ============================================================
   BLEED LAYER -- Continuous tonal bleed (Anton & Irene technique)
   Last appended block. Nothing above this line is modified.

   ARCHITECTURE
   The .page-underlay element (defined in index.html, styled in
   global.css) is a fixed full-viewport div behind all content.
   Its background-color is the visible page surface. Sections are
   transparent so the underlay shows through.

   This block wires three GSAP ScrollTrigger timelines that animate
   the underlay's backgroundColor across scroll position, walking
   through the --bleed-stop-* values from tokens.css. Lenis already
   feeds scroll position into GSAP's ticker (line ~449 above), so
   these timelines inherit the same smooth interpolation.

   The technique mirrors antonandirene.com's .Intro-bg-color pattern
   (single fixed underlay + scroll-tied RGB color mutation). RGB
   interpolation via GSAP's default backgroundColor tween produces
   identical perceptual behavior to their implementation.

   PAGE COMPOSITION (locked)
   Hero          navy (held, video over dark)
   ↓ Bleed 1: navy → white as #logic enters
   Logic         white  (chapter)
   About         white  (chapter)
   ↓ Bleed 2: white → navy as #proof enters
   Proof         navy   (chapter)
   Reach         navy   (chapter)
   Expertise     navy   (chapter)
   ↓ Bleed 3: navy → white as #validation enters
   Validation    white  (chapter)
   Leadership    white  (chapter)
   Testimonials  white  (chapter)
   Engage        white  (chapter)
   Footer        white  (chapter, hard close)

   STOPS
   8 mathematically interpolated stops from --gl-white to --gl-navy
   (via meyerweb.com/eric/tools/color-blend). Each bleed timeline
   walks through these in sequence over the scroll trigger window.

   END POSITION TUNING
   Bleeds end at 'top 60%' (NOT 'top top'). This means the underlay
   reaches its target chapter color when the triggering section's
   top reaches 60% down the viewport -- well before the section's
   content is centered. Previously ended at 'top top' which meant
   the bleed was still in progress while the user was reading the
   section's main content (90% counter visible during white bleed,
   proof numbers visible during navy bleed). 60% end position lets
   the color land before content arrives.
   ============================================================ */

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

  const pageUnderlay = document.querySelector('.page-underlay');
  const prefersReducedMotionForBleed = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (pageUnderlay && !prefersReducedMotionForBleed) {

    /* Read stops from tokens.css at runtime. Avoids duplicating hex values
       in JS -- single source of truth lives in tokens.css.
       Read once at outer scope so both desktop and mobile paths share them. */
    const computed = getComputedStyle(document.documentElement);
    const stops = [
      computed.getPropertyValue('--bleed-stop-1').trim(), /* #FFFFFF */
      computed.getPropertyValue('--bleed-stop-2').trim(), /* #E2E3E5 */
      computed.getPropertyValue('--bleed-stop-3').trim(), /* #C4C8CB */
      computed.getPropertyValue('--bleed-stop-4').trim(), /* #A7ACB1 */
      computed.getPropertyValue('--bleed-stop-5').trim(), /* #8A9196 */
      computed.getPropertyValue('--bleed-stop-6').trim(), /* #6D757C */
      computed.getPropertyValue('--bleed-stop-7').trim(), /* #4F5A62 */
      computed.getPropertyValue('--bleed-stop-8').trim()  /* #323E48 */
    ];

    /* ----------------------------------------------------------------
       gsap.matchMedia: separate desktop and mobile bleed implementations.
       Each path is fully sandboxed -- ScrollTriggers auto-clean up when
       the breakpoint exits. Desktop and mobile code never share state.
       ---------------------------------------------------------------- */
    const bleedMM = gsap.matchMedia();

    /* ================================================================
       DESKTOP PATH (>= 768px)
       Identical to the original section-triggered implementation.
       Three separate timelines, each tied to a triggering section entering
       the viewport. End position 'top 60%' so the chapter color lands
       before the section's main content arrives.
       ================================================================ */
    bleedMM.add('(min-width: 768px)', function () {

      /* Helper local to desktop scope: build a multi-stop timeline that
         walks the underlay from one chapter color to another through
         all 8 stops. */
      function buildBleed(trigger, start, end, fromIdx, toIdx) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            scrub: true /* Tied directly to scroll position -- A&I behavior */
          }
        });

        const sequence = [];
        if (fromIdx < toIdx) {
          for (let i = fromIdx; i <= toIdx; i++) sequence.push(stops[i]);
        } else {
          for (let i = fromIdx; i >= toIdx; i--) sequence.push(stops[i]);
        }

        sequence.forEach(function (color, i) {
          if (i === 0) return;
          tl.to(pageUnderlay, { backgroundColor: color, ease: 'none' });
        });

        return tl;
      }

      /* Bleed 1: navy → white as #logic enters.
         Timing: start 'top 90%', end 'top 20%'.
         Hero is 100vh, so it has scrolled off when logic's top reaches the
         viewport bottom. start 'top 90%' means the bleed begins when logic's
         top is 10vh from the top of the viewport (hero is mostly gone, the
         underlay's actual color is visible). End 'top 20%' completes the
         bleed when logic's top is 20% down the viewport, well before the
         content centers. 70vh of scroll distance for the bleed to walk
         visibly through all 8 stops. */
      buildBleed('#logic', 'top 90%', 'top 20%', 7, 0);
      /* Bleed 2: white → navy as #proof enters */
      buildBleed('#proof', 'top bottom', 'top 60%', 0, 7);
      /* Bleed 3: navy → white as #validation enters */
      buildBleed('#validation', 'top bottom', 'top 60%', 7, 0);

      ScrollTrigger.refresh();
    });


    /* ================================================================
       MOBILE PATH (< 768px)
       Single timeline tied to the whole document, using percentage
       keyframes mapped to chapter positions in the scrolled page.

       Why a different architecture for mobile:
       Section-triggered bleeds fail on mobile because mobile section
       geometry is unstable -- the dynamic browser chrome (address bar
       showing/hiding) shifts viewport height mid-scroll, which throws
       off absolute pixel-based ScrollTrigger positions. The bleed
       windows collapse to ~200px at the very top of the page, causing
       the underlay to race through all stops on the first flick and
       lock at the final color for the rest of the page.

       This implementation binds the timeline to the document body
       and uses keyframe percentages -- scroll progress is calculated
       as a fraction of total scrollable distance, which scales
       naturally with the elongated single-column mobile layout.

       invalidateOnRefresh: true forces recalculation every time the
       browser fires a resize event (including address bar toggles).

       Keyframe percentage values are estimates based on typical mobile
       layout proportions:
         0-12%:  Hero (navy held)
         12-20%: Bleed navy → white into Logic
         20-40%: Logic + About (white held)
         40-48%: Bleed white → navy into Proof
         48-68%: Proof + Reach + Expertise (navy held)
         68-76%: Bleed navy → white into Validation
         76-100%: Validation through Footer (white held)
       Adjust these if the bleeds land too early or too late on mobile.
       ================================================================ */
    bleedMM.add('(max-width: 767px)', function () {

      /* ============================================================
         MOBILE BLEED -- Lenis-proxied GSAP timeline.

         Previous five attempts failed because:
         1) Defensive CSS rule -- inline style beat it, didn't help.
         2) matchMedia split -- mobile path fired but timeline collapsed.
         3) documentElement trigger -- still measured viewport height (812px).
         4) end:'max' pattern -- same scroll distance measurement bug.
         5) Vanilla scroll listener -- window.scrollY may be intercepted
            by Lenis on mobile, never updates, progress stays at 0.

         This implementation uses ScrollTrigger.scrollerProxy() to bind
         ScrollTrigger directly to Lenis's virtual scroll engine. GSAP
         then reads position from lenis.scroll (which always updates
         correctly) instead of native window.scrollY (which may not).
         This is the documented Lenis+ScrollTrigger integration pattern.

         Scope: installed only inside the mobile matchMedia callback.
         Cleaned up on breakpoint exit so desktop's simpler proxy
         (lenis.on('scroll', ScrollTrigger.update) at line ~447) is
         not affected. ============================================ */

      const lenis = window.__lenis;
      if (!lenis) {
        console.warn('[BLEED] Mobile path: Lenis instance not found on window. Mobile bleed cannot install.');
        return;
      }

      /* Install scrollerProxy. ScrollTrigger will now ask Lenis for
         scroll position instead of reading from native window. */
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop: function (value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect: function () {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          };
        }
      });

      /* Build the mobile bleed timeline. scroller:document.body tells
         ScrollTrigger to use the proxy we just registered. */
      const mobileBleedTimeline = gsap.timeline({
        scrollTrigger: {
          scroller: document.body,
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          /* scrub: true (NOT 0.5). Previously had scrub:0.5 for "soft
             catchup" but it caused visible wrong-color lag on mobile fast
             scroll -- the bleed was still mid-walk because the 0.5s catchup
             hadn't completed by the time the user landed on a new section.
             Pure scrub:true = instant tie to scroll position, no lag. */
          scrub: true,
          invalidateOnRefresh: true
        }
      }).to(pageUnderlay, {
        ease: 'none',
        keyframes: {
          /* MOBILE BLEED MAP -- Full 8-stop walks matching desktop buildBleed.

             Section positions (measured): logic 14.3%, proof 37.2%, valid 67.3%.

             End points pulled 3% EARLIER than the actual section positions:
                Bleed 1 ends at 11% (logic enters at 14.3%)
                Bleed 2 ends at 34% (proof enters at 37.2%)
                Bleed 3 ends at 64% (validation enters at 67.3%)

             Why earlier: on real mobile (vs DevTools emulator), three things
             slow perceived bleed completion:
             (1) Address bar show/hide reflows the page, triggering
                 invalidateOnRefresh which briefly desyncs keyframe positions.
             (2) Touch scroll velocity is faster than mouse wheel -- user
                 burns through scroll percentages before scrub catches up.
             (3) Lenis smoothing adds a fraction of catchup time on top.
             Pulling end-points 3% earlier compensates so the chapter color
             is settled before the user reads section content. */

          /* Hero: held navy */
          '0%':     { backgroundColor: stops[7] },

          /* Bleed 1: navy → white walk, lands at 11% (3% before logic at 14.3%) */
          '2%':     { backgroundColor: stops[7] }, /* navy hold end / walk start */
          '3.3%':   { backgroundColor: stops[6] },
          '4.6%':   { backgroundColor: stops[5] },
          '5.9%':   { backgroundColor: stops[4] },
          '7.2%':   { backgroundColor: stops[3] },
          '8.5%':   { backgroundColor: stops[2] },
          '9.8%':   { backgroundColor: stops[1] },
          '11%':    { backgroundColor: stops[0] }, /* LANDS before logic 14.3% */

          /* Logic + About: held white */
          '25%':    { backgroundColor: stops[0] },

          /* Bleed 2: white → navy walk, lands at 34% (3% before proof at 37.2%) */
          '26.3%':  { backgroundColor: stops[1] },
          '27.6%':  { backgroundColor: stops[2] },
          '28.9%':  { backgroundColor: stops[3] },
          '30.2%':  { backgroundColor: stops[4] },
          '31.5%':  { backgroundColor: stops[5] },
          '32.8%':  { backgroundColor: stops[6] },
          '34%':    { backgroundColor: stops[7] }, /* LANDS before proof 37.2% */

          /* Proof + Reach + Expertise: held navy */
          '55%':    { backgroundColor: stops[7] },

          /* Bleed 3: navy → white walk, lands at 64% (3% before validation 67.3%) */
          '56.3%':  { backgroundColor: stops[6] },
          '57.6%':  { backgroundColor: stops[5] },
          '58.9%':  { backgroundColor: stops[4] },
          '60.2%':  { backgroundColor: stops[3] },
          '61.5%':  { backgroundColor: stops[2] },
          '62.8%':  { backgroundColor: stops[1] },
          '64%':    { backgroundColor: stops[0] }, /* LANDS before validation 67.3% */

          /* Validation through Footer: held white */
          '100%':   { backgroundColor: stops[0] }
        }
      });

      /* Diagnostic: log scroll distance from Lenis's perspective.
         Should now report actual page height in thousands. */
      ScrollTrigger.create({
        scroller: document.body,
        start: 0,
        end: 'max',
        onRefresh: function (self) {
          console.log('[BLEED] Mobile (Lenis proxy) scroll distance:',
            Math.round(self.end - self.start), 'px');
        }
      });

      ScrollTrigger.refresh();

      /* Cleanup on breakpoint exit: kill the timeline, remove the proxy,
         restore default scroller behavior so desktop wiring is unaffected. */
      return function cleanup() {
        mobileBleedTimeline.kill();
        ScrollTrigger.scrollerProxy(document.body, null);
        ScrollTrigger.refresh();
      };
    });
  }
}