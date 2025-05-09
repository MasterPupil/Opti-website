// src/components/Navbar/Navbar.jsx
'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Assurez-vous que cette ligne est présente
import { gsap } from 'gsap';
import styles from './Navbar.module.scss';

const Navbar = () => {
  // ... (votre code existant : isMenuOpen, navRef, toggleMenu, closeMenu, useLayoutEffect - tout cela reste INCHANGÉ) ...
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

  useLayoutEffect(() => {
    const overlayElement = overlayRef.current;
    const navLinks = gsap.utils.selector(overlayNavRef)('a');

    gsap.set(overlayElement, { xPercent: 100, autoAlpha: 0 });
    gsap.set(navLinks, { y: 30, autoAlpha: 0 });

    let tl;

    if (isMenuOpen) {
      document.body.classList.add('menu-open');

      tl = gsap.timeline();
      tl.to(overlayElement, {
        xPercent: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out',
      }).to(navLinks, {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      }, "-=0.3");

    } else {
      document.body.classList.remove('menu-open');

      gsap.to(navLinks, {
        y: 30,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power1.in',
        stagger: 0.05,
        onComplete: () => {
            gsap.to(overlayElement, {
              xPercent: 100,
              autoAlpha: 0,
              duration: 0.4,
              ease: 'power3.in',
            });
        }
      });
    }

    return () => {
      if (tl) {
        tl.kill();
      }
      gsap.killTweensOf(overlayElement);
      gsap.killTweensOf(navLinks);
      document.body.classList.remove('menu-open');
    };

  }, [isMenuOpen]);


   return (
    <header ref={navRef} className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu} className={styles.logoLinkContainer}> {/* Ajout d'une classe pour styler le lien si besoin */}
            <Image
              src="/images/logooptino.png"
              alt="Optinova Icon" // Texte alternatif pour la petite icône
              width={24}  // TAILLE SUGGÉRÉE pour une petite icône à côté du texte (adaptez si besoin)
              height={24} // Si l'icône est carrée, sinon ajustez pour garder le ratio
              priority
              className={styles.logoIcon} // Classe pour l'icône si des styles spécifiques sont nécessaires
            />
            <span className={styles.logoText}> Optinova</span> {/* Votre texte logo */}
          </Link>
        </div>

        {/* Navigation Desktop (reste INCHANGÉE) */}
        <nav className={styles.navDesktop}>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Bouton Burger (reste INCHANGÉ) */}
        <button
          className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu-overlay"
        >
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
          <span className={styles.burgerLine}></span>
        </button>
      </div>

      {/* Overlay Menu Mobile (reste INCHANGÉ) */}
      <div
        id="mobile-menu-overlay"
        className={styles.mobileMenuOverlay}
        ref={overlayRef}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.mobileNav} ref={overlayNavRef}>
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