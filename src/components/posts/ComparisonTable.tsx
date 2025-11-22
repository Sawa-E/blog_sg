// src/components/posts/ComparisonTable.tsx
type ComparisonItem = {
  label: string;
  optionA: string;
  optionB: string;
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
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white">
            <th className="py-3 px-4 text-left font-semibold">比較項目</th>
            <th className="py-3 px-4 text-left font-semibold">{titleA}</th>
            <th className="py-3 px-4 text-left font-semibold">{titleB}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-sky-50/50"
              } border-b border-gray-200 last:border-b-0`}
            >
              <td className="py-3 px-4 font-medium text-gray-900">
                {item.label}
              </td>
              <td className="py-3 px-4 text-gray-700">{item.optionA}</td>
              <td className="py-3 px-4 text-gray-700">{item.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
