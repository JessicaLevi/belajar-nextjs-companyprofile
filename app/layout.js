import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

import localFont from "next/font/local";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { UserProvider } from "@/context/UserContext";
import { FavoriteProvider } from "@/context/FavoriteContext";

const fontSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-Variable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-Variable.woff2",
      style: "italic",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: "MyWebsite — Build something meaningful",
  description:
    "We help individuals and businesses build modern, simple, and useful digital experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <UserProvider>
            <FavoriteProvider>
              <Navbar />

              <main className="flex-1">{children}</main>

              <Footer />
            </FavoriteProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
