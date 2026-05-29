function SearchBar({

  searchQuery,
  setSearchQuery,

}) {

  return (

    <div className="
      relative
      group
    ">

      {/* GLOW EFFECT */}

      <div className="
        absolute
        inset-0
        bg-linear-to-r
        from-pink-400
        via-violet-400
        to-cyan-400
        opacity-0
        blur-2xl
        transition
        duration-500
        group-focus-within:opacity-20
        rounded-[35px]
      "></div>

      {/* SEARCH CONTAINER */}

      <div className="
        relative
        bg-white
        rounded-[35px]
        border
        border-pink-100
        shadow-[0_0_40px_rgba(236,72,153,0.08)]
        overflow-hidden
      ">

        <div className="
          flex
          items-center
          px-7
        ">

          {/* ICON */}

          <div className="
            text-2xl
            text-pink-400
            mr-4
          ">
            🔍
          </div>

          {/* INPUT */}

          <input
            type="text"
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(
                e.target.value
              )
            }
            placeholder="
              Search articles,
              categories or authors...
            "
            className="
              w-full
              py-6
              bg-transparent
              outline-none
              text-lg
              text-gray-700
              placeholder:text-gray-400
            "
          />

          {/* SEARCH STATUS */}

          {searchQuery && (

            <div className="
              text-sm
              text-pink-500
              font-semibold
              whitespace-nowrap
            ">

              Searching...

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default SearchBar;