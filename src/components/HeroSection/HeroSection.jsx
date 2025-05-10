// src/components/HeroSection/HeroSection.jsx
'use client'; // Assurez-vous que c'est un Client Component si ce n'est pas déjà le cas pour utiliser useEffect et useRef

import React, { useRef, useEffect } from 'react'; // MODIFIÉ ICI : ajout de useRef et useEffect
import Link from 'next/link';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const videoRef = useRef(null); // MODIFIÉ ICI : création de la référence pour la vidéo

  // MODIFIÉ ICI : ajout de useEffect pour la gestion de la vidéo
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Il est bon de ré-appliquer ces propriétés ici pour s'assurer qu'elles sont bien actives
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.playsInline = true;

      // Tentative de lecture de la vidéo
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            // La lecture a démarré (ou était déjà en cours)
            console.log(`Vidéo [${videoElement.src}] : lecture automatique initiée ou confirmée.`);
          })
          .catch(error => {
            // La lecture automatique a été bloquée
            console.error(`Vidéo [${videoElement.src}] : ERREUR - Lecture automatique bloquée par le navigateur :`, error);
            // Ici, vous pourriez envisager d'afficher un bouton de lecture personnalisé si nécessaire,
            // ou de logger cette erreur pour analyse.
          });
      }
    }
  }, []); // Le tableau de dépendances vide [] assure que cet effet s'exécute une seule fois après le montage initial.

  return (
    <section className={styles.heroSection}>
      {/* Conteneur pour la vidéo en arrière-plan */}
      <div className={styles.videoBackground}>
        <video
          ref={videoRef} // MODIFIÉ ICI : liaison de la référence à l'élément vidéo
          src="/videos/Optinova.mp4" // Assurez-vous que ce chemin est correct
          // autoPlay // L'attribut autoPlay est maintenant géré par l'appel videoElement.play() dans useEffect
          loop     // Conservé pour la lecture en boucle
          muted    // Conservé, crucial pour l'autoplay
          playsInline // Conservé, crucial pour iOS
          preload="auto" // Changé en "auto" pour potentiellement aider le chargement avant la lecture JS
        />
        {/* Superposition sombre optionnelle pour améliorer la lisibilité du texte */}
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Conteneur pour le contenu textuel (centré) */}
      <div className={`container ${styles.heroContent}`}> {/* Container global + style local */}
        <h1 className={styles.heroTitle}>
        AI Integration & Automation for SMBs
        </h1>
        <p className={styles.heroSubtitle}>
        Smarter Operations. Real Results. <br /> <br /> Intelligent AI & Automation, Tailored for Your Growth.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/about" className={`${styles.ctaButton} ${styles.ctaLearnMore}`}>
            Learn More
          </Link>
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaButton} ${styles.ctaBookCall}`}
          >
            Plan Free Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;