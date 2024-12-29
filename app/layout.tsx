"use client";

import { PrimeReactProvider } from "primereact/api";
import Providers from "@components/Providers";
import { Provider } from "react-redux";
import { Geist, Geist_Mono } from "next/font/google";
import { store } from "@store/store";

//import "primereact/resources/primereact.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

import "primereact/resources/themes/tailwind-light/theme.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <Providers>
          <html lang="en">
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              {children}
            </body>
          </html>
        </Providers>
      </Provider>
    </PrimeReactProvider>
  );
}
