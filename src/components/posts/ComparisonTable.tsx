import type { ReactNode } from "react";

type ComparisonItem = {
  label: string;
  optionA: ReactNode;
  optionB: ReactNode;
};

type ComparisonTableProps = {
  titleA: string;
  titleB: string;
  items: ComparisonItem[];
  labelHeading?: string;
};

export function ComparisonTable({
  titleA,
  titleB,
  items,
  labelHeading = "項目",
}: ComparisonTableProps) {
  return (
    <div className="mdx-compare">
      <table>
        <thead>
          <tr>
            <th scope="col">{labelHeading}</th>
            <th scope="col">{titleA}</th>
            <th scope="col">{titleB}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item.label}</th>
              <td>{item.optionA}</td>
              <td>{item.optionB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
