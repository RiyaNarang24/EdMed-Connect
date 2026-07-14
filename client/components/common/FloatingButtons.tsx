"use client";

import Link from "next/link";
import {
  Phone,
  MessageCircle,
  ArrowUp,
} from "lucide-react";
const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER;
const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        className="rounded-xl bg-green-500 p-4 text-white shadow-lg transition hover:scale-110"
      >
        <MessageCircle />
      </a>

      <a
       href={`tel:${phone}`}
        className="rounded-xl bg-red-700 p-4 text-white shadow-lg transition hover:scale-110"
      >
        <Phone />
      </a>

      

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className="rounded-xl bg-gray-900 p-4 text-white shadow-lg transition hover:scale-110"
      >
        <ArrowUp />
      </button>

    </div>
  );
}