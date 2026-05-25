function GlowButton({
  text,
  color = "pink",
  fullWidth = false,
}) {

  const colors = {
    pink: "bg-pink-500 hover:bg-pink-600 shadow-[0_0_25px_rgba(236,72,153,0.35)]",
    violet: "bg-violet-500 hover:bg-violet-600 shadow-[0_0_25px_rgba(139,92,246,0.35)]",
    orange: "bg-orange-500 hover:bg-orange-600 shadow-[0_0_25px_rgba(249,115,22,0.35)]",
    cyan: "bg-cyan-500 hover:bg-cyan-600 shadow-[0_0_25px_rgba(6,182,212,0.35)]",
  };

  return (
    <button
      className={`
        ${colors[color]}
        ${fullWidth ? "w-full" : ""}
        text-white
        px-6
        py-3
        rounded-2xl
        font-semibold
        transition
        duration-300
      `}
    >
      {text}
    </button>
  );
}

export default GlowButton;