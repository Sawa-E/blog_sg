// src/components/posts/StepGuide.tsx（モダン版）
import type { ReactNode } from "react";

type Step = {
  title: string;
  description: ReactNode;
};

type StepGuideProps = {
  steps: Step[];
  variant?: "vertical" | "horizontal";
};

export function StepGuide({ steps, variant = "vertical" }: StepGuideProps) {
  if (variant === "horizontal") {
    return (
      <div className="my-8 overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 rounded-xl border border-sky-100 bg-white/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-white font-bold flex items-center justify-center text-lg shadow-md mb-3">
                {index + 1}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <div className="text-gray-700 text-sm leading-relaxed">
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 space-y-4 relative">
      {/* 縦の接続線 */}
      <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gradient-to-b from-sky-300 to-cyan-300" />

      {steps.map((step, index) => (
        <div key={index} className="relative pl-16">
          {/* ステップ番号 */}
          <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-white font-bold flex items-center justify-center text-lg shadow-lg z-10">
            {index + 1}
          </div>

          {/* コンテンツカード */}
          <div className="rounded-xl border border-sky-100 bg-gradient-to-r from-white to-sky-50/30 p-5 shadow-sm hover:shadow-md transition-all duration-300 group">
            <h4 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-sky-700 transition-colors">
              {step.title}
            </h4>
            <div className="text-gray-700 leading-relaxed">
              {step.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
