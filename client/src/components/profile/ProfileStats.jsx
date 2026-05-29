function ProfileStats({
  title,
  value,
  color,
}) {

  return (

    <div className={`
      bg-white
      rounded-[30px]
      p-8
      border
      ${color}
      shadow-[0_0_35px_rgba(236,72,153,0.08)]
    `}>

      <h3 className="
        text-gray-500
        text-lg
        mb-3
      ">
        {title}
      </h3>

      <h2 className="
        text-5xl
        font-bold
        text-gray-800
      ">
        {value}
      </h2>

    </div>

  );
}

export default ProfileStats;