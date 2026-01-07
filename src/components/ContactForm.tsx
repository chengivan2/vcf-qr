"use client";

import * as React from "react";
import {
  Plus,
  Minus,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Notebook,
} from "lucide-react";
import type { ContactData } from "@/lib/vcf";

interface ContactFormProps {
  data: ContactData;
  setData: (data: ContactData) => void;
  qrColors: { background: string; foreground: string };
  setQrColors: (colors: { background: string; foreground: string }) => void;
}

export function ContactForm({
  data,
  setData,
  qrColors,
  setQrColors,
}: ContactFormProps) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setData({
        ...data,
        address: { ...data.address, [field]: value },
      });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const updateDynamicField = (
    type: "emails" | "phones",
    index: number,
    field: "value" | "type",
    value: string,
  ) => {
    const newList = [...data[type]];
    newList[index] = { ...newList[index], [field]: value };
    setData({ ...data, [type]: newList });
  };

  const addField = (type: "emails" | "phones") => {
    setData({
      ...data,
      [type]: [...data[type], { value: "", type: "other" }],
    });
  };

  const removeField = (type: "emails" | "phones", index: number) => {
    if (data[type].length <= 1) return;
    const newList = data[type].filter((_, i) => i !== index);
    setData({ ...data, [type]: newList });
  };

  return (
    <div className="space-y-8 p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800">
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          <User size={20} className="text-blue-500" />
          Name Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={data.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={data.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          <Building2 size={20} className="text-purple-500" />
          Company Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="organization"
            placeholder="Organization"
            value={data.organization}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={data.title}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none transition-all"
          />
        </div>
      </section>

      {/* Dynamic Emails */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            <Mail size={20} className="text-red-500" />
            Emails
          </h2>
          <button
            onClick={() => addField("emails")}
            className="p-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:scale-110 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {data.emails.map((email, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Type (e.g. Work)"
                value={email.type}
                onChange={(e) =>
                  updateDynamicField("emails", index, "type", e.target.value)
                }
                className="w-24 p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email.value}
                onChange={(e) =>
                  updateDynamicField("emails", index, "value", e.target.value)
                }
                className="flex-1 p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all"
              />
              <button
                onClick={() => removeField("emails", index)}
                className="p-3 text-neutral-400 hover:text-red-500 transition-colors"
                disabled={data.emails.length <= 1}
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Phones */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            <Phone size={20} className="text-green-500" />
            Phones
          </h2>
          <button
            onClick={() => addField("phones")}
            className="p-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:scale-110 transition-transform"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-3">
          {data.phones.map((phone, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Type (e.g. Mobile)"
                value={phone.type}
                onChange={(e) =>
                  updateDynamicField("phones", index, "type", e.target.value)
                }
                className="w-24 p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all text-sm"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone.value}
                onChange={(e) =>
                  updateDynamicField("phones", index, "value", e.target.value)
                }
                className="flex-1 p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-green-500 outline-none transition-all"
              />
              <button
                onClick={() => removeField("phones", index)}
                className="p-3 text-neutral-400 hover:text-green-500 transition-colors"
                disabled={data.phones.length <= 1}
              >
                <Minus size={20} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          <MapPin size={20} className="text-orange-500" />
          Address
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="address.street"
            placeholder="Street"
            value={data.address.street}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="address.city"
              placeholder="City"
              value={data.address.city}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
            <input
              type="text"
              name="address.state"
              placeholder="State/Province"
              value={data.address.state}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="address.postalCode"
              placeholder="Postal Code"
              value={data.address.postalCode}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
            <input
              type="text"
              name="address.country"
              placeholder="Country"
              value={data.address.country}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          <Globe size={20} className="text-cyan-500" />
          Extra
        </h2>
        <input
          type="url"
          name="website"
          placeholder="Website (https://...)"
          value={data.website}
          onChange={handleChange}
          className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={data.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
        />
      </section>

      <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          QR Customization
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Background
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={qrColors.background}
                onChange={(e) =>
                  setQrColors({ ...qrColors, background: e.target.value })
                }
                className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
              />
              <input
                type="text"
                value={qrColors.background}
                onChange={(e) =>
                  setQrColors({ ...qrColors, background: e.target.value })
                }
                className="flex-1 p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm font-mono"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Pattern
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={qrColors.foreground}
                onChange={(e) =>
                  setQrColors({ ...qrColors, foreground: e.target.value })
                }
                className="w-10 h-10 rounded cursor-pointer border-none bg-transparent"
              />
              <input
                type="text"
                value={qrColors.foreground}
                onChange={(e) =>
                  setQrColors({ ...qrColors, foreground: e.target.value })
                }
                className="flex-1 p-2 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent text-sm font-mono"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
