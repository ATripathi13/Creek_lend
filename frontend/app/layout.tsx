import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import UTMTracker from "../src/components/UTMTracker";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Creek Lend | Fast, Secure Direct Lending for Your Needs",
  description: "Get access to flexible loan options with Creek Lend. Fast approval, competitive rates, and secure direct lending in the US, Canada, and India.",
  keywords: ["direct lending", "loans", "fast approval loans", "Creek Lend", "personal loans"],
  authors: [{ name: "Creek Lend Team" }],
  openGraph: {
    title: "Creek Lend | Direct Lending Platform",
    description: "Secure and fast direct lending platform catering to US, CA, and IN.",
    url: "https://creeklend.com",
    siteName: "Creek Lend",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creek Lend | Direct Lending",
    description: "Fast and secure loan applications online.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Creek Lend",
    "url": "https://creeklend.com",
    "logo": "https://creeklend.com/logo.png",
    "serviceType": "Financial Service",
    "areaServed": ["US", "CA", "IN"],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        <div className="flex flex-col min-h-screen">
          {/* Navbar Placeholder */}
          <header className="sticky top-0 z-50 glass border-b">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
              <div className="text-2xl font-bold font-outfit gradient-text">
                Creek Lend
              </div>
              <div className="hidden md:flex gap-8 items-center text-sm font-medium">
                <a href="/how-it-works" className="hover:text-primary-600 transition-colors">How It Works</a>
                <a href="/rates-and-fees" className="hover:text-primary-600 transition-colors">Rates & Fees</a>
                <a href="/faq" className="hover:text-primary-600 transition-colors">FAQ</a>
                <a href="/contact" className="hover:text-primary-600 transition-colors">Contact</a>
                <a
                  href="/apply"
                  className="bg-primary-600 text-white px-5 py-2.5 rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
                >
                  Apply Now
                </a>
              </div>
            </nav>
          </header>

          <main className="flex-grow">
            {children}
          </main>

          {/* Footer Placeholder */}
          <footer className="bg-muted border-t mt-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="text-xl font-bold font-outfit gradient-text mb-4">Creek Lend</div>
                  <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                    Creek Lend is a premier direct lending platform providing fast, secure, and transparent financial solutions to borrowers in North America and India.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/faq" className="hover:text-primary">FAQ</a></li>
                    <li><a href="/contact" className="hover:text-primary">Contact Us</a></li>
                    <li><a href="/legal/privacy-policy" className="hover:text-primary">Privacy Policy</a></li>
                    <li><a href="/legal/terms-of-service" className="hover:text-primary">Terms of Service</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Disclosures</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="/legal/fair-lending" className="hover:text-primary">Fair Lending</a></li>
                    <li><a href="/legal/direct-lender-disclosure" className="hover:text-primary">Lender Disclosure</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Creek Lend. All rights reserved. Direct Lender Disclosure applied.
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
