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
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('is-open');
  });
}

/* -- Team carousel ---------------------------------------- */

const teamTrack = document.getElementById('team-carousel-track');
const teamPrev = document.getElementById('team-prev');
const teamNext = document.getElementById('team-next');

if (teamTrack && teamPrev && teamNext) {
  const teamCards = teamTrack.querySelectorAll('.team-card');
  let teamIndex = 0;

  function getTeamVisible() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  function getTeamMax() {
    return Math.max(0, teamCards.length - getTeamVisible());
  }

  function updateTeamCarousel() {
    const cardWidth = teamCards[0].offsetWidth + parseInt(getComputedStyle(teamTrack).gap || '0');
    teamTrack.style.transform = 'translateX(-' + (teamIndex * cardWidth) + 'px)';
    /* Arrows always enabled -- index wraps via modulo, no dead ends */
    teamPrev.disabled = false;
    teamNext.disabled = false;
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
    updateTeamCarousel();
  });

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