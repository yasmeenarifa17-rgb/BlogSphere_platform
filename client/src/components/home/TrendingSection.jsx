import BlogCard from "../blog/BlogCard";

function TrendingSection({ blogs }) {

  const trendingBlogs =

    [...blogs]

      .sort(
        (a, b) =>
          (b.comments?.length || 0) -
          (a.comments?.length || 0)
      )

      .slice(0, 3);

  // PLATFORM STATS

  const totalComments =

    blogs.reduce(
      (acc, blog) =>
        acc + (blog.comments?.length || 0),
      0
    );

  const totalCategories =

    [...new Set(
      blogs.map(blog => blog.category)
    )].length;

  const totalAuthors =

    [...new Set(
      blogs.map(blog => blog.author)
    )].length;

  return (

    <div className="mt-20">

      {/* PLATFORM STATS */}

      <div className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-6
        mb-20
      ">

        {/* BLOGS */}

        <div className="
          bg-white
          rounded-[30px]
          p-8
          border
          border-pink-100
          shadow-[0_0_35px_rgba(236,72,153,0.08)]
        ">

          <p className="
            text-gray-500
            mb-3
          ">
            Total Blogs
          </p>

          <h2 className="
            text-5xl
            font-bold
            text-pink-500
          ">
            {blogs.length}
          </h2>

        </div>

        {/* COMMENTS */}

        <div className="
          bg-white
          rounded-[30px]
          p-8
          border
          border-cyan-100
          shadow-[0_0_35px_rgba(6,182,212,0.08)]
        ">

          <p className="
            text-gray-500
            mb-3
          ">
            Total Comments
          </p>

          <h2 className="
            text-5xl
            font-bold
            text-cyan-500
          ">
            {totalComments}
          </h2>

        </div>

        {/* AUTHORS */}

        <div className="
          bg-white
          rounded-[30px]
          p-8
          border
          border-violet-100
          shadow-[0_0_35px_rgba(139,92,246,0.08)]
        ">

          <p className="
            text-gray-500
            mb-3
          ">
            Active Writers
          </p>

          <h2 className="
            text-5xl
            font-bold
            text-violet-500
          ">
            {totalAuthors}
          </h2>

        </div>

        {/* CATEGORIES */}

        <div className="
          bg-white
          rounded-[30px]
          p-8
          border
          border-orange-100
          shadow-[0_0_35px_rgba(249,115,22,0.08)]
        ">

          <p className="
            text-gray-500
            mb-3
          ">
            Categories
          </p>

          <h2 className="
            text-5xl
            font-bold
            text-orange-500
          ">
            {totalCategories}
          </h2>

        </div>

      </div>

      {/* TRENDING HEADING */}

      <div className="
        flex
        items-center
        justify-between
        mb-10
      ">

        <div>

          <p className="
            text-pink-500
            font-semibold
            mb-2
            tracking-wide
          ">
            TRENDING NOW
          </p>

          <h2 className="
            text-5xl
            font-bold
            text-gray-800
            leading-tight
          ">
            Most Discussed Stories
          </h2>

          <p className="
            text-gray-500
            mt-4
            text-lg
            max-w-2xl
            leading-8
          ">
            Explore the most engaging articles,
            trending discussions and popular
            insights from the BlogSphere
            community.
          </p>

        </div>

      </div>

      {/* TRENDING GRID */}

      <div className="
        grid
        md:grid-cols-3
        gap-8
      ">

        {trendingBlogs.map((blog) => (

          <div
            key={blog.id}
            className="
              hover:scale-[1.01]
              transition
              duration-300
            "
          >

            <BlogCard
              blog={blog}
            />

          </div>

        ))}

      </div>

    </div>

  );
}

export default TrendingSection;