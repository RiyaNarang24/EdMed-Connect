type Props = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export default function WhyChooseCard({
  title,
  description,
  icon: Icon,
}: Props) {
  return (
    <div className="group rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl">

      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 transition group-hover:scale-110">
        <Icon size={34} />
      </div>

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-500">
        {description}
      </p>

    </div>
  );
}