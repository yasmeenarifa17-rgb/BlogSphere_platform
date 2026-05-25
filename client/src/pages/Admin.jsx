import { useContext, useState } from "react";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

function Admin() {

  const {
    pendingBlogs,
    blogs,
    approveBlog,
    rejectBlog,
  } = useContext(BlogContext);

  const { user } = useContext(AuthContext);

  const [tab, setTab] = useState("pending");

  // Protected Admin Access
  if (
    !user ||
    user.email?.trim().toLowerCase() !==
      "yasmeenarifa17@gmail.com"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7fb]">

        <div className="
          bg-white
          p-10
          rounded-[35px]
          shadow-[0_0_40px_rgba(236,72,153,0.08)]
          text-center
        ">

          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Access Denied
          </h1>

          <p className="text-gray-500">
            Only admin can access this page.
          </p>

        </div>

      </div>
    );
  }

  // FILTER LOGIC (SAFE ADD-ON ONLY)
  const approvedBlogs = blogs;
  const rejectedBlogs = []; // (we don’t store rejected permanently yet)

  const getBlogsToShow = () => {
    if (tab === "pending") return pendingBlogs;
    if (tab === "approved") return approvedBlogs;
    if (tab === "rejected") return rejectedBlogs;
    return pendingBlogs;
  };

  const blogsToShow = getBlogsToShow();

  return (
    <div className="bg-[#f7f7fb] min-h-screen py-10 px-5">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">

          <h1 className="text-5xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-3">
            Review and manage community blog submissions.
          </p>

        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-10 flex-wrap">

          <button
            onClick={() => setTab("pending")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              tab === "pending"
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            Pending ({pendingBlogs.length})
          </button>

          <button
            onClick={() => setTab("approved")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              tab === "approved"
                ? "bg-green-500 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            Approved ({blogs.length})
          </button>

          <button
            onClick={() => setTab("rejected")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              tab === "rejected"
                ? "bg-red-500 text-white"
                : "bg-white text-gray-600 border"
            }`}
          >
            Rejected (0)
          </button>

        </div>

        {/* EMPTY STATE */}
        {blogsToShow.length === 0 ? (
          <div className="bg-white rounded-[35px] p-10 text-center shadow-[0_0_40px_rgba(236,72,153,0.08)]">

            <h2 className="text-3xl font-bold text-gray-800">
              No Blogs Found
            </h2>

            <p className="text-gray-500 mt-3">
              Nothing to display in this section.
            </p>

          </div>
        ) : (
          <div className="space-y-8">

            {blogsToShow.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-[35px] p-8 shadow-[0_0_40px_rgba(236,72,153,0.08)]"
              >

                <div className="flex flex-col lg:flex-row gap-8">

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full lg:w-[320px] h-55 object-cover rounded-3xl"
                  />

                  <div className="flex-1">

                    <p className="text-pink-500 font-semibold mb-3">
                      {blog.category}
                    </p>

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      {blog.title}
                    </h2>

                    <div className="flex items-center gap-4 text-gray-500 mb-6">
                      <span>{blog.author}</span>
                      <span>•</span>
                      <span>{blog.readTime}</span>
                    </div>

                    <p className="text-gray-600 leading-8">
                      {blog.description}
                    </p>

                    {/* ACTIONS ONLY FOR PENDING */}
                    {tab === "pending" && (
                      <div className="flex gap-4 mt-8">

                        <button
                          onClick={() => approveBlog(blog.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-2xl font-semibold"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectBlog(blog.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-7 py-3 rounded-2xl font-semibold"
                        >
                          Reject
                        </button>

                      </div>
                    )}

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;