/* ============================================================
   projects-motion.js -- Grant Leisure Projects Page
   Motion layer: Lenis v5 smooth scroll + GSAP ScrollTrigger
   Responsibilities:
   1. Lenis smooth scroll wired to GSAP ticker
   2. Nav scroll state via Lenis (replaces IntersectionObserver)
   3. Pill bar scroll state via Lenis
   4. Editorial row reveals -- image slides from side, text rises
   5. Cinematic row reveals -- text fade-up + Ken Burns scale
   initRevealAnimations is exposed globally so the filter pill JS
   can kill and restart all triggers when switching sections.
   Dependencies: GSAP, ScrollTrigger, Lenis (all via CDN)
   ============================================================ */

(function () {

  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('projects-motion.js: GSAP or ScrollTrigger not found.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"]').forEach(function (el) {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    });
  }

  /* ============================================================
     1. LENIS -- desktop only
     Lenis + GSAP ScrollTrigger fighting on mobile causes choppy scroll.
     Native scroll is smoother on touch devices.
     ============================================================ */

  let lenis = null;
  const isMobileViewport = window.innerWidth <= 767;

  if (typeof Lenis !== 'undefined' && !isMobileViewport) {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      smoothWheel: true
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });

    ScrollTrigger.refresh();

  } else if (!isMobileViewport) {
    console.warn('projects-motion.js: Lenis not found. Falling back to native scroll.');
  }

  /* ============================================================
     2. NAV SCROLL STATE
     ============================================================ */

  const siteNav = document.querySelector('.site-nav');

  if (siteNav) {
    if (lenis) {
      lenis.on('scroll', function (e) {
        siteNav.classList.toggle('is-scrolled', e.scroll > 50);
      });
    } else {
      window.addEventListener('scroll', function () {
        siteNav.classList.toggle('is-scrolled', window.scrollY > 50);
      }, { passive: true });
    }
  }

  /* ============================================================
     3. PILL BAR SCROLL STATE
     ============================================================ */

  const projectsHeader = document.querySelector('.projects-header');

  if (projectsHeader) {
    if (lenis) {
      lenis.on('scroll', function (e) {
        projectsHeader.classList.toggle('is-scrolled', e.scroll > 72);
      });
    } else {
      window.addEventListener('scroll', function () {
        projectsHeader.classList.toggle('is-scrolled', window.scrollY > 72);
      }, { passive: true });
    }
  }

  /* ============================================================
     4 + 5. REVEAL ANIMATIONS
     Exposed as window.initRevealAnimations so the filter pill JS
     can kill all ScrollTrigger instances and restart fresh ones
     after switching to a new section. Animations that fired while
     a section was hidden never replay -- this fixes that.
     ============================================================ */

  window.initRevealAnimations = function () {

    if (prefersReducedMotion) { return; }

    /* Reset initial states so re-running starts from scratch */
    document.querySelectorAll('[data-reveal]:not([data-reveal="left"]):not([data-reveal="right"])').forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 40, x: 0 });
    });
    document.querySelectorAll('[data-reveal="left"]').forEach(function (el) {
      gsap.set(el, { opacity: 0, x: -64, y: 0 });
    });
    document.querySelectorAll('[data-reveal="right"]').forEach(function (el) {
      gsap.set(el, { opacity: 0, x: 64, y: 0 });
    });

    /* Image left */
    gsap.utils.toArray('[data-reveal="left"]').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: -64 },
        {
          opacity: 1, x: 0,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.closest('.project-row') || el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Image right */
    gsap.utils.toArray('[data-reveal="right"]').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: 64 },
        {
          opacity: 1, x: 0,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.closest('.project-row') || el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Text blocks fade up */
    gsap.utils.toArray('[data-reveal]:not([data-reveal="left"]):not([data-reveal="right"])').forEach(function (el) {
      const isEditorialText = el.classList.contains('project-text-block');
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: 'power2.out',
          delay: isEditorialText ? 0.25 : 0,
          scrollTrigger: {
            trigger: el.closest('.project-row') || el.closest('.project-row-cinematic') || el,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    /* Cinematic Ken Burns + text reveal
       Skip scrub-based scale on mobile -- primary jank source. Text
       reveal still runs. */
    const skipParallax = window.innerWidth <= 767;

    gsap.utils.toArray('.project-row-cinematic').forEach(function (row) {
      const imgWrap = row.querySelector('.cinematic-image-wrap');
      const img     = row.querySelector('.cinematic-image-wrap img');
      const content = row.querySelector('.cinematic-content');

      if (img && imgWrap && !skipParallax) {
        imgWrap.style.overflow    = 'hidden';
        img.style.transformOrigin = 'center center';


        gsap.fromTo(img,
          { scale: 1 },
          {
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      }

      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    ScrollTrigger.refresh();

  };

  /* Run on initial page load */
  if (!prefersReducedMotion) {
    window.initRevealAnimations();
  }

}());