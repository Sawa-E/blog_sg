// src/components/posts/ComparisonTable.tsx（モダン版）
type ComparisonItem = {
  label: string;
  optionA: string | React.ReactNode;
  optionB: string | React.ReactNode;
};

type ComparisonTableProps = {
  titleA: string;
  titleB: string;
  items: ComparisonItem[];
};

export function ComparisonTable({
  titleA,
  titleB,
  items,
}: ComparisonTableProps) {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-sky-100 shadow-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500">
            <th className="py-4 px-5 text-left font-bold text-white border-r border-sky-400/30">
              比較項目
            </th>
            <th className="py-4 px-5 text-left font-bold text-white border-r border-sky-400/30">
              {titleA}
            </th>
            <th className="py-4 px-5 text-left font-bold text-white">
              {titleB}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={`
                ${index % 2 === 0 ? "bg-white" : "bg-sky-50/50"}
                border-b border-sky-100 last:border-b-0
                hover:bg-sky-100/50 transition-colors duration-200
              `}
            >
              <td className="py-4 px-5 font-semibold text-gray-900 border-r border-sky-100">
                {item.label}
              </td>
              <td className="py-4 px-5 text-gray-700 border-r border-sky-100">
                {item.optionA}
              </td>
              <td className="py-4 px-5 text-gray-700">{item.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
