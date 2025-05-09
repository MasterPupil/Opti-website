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
          Empower people and businesses to work, think, and build smarter.
        </p>
        {/* Ajout de la ref au premier hr */}
        <hr className={styles.divider} ref={topDividerRef} />

        {/* Section: Vision */}
        {/* Ajout de la ref via la fonction addToSectionRefs */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our Vision</h2>
          <div className={styles.sectionContent}>
            <p>
              Optinova is founded on the principle that the transformative power of Artificial Intelligence
              should drive real, measurable growth for Small and Medium-sized Businesses (SMBs).
            </p>
            <p>
              We believe AI and automation aren’t just for big enterprises. They’re powerful tools that can help
              everyday businesses work smarter, save time, and scale efficiently.
            </p>
          </div>
        </section>
        <hr className={styles.divider} /> {/* Pas besoin d'animer ce hr */}

        {/* Section: Mission */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <div className={styles.sectionContent}>
            <p>
              Our mission at Optinova is to make advanced AI accessible and practical, helping business
              owners and developers unlock new levels of productivity, streamline operations, and deliver
              better customer experiences.
            </p>
            <p>
              We’re driven by a belief in the power of democratized AI, where sophisticated tools aren’t
              reserved for tech giants, but are understandable, usable, and strategically valuable for
              businesses of all sizes. Our approach starts with listening: understanding the unique challenges
              our clients face, then tailoring AI solutions that create real, measurable impact.
            </p>
            <p>
              By combining cutting-edge technology with a deep commitment to client success, Optinova
              aims to lead the way as a trusted intelligence and data partner in the evolving digital landscape,
              including the future of Web3.
            </p>
          </div>
        </section>
        <hr className={styles.divider} /> {/* Pas besoin d'animer ce hr */}

        {/* Section: Values */}
        <section className={styles.section} ref={addToSectionRefs}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.sectionContent}>
            <p>
              We prioritize innovation by constantly pushing the boundaries of what's possible in AI and
              automation. Transparency and trust are at the core of our mission, ensuring that every
              interaction reflects our commitment to integrity.
            </p>
            <p>
              Collaboration fuels our progress as we build meaningful partnerships to achieve collective
              success.
            </p>
            <p>
              We strive for excellence in delivering reliable, precise solutions tailored to the ever-evolving
              needs of our users. Above all, we are dedicated to sustainability, working toward a decentralized
              future that benefits generations to come.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;