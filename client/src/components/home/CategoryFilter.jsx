const categories = [

  "All",

  "Artificial Intelligence",

  "Programming",

  "Cloud Computing",

  "Startups",

  "UI/UX Design",

  "Developer Productivity",

  "Full Stack Development",
];

function CategoryFilter({
  activeCategory,
  setActiveCategory,
}) {

  return (

    <div className="
      flex
      flex-wrap
      gap-4
      mt-8
    ">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() =>
            setActiveCategory(category)
          }
          className={`
            px-6
            py-3
            rounded-full
            text-sm
            font-semibold
            transition

            ${
              activeCategory === category

                ? `
                  bg-pink-500
                  text-white
                  shadow-[0_0_30px_rgba(236,72,153,0.35)]
                `

                : `
                  bg-white
                  text-gray-700
                  border
                  border-pink-100
                  hover:border-pink-300
                `
            }
          `}
        >

          {category}

        </button>

      ))}

    </div>
  );
}

export default CategoryFilter;