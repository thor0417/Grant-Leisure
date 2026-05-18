# CLAUDE.md -- Grant Leisure "Visible Dominance" v2
# Master Context Document -- Paste into every new chat session at the start.
# Last Updated: 2026-05-17

---

## PROJECT IDENTITY

- Client: Grant Leisure International (GLI)
- Project: "Visible Dominance" Power Scroll Rebuild
- Version: 2.0
- Repo: thor0417/grant-leisure
- Live: https://thor0417.github.io/grant-leisure/
- Stack: HTML + CSS + Vanilla JS + GSAP + Lenis v5 (all via CDN)
- Workflow: Files edited in text editor, pushed via GitHub Desktop
- No terminal. No npm. No React. No build tools.

---

## WHY THIS STACK

HTML/CSS/Vanilla JS was chosen deliberately over React/Vite for three reasons:
1. Matches the user's existing workflow -- text editor + GitHub Desktop
2. Lower token cost per session -- lean files, no component wrapper syntax
3. GSAP via CDN handles all scroll animations without installation

---

## FOLDER STRUCTURE

```
grant-leisure/
├── public/
│   └── assets/
│       ├── fonts/
│       │   ├── InstrumentSerif-Regular.ttf
│       │   ├── InstrumentSerif-Italic.ttf
│       │   ├── InterTight-Regular.ttf
│       │   ├── InterTight-Medium.ttf
│       │   ├── InterTight-Black.ttf
│       │   └── InterTight-Italic.ttf
│       └── images/
│           ├── icons/
│           │   ├── icon-fair.png
│           │   ├── icon-homes.png
│           │   ├── icon-museums.png
│           │   ├── icon-parks.png
│           │   ├── icon-world-heritage.png
│           │   └── icon-zoo.png
│           ├── logos/          (17 partner logo files -- 3 pending replacement)
│           ├── maps/
│           │   └── map.png
│           ├── projects/
│           │   ├── attractions/
│           │   ├── resorts/
│           │   ├── zoological/
│           │   ├── museums/
│           │   └── heritage/
│           ├── team/           (9 headshot files -- PNG, WebP conversion pending)
│           ├── gli-logo.png
│           └── tourist.jpg
├── src/
│   └── styles/
│       ├── tokens.css
│       ├── typography.css
│       ├── global.css
│       ├── components.css
│       └── mobile.css          (NEW -- mobile overrides, loaded unconditionally,
│                                breakpoint enforced via @media inside file)
├── js/
│   ├── main.js
│   └── projects-motion.js
├── index.html
├── projects.html
├── projects.css
└── CLAUDE.md
```

---

## SECTION MAP -- INDEX.HTML

CRITICAL: Section IDs are internal code labels only.
They never appear as headings on the live site.
The "Visitor Sees" column is the law.

| ID            | Visitor Sees                                               | Visible Header |
|---------------|------------------------------------------------------------|----------------|
| #hero         | "PROFIT FROM OUR EXPERIENCE." -- full bleed video          | No             |
| #logic        | "90% of operational failures..." -- statement only         | No             |
| #about        | "WE'VE BEEN MAKING PEOPLE SMILE SINCE 1982" is the header  | Yes            |
| #proof        | Numbers and icons -- visual speaks for itself              | No             |
| #reach        | Map -- visual speaks for itself                            | No             |
| #expertise    | "SERVICES" -- visitor needs context                        | Yes            |
| #validation   | Partner logos -- single trust line above only              | Minimal        |
| #leadership   | "THE TEAM" -- visitor needs context                        | Yes            |
| #testimonials | Quotes flow -- no header, words land on their own          | No             |
| #engage       | "Don't like waiting? Neither do we." is the header         | Yes            |
| #footer       | Legal line only                                            | No             |

---

## DESIGN TOKENS

All values live in src/styles/tokens.css.
Never hardcode any of these values anywhere else.
Exception: #proof background is hard-coded to #5C9387 -- deliberate architectural
decision to insulate it from global token updates. Documented with CSS comment.

### Color
- --gl-green:  #5BAF7A   (primary action, key section backgrounds)
- --gl-blue:   #5871A5   (heritage anchor, secondary headers)
- --gl-white:  #FFFFFF   (base background, high-contrast text)
- --gl-navy:   #323E48   (navigation, dark surface text)
- --gl-black:  #1A1A1A   (body copy on white -- not pure black, senior-friendly)

### Color System Notes
- #5C9387 -- proof section background ONLY, hard-coded in #proof, do not touch
- #5BAF7A (--gl-green) -- everything else green
- --gl-green-vivid: #5BAF7A -- introduced for text/accent use, partially implemented

### Typography
- --font-header: 'Instrument Serif', serif (local TTF)
- --font-body:   'Inter Tight', sans-serif (local TTF)

Note: Original brief specified Fraunces. Instrument Serif was substituted during
build -- same authority register, locally hosted.

### Type Scale
- --text-display  (Hero headline only -- largest on page)
- --text-h1       (Primary section headers)
- --text-h2       (Sub-section headers)
- --text-h3       (Card and component headers)
- --text-body-lg  (Lead paragraphs -- minimum 18px)
- --text-body     (Standard body copy)
- --text-sm       (Labels, captions, legal)

### Spacing
- --space-xs through --space-2xl
- --section-pad-y (vertical section padding via clamp)

### Z-Index
- --z-base / --z-overlay / --z-nav / --z-modal

### Motion
- --ease-stellar / --duration-default / --duration-fast

---

## VISUAL REFERENCES

Three sources inform every visual decision.

1. OLD GRANT LEISURE SITE (screenshots in project files)
   Purpose: colour continuity, existing brand DNA, Bob's approval.
   Note: #5C9387 green and #5871A5 blue must be honoured throughout.

2. STELLAR MEDIA CORP (screenshot in project files)
   Purpose: layout energy, section pacing, dark/light alternation.
   Note: Large verb-first headers. Bold stats. Clean team cards.

3. BRIEF v1 -- "Institutional Dominance"
   Purpose: tone, copy rules, verb-first headers, demographic requirements.

---

## CODING HARD RULES

1.  NEVER hardcode color hex values -- always CSS custom properties
2.  NEVER base64-encode images -- always /assets/images/ paths
3.  NEVER use var -- const and let only
4.  NEVER use inline onclick handlers -- addEventListener only
5.  NEVER use a div where a semantic element exists
6.  ONE h1 per page -- always
7.  Every img requires width, height, and alt
8.  Lazy-load all below-fold images: loading="lazy"
9.  All fetch calls wrapped in try/catch
10. Mobile-first CSS -- base styles small, min-width queries scale up
11. Minimum 48px touch targets on ALL interactive elements
12. Every visible section header leads with a verb
13. No em dashes anywhere -- double hyphens only
14. No magic numbers in CSS without an explanatory comment
15. DRY -- no repeated patterns, no redundant blocks

---

## DEMOGRAPHIC REQUIREMENT

Target: Senior stakeholder, 70-80 years old.
- Minimum body font: 18px
- Display headers: 80px+ desktop via clamp()
- Touch targets: 48x48px minimum
- Line height: 1.6 minimum on body copy
- Contrast: WCAG AA minimum 4.5:1

---

## CDN SCRIPTS

Paste before closing body tag in index.html and projects.html.

```html
<!-- Lenis v5 smooth scroll -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.min.js"></script>
<!-- GSAP + ScrollTrigger -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

CRITICAL: Do not add lagSmoothing(0) -- removing it caused lag-then-snap bug
and must never be added back.

---

## ASSET PATHS

| Asset              | Path                                                                                             |
|--------------------|--------------------------------------------------------------------------------------------------|
| Hero video         | https://res.cloudinary.com/dyceiucla/video/upload/f_auto,q_auto/v1776321502/hero.mp4_r5srrb.mp4 |
| GLI Logo PNG       | public/assets/images/gli-logo.png                                                                |
| Tourist photo      | public/assets/images/tourist.jpg                                                                 |
| Map                | public/assets/images/maps/map.png                                                                |
| Icons              | public/assets/images/icons/                                                                      |
| Logos              | public/assets/images/logos/                                                                      |
| Team               | public/assets/images/team/                                                                       |
| Fonts              | public/assets/fonts/                                                                             |
| Project images     | public/assets/images/projects/[category]/[filename].webp                                         |

---

## COPY REFERENCE

### #hero
PROFIT FROM OUR EXPERIENCE.

### #logic
90% of operational failures are a result of improper planning.
We eliminate the guesswork. We secure the profit.

### #about
Header: WE'VE BEEN MAKING PEOPLE SMILE SINCE 1982
In 1980, Andy Grant awoke with a vision that would redefine the industry: the "Tourist"
as the primary consideration. We transitioned from conceptual dreaming to an experiential
approach that ensures every visitor's need is met.
Grant Leisure is a global consortium of entertainment and attractions executives with
decades of experience as developers and operators.

### #proof
65+ Theme Parks | icon-parks.png
60+ Stately Homes | icon-homes.png
27 Zoological Institutions | icon-zoo.png
35 Museums | icon-museums.png
5 World Heritage Sites | icon-world-heritage.png
2 World Expositions | icon-fair.png
Scale: 43 Countries. 5 Continents. 2,500+ Projects.

### #reach
Our influence is etched into the world's most iconic skylines.
(Country list removed -- statement line only)

### #expertise
Header: MAXIMIZE YOUR RETURN.
Subhead: SERVICES
Market Analysis -- Determining demand through surgical evaluation of occupancy,
absorption, and revenue trends.
Development Planning -- Balancing economic planning with physical design to optimize
amenities and facility sizing.
Financial Feasibility -- Investor-grade modeling for cash flow projections
and sensitivity testing.
Funding Assistance -- Securing capital through a sovereign network of global
investors and financiers.
Operational Planning -- Bespoke optimization of visitor circulation, marketing,
and staff training.
Turn-Key Management -- Direct executive oversight from pre-opening through
long-term stabilization.

### #validation
TRUSTED BY THE WORLD'S MOST ACCLAIMED BRANDS AND ATTRACTIONS.
17 partner logos in /assets/images/logos/

### #leadership
Header: MEET THE TEAM.
Subhead: THE CONSORTIUM
1. Robert Liljenwall -- Managing Director
2. Keith Robertson -- Co-Managing Director
3. Andy Grant -- Founder Emeritus and Director
4. Raul Rios -- Director Consulting Operations, Europe
5. Clive Jones -- Director Strategic Planning
6. Claus Frimand -- Director Operations
7. Philip Kwong -- Compliance Consultant
8. Andrew Coates -- Director Zoological Operations
9. Edmund Rowley Williams -- Director Business Development

### #testimonials
No header. Quotes only.
Chris Mather, Chief Executive Officer, Mather and Co
Larry Wyatt, CEO, Wyatt Design Group
Pat Janikowski AIA NCARB, President
Brian Edwards, Founder and Chairman

### #engage
Header: Don't like waiting? Neither do we.
Address: 418 Wenham Road, Pasadena, CA 91107
R. Liljenwall: 626-298-3709
K. Robertson: 702-497-4459
Form: Name, Email, Phone, Message

### #footer
2026 Grant Leisure. All Rights Reserved.

---

## CURRENT SITE STATUS

LIVE at https://thor0417.github.io/grant-leisure/

### index.html -- ALL SECTIONS COMPLETE AND APPROVED

Active features on index.html:
- Ghost nav -- transparent over hero, frosted glass blur on scroll via .is-scrolled
- Lenis v5 smooth scroll wired to GSAP ScrollTrigger
- Hero video subtle parallax on scroll -- desktop only, matchMedia min-width 1024px
- Map section subtle parallax -- desktop only, same matchMedia
- Heading fade-up reveals on scroll -- h2 targets, opacity 0 to 1, y 30 to 0
- reveal-content clip-path system -- wipes content into view on scroll
  Applied to: #about (heading + text + tourist figure), #expertise (bento cards)
  #leadership heading reveal (not cards -- carousel conflict)
  Desktop only -- mobile gets opacity fade instead
- Proof counter animation -- GSAP, wired and working
- Service modal popups -- 6 services with full writeups, Read More trigger
- Team carousel -- 3-up desktop, 1-up mobile, infinite loop both directions
- Team bio modals -- View Bio trigger, full bio overlay
- Testimonials carousel -- single quote, dot navigation, infinite loop both directions
- Marquee logo strip -- 17 partner logos, gap: 3rem, per-logo optical scale tuning locked
  Disney Parks at scale(0.85) is the locked reference standard
- Section transition blends -- retired permanently, clean hard cuts between sections

### projects.html -- COMPLETE AND APPROVED

- Five categories built: Attractions, Resorts, Zoological, Museums, Heritage
- Filter pills -- JS show/hide by section ID, no page reload
- Two row types: editorial (staggered 50/50) and cinematic (full-bleed)
- Inline accordion brief panels -- Read the Brief trigger, expand/collapse
- projects-motion.js -- Ken Burns on cinematic images, editorial reveal animations
- projects.css -- extracted from inline styles, lives at repo root

### mobile.css -- IN PROGRESS

- File exists at src/styles/mobile.css
- Loaded unconditionally -- breakpoint enforced via @media (max-width: 767px) inside file
- Link tag added to both index.html and projects.html WITHOUT media attribute
- Phone target: 390px primary, 360px floor
- Tablet pass: NOT YET STARTED -- separate session after phone is approved

Mobile fixes implemented (pending visual confirmation):
- Nav z-index above cinematic content -- hardcoded 9999 with comment
- Nav box-shadow suppressed on mobile -- removes ghost bar through logo
- About section -- tourist stacks below text, centered, proportional
- Proof scale line -- vertical stack, pipe spans hidden
- Marquee -- scale 0.55, gap 1.5rem
- Services bento -- single card carousel on mobile, arrows and dots
- Team carousel -- tighter padding, object-position: center 20% on photos
- Projects filter pills -- horizontal scroll, no wrap, no scrollbar
- Projects editorial rows -- stacked full width, image top text bottom
- Projects cinematic rows -- text size reduced for mobile viewport
- Projects brief panels -- readable padding, 48px touch targets

main.js additions (appended, nothing above touched):
- addSwipeSupport() -- reusable touch swipe function, 50px threshold
- Swipe wired to team carousel and testimonials carousel
- Services bento carousel JS -- index tracking, modulo wrap, dot update
- reveal-content wrapped in gsap.matchMedia -- desktop keeps existing behavior,
  mobile gets opacity-only fade, no clip-path, no Y transform, no scrub

---

## MOTION LAYER -- LOCKED DECISIONS

- Lenis v5 smooth scroll: duration 1.2, exponential easing, smoothWheel true
- CRITICAL: Do not add lagSmoothing(0) -- causes lag-then-snap bug
- scroll-behavior: auto in global.css -- required, do not change to smooth
- Nav scroll state: JS class .is-scrolled toggled inside Lenis on('scroll') callback
- Hero parallax: gsap.to on video element, Y 0 to 30%, scrub true, matchMedia 1024px+
- Map parallax: gsap.to on map img, Y 0 to 20%, scrub true, matchMedia 1024px+
- reveal-content: clip-path inset(100% 0 0 0) to inset(0% 0 0 0), y 40 to 0,
  ease power2.out, start top 90%, end top 65%, scrub 1,
  toggleActions play reverse play reverse
- Section background wipes: retired permanently -- clean hard cuts are correct

## ARCHITECTURAL DECISIONS -- DO NOT REVISIT

- Hard cuts between section backgrounds: intentional, not a bug
- #proof background hard-coded to #5C9387: insulates from token updates
- Disney Parks at scale(0.85): locked reference standard for marquee calibration
- Instrument Serif instead of Fraunces: deliberate substitution, locally hosted
- mobile.css loaded unconditionally (no media attribute on link tag): media
  attribute was blocking delivery on live site, breakpoint moved inside file
- projects.css at repo root (not src/styles/): extracted from inline styles,
  intentional location

---

## PROJECTS PAGE -- CATEGORY AND ROW MAP

Five categories, filter by section ID:
- #attractions -- Cinematic: London Eye, Ferrari World, Downton Abbey
                  Editorial: Ocean Park, Our Dynamic Earth, Legoland,
                  Olympic Spirit, Granada Studio Tours, Bluewater
                  Las Vegas: The Strat, Adventuredome, Manhattan Express, Luxor
- #resorts     -- Morocco Film City, Burabay Lakes, Harrah's Epicentre,
                  Ocean Palace
- #zoological  -- Phinda Private Game Reserve, San Diego Zoo, ZSL, New Doha Zoo
- #museums     -- Victoria and Albert, Te Papa, Tate Modern
- #heritage    -- Palace of Westminster (cinematic), Leeds Castle, Alnwick Castle,
                  Stonehenge (cinematic), Windsor Castle, Forth Bridge,
                  Blarney Castle, Tower of London (cinematic), Spencer House,
                  Welbeck Abbey

Row pattern: cinematic rows are full-bleed with overlay text and accordion panel.
Editorial rows alternate standard and is-reversed. Every third row cinematic.

---

## BACKLOG -- NOT YET STARTED

- Tablet CSS pass (768px and 1024px) -- separate session after phone approved
- WebP conversion -- all team PNGs and project images
- Logo replacements: NBC Universal, Bluewater, Busch
- Full mobile visual approval from client
- GSAP parallax refinement after mobile audit complete

---

## SESSION SCOPE

| Session      | Scope                                                                 |
|--------------|-----------------------------------------------------------------------|
| Edit Chat    | Targeted fixes -- HTML, CSS, JS edits only. No full rewrites.         |
| Mobile Chat  | mobile.css and main.js mobile additions only                          |
| Projects     | projects.html additions -- new projects and categories                |
| Motion       | main.js GSAP additions only -- append, never rewrite above            |
| Tablet       | tablet.css -- separate file, separate session, after mobile approved  |
