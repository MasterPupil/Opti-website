import '@/styles/globals.scss';
import Navbar from '@/components/Navbar/Navbar'; 
import Footer from '@/components/Footer/Footer';
import BookingSection from '@/components/BookingSection/BookingSection';

export const metadata = {
  title: 'Optinova - AI Solutions',
  description: 'AI solutions for SMBs and law firms',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> 
        <main>{children}</main> 
        <BookingSection />
        <Footer />
      </body>
    </html>
  );
}
