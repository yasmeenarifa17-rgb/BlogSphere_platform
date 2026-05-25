import FeaturedBlog from "../components/blog/FeaturedBlog";
import BlogCard from "../components/blog/BlogCard";

import { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

function Home() {

  const { user } = useContext(AuthContext);
  const { blogs } = useContext(BlogContext);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(blogs.map(b => b.category))];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(b => b.category === selectedCategory);

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Greeting Section (UNCHANGED) */}
        {user && (
          <div className="
            mb-10
            bg-white
            rounded-[35px]
            p-8
            border
            border-pink-100
            shadow-[0_0_40px_rgba(236,72,153,0.10)]
          ">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Hi, {user.email.split("@")[0]} 👋
            </h1>

            <p className="text-gray-600 text-lg leading-8 max-w-3xl">
              Welcome to BlogSphere — a modern tech blogging platform
              where developers, engineers and creators share ideas,
              insights and innovation.
            </p>
          </div>
        )}

        {/* FEATURED HERO (UNCHANGED COMPONENT) */}
        <FeaturedBlog />

        {/* CATEGORY FILTER (NEW ADDITION) */}
        <div className="flex gap-3 flex-wrap my-10">

          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-4 py-2 rounded-full text-sm border transition
                ${selectedCategory === cat
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-gray-600 border-pink-100 hover:border-pink-300"}
              `}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* TRENDING SECTION (NEW BLOCK) */}
        <div className="mb-12">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🔥 Trending Blogs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {blogs.slice(0, 3).map(blog => (
              <div key={blog.id} className="scale-95">
                <BlogCard blog={blog} />
              </div>
            ))}

          </div>

        </div>

        {/* SEARCH (UNCHANGED) */}
        <div className="my-12">

          <input
            type="text"
            placeholder="Search articles..."
            className="
              w-full
              bg-white
              p-5
              rounded-3xl
              border
              border-pink-100
              outline-none
              shadow-[0_0_35px_rgba(236,72,153,0.10)]
            "
          />

        </div>

        {/* BLOG GRID (UPDATED FILTER LOGIC ONLY) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
            />
          ))}

        </div>

      </div>
    </div>
  );
}

export default Home;