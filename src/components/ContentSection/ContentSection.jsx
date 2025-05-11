// File: src/components/ContentSection/ContentSection.jsx
'use client';

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContentSection.module.scss';

gsap.registerPlugin(ScrollTrigger);

const ContentSection = ({
  title,
  text,
  visualContent,
  layout = 'textLeft',
  buttonLabel,
  buttonLink,
  ariaTitleId,
}) => {
  const sectionRef = useRef(null);
  const visualColRef = useRef(null);
  const textColRef = useRef(null);
  const textContentRef = useRef(null);
  const isTextLeft = layout === 'textLeft';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const visualElement = visualColRef.current;
      const textElement = textColRef.current;
      const q = gsap.utils.selector(textContentRef);

      gsap.set(visualElement, {
        xPercent: isTextLeft ? 100 : -100,
        opacity: 0,
      });
      gsap.set(textElement, {
        xPercent: isTextLeft ? -100 : 100,
        opacity: 0,
      });
      gsap.set(q('h2, p, .ctaButton'), {
        y: 40,
        opacity: 0,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });

      tl.to([visualElement, textElement], {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      })
      .to(q('h2, p, .ctaButton'), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      }, '-=0.5');
    }, sectionRef);

    return () => ctx.revert();
  }, [isTextLeft]);

  useEffect(() => {
    const container = visualColRef.current;
    if (!container) return;
    const video = container.querySelector('video');
    if (!video) return;
    const fallback = video.dataset.fallback;

    video.play().catch(() => {});

    const id = setTimeout(() => {
      if (video.paused) {
        video.style.display = 'none';
        const img = document.createElement('img');
        img.src = fallback;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        container.appendChild(img);
      }
    }, 500);

    return () => clearTimeout(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.contentSection} ${isTextLeft ? styles.textLeft : styles.textRight}`}
      aria-labelledby={ariaTitleId}
    >
      <div className={`container ${styles.sectionContainer}`}>
        <div className={styles.visualColumn} ref={visualColRef}>
          {visualContent}
        </div>
        <div className={styles.textColumn} ref={textColRef}>
          <div ref={textContentRef}>
            <h2 id={ariaTitleId}>{title}</h2>
            <p>{text}</p>
            {buttonLabel && buttonLink && (
              <Link href={buttonLink} className={`button ${styles.ctaButton}`}>
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