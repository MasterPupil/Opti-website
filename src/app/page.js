// src/app/page.js
import HeroSection from '@/components/HeroSection/HeroSection';
import ContentSection from '@/components/ContentSection/ContentSection'; // Importer le nouveau composant
// Importez Image de Next.js si vous utilisez une image locale optimisée
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* Première Section de Contenu (Ex: Texte à Gauche, Visuel à Droite) */}
      <ContentSection
        ariaTitleId="seamless-access" // ID unique pour le titre (accessibilité)
        layout="textLeft"
        title="Seamless Access to Blockchain Data" // [cite: 1] Contenu inspiré de la maquette
        text="Leverage our advanced infrastructure to access real-time and historical blockchain data across multiple networks. Simplify your development process and focus on building value."
        visualContent={
          // Vous pouvez mettre ici une image, une vidéo, ou autre chose
          // Exemple avec une image simple (placez une image dans public/images)
          
          // Ou exemple avec une vidéo (placez une vidéo dans public/videos)
          <video
             src="/videos/v2Optinova.mp4"
             autoPlay loop muted playsInline
             style={{ width: '100%', height: 'auto', display: 'block' }} // Styles inline pour l'exemple
           /> 
          // Ou exemple avec next/image (importer 'Image' from 'next/image')
          /* <Image
             src="/images/section-image-1.jpg" // Doit être dans public
             alt="Descriptive alt text"
             width={500} // Largeur intrinsèque de l'image
             height={300} // Hauteur intrinsèque de l'image
             style={{ width: '100%', height: 'auto' }} // Pour la responsivité
          /> */
        }
        buttonLabel="Explore Services"
        buttonLink="/services" // Lien exemple
      />

      {/* Deuxième Section de Contenu (Ex: Visuel à Gauche, Texte à Droite) */}
       <ContentSection
        ariaTitleId="enriched-data" // ID unique différent
        layout="textRight" // Inverse le layout
        title="Unlock Insights with Enriched Blockchain Data" // [cite: 1] Contenu inspiré de la maquette
        text="Go beyond raw data. Our platform provides enriched and contextualized blockchain information, enabling deeper analysis and smarter decision-making for your business or clients."
        visualContent={
           <video
           src="/videos/bEI1MUca79WBHBMv5SzNMecXuVg.mp4"
           autoPlay loop muted playsInline
                     style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        }
        buttonLabel="Learn More"
        buttonLink="/about"
      />

      {/* Ajoutez d'autres sections ici si nécessaire */}

      {/* Espace pour tester le scroll (peut être retiré plus tard) */}
      {/* <div style={{ height: '50vh' }}></div> */}
    </>
  );
}