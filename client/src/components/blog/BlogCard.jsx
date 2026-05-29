import {
  Link,
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { BlogContext } from "../../context/BlogContext";

function BlogCard({ blog }) {

  const {
    toggleLike,
    toggleBookmark,
  } = useContext(BlogContext);

  const [isBookmarked, setIsBookmarked] =
    useState(false);

  // CHECK BOOKMARK STATE

  useEffect(() => {

    const bookmarks =

      JSON.parse(
        localStorage.getItem("bookmarks")
      ) || [];

    const exists =

      bookmarks.some(
        (item) => item.id === blog.id
      );

    setIsBookmarked(exists);

  }, [blog.id]);

  // HANDLE BOOKMARK

  const handleBookmark = (e) => {

    e.preventDefault();

    toggleBookmark(blog);

    setIsBookmarked(!isBookmarked);
  };

  // HANDLE LIKE

  const handleLike = (e) => {

    e.preventDefault();

    toggleLike(blog.id);
  };

  return (

    <Link to={`/blog/${blog.id}`}>

      <div className="
        group
        bg-white
        rounded-[35px]
        overflow-hidden
        border
        border-pink-100
        shadow-[0_0_35px_rgba(236,72,153,0.08)]
        hover:shadow-[0_0_55px_rgba(236,72,153,0.18)]
        transition
        duration-500
        hover:-translate-y-2
      ">

        {/* IMAGE */}

        <div className="
          relative
          overflow-hidden
        ">

          <img
            src={blog.image}
            alt={blog.title}
            className="
              w-full
              h-72
              object-cover
              transition
              duration-700
              group-hover:scale-105
            "
          />

          {/* OVERLAY */}

          <div className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/50
            via-black/10
            to-transparent
          "></div>

          {/* CATEGORY */}

          <div className="
            absolute
            top-5
            left-5
          ">

            <span className="
              bg-white/80
              backdrop-blur-lg
              text-pink-500
              px-5
              py-2
              rounded-full
              text-sm
              font-semibold
              border
              border-white/40
            ">

              {blog.category}

            </span>

          </div>

          {/* COMMENTS */}

          <div className="
            absolute
            bottom-5
            right-5
          ">

            <div className="
              bg-black/40
              backdrop-blur-lg
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            ">

              💬 {blog.comments?.length || 0}

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="p-8">

          {/* TITLE */}

          <h2 className="
            text-3xl
            font-bold
            text-gray-800
            leading-tight
            mb-5
            group-hover:text-pink-500
            transition
          ">

            {blog.title}

          </h2>

          {/* DESCRIPTION */}

          <p className="
            text-gray-600
            leading-8
            mb-8
            text-[17px]
          ">

            {blog.description}

          </p>

          {/* ENGAGEMENT BAR */}

          <div className="
            flex
            items-center
            gap-5
            mb-8
            text-sm
            font-medium
          ">

            {/* LIKE */}

            <button
              onClick={handleLike}
              className="
                flex
                items-center
                gap-2
                text-pink-500
                hover:scale-105
                transition
              "
            >

              ❤️
              {blog.likes || 0}

            </button>

            {/* BOOKMARK */}

            <button
              onClick={handleBookmark}
              className="
                flex
                items-center
                gap-2
                text-violet-500
                hover:scale-105
                transition
              "
            >

              {isBookmarked
                ? "🔖 Saved"
                : "📑 Save"}

            </button>

          </div>

          {/* FOOTER */}

          <div className="
            flex
            items-center
            justify-between
            gap-5
          ">

            {/* AUTHOR */}

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                rounded-full
                bg-linear-to-r
                from-pink-400
                to-violet-400
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-lg
                shadow-[0_0_25px_rgba(236,72,153,0.35)]
              ">

                {blog.author?.charAt(0)}

              </div>

              <div>

              
<button
  onClick={(e) => {

    e.preventDefault();

    window.location.href =
      `/profile/${blog.author}`;
  }}
  className="
    font-bold
    text-gray-800
    hover:text-pink-500
    transition
  "
>

  {blog.author}

</button>

                <p className="
                  text-sm
                  text-gray-400
                ">

                  {blog.role}

                </p>

              </div>

            </div>

            {/* META */}

            <div className="text-right">

              <p className="
                text-sm
                font-semibold
                text-gray-700
              ">

                {blog.readTime}

              </p>

              <p className="
                text-sm
                text-gray-400
                mt-1
              ">

                Published Article

              </p>

            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default BlogCard;