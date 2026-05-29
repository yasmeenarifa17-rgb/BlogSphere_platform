import {
  useParams,
  Link,
} from "react-router-dom";

import {
  useContext,
  useState,
  useEffect,
} from "react";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

import BlogCard from "../components/blog/BlogCard";

function BlogDetails() {

  const { id } = useParams();

 const {
  blogs,
  addComment,
  toggleLike,
  toggleBookmark,
} = useContext(BlogContext);

  const { user } =
    useContext(AuthContext);

  const [commentText, setCommentText] =
    useState("");

  const [progress, setProgress] =
    useState(0);

    const [bookmarked, setBookmarked] =
  useState(false);

  const blog = blogs.find(
  (item) => item.id === id
);

  useEffect(() => {

  const bookmarks =

    JSON.parse(
      localStorage.getItem("bookmarks")
    ) || [];

  const exists = bookmarks.some(
    (item) => item.id === blog?.id
  );

  setBookmarked(exists);

}, [blog]);

  // READING PROGRESS

  useEffect(() => {

    const handleScroll = () => {

      const scrollTop = window.scrollY;

      const docHeight =
        document.body.scrollHeight -
        window.innerHeight;

      const scrolled =
        (scrollTop / docHeight) * 100;

      setProgress(scrolled);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, []);

  if (!blog) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
      ">

        <h1 className="
          text-3xl
          font-bold
          text-gray-700
        ">
          Blog Not Found
        </h1>

      </div>

    );
  }

  // RELATED BLOGS

  const relatedBlogs =
    blogs
      .filter(
        (item) =>
          item.category === blog.category &&
          item.id !== blog.id
      )
      .slice(0, 2);

  // COMMENT SUBMIT

  const handleComment = () => {

    if (!commentText) return;

    const newComment = {

      user:
        user?.email.split("@")[0] ||
        "Guest User",

      text: commentText,
    };

    addComment(blog.id, newComment);

    setCommentText("");
  };

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
    ">

      {/* READING PROGRESS */}

      <div className="
        fixed
        top-0
        left-0
        w-full
        h-1
        bg-gray-200
        z-50
      ">

        <div
          className="
            h-full
            bg-pink-500
            transition-all
            duration-150
          "
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="
        max-w-5xl
        mx-auto
        px-6
        py-10
      ">

        {/* HERO IMAGE */}

        <div className="
          relative
          overflow-hidden
          rounded-[40px]
          shadow-[0_0_60px_rgba(236,72,153,0.18)]
        ">

          <img
            src={blog.image}
            alt={blog.title}
            className="
              w-full
              h-137.5
              object-cover
            "
          />

          {/* OVERLAY */}

          <div className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/70
            via-black/20
            to-transparent
          "></div>

          {/* HERO CONTENT */}

          <div className="
            absolute
            bottom-10
            left-10
            right-10
            text-white
          ">

            <span className="
              bg-white/20
              backdrop-blur-lg
              px-5
              py-2
              rounded-full
              text-sm
              font-semibold
              border
              border-white/20
            ">

              {blog.category}

            </span>

            <h1 className="
              text-5xl
              md:text-6xl
              font-black
              leading-tight
              mt-6
              mb-6
            ">

              {blog.title}

            </h1>

            <div className="
              flex
              flex-wrap
              gap-5
              text-white/80
            ">

              {/* ACTION BUTTONS */}

<div className="
  flex
  items-center
  gap-4
  mt-8
">

  {/* LIKE */}

  <button
    onClick={() =>toggleLike(
  blog.id,
  blog.likes || 0
)}
    className="
      bg-white/15
      backdrop-blur-lg
      hover:bg-pink-500
      transition
      px-6
      py-3
      rounded-full
      text-white
      font-semibold
      border
      border-white/20
    "
  >

    ❤️ {blog.likes || 0}

  </button>

  {/* BOOKMARK */}

  <button
    onClick={() => {

      toggleBookmark(blog);

      setBookmarked(
        !bookmarked
      );
    }}
    className={`
      px-6
      py-3
      rounded-full
      font-semibold
      transition
      border

      ${
        bookmarked

          ? `
            bg-yellow-400
            text-black
            border-yellow-300
          `

          : `
            bg-white/15
            text-white
            border-white/20
          `
      }
    `}
  >

    {bookmarked
      ? "★ Saved"
      : "☆ Save"}

  </button>

</div>

              <span>
                By {blog.author}
              </span>

              <span>•</span>

              <span>
                {blog.readTime}
              </span>

              <span>•</span>

              <span>
                {blog.comments?.length || 0}
                {" "}
                comments
              </span>

            </div>

          </div>

        </div>

        {/* ARTICLE CONTENT */}

        <div className="
          mt-10
          bg-white
          rounded-[40px]
          p-8
          md:p-14
          border
          border-pink-100
          shadow-[0_0_40px_rgba(236,72,153,0.08)]
        ">

          {/* AUTHOR CARD */}

          <div className="
            flex
            items-center
            gap-5
            pb-10
            border-b
            border-gray-100
            mb-12
          ">

            <div className="
              w-18
              h-18
              rounded-full
              bg-linear-to-r
              from-pink-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
              shadow-[0_0_35px_rgba(236,72,153,0.30)]
            ">

              {blog.author?.charAt(0)}

            </div>

            <div>

              <h3 className="
                text-2xl
                font-bold
                text-gray-800
              ">
                {blog.author}
              </h3>

              <p className="
                text-gray-500
                mt-1
              ">
                {blog.role}
              </p>

            </div>

          </div>

          {/* ARTICLE BODY */}

          <div className="
            space-y-8
            leading-10
            text-[18px]
            text-gray-700
          ">

            {blog.content
              .split("\n")
              .map((line, index) => {

             if (line.startsWith("## ")) {

  return (

    <h3
      key={index}
      className="
        text-2xl
        md:text-3xl
        font-bold
        text-gray-800
        mt-10
        mb-4
      "
    >

      {line.replace("## ", "")}

    </h3>

  );
}
 if (line.startsWith("# ")) {

                return (

                  <h2
                    key={index}
                    className="
                      text-3xl
                      md:text-4xl
                      font-black
                      text-gray-800
                      mt-14
                      mb-6
                    "
                  >

                    {line.replace("# ", "")}

                  </h2>

                );
              }

              if (line.startsWith("•")) {

                return (

                  <li
                    key={index}
                    className="
                      ml-8
                      list-disc
                    "
                  >

                    {line.replace("• ", "")}

                  </li>

                );
              }

              return (
                <p key={index}>
                  {line}
                </p>
              );
            })}

          </div>

          {/* COMMENT SECTION */}

          <div className="mt-20">

            <h2 className="
              text-4xl
              font-black
              text-gray-800
              mb-8
            ">
              Join The Discussion
            </h2>

            <textarea
              rows="5"
              value={commentText}
              onChange={(e) =>
                setCommentText(e.target.value)
              }
              placeholder="Share your thoughts about this article..."
              className="
                w-full
                p-6
                rounded-[30px]
                border
                border-pink-100
                outline-none
                resize-none
                bg-[#fafafa]
                shadow-[0_0_25px_rgba(236,72,153,0.06)]
              "
            ></textarea>

            <button
              onClick={handleComment}
              className="
                mt-5
                bg-pink-500
                hover:bg-pink-600
                transition
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                shadow-[0_0_30px_rgba(236,72,153,0.30)]
              "
            >

              Post Comment

            </button>

          </div>

          {/* COMMENTS */}

          <div className="mt-20">

            <h2 className="
              text-4xl
              font-black
              text-gray-800
              mb-10
            ">

              Community Comments
              {" "}
              ({blog.comments?.length || 0})

            </h2>

            <div className="
              space-y-6
            ">

              {blog.comments.map(
                (comment, index) => (

                <div
                  key={index}
                  className="
                    bg-[#fafafa]
                    p-7
                    rounded-[30px]
                    border
                    border-pink-100
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-4
                    mb-4
                  ">

                    <div className="
                      w-12
                      h-12
                      rounded-full
                      bg-linear-to-r
                      from-pink-400
                      to-violet-400
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    ">

                      {comment.user?.charAt(0)}

                    </div>

                    <h4 className="
                      font-bold
                      text-gray-800
                    ">

                      {comment.user}

                    </h4>

                  </div>

                  <p className="
                    text-gray-600
                    leading-8
                  ">

                    {comment.text}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RELATED ARTICLES */}

        {relatedBlogs.length > 0 && (

          <div className="mt-20">

            <div className="
              mb-10
            ">

              <p className="
                text-cyan-500
                font-semibold
                mb-2
              ">
                MORE STORIES
              </p>

              <h2 className="
                text-5xl
                font-black
                text-gray-800
              ">
                Related Articles
              </h2>

            </div>

            <div className="
              grid
              md:grid-cols-2
              gap-8
            ">

              {relatedBlogs.map((relatedBlog) => (

                <BlogCard
                  key={relatedBlog.id}
                  blog={relatedBlog}
                />

              ))}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default BlogDetails;