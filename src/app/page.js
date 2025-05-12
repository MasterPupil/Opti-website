// File: src/app/page.js
import HeroSection from '@/components/HeroSection/HeroSection';
import ContentSection from '@/components/ContentSection/ContentSection';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* First Content Section: AI Solutions & Benefits */}
      <ContentSection
        ariaTitleId="ai-driven-efficiency"
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
            src="/videos/optinova2.mp4.mp4"
            data-fallback="/images/optinova2_GIF.gif"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        }
        buttonLabel="Learn More"
        buttonLink="/about"
      />

      {/* Second Content Section: Custom Strategies & Call to Action */}
      <ContentSection
        ariaTitleId="custom-ai-cta"
        layout="textRight"
        title="Custom AI Strategies for Measurable Impact"
        text={
          <>
            Every business is unique. That&apos;s why we partner with you to understand your specific goals, then develop tailored AI automation strategies that deliver tangible improvements and significant time savings.<br />
            Ready to simplify your processes, scale effectively, and see real results?
          </>
        }
        visualContent={
          <video
            src="/videos/bEI1MUca79WBHBMv5SzNMecXuVg.mp4"
            data-fallback="/images/Optigif4.gif"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        }
        buttonLabel="Book a Free Strategy Call"
        buttonLink="https://api.leadconnectorhq.com/widget/bookings/optinova-ai-automation-consultation"
      />
    </>
  );
}
