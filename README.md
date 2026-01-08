# QRVCF - Professional QR Contact Generator

[**Live Demo at vcfqr.vercel.app**](https://vcfqr.vercel.app)

QRVCF is a modern, privacy-first web application that allows you to generate professional, customizable QR codes for your contact details (VCF/vCard). Share your digital business card instantly—no accounts required, and all data stays in your browser.

## 🚀 Key Features

- **Standard VCF 3.0 Generation**: Works with all modern iOS and Android devices.
- **Deep Customization**:
  - Choose foreground and background colors.
  - Choose between "Solid" or "Frame" (branded) styles.
  - Customize eye border radius (0% to 50%).
- **Live Preview**: See your QR code update in real-time as you type.
- **High-Quality Export**: Download as a professional PNG image with frame and background included.
- **Accessibility**: Built with semantic HTML, ARIA labels, and keyboard-friendly controls.
- **Responsive Design**: Seamless experience across mobile, tablet, and desktop.
- **Privacy First**: No server-side storage. Your contact data never leaves your device.

---

## 📖 User Tutorial

### 1. Enter Your Details

Fill in your name, company, job title, and other contact information in the **Contact Details** form. You can add multiple emails and phone numbers using the `+` buttons.

### 2. Customize Appearance

Scroll down to the **QR Customization** section:

- **Style**: Choose **Solid** for a clean look or **Frame** for a branded card with a "Scan Me" call-to-action.
- **Colors**: Use the color pickers to match your brand or personal style.
- **Eye Radius**: Use the slider to round the corners of the QR code "eyes" for a more modern look.

### 3. Save & Share

- **Download QR Code**: Get a PNG image of your customized QR code, ready to be printed or added to your digital signature.
- **Download .vcf File**: Save the raw contact file directly to your device.

---

## 🛠 Developer Guide

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/chengivan2/vcf-qr.git
    cd vcf-qr
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Architecture

- **`src/app/page.tsx`**: Main entry point and state management.
- **`src/components/ContactForm.tsx`**: The main interface for data entry and customization.
- **`src/components/QRCodeDisplay.tsx`**: Handles real-time QR rendering and the composite canvas logic for image export.
- **`src/lib/vcf.ts`**: Pure utility for converting JSON contact data into valid VCF 3.0 strings.
- **`src/app/globals.css`**: Tailwind CSS 4 configuration with custom dark mode variants.

### Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Rendering**: `react-qrcode-logo`
- **Theming**: `next-themes`

---

## 📬 Feedback

We'd love to hear your thoughts! Send feedback to **ivanthedev** at [ivan@ivanthedev.pro](mailto:ivan@ivanthedev.pro).

---

&copy; 2026 QRVCF Generator.
