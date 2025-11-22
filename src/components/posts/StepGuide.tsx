// src/components/posts/StepGuide.tsx
import type { ReactNode } from "react";

type StepGuideProps = {
  steps: {
    title: string;
    content: ReactNode;
  }[];
};

export function StepGuide({ steps }: StepGuideProps) {
  return (
    <div className="my-8 space-y-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex gap-4 p-5 rounded-xl border border-sky-100 bg-gradient-to-br from-white to-sky-50/30 shadow-sm"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 text-white font-bold flex items-center justify-center text-lg shadow-md">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 text-gray-900">
              {step.title}
            </h3>
            <div className="text-gray-700 leading-relaxed">{step.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
