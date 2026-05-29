import {
  useContext,
  useMemo,
  useState,
} from "react";

import FeaturedBlog from "../components/blog/FeaturedBlog";
import BlogCard from "../components/blog/BlogCard";

import TrendingSection from "../components/home/TrendingSection";
import SearchBar from "../components/home/SearchBar";
import CategoryFilter from "../components/home/CategoryFilter";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

import uploadStarterBlogs
from "../utils/uploadStarterBlogs";

function Home() {

  const { user } =
    useContext(AuthContext);

  const { blogs } =
    useContext(BlogContext);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [uploading, setUploading] =
    useState(false);

  // FILTER BLOGS

  const filteredBlogs = useMemo(() => {

    return blogs.filter((blog) => {

      const matchesCategory =

        activeCategory === "All"

          ? true

          : blog.category === activeCategory;

      const matchesSearch =

        blog.title
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )

        ||

        blog.author
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )

        ||

        blog.category
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      return (
        matchesCategory &&
        matchesSearch
      );
    });

  }, [
    blogs,
    activeCategory,
    searchQuery,
  ]);

  // SORT BLOGS

  const latestBlogs =
    [...filteredBlogs];

  // UPLOAD BLOGS

  const handleUploadBlogs =
    async () => {

      try {

        setUploading(true);

        await uploadStarterBlogs();

        window.location.reload();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to upload blogs"
        );

      } finally {

        setUploading(false);
      }
    };

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-10
      ">

        {/* USER GREETING */}

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

            <div className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            ">

              <div>

                <h1 className="
                  text-4xl
                  font-bold
                  text-gray-800
                  mb-3
                ">
                  Hi,
                  {" "}
                  {user.email.split("@")[0]}
                  👋
                </h1>

                <p className="
                  text-gray-600
                  text-lg
                  leading-8
                  max-w-3xl
                ">
                  Welcome to BlogSphere —
                  a modern publishing platform
                  for developers, creators,
                  engineers and tech innovators.
                </p>

              </div>

              {/* ADMIN BUTTON */}

              {user?.role === "admin" && (

                <button
                  onClick={
                    handleUploadBlogs
                  }
                  disabled={uploading}
                  className="
                    bg-pink-500
                    hover:bg-pink-600
                    transition
                    text-white
                    px-6
                    py-4
                    rounded-2xl
                    font-semibold
                    shadow-[0_0_30px_rgba(236,72,153,0.25)]
                  "
                >

                  {uploading
                    ? "Uploading..."
                    : "Upload Starter Blogs"}

                </button>

              )}

            </div>

          </div>

        )}

        {/* HERO */}

        <FeaturedBlog />

        {/* SEARCH */}

        <div className="mt-14">

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

        </div>

        {/* CATEGORY */}

        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={
            setActiveCategory
          }
        />

        {/* TRENDING */}

        <TrendingSection
          blogs={blogs}
        />

        {/* BLOGS */}

        <div className="mt-24">

          <div className="
            flex
            items-center
            justify-between
            mb-10
          ">

            <div>

              <p className="
                text-cyan-500
                font-semibold
                mb-2
              ">
                LATEST ARTICLES
              </p>

              <h2 className="
                text-5xl
                font-bold
                text-gray-800
              ">
                Explore New Stories
              </h2>

            </div>

          </div>

          {/* EMPTY */}

          {latestBlogs.length === 0 && (

            <div className="
              bg-white
              rounded-[35px]
              p-16
              text-center
              border
              border-pink-100
            ">

              <h3 className="
                text-3xl
                font-bold
                text-gray-800
                mb-4
              ">
                No Blogs Found
              </h3>

              <p className="
                text-gray-500
                text-lg
              ">
                Upload starter blogs first.
              </p>

            </div>

          )}

          {/* BLOG GRID */}

          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
          ">

            {latestBlogs.map((blog) => (

              <BlogCard
                key={blog.id}
                blog={blog}
              />

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;