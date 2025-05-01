
'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Importez ScrollTrigger
import styles from './ContentSection.module.scss';

// Enregistrez le plugin ScrollTrigger UNE SEULE FOIS (idéalement dans un fichier central,
// mais ici ça fonctionne aussi car les modules JS sont mis en cache)
gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({
  title,
  text,
  visualContent, // On passera un élément JSX (<img>, <video>, etc.)
  layout = 'textLeft', // 'textLeft' ou 'textRight'
  buttonLabel,
  buttonLink,
  ariaTitleId, // Pour l'accessibilité (liaison aria-labelledby)
}) => {
  const sectionRef = useRef(null);
  const visualColRef = useRef(null);
  const textColRef = useRef(null);
  const textContentRef = useRef(null); // Pour animer les éléments texte en stagger

  const isTextLeft = layout === 'textLeft';

  useLayoutEffect(() => {
    // Utiliser un contexte GSAP pour simplifier le cleanup
    const ctx = gsap.context(() => {
      const visualElement = visualColRef.current;
      const textElement = textColRef.current;
      const q = gsap.utils.selector(textContentRef); // Sélecteur pour les enfants de textContentRef

      // --- État Initial (Avant Animation) ---
      // Colonne visuelle (vient de la droite si texte à gauche, sinon de gauche)
      gsap.set(visualElement, {
        xPercent: isTextLeft ? 100 : -100,
        opacity: 0,
      });
      // Colonne texte (vient de la gauche si texte à gauche, sinon de droite)
      gsap.set(textElement, {
        xPercent: isTextLeft ? -100 : 100,
        opacity: 0,
      });
      // Éléments texte individuels (titre, p, bouton) cachés en bas
      gsap.set(q('h2, p, .ctaButton'), { // Cibler par classe pour le bouton
        y: 40,
        opacity: 0,
      });

      // --- Création de l'Animation avec ScrollTrigger ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // L'élément déclencheur
          start: 'top 80%', // Démarre quand 80% du haut de la section entre dans la vue
          end: 'bottom 20%', // Fin indicative
          toggleActions: 'play none none none', // Joue l'anim une fois en entrant
          // markers: true, // Décommentez pour débugger les positions de déclenchement
        },
      });

      // --- Ajout des Animations à la Timeline ---
      tl.to([visualElement, textElement], { // Anime les deux colonnes en même temps
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1, // Léger décalage entre l'arrivée des deux colonnes
      })
      .to(q('h2, p, .ctaButton'), { // Anime les éléments texte après l'arrivée des colonnes
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15, // Délai entre chaque élément (titre, p, bouton)
        ease: 'power2.out',
      }, "-=0.5"); // Commence un peu avant la fin de l'animation des colonnes

    }, sectionRef); // Scoper les animations à la section pour le cleanup

    // --- Cleanup ---
    return () => ctx.revert(); // Nettoie toutes les animations créées dans ce contexte

  }, [isTextLeft]); // Relancer l'effet si la prop `layout` change

  return (
    <section
      ref={sectionRef}
      className={`${styles.contentSection} ${isTextLeft ? styles.textLeft : styles.textRight}`}
      aria-labelledby={ariaTitleId} // Lier le titre pour l'accessibilité
    >
      <div className={`container ${styles.sectionContainer}`}>
        {/* Colonne Visuelle */}
        <div className={styles.visualColumn} ref={visualColRef}>
          {visualContent} {/* Affiche l'élément JSX passé en prop */}
        </div>

        {/* Colonne Texte */}
        <div className={styles.textColumn} ref={textColRef}>
          {/* Conteneur pour cibler les éléments texte pour l'animation stagger */}
          <div ref={textContentRef}>
            <h2 id={ariaTitleId}>{title}</h2>
            <p>{text}</p>
            {buttonLabel && buttonLink && (
              <Link href={buttonLink} className={`button ${styles.ctaButton}`}> {/* Classe locale pour l'animation */}
                {buttonLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;