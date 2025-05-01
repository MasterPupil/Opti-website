import React from 'react';
import styles from './BookingSection.module.scss';

const BookingSection = () => {

  const CALENDLY_LINK = "VOTRE_LIEN_CALENDLY_ICI";

  return (
    // La section parente sert de conteneur pour centrer la boîte de contenu
    <section className={styles.bookingSection}>
        {/* La boîte interne qui contient le style de la maquette */}
        <div className={styles.contentBox}>
             {/* Superposition optionnelle pour améliorer la lisibilité du texte sur l'image */}
             <div className={styles.backgroundOverlay}></div>

            {/* Contenu textuel */}
            <h2 className={styles.title}>
                Ready to Discuss Your Project? {/* Titre adapté */}
            </h2>
            <p className={styles.subtitle}>
                Schedule a free consultation to explore how our AI solutions can benefit your business. {/* Sous-titre adapté */}
            </p>
            <a
            href={CALENDLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton} // Style du bouton adapté
            >
            Book a Call {/* Texte du bouton adapté */}
            </a>
        </div>
    </section>
  );
};

export default BookingSection;