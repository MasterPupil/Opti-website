// src/components/HeroSection/HeroSection.jsx
import React from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      {/* Conteneur pour la vidéo en arrière-plan */}
      <div className={styles.videoBackground}>
        <video
          // Chemin vers la vidéo dans le dossier /public
          src="/videos/Optinova.mp4" // !! Adaptez ce chemin à votre fichier !!
          autoPlay // Lecture automatique
          loop     // Lecture en boucle
          muted    // Muet (souvent nécessaire pour l'autoplay)
          playsInline // Important pour la lecture directe sur iOS
          preload="metadata" // Aide le navigateur (optionnel)
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
            href="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation" // !! Remplacez par votre vrai lien Calendly !!
            target="_blank" // Ouvre dans un nouvel onglet
            rel="noopener noreferrer" // Sécurité pour les liens externes
            className={`${styles.ctaButton} ${styles.ctaBookCall}`}
          >
            Plan Free Call {/* MODIFIÉ ICI */}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;