type Props = {
  title: string;
  value: string;
  color: string;
};

export default function LiveStatusCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-xl">

      <p className="text-gray-500">
        {title}
      </p>

      <h2 className={`mt-2 text-3xl font-bold ${color}`}>
        {value}
      </h2>

    </div>
  );
}