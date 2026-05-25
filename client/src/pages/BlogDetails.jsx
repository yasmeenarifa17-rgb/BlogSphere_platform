import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

function BlogDetails() {

  const { id } = useParams();
  const { blogs, addComment } = useContext(BlogContext);
  const { user } = useContext(AuthContext);

  const [commentText, setCommentText] = useState("");
  const [progress, setProgress] = useState(0);

  const blog = blogs.find(
    (item) => item.id === Number(id)
  );

  // Reading progress (SAFE ADD-ON ONLY)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">
          Blog Not Found
        </h1>
      </div>
    );
  }

  const handleComment = () => {
    if (!commentText) return;

    const newComment = {
      user: user?.email.split("@")[0] || "Guest User",
      text: commentText,
    };

    addComment(blog.id, newComment);
    setCommentText("");
  };

  return (
    <div className="bg-[#f7f7fb] min-h-screen">

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-pink-500 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* HERO IMAGE */}
        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-105
            object-cover
            rounded-[30px]
            shadow-[0_0_50px_rgba(236,72,153,0.18)]
          "
        />

        {/* CONTENT CARD */}
        <div className="
          mt-10
          bg-white
          rounded-[30px]
          p-10
          shadow-[0_0_40px_rgba(236,72,153,0.08)]
        ">

          {/* CATEGORY */}
          <p className="text-pink-500 font-semibold mb-3">
            {blog.category}
          </p>

          {/* TITLE */}
          <h1 className="
            text-4xl
            md:text-5xl
            font-bold
            text-gray-800
            leading-tight
            mb-6
          ">
            {blog.title}
          </h1>

          {/* META */}
          <div className="
            flex
            flex-wrap
            gap-3
            text-gray-500
            mb-10
          ">
            <span className="font-medium">{blog.author}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>

          {/* ARTICLE CONTENT */}
          <div className="space-y-6 leading-9 text-[17px] text-gray-700">

            {blog.content.split("\n").map((line, index) => {

              if (line.startsWith("# ")) {
                return (
                  <h2
                    key={index}
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      text-gray-800
                      mt-10
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
                    className="ml-6 list-disc"
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
          <div className="mt-14">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Add Comment
            </h2>

            <textarea
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your thoughts..."
              className="
                w-full
                p-5
                rounded-2xl
                border
                border-pink-100
                outline-none
                resize-none
                bg-[#fafafa]
              "
            />

            <button
              onClick={handleComment}
              className="
                mt-4
                bg-pink-500
                hover:bg-pink-600
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Post Comment
            </button>

          </div>

          {/* COMMENTS LIST */}
          <div className="mt-14">

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Comments ({blog.comments.length})
            </h2>

            <div className="space-y-5">

              {blog.comments.map((comment, index) => (
                <div
                  key={index}
                  className="
                    bg-[#fafafa]
                    p-5
                    rounded-2xl
                    border
                    border-pink-100
                  "
                >
                  <h4 className="font-semibold text-gray-800 mb-2">
                    {comment.user}
                  </h4>

                  <p className="text-gray-600 leading-7">
                    {comment.text}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default BlogDetails;