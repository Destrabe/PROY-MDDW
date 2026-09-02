import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";

export const metadata = {
  title: "Lima Basics",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
