import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { SearchModalProvider } from "@/contexts/search-modal-context";
import SearchBarModal from "@/components/modals/search-bar-modal";
import { ParametresProvider } from "@/contexts/parametres-context";
import ScrollToTop from "@/components/commons/scroll-to-top";

export const metadata = {
  title: "Veevent - Plateforme d'événements",
  description:
    "Découvrez et participez aux meilleurs événements près de chez vous",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VeEvent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <SearchModalProvider>
            <ParametresProvider>
              <ScrollToTop />
              <Header />
              {children}
              <Footer />
              <SearchBarModal />
            </ParametresProvider>
          </SearchModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
