import Image from "next/image";
import Link from "next/link";

import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  quickLinks,
  services,
  support,
  socialLinks,
} from "@/constants/footerLinks";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Company */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-4">

              <Image
                src="/logo.png"
                alt="logo"
                width={60}
                height={60}
              />

              <div>

                <h2 className="text-2xl font-bold">
                  EdMed Connect
                </h2>

                <p className="text-sm text-gray-400">
                  Powered by EdMed Technologies
                </p>

              </div>

            </div>

            <p className="mt-6 leading-8 text-gray-400">
              India's next-generation healthcare ecosystem connecting
              hospitals, doctors and patients with AI powered healthcare
              solutions.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex gap-3">

                <MapPin />

                New Delhi, India

              </div>

              <div className="flex gap-3">

                <Phone />

                +91 1800 123 4567

              </div>

              <div className="flex gap-3">

                <Mail />

                support@edmedconnect.com

              </div>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Quick Links
            </h3>

            <div className="space-y-3">

              {quickLinks.map((item) => (

                <Link
                  key={item}
                  href="#"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Services
            </h3>

            <div className="space-y-3">

              {services.map((item) => (

                <Link
                  key={item}
                  href="#"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

          {/* Support */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Support
            </h3>

            <div className="space-y-3">

              {support.map((item) => (

                <Link
                  key={item}
                  href="#"
                  className="block text-gray-400 hover:text-white"
                >
                  {item}
                </Link>

              ))}

            </div>

          </div>

        </div>

       

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-gray-800 pt-8 lg:flex-row">

          <p className="text-gray-400">
            © 2026 EdMed Connect. All rights reserved.
          </p>

          <div className="flex gap-4">

            {socialLinks.map((item, index) => {
  const Icon = item.icon;

  return (
    <Link
      key={index}
      href={item.href}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 transition hover:-translate-y-1 hover:bg-red-600"
    >
      <Icon className="text-white" size={18} />
    </Link>
  );
})}

          </div>

        </div>

      </div>

    </footer>
  );
}