"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { title: "Home", href: "/" },
  { title: "Hospitals", href: "/hospitals" },
  { title: "Doctors", href: "/doctors" },
  { title: "Services", href: "/services" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link href="/" className="flex items-center gap-3">

          <div className="relative h-14 w-14">

            <Image
              src="/logo.png"
              alt="EdMed Technologies"
              fill
              className="object-contain"
              priority
            />

          </div>

          <div>

            <h1 className="text-xl font-bold text-gray-900">
              EdMed Connect
            </h1>

            <p className="text-xs text-gray-500">
              Powered by EdMed Technologies
            </p>

          </div>

        </Link>

        <nav className="hidden items-center gap-8 md:flex">

          {links.map((link) => (

            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition font-medium hover:text-red-600",
                pathname === link.href
                  ? "text-red-600"
                  : "text-gray-700"
              )}
            >
              {link.title}
            </Link>

          ))}

        </nav>

        <Link
          href="/login"
          className="rounded-xl bg-red-600 px-7 py-3 font-semibold text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-1 hover:bg-red-700"
        >
          Login
        </Link>

      </div>

    </header>
  );
}