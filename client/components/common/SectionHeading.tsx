type Props = {
  badge: string;
  title: string;
  subtitle: string;
  light?: boolean;
};

export default function SectionHeading({
  badge,
  title,
  subtitle,
  light = false,
}: Props) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p
        className={`text-sm font-semibold uppercase tracking-[4px] ${
          light ? "text-red-200" : "text-red-600"
        }`}
      >
        {badge}
      </p>

      <h2
        className={`mt-3 text-5xl font-bold ${
          light ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-5 text-lg ${
          light ? "text-red-100" : "text-gray-500"
        }`}
      >
        {subtitle}
      </p>
    </div>
  );
}