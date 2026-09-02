import Header from "@/components/header";
import Footer from "@/components/footer";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata = {
  title: "Lima Basics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${instrument.variable}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
