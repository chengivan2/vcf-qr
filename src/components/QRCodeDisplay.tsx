"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, FileText, Share2, CornerRightUp } from "lucide-react";
import { generateVCF, type ContactData } from "@/lib/vcf";

interface QRCodeDisplayProps {
  data: ContactData;
  qrColors: { background: string; foreground: string };
}

export function QRCodeDisplay({ data, qrColors }: QRCodeDisplayProps) {
  const vcfString = generateVCF(data);
  const vcfLength = vcfString.length;
  const isTooLarge = vcfLength > 2000; // General limit for QR scanners

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `vcard-qr-${data.firstName}-${data.lastName}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const downloadVCF = () => {
    const element = document.createElement("a");
    const file = new Blob([vcfString], { type: "text/vcard" });
    element.href = URL.createObjectURL(file);
    element.download = `${data.firstName}_${data.lastName}.vcf`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700 sticky top-8">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Live Preview
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Generated QR code contains full VCF data
        </p>
      </div>

      <div className="relative p-6 bg-white rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700">
        <QRCodeSVG
          id="qr-code-svg"
          value={vcfString}
          size={256}
          level="M"
          includeMargin={true}
          bgColor={qrColors.background}
          fgColor={qrColors.foreground}
        />
        {isTooLarge && (
          <div className="absolute inset-0 bg-red-500/10 backdrop-blur-[2px] rounded-xl flex items-center justify-center p-4">
            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg text-center">
              Data too large for offline QR!
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-3 mt-4">
        <button
          onClick={downloadQR}
          className="flex items-center justify-center gap-2 w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
        >
          <Download size={20} />
          Download QR Code
        </button>
        <button
          onClick={downloadVCF}
          className="flex items-center justify-center gap-2 w-full p-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-neutral-100 rounded-xl font-medium transition-all active:scale-[0.98]"
        >
          <FileText size={20} />
          Download .vcf File
        </button>
      </div>

      <div className="w-full space-y-4 mt-6">
        <div className="flex justify-between text-xs font-mono text-neutral-400 uppercase tracking-wider">
          <span>VCF Size</span>
          <span className={isTooLarge ? "text-red-500 font-bold" : ""}>
            {vcfLength} bytes
          </span>
        </div>
        <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isTooLarge ? "bg-red-500" : "bg-green-500"}`}
            style={{ width: `${Math.min((vcfLength / 2000) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
