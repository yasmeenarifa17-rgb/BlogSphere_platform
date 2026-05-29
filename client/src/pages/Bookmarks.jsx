import { useEffect, useState } from "react";

import BlogCard from "../components/blog/BlogCard";

function Bookmarks() {

  const [bookmarks, setBookmarks] =
    useState([]);

  useEffect(() => {

    const savedBookmarks =

      JSON.parse(
        localStorage.getItem("bookmarks")
      ) || [];

    setBookmarks(savedBookmarks);

  }, []);

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
      py-10
      px-6
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="mb-14">

          <p className="
            text-pink-500
            font-semibold
            mb-2
          ">
            YOUR COLLECTION
          </p>

          <h1 className="
            text-5xl
            font-black
            text-gray-800
          ">
            Saved Articles
          </h1>

          <p className="
            text-gray-500
            mt-4
            text-lg
          ">
            Access all your bookmarked blogs.
          </p>

        </div>

        {/* EMPTY STATE */}

        {bookmarks.length === 0 ? (

          <div className="
            bg-white
            rounded-[35px]
            p-16
            text-center
            border
            border-pink-100
          ">

            <h2 className="
              text-3xl
              font-bold
              text-gray-800
              mb-4
            ">
              No Saved Blogs Yet
            </h2>

            <p className="
              text-gray-500
              text-lg
            ">
              Save articles to read them later.
            </p>

          </div>

        ) : (

          <div className="
            grid
            md:grid-cols-2
            gap-8
          ">

            {bookmarks.map((blog) => (

              <BlogCard
                key={blog.id}
                blog={blog}
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Bookmarks;