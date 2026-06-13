import localFont from "next/font/local";
import { Archivo, Asap } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const asap = Asap({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});
