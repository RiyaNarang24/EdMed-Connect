type PaginationProps = {
  page: number;
  pages: number;
  setPage: (page: number) => void;
};

export default function Pagination({
  page,
  pages,
  setPage,
}: PaginationProps) {
  if (pages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-3">

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="rounded-lg border px-5 py-2 disabled:opacity-40"
      >
        Previous
      </button>

      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={`rounded-lg px-4 py-2 transition ${
            page === i + 1
              ? "bg-red-600 text-white"
              : "border"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={page === pages}
        onClick={() => setPage(page + 1)}
        className="rounded-lg border px-5 py-2 disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}