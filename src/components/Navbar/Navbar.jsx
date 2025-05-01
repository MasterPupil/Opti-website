// src/components/Navbar/Navbar.jsx
'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap'; // Assurez-vous que GSAP est importé
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const overlayNavRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // --- Animation GSAP ---
  useLayoutEffect(() => {
    const overlayElement = overlayRef.current;
    // Sélectionne les éléments <a> DANS la nav de l'overlay
    const navLinks = gsap.utils.selector(overlayNavRef)('a');

    // Initialisation (caché hors écran à droite, liens cachés en bas)
    gsap.set(overlayElement, { xPercent: 100, autoAlpha: 0 }); // autoAlpha = opacity + visibility
    gsap.set(navLinks, { y: 30, autoAlpha: 0 });

    let tl; // Déclaration de la timeline pour le cleanup

    if (isMenuOpen) {
      // Bloquer le scroll du body
      document.body.classList.add('menu-open'); // Utilise la classe définie dans globals.scss

      // Animation d'ouverture
      tl = gsap.timeline();
      tl.to(overlayElement, {
        xPercent: 0,      // Slide depuis la droite
        autoAlpha: 1,     // Devient visible
        duration: 0.5,
        ease: 'power3.out',
      }).to(navLinks, {
        y: 0,             // Monte à sa position
        autoAlpha: 1,     // Devient visible
        stagger: 0.1,     // Apparition décalée
        duration: 0.4,
        ease: 'power2.out',
      }, "-=0.3"); // Démarre un peu avant la fin de l'anim précédente

    } else {
      // Débloquer le scroll du body
      document.body.classList.remove('menu-open');

      // Animation de fermeture (pas besoin d'une timeline complexe ici)
      // Important : Animer d'abord les liens puis l'overlay pour éviter qu'ils
      // ne soient visibles pendant que l'overlay se ferme.
      gsap.to(navLinks, { // Cache les liens d'abord
        y: 30,
        autoAlpha: 0,
        duration: 0.2, // Rapide
        ease: 'power1.in',
        stagger: 0.05,
        onComplete: () => { // Une fois les liens cachés, ferme l'overlay
            gsap.to(overlayElement, {
              xPercent: 100,
              autoAlpha: 0,
              duration: 0.4,
              ease: 'power3.in',
            });
        }
      });
    }

    // Cleanup: Très important pour éviter les fuites de mémoire ou les bugs
    return () => {
      if (tl) {
        tl.kill(); // Tue la timeline d'ouverture si elle existe
      }
      // Tue aussi les animations de fermeture potentielles lancées hors timeline
      gsap.killTweensOf(overlayElement);
      gsap.killTweensOf(navLinks);
      // Assure que le scroll est réactivé si le composant est démonté
      document.body.classList.remove('menu-open');
    };

  }, [isMenuOpen]); // L'effet se redéclenche quand isMenuOpen change

  // ... (le reste du return JSX reste le même)
   return (
    <header ref={navRef} className={styles.navbar}> {/* Applique la classe principale */}
      <div className={`container ${styles.navContainer}`}> {/* Utilise le conteneur global + classe locale */}
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}> {/* Ferme le menu si ouvert */}
            Optinova {/* Ou votre logo SVG/Image */}
          </Link>
        </div>

        {/* Navigation Desktop (sera cachée sur mobile/tablette via SCSS) */}
        <nav className={styles.navDesktop}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Bouton Burger (affiché sur mobile/tablette via SCSS) */}
        <button
          className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`} // Change de classe si ouvert
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-overlay" // Lie le bouton à l'overlay pour l'accessibilité
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>

      {/* Overlay Menu Mobile (initialement invisible) */}
      <div
        id="mobile-menu-overlay"
        className={styles.mobileMenuOverlay}
        ref={overlayRef}
        // Permet de fermer en cliquant à côté des liens (optionnel)
        // onClick={(e) => e.target === overlayRef.current && closeMenu()}
        // Rendre l'overlay visible/invisible pour les lecteurs d'écran
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNav} ref={overlayNavRef}>
           {/* Optionnel: Bouton "X" pour fermer explicitement */}
           {/* <button className={styles.closeButton} onClick={closeMenu}>&times;</button> */}
          <ul>
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>
            <li><Link href="/about" onClick={closeMenu}>About</Link></li>
            <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;