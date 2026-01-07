"use client";

import * as React from "react";
import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { ContactData } from "@/lib/vcf";
import { Sparkles, QrCode } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<ContactData>({
    firstName: "",
    lastName: "",
    organization: "",
    title: "",
    emails: [
      { value: "", type: "work" },
      { value: "", type: "home" },
    ],
    phones: [
      { value: "", type: "work" },
      { value: "", type: "home" },
    ],
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    website: "",
    notes: "",
  });

  const [qrColors, setQrColors] = useState({
    background: "#ffffff",
    foreground: "#000000",
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      <header className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-200 dark:border-blue-800">
          <Sparkles size={16} />
          Offline-ready VCF Cards
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          QR Contact Generator
        </h1>
        <p className="max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Share your contact details instantly. Fill the form, customize your QR
          code, and scan it with any phone to import your contact.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ContactForm
              data={data}
              setData={setData}
              qrColors={qrColors}
              setQrColors={setQrColors}
            />
          </div>
          <div className="lg:col-span-1 order-1 lg:order-2 sticky top-8">
            <QRCodeDisplay data={data} qrColors={qrColors} />
          </div>
        </div>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-neutral-900 dark:text-neutral-100 font-bold text-xl">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <QrCode size={24} />
            </div>
            QRVCF
          </div>
          <ThemeToggle />
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            &copy; {new Date().getFullYear()} QRVCF Generator. Privacy first,
            all data stays in your browser.
          </p>
        </div>
      </footer>
    </div>
  );
}
