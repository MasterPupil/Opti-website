// src/app/contact/page.jsx
import React from 'react';
import styles from './contact.module.scss'; // Fichier SCSS à mettre à jour

// !! Important: Pas besoin de 'use client' pour un simple formulaire HTML vers Formspree !!

export const metadata = {
  title: 'Contact Us | Optinova',
  description: 'Get in touch with Optinova. Send us a message using the contact form.',
};

const ContactPage = () => {
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mldbrnjb"; // !! Remplacez par votre URL Formspree !!

  return (
    <div className={styles.contactPage}>
       {/* Le container global n'est peut-être pas nécessaire si la page prend toute la largeur */}
      <div className={styles.gridContainer}>

        {/* Colonne Gauche: Titre et Sous-titre */}
        <div className={styles.leftColumn}>
          <h1 className={styles.pageTitle}>Contact</h1>
          <p className={styles.subtitle}>
            Get in touch to explore the future of Web3 data with Nodi. {/* Texte de la maquette */}
          </p>
          {/* Le dégradé sera géré en CSS */}
        </div>

        {/* Colonne Droite: Formulaire */}
        <div className={styles.rightColumn}>
          <form action={FORMSPREE_ENDPOINT} method="POST" className={styles.contactForm}>

            <div className={styles.nameFields}>
              {/* Prénom */}
              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.label}>First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName" // Nom utilisé par Formspree
                  required
                  className={styles.input}
                  placeholder="Jane"
                />
              </div>
              {/* Nom */}
              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.label}>Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className={styles.input}
                  placeholder="Smith"
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email *</label>
              <input
                type="email"
                id="email"
                name="email" // 'email' ou '_replyto' sont courants pour Formspree
                required
                className={styles.input}
                placeholder="jane@domain.com"
              />
            </div>

            {/* Message */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <textarea
                id="message"
                name="message"
                rows="5" // Hauteur indicative
                className={styles.textarea}
                placeholder="Write your message here"
              ></textarea>
            </div>

            {/* Bouton Submit */}
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;