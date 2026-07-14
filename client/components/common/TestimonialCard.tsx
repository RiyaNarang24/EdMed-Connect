import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
  rating: number;
};

type Props = {
  testimonial: Testimonial;
};

export default function TestimonialCard({ testimonial }: Props) {
  const { name, role, image, review, rating } = testimonial;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
      <div className="flex gap-1 text-yellow-500">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} fill="currentColor" size={18} />
        ))}
      </div>

      <p className="mt-6 leading-7 text-gray-600">
        "{review}"
      </p>

      <div className="mt-8 flex items-center gap-4">
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />

        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}