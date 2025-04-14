import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FindIT",
  description: "A Centralized Lost and Found Web App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        {/* Script to handle browser extension attributes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove browser extension attributes that cause hydration errors
              document.addEventListener('DOMContentLoaded', function() {
                const body = document.body;
                if (body.hasAttribute('data-new-gr-c-s-check-loaded')) {
                  body.removeAttribute('data-new-gr-c-s-check-loaded');
                }
                if (body.hasAttribute('data-gr-ext-installed')) {
                  body.removeAttribute('data-gr-ext-installed');
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
