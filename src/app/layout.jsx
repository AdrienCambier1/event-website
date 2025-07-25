import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/contexts/auth-context";
import { CityProvider } from "@/contexts/city-context";

export const metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#fafafa" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </head>
      <body>
        <AuthProvider>
          <CityProvider>
            <Header />
            {children}
            <Footer />
          </CityProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
