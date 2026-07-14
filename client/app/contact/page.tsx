"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      <section className="bg-red-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-bold">
            Contact Us
          </h1>

          <p className="mt-4 text-xl text-red-100">
            We'd love to hear from you.
          </p>

        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">

        <div>

          <h2 className="mb-8 text-3xl font-bold">
            Get In Touch
          </h2>

          <div className="space-y-8">

            <div className="flex gap-5">

              <Phone className="text-red-600" />

              <div>

                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 9876543210
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <Mail className="text-red-600" />

              <div>

                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@edmedconnect.com
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <MapPin className="text-red-600" />

              <div>

                <h3 className="font-semibold">
                  Office
                </h3>

                <p className="text-gray-600">
                  Dehradun, Uttarakhand, India
                </p>

              </div>

            </div>

            <div className="flex gap-5">

              <Clock className="text-red-600" />

              <div>

                <h3 className="font-semibold">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday – Saturday
                </p>

                <p className="text-gray-600">
                  9:00 AM – 6:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>

        <ContactForm />

      </section>

    </div>
  );
}