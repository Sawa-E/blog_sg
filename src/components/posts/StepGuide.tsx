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
      <div className="mdx-steps mdx-steps--horizontal">
        <div className="mdx-steps__rail">
          {steps.map((step, index) => (
            <div key={index} className="mdx-steps__item">
              <div className="mdx-steps__num">{index + 1}</div>
              <h4 className="mdx-steps__title">{step.title}</h4>
              <div className="mdx-steps__desc mdx-inner">{step.description}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ol className="mdx-steps mdx-steps--vertical">
      {steps.map((step, index) => (
        <li key={index} className="mdx-steps__item">
          <div className="mdx-steps__num">{index + 1}</div>
          <div className="mdx-steps__card">
            <h4 className="mdx-steps__title">{step.title}</h4>
            <div className="mdx-steps__desc mdx-inner">{step.description}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
