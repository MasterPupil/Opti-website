// src/app/page.js
import HeroSection from '@/components/HeroSection/HeroSection';
import ContentSection from '@/components/ContentSection/ContentSection'; // Import the ContentSection component
// Import Image from Next.js if you use local optimized images
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* First Content Section: AI Solutions & Benefits */}
      <ContentSection
        ariaTitleId="ai-driven-efficiency" // Unique ID for accessibility
        layout="textLeft"
        title="Unlock Efficiency with AI & Automation"
        text={
          <>
            Optinova delivers intelligent AI and automation solutions that streamline your operations and significantly reduce manual tasks, for both SMBs and professional firms.<br />
            Our custom systems, from smart CRM workflows to automated reporting, empower you to work smarter, save valuable time, and achieve lasting, scalable results.
          </>
        }
        visualContent={
          <video
             src="/videos/v2Optinova.mp4" // Placeholder - update with relevant AI/business visual
             autoPlay loop muted playsInline
             style={{ width: '100%', height: 'auto', display: 'block' }}
           />
        }
        buttonLabel="Learn More"
        buttonLink="/about"
      />

      {/* Second Content Section: Custom Strategies & Call to Action */}
       <ContentSection
        ariaTitleId="custom-ai-cta" // Unique ID
        layout="textRight" // Alternating layout
        title="Custom AI Strategies for Measurable Impact"
        text={
          <>
            Every business is unique. That&#39;s why we partner with you to understand your specific goals, then develop tailored AI automation strategies that deliver tangible improvements and significant time savings.<br />
            Ready to simplify your processes, scale effectively, and see real results?
          </>
        }
        visualContent={
           <video
             src="/videos/bEI1MUca79WBHBMv5SzNMecXuVg.mp4" // Placeholder - update with relevant strategy/results visual
             autoPlay loop muted playsInline
             style={{ width: '100%', height: 'auto', display: 'block' }}
           />
        }
        buttonLabel="Book a Free Strategy Call"
        buttonLink="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation" // Your Calendly link
      />
    </>
  );
}