/* =============================================
   Eng. Tarek Meligy — Election Campaign Scripts
   GSAP ScrollTrigger Animations + Interactions
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // NAVBAR
  // ============================================
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  // Close mobile nav on link click
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
    });
  });

  // Active section highlight
  const sections = document.querySelectorAll(".section, .hero");
  const navAnchors = document.querySelectorAll(".nav-links a:not(.nav-cta)");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navAnchors.forEach((a) => {
      a.classList.remove("active");
      if (a.getAttribute("href") === "#" + current) {
        a.classList.add("active");
      }
    });
  });

  // ============================================
  // HERO ANIMATIONS
  // ============================================
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    .from(".hero-badge-label", { opacity: 0, y: 30, duration: 0.6, delay: 0.3 })
    .from(
      ".hero-badge-number",
      { opacity: 0, scale: 0.5, duration: 0.8 },
      "-=0.3",
    )
    .from(".hero-title-prefix", { opacity: 0, y: 20, duration: 0.5 }, "-=0.4")
    .from(".hero-title-name", { opacity: 0, y: 30, duration: 0.7 }, "-=0.3")
    .from(".hero-subtitle", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from(".hero-slogan", { opacity: 0, duration: 0.5 }, "-=0.2")
    .from(".hero-date", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
    .from(".hero-btn", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
    .from(
      ".hero-scroll-indicator",
      { opacity: 0, y: -20, duration: 0.5 },
      "-=0.1",
    );

  // Typewriter effect for slogan
  const sloganText = "المهندس يستحق الأفضل";
  const sloganEl = document.querySelector(".slogan-text");
  let charIndex = 0;

  function typeSlogan() {
    if (charIndex < sloganText.length) {
      sloganEl.textContent += sloganText.charAt(charIndex);
      charIndex++;
      setTimeout(typeSlogan, 80);
    }
  }

  // Start typewriter after hero animation
  setTimeout(typeSlogan, 2000);

  // Hero particles
  createParticles();

  // ============================================
  // ABOUT — Credential Cards Slide In
  // ============================================
  gsap.utils.toArray(".credential-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      delay: i * 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // About image
  gsap.from(".about-image-frame", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".about-image",
      start: "top 80%",
    },
  });

  // ============================================
  // VISION — Fade Up
  // ============================================
  gsap.from(".vision-quote", {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".vision-quote",
      start: "top 80%",
    },
  });

  gsap.utils.toArray(".pillar").forEach((pillar, i) => {
    gsap.from(pillar, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: pillar,
        start: "top 85%",
      },
    });
  });

  // ============================================
  // PROGRAM — Staggered Card Reveal
  // ============================================
  gsap.utils.toArray(".program-category").forEach((cat) => {
    const cards = cat.querySelectorAll(".program-card");

    gsap.from(cat.querySelector(".program-category-title"), {
      opacity: 0,
      x: 30,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: cat,
        start: "top 85%",
      },
    });

    cards.forEach((card, i) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: i * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    });
  });

  // ============================================
  // WHY HIM — Staggered Cards
  // ============================================
  gsap.utils.toArray(".why-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 0.6,
      delay: i * 0.12,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });

  // ============================================
  // STATS — Counter Animation
  // ============================================
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((num) => {
    const target = parseInt(num.getAttribute("data-target"));

    ScrollTrigger.create({
      trigger: num,
      start: "top 85%",
      onEnter: () => animateCounter(num, target),
      once: true,
    });
  });

  function animateCounter(el, target) {
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);

    function update() {
      current += step;
      if (current >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(current);
      requestAnimationFrame(update);
    }
    update();
  }

  gsap.utils.toArray(".stat-card").forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      delay: i * 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
      },
    });
  });

  // ============================================
  // TIMELINE — Premium Scroll Animations
  // ============================================

  // 1. Spine Progress Animation
  // Animate the height of .timeline-progress as user scrolls through the section
  const timelineSection = document.querySelector(".timeline");
  const timelineProgress = document.querySelector(".timeline-progress");

  if (timelineSection && timelineProgress) {
    gsap.to(timelineProgress, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
      },
    });
  }

  // 2. 3D Card Reveal & Dot Activation
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    const content = item.querySelector(".timeline-content");
    const dot = item.querySelector(".timeline-dot");

    // Animate Card (3D Flip In)
    if (content) {
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 50,
          rotationX: -15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    // Animate Dot (Pop & Glow)
    if (dot) {
      ScrollTrigger.create({
        trigger: item,
        start: "top center", // When item hits center
        end: "bottom center",
        onEnter: () => dot.classList.add("active"),
        onLeaveBack: () => dot.classList.remove("active"),
      });
    }
  });

  // ============================================
  // TESTIMONIALS — Staggered Fade In
  // ============================================
  gsap.utils.toArray(".testimonial-card").forEach((card, i) => {
    gsap.to(card, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: i * 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  // ============================================
  // ELECTION DAY — CTA Animations
  // ============================================
  gsap.from(".election-date-display", {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".election-date-display",
      start: "top 80%",
    },
  });

  gsap.from(".election-badge", {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: "back.out(1.5)",
    scrollTrigger: {
      trigger: ".election-badge",
      start: "top 85%",
    },
  });

  // ============================================
  // STATS — Count Up & Scale
  // ============================================
  gsap.utils.toArray(".stat-number").forEach((stat) => {
    const target = +stat.getAttribute("data-target");
    gsap.fromTo(
      stat,
      { innerHTML: 0, scale: 0.5, opacity: 0 },
      {
        innerHTML: target,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    );
  });

  // ============================================
  // VISION — Pillars Stagger
  // ============================================
  gsap.to(".pillar", {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".vision-pillars",
      start: "top 80%",
    },
  });

  // ============================================
  // PROGRAM — 3D Flip Entrance
  // ============================================
  gsap.set(".program-card", {
    opacity: 0,
    y: 50,
    rotationX: 45,
    transformPerspective: 1000,
  });

  ScrollTrigger.batch(".program-card", {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.15,
        duration: 1,
        ease: "back.out(1.2)",
      }),
    start: "top 85%",
    once: true,
  });

  // ============================================
  // COUNTDOWN TIMER
  // ============================================
  const electionDate = new Date("2026-02-27T08:00:00+02:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = electionDate - now;

    if (diff <= 0) {
      document.getElementById("countdown-days").textContent = "00";
      document.getElementById("countdown-hours").textContent = "00";
      document.getElementById("countdown-minutes").textContent = "00";
      document.getElementById("countdown-seconds").textContent = "00";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("countdown-days").textContent = String(
      days,
    ).padStart(2, "0");
    document.getElementById("countdown-hours").textContent = String(
      hours,
    ).padStart(2, "0");
    document.getElementById("countdown-minutes").textContent = String(
      minutes,
    ).padStart(2, "0");
    document.getElementById("countdown-seconds").textContent = String(
      seconds,
    ).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================
  // CANDIDATE MESSAGE — Fade Up
  // ============================================
  gsap.from(".message-card", {
    opacity: 0,
    y: 40,
    duration: 0.6,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".message-card",
      start: "top 80%",
    },
  });

  // ============================================
  // SECTION HEADERS — Universal Animation
  // ============================================
  gsap.utils.toArray(".section-header").forEach((header) => {
    gsap.from(header, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
      },
    });
  });

  // ============================================
  // HERO PARTICLES
  // ============================================
  function createParticles() {
    const container = document.getElementById("heroParticles");
    const count = 30;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";
      particle.style.width = Math.random() * 4 + 2 + "px";
      particle.style.height = particle.style.width;

      if (Math.random() > 0.5) {
        particle.style.background = "var(--clr-primary)";
      } else {
        particle.style.background = "var(--clr-primary-light)";
      }

      container.appendChild(particle);

      // Animate each particle
      gsap.to(particle, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      });

      gsap.to(particle, {
        y: (Math.random() - 0.5) * 80,
        x: (Math.random() - 0.5) * 60,
        duration: Math.random() * 6 + 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const top =
          target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // ============================================
  // PARALLAX on Stats Background
  // ============================================
  gsap.to(".stats-bg", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".stats",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // ============================================
  // 9. 3D Tilt Effects (Consolidated)
  // ============================================
  const applyTilt = (selector, intensity = 5) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        gsap.to(el, {
          rotateX,
          rotateY,
          scale: intensity > 10 ? 1.02 : 1.01,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    });
  };

  // Regular tilt for standard cards
  applyTilt(".bento-card, .stat-card, .why-card, .testimonial-card", 5);

  // Premium strong tilt for Program cards
  applyTilt(".program-card", 12);

  // ============================================
  // SECTION CONNECTORS — Scroll Reveal
  // ============================================
  gsap.utils.toArray(".section-connector").forEach((connector) => {
    gsap.from(connector, {
      opacity: 0,
      scaleY: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: connector,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  // ============================================
  // SECTION LINE — Width Animation on Scroll
  // ============================================
  gsap.utils.toArray(".section-line").forEach((line) => {
    gsap.from(line, {
      scaleX: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    });
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
