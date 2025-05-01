// src/app/about/page.jsx
'use client'; // !! Important: Indiquer que c'est un Client Component

import React, { useRef, useLayoutEffect } from 'react'; // Importer les hooks
import { gsap } from 'gsap'; // Importer GSAP
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Importer ScrollTrigger
import styles from './about.module.scss';

// Enregistrer ScrollTrigger (une seule fois idéalement)
gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const pageRef = useRef(null); // Référence au conteneur principal pour le contexte GSAP
  const titleRef = useRef(null); // Référence au titre H1
  const subtitleRef = useRef(null); // Référence au sous-titre
  const topDividerRef = useRef(null); // Référence au premier séparateur
  const sectionRefs = useRef([]); // Référence pour stocker les éléments <section>
  sectionRefs.current = []; // Vider le tableau à chaque rendu pour éviter les doublons

  // Fonction pour ajouter les refs des sections au tableau
  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    // Contexte GSAP pour un cleanup facile
    const ctx = gsap.context(() => {
      // --- 1. Animation au Chargement (Hero Header) ---
      const tlLoad = gsap.timeline({ delay: 0.1 }); // Petit délai pour être sûr que tout est prêt

      // États initiaux (sera appliqué avant la première frame)
      gsap.set(titleRef.current, { y: 40, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
      gsap.set(topDividerRef.current, { scaleX: 0, transformOrigin: 'center' }); // Origine au centre pour le scaleX

      // Animation du Titre (h1)
      tlLoad.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      }, 0.2); // Démarre à 0.2s

      // Animation du Sous-titre (p)
      tlLoad.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, 0.3); // Démarre à 0.3s (0.1s après le titre)

      // Animation du Séparateur (hr)
      tlLoad.to(topDividerRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power1.out',
      }, 0.3); // Démarre en même temps que le sous-titre

      // --- 2. Animations des Sections au Scroll ---
      sectionRefs.current.forEach((section) => {
        const title = section.querySelector(`.${styles.sectionTitle}`); // Cibler le h2 de la section
        const content = section.querySelector(`.${styles.sectionContent}`); // Cibler le div contenu
        const paragraphs = content ? gsap.utils.toArray(content.querySelectorAll('p')) : []; // Récupérer les paragraphes

        // S'assurer que les éléments existent avant de les animer
        if (!title || !content) return;

        // États initiaux pour l'animation au scroll
        gsap.set(title, { xPercent: -100, opacity: 0 }); // Titre vient de gauche
        gsap.set(content, { xPercent: 100, opacity: 0 }); // Contenu vient de droite
        gsap.set(paragraphs, { y: 30, opacity: 0 }); // Paragraphes cachés en bas

        const tlScroll = gsap.timeline({
          scrollTrigger: {
            trigger: section,           // Déclencheur = la section elle-même
            start: "top 75%",         // Animation démarre quand 75% du haut de la section est visible
            toggleActions: "play none none none", // Joue l'anim 1 fois
            // markers: true, // Décommentez pour le debug
          }
        });

        // Animation des "colonnes" (titre et contenu)
        tlScroll.to([title, content], { // Anime les deux en parallèle
          xPercent: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          // stagger: 0.1 // Optionnel: léger décalage entre titre et contenu
        })
        // Animation des paragraphes internes (si existent)
        .to(paragraphs, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.2, // Apparition décalée des paragraphes
        }, "-=0.4"); // Commence 0.4s avant la fin de l'animation des colonnes
      });

    }, pageRef); // Scoper le contexte GSAP au conteneur principal

    // --- 3. Nettoyage ---
    return () => ctx.revert(); // Nettoie toutes les animations et ScrollTriggers créés dans ce contexte

  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois au montage

  return (
    // Ajout de la ref au conteneur principal
    <div className={styles.aboutPage} ref={pageRef}>
      <div className="container">
        {/* Hero-like header with gradient, title and subtitle */}
        {/* Ajout des refs aux éléments */}
        <h1 className={styles.pageTitle} ref={titleRef}>Our Philosophy</h1>
        <p className={styles.pageSubtitle} ref={subtitleRef}>
          Enriching blockchain data to power innovation and connect the <br /> Web3 ecosystem.
        </p>
        {/* Ajout de la ref au premier hr */}
        <hr className={styles.divider} ref={topDividerRef} />

        {/* Section: Vision */}
        {/* Ajout de la ref via la fonction addToSectionRefs */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our vision</h2>
          <div className={styles.sectionContent}>
            <p>
              Optinova is founded on the principle that the transformative power of
              Artificial Intelligence should be a catalyst for growth and efficiency
              for all businesses, especially Small and Medium-sized Businesses (SMBs)
              and specialized sectors like Law Firms. We envision a future where
              cutting-edge technology is not a barrier, but a readily accessible tool
              driving tangible results.
            </p>
            <p>
              Our goal is to empower businesses and developers to unlock the true potential
              of blockchain technology for a more connected, decentralized future.
            </p>
          </div>
        </section>
        <hr className={styles.divider} /> {/* Pas besoin d'animer ce hr */}

        {/* Section: Mission */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our mission</h2>
          <div className={styles.sectionContent}>
            <p>
              Our core mission is to democratize AI. We strive to make sophisticated tools
              understandable, usable, and strategically valuable. We believe in fostering
              innovation not just within our walls, but within the operations of every client
              we partner with. This requires a deep commitment to understanding their unique
              challenges and tailoring solutions that deliver measurable impact.
            </p>
            <p>
              Through cutting-edge technology and a commitment to excellence, we strive to
              become the leading data provider for the Web3 revolution.
            </p>
          </div>
        </section>
        <hr className={styles.divider} /> {/* Pas besoin d'animer ce hr */}

        {/* Section: Values */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our values</h2>
          <div className={styles.sectionContent}>
            <p>
              We prioritize innovation by constantly pushing the boundaries of what's possible
              in blockchain data. Transparency and trust are at the core of our mission,
              ensuring that every interaction reflects our commitment to integrity. Collaboration
              fuels our progress as we build meaningful partnerships to achieve collective success.
            </p>
            <p>
              We strive for excellence in delivering reliable, precise solutions tailored to the
              ever-evolving needs of our users. Above all, we are dedicated to sustainability,
              working toward a decentralized future that benefits generations to come.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;