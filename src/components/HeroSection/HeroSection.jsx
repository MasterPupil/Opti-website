// src/components/HeroSection/HeroSection.jsx
'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = true;
      videoElement.loop = true;
      videoElement.playsInline = true;

      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise
          .then(_ => {
            console.log(`Vidéo [${videoElement.src}] : lecture automatique initiée ou confirmée.`);
            // Si la vidéo joue, le poster (GIF) sera caché par la vidéo elle-même.
          })
          .catch(error => {
            console.error(`Vidéo [${videoElement.src}] : ERREUR - Lecture automatique bloquée par le navigateur :`, error);
            // Si la lecture est bloquée, le navigateur devrait afficher l'image poster.
            // Puisque le poster est votre GIF animé, l'animation du GIF sera visible.
          });
      }
    }
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Conteneur pour la vidéo en arrière-plan */}
      <div className={styles.videoBackground}>
        <video
          ref={videoRef}
          src="/videos/Optinova.mp4" // Votre vidéo principale
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/testopti.gif" // MODIFIÉ ICI : ajout de l'attribut poster avec le chemin vers votre GIF
        />
        {/* Superposition sombre optionnelle pour améliorer la lisibilité du texte */}
        <div className={styles.videoOverlay}></div>
      </div>

      {/* Conteneur pour le contenu textuel (centré) */}
      <div className={`container ${styles.heroContent}`}>
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