import React from 'react'
import Link from 'next/link'
import { FaLinkedin, FaYoutube } from 'react-icons/fa'
import styles from './Footer.module.scss'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      {/* — Ligne principale — */}
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Optinova
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.socials}>
          <a
            href="https://www.linkedin.com/company/optinovaa/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </div>

      {/* — Ligne du bas (sans badge) — */}
      <div className={`container ${styles.bottom}`}>        
        <div className={styles.copyRight}>
        &copy; {year} Optinova. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
