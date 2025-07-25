import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications"; // ✅ Import notifications
import "@mantine/notifications/styles.css";
import "./globals.css";
import React from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Khata Pay",
  description: "Secure ledger app for businesses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <Notifications position="bottom-right" zIndex={2077} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
