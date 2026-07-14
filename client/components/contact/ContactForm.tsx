"use client";

import { useState } from "react";
import api from "@/services/api";

export default function ContactForm() {

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({

      fullName: "",

      email: "",

      phone: "",

      subject: "",

      message: "",

    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/contact",
        form
      );

      alert(
        "Your message has been sent successfully."
      );

      setForm({

        fullName: "",

        email: "",

        phone: "",

        subject: "",

        message: "",

      });

    }

    catch (error: any) {

      alert(

        error.response?.data?.message ||

          "Unable to send message."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-lg"
    >

      <h2 className="text-3xl font-bold">

        Contact Us

      </h2>

      <p className="text-gray-500">

        We'd love to hear from you.
        Fill in the form below and our team
        will get back to you soon.

      </p>

      <div className="grid gap-6 md:grid-cols-2">

        <input

          type="text"

          name="fullName"

          placeholder="Full Name"

          value={form.fullName}

          onChange={handleChange}

          className="rounded-xl border p-4"

          required

        />

        <input

          type="email"

          name="email"

          placeholder="Email Address"

          value={form.email}

          onChange={handleChange}

          className="rounded-xl border p-4"

          required

        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <input

          type="text"

          name="phone"

          placeholder="Phone Number"

          value={form.phone}

          onChange={handleChange}

          className="rounded-xl border p-4"

        />

        <input

          type="text"

          name="subject"

          placeholder="Subject"

          value={form.subject}

          onChange={handleChange}

          className="rounded-xl border p-4"

          required

        />

      </div>

      <textarea

        rows={6}

        name="message"

        placeholder="Type your message..."

        value={form.message}

        onChange={handleChange}

        className="w-full rounded-xl border p-4"

        required

      />

      <button

        type="submit"

        disabled={loading}

        className="w-full rounded-xl bg-red-600 py-4 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"

      >

        {loading
          ? "Sending..."
          : "Send Message"}

      </button>

    </form>

  );

}