"use client";

export default function CopyButton() {
  const handleCopy = () => {
    const html = document.getElementById("htmlContent")?.innerHTML ?? "";
    navigator.clipboard.writeText(html.replace(/&quot;/g, ""));
  };

  return (
    <button
      onClick={handleCopy}
      style={{ opacity: 0, position: "fixed", top: 0, right: 0, color: "#fff", background: "#000" }}
    >
      copy
    </button>
  );
}
