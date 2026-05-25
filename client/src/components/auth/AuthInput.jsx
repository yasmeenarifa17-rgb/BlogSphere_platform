function AuthInput({
  type,
  placeholder,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full
        p-4
        rounded-2xl
        border
        border-gray-200
        bg-white
        outline-none
        focus:ring-2
        focus:ring-opacity-40
        focus:ring-violet-300
        transition
      "
    />
  );
}

export default AuthInput;