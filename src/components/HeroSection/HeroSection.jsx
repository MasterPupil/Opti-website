// src/components/HeroSection/HeroSection.jsx
'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react'; // Ajoutez useEffect
import Link from 'next/link';
import Script from 'next/script';
import { gsap } from 'gsap';
import styles from './HeroSection.module.scss';

// gsap.registerPlugin(); // Si vous n'utilisez pas de plugin spécifique, vous pouvez l'enlever.

const HeroSection = () => {
  const contentRef = useRef(null);
  const quotesRef = useRef(null);
  const unicornBgRef = useRef(null); // Référence pour le conteneur de l'animation

  const quotes = [
    "AI just identified 3 new high-value leads in your pipeline.",
    "Your new automated workflow has already saved your team 5+ hours this week!",
    "Ready to enhance customer engagement with our latest AI chatbot features?",
    "Pro Tip for SMBs: Automate data entry & reclaim up to 20% of your team's time.",
    "Welcome! Your Optinova dashboard is now live and learning your business processes.",
    "Data insight: We've detected a 15% increase in positive customer interactions this month.",
  ];

  // Pour les animations GSAP du contenu
  useLayoutEffect(() => {
    if (!contentRef.current || !quotesRef.current) return; // S'assurer que les refs sont prêtes

    const elems = contentRef.current.querySelectorAll('h1, p, a');
    gsap.set(elems, { x: -100, opacity: 0, scale: 0.95 });
    gsap.to(elems, {
      x: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out', stagger: 0.3, delay: 0.8
    });

    const quoteEls = quotesRef.current.querySelectorAll(`.${styles.quote}`);
    gsap.set(quoteEls, { x: 100, opacity: 0 });
    gsap.to(quoteEls, {
      x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', stagger: 0.4, delay: 0.8
    });
  }, []);

  // Pour l'initialisation de Unicorn Studio
  useEffect(() => {
    // Fonction pour charger et initialiser le script Unicorn
    const initUnicorn = () => {
      if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
        try {
          // On s'assure que l'élément cible existe avant d'appeler init
          if (unicornBgRef.current) {
            console.log("HeroSection mounted, attempting to init UnicornStudio on:", unicornBgRef.current);
            window.UnicornStudio.init(); // Essayer d'appeler init à chaque montage
            // Si init ne fonctionne qu'une fois à cause de isInitialized,
            // il faudrait une méthode de "refresh" ou "reapply" de UnicornStudio.
            // Si le script est idempotent et re-scanne les data-us-project, c'est bon.
          }
        } catch (e) {
          console.error("Error during UnicornStudio.init():", e);
        }
      } else {
        // Si UnicornStudio n'est pas encore chargé (par le <Script>), on attend un peu et on réessaie,
        // ou on se fie au onload du <Script> component.
        // Pour cet exemple, on suppose que le <Script> ci-dessous gère le chargement initial.
        // Cet useEffect est plus pour les re-montages après navigation client.
        console.log("UnicornStudio not ready yet when HeroSection useEffect ran.");
      }
    };

    // Gérer le cas où le script est chargé via le composant <Script> de Next.js
    // Le script dans le composant <Script> s'occupe de la première initialisation.
    // Ce useEffect essaie de s'assurer que l'animation est active si on revient sur la page.
    // Si UnicornStudio.init() est safe à appeler plusieurs fois ou détecte les nouveaux éléments :
    if (window.UnicornStudio && window.UnicornStudio.isInitialized) {
        // Si déjà initialisé une fois, essayons de relancer sur l'élément spécifique
        // ou simplement init() à nouveau.
        initUnicorn();
    } else {
        // Le script est peut-être encore en train de se charger via le composant <Script>
        // Le onload du script dans le composant <Script> devrait appeler init().
        // On pourrait ajouter un écouteur d'événement si le script émet un événement quand il est prêt.
    }

    // Si vous n'utilisez pas le composant <Script> de Next.js pour le chargement initial
    // et que vous gérez le chargement du script manuellement, vous appelleriez initUnicorn() ici.

  }, []); // Se lance au montage du composant HeroSection

  return (
    <section className={styles.heroSection}>
      <div
        ref={unicornBgRef} // Ajoutez une ref ici
        className={styles.unicornBackground}
        data-us-project="b8LZSMCLSFXo4yqaYJdV"
      />
      {/* Le composant Script de Next.js gère le chargement et l'exécution initiale */}
      <Script id="unicorn-init" strategy="afterInteractive">
        {`
          if (!window.UnicornStudio) {
            window.UnicornStudio = { isInitialized: false, projectSelectors: [] };
            var us_script = document.createElement("script");
            us_script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js";
            us_script.onload = function() {
              if (window.UnicornStudio && typeof window.UnicornStudio.initProjects === 'function') {
                console.log("UnicornStudio script loaded, initializing projects.");
                UnicornStudio.initProjects(); // Fonction pour initialiser tous les data-us-project
                window.UnicornStudio.isInitialized = true;
              } else if (window.UnicornStudio && typeof window.UnicornStudio.init === 'function') {
                 console.log("UnicornStudio script loaded, calling init().");
                 UnicornStudio.init();
                 window.UnicornStudio.isInitialized = true;
              }
            };
            (document.head || document.body).appendChild(us_script);
          } else if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
            // Si l'objet existe mais n'est pas marqué comme initialisé (par notre propre flag)
            // et que la fonction init existe, on l'appelle.
            // Cela peut arriver si le script a été ajouté mais le onload du premier ajout n'a pas fini
            // ou si une navigation a lieu.
            if (typeof window.UnicornStudio.initProjects === 'function') {
                console.log("UnicornStudio object exists, re-initializing projects.");
                UnicornStudio.initProjects();
                window.UnicornStudio.isInitialized = true;
            } else if (typeof window.UnicornStudio.init === 'function') {
                 console.log("UnicornStudio object exists, re-calling init().");
                 UnicornStudio.init();
                 window.UnicornStudio.isInitialized = true;
            }
          } else if (window.UnicornStudio && window.UnicornStudio.isInitialized && typeof window.UnicornStudio.initProjects === 'function') {
            // Si déjà initialisé, on essaie de forcer une ré-initialisation des projets.
            // Cela suppose que initProjects peut être appelé plusieurs fois pour scanner de nouveaux éléments.
            console.log("UnicornStudio already initialized, attempting to re-init projects for current view.");
            UnicornStudio.initProjects();
          }
        `}
      </Script>

      <div className={styles.videoOverlay}></div>
      <div className={styles.heroContent} ref={contentRef}>
        {/* ... reste du JSX ... */}
        <h1 className={styles.heroTitle}>
          AI Integration & Automation for SMBs
        </h1>
        <p className={styles.heroSubtitle}>
          Smarter Operations. Real Results.<br />
          <br />
          Intelligent AI & Automation, Tailored for Your Growth.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/about" className={`${styles.ctaButton} ${styles.ctaLearnMore}`}>
            Learn More
          </Link>
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaButton} ${styles.ctaBookCall}`}>
            Plan Free Call
          </a>
        </div>
      </div>
      <div className={styles.quotesContainer} ref={quotesRef}>
        {quotes.map((text, i) => (
          <p key={i} className={styles.quote}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;