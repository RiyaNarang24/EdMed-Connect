type StatsCardProps = {
  value: string;
  label: string;
  icon: React.ElementType;
};

export default function StatsCard({
  value,
  label,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
        <Icon size={32} />
      </div>

      <h3 className="text-5xl font-extrabold font-bold text-red-600">
        {value}
      </h3>

      <p className="mt-3 text-gray-600 font-medium">
        {label}
      </p>

    </div>
  );
}