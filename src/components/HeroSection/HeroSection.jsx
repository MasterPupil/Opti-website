'use client';

import React, { useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { gsap } from 'gsap';
import styles from './HeroSection.module.scss';

gsap.registerPlugin();

const HeroSection = () => {
  const contentRef = useRef(null);
  const quotesRef = useRef(null);

  // Placeholder quotes; replace with actual texts when ready
  const quotes = [
    "AI just identified 3 new high-value leads in your pipeline.",
    "Your new automated workflow has already saved your team 5+ hours this week!",
    "Ready to enhance customer engagement with our latest AI chatbot features?",
    "Pro Tip for SMBs: Automate data entry & reclaim up to 20% of your team's time.",
    "Welcome! Your Optinova dashboard is now live and learning your business processes.",
    "Data insight: We've detected a 15% increase in positive customer interactions this month.",
    
  ];

  useLayoutEffect(() => {
    // Animate main heading, subtitle, buttons from left
    const elems = contentRef.current.querySelectorAll('h1, p, a');
    
    // Définir la position initiale avant l'animation
    gsap.set(elems, {
      x: -100,
      opacity: 0,
      scale: 0.95
    });
    
    // Animer vers la position finale (0)
    gsap.to(elems, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power3.out',
      stagger: 0.3,
      delay: 0.8
    });

    // Animate quotes from right
    const quoteEls = quotesRef.current.querySelectorAll(`.${styles.quote}`);
    
    // Définir la position initiale des citations
    gsap.set(quoteEls, {
      x: 100,
      opacity: 0
    });
    
    // Animer vers la position finale
    gsap.to(quoteEls, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
      stagger: 0.4,
      delay: 0.8
    });
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Unicorn background animation embed */}
      <div
        className={styles.unicornBackground}
        data-us-project="b8LZSMCLSFXo4yqaYJdV"
      />
      <Script id="unicorn-init" strategy="afterInteractive">
        {`!function(){if(!window.UnicornStudio){window.UnicornStudio={isInitialized:false};var i=document.createElement("script");i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.20/dist/unicornStudio.umd.js";i.onload=function(){if(!window.UnicornStudio.isInitialized){UnicornStudio.init();window.UnicornStudio.isInitialized=true}};(document.head||document.body).appendChild(i)}}();`}
      </Script>

      {/* Dark overlay for readability */}
      <div className={styles.videoOverlay}></div>

      {/* Text content with GSAP entrance animation - removed container class */}
      <div className={styles.heroContent} ref={contentRef}>
        <h1 className={styles.heroTitle}>
          AI Integration & Automation for SMBs
        </h1>
        <p className={styles.heroSubtitle}>
          Smarter Operations. Real Results.<br />
          <br />
          Intelligent AI & Automation, Tailored for Your Growth.
        </p>
        <div className={styles.ctaButtons}>
          <Link href="/about" className={`${styles.ctaButton} ${styles.ctaLearnMore}`}>
            Learn More
          </Link>
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.ctaButton} ${styles.ctaBookCall}`}>
            Plan Free Call
          </a>
        </div>
      </div>

      {/* Quotes scattered on right side */}
      <div className={styles.quotesContainer} ref={quotesRef}>
        {quotes.map((text, i) => (
          <p key={i} className={styles.quote}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;