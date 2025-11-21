import Link from "next/link";

export const SnsButtons = () => {
  return (
    <div className="flex gap-3 mt-4">
      <a href="https://x.com/" className="sns-btn-sea" target="_blank">
        X
      </a>
      <a href="https://github.com/" className="sns-btn-sea" target="_blank">
        GH
      </a>
      <a href="https://instagram.com/" className="sns-btn-sea" target="_blank">
        IG
      </a>
    </div>
  );
};
