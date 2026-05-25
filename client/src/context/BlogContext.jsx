import {
  createContext,
  useEffect,
  useState,
} from "react";

import blogsData from "../data/blogs";

export const BlogContext =
  createContext();

function BlogProvider({ children }) {

  const [blogs, setBlogs] =
    useState([]);

  const [pendingBlogs, setPendingBlogs] =
    useState([]);

  useEffect(() => {

    const savedBlogs =
      JSON.parse(
        localStorage.getItem(
          "approvedBlogs"
        )
      );

    const savedPending =
      JSON.parse(
        localStorage.getItem(
          "pendingBlogs"
        )
      );

    if (savedBlogs) {

      const mergedBlogs = [

        ...savedBlogs,

        ...blogsData.filter(
          (blog) =>
            !savedBlogs.some(
              (saved) =>
                saved.id === blog.id
            )
        ),
      ];

      setBlogs(mergedBlogs);

    } else {

      setBlogs(blogsData);
    }

    if (savedPending) {
      setPendingBlogs(savedPending);
    }

  }, []);

  useEffect(() => {

    localStorage.setItem(
      "approvedBlogs",
      JSON.stringify(blogs)
    );

  }, [blogs]);

  useEffect(() => {

    localStorage.setItem(
      "pendingBlogs",
      JSON.stringify(pendingBlogs)
    );

  }, [pendingBlogs]);

  useEffect(() => {
  localStorage.setItem("approvedBlogs", JSON.stringify(blogs));
}, [blogs]);

  // SUBMIT BLOG

  const submitBlog = (blog) => {

    const newBlog = {
  ...blog,
  id: Date.now(),
  status: blog.status || "Pending",
  userEmail: blog.userEmail || blog.createdBy || blog.email || null
};

    // ADMIN DIRECT PUBLISH

    if (blog.role === "Administrator") {

      setBlogs((prev) => [
        newBlog,
        ...prev,
      ]);

      return;
    }

    // USER SUBMISSION

    setPendingBlogs((prev) => [
      ...prev,
      newBlog,
    ]);
  };

  // APPROVE BLOG

 const approveBlog = (id) => {

  const blogToApprove =
    pendingBlogs.find(
      (blog) => blog.id === id
    );

  if (!blogToApprove) return;

  const approvedBlog = {
    ...blogToApprove,
    status: "Approved",
  };

  // UPDATE BLOG STATE
  const updatedApprovedBlogs = [
    approvedBlog,
    ...blogs,
  ];

  setBlogs(updatedApprovedBlogs);

  // FORCE LOCALSTORAGE SYNC (IMPORTANT FIX)
  localStorage.setItem(
    "approvedBlogs",
    JSON.stringify(updatedApprovedBlogs)
  );

  // UPDATE USER SUBMISSIONS
  const userBlogs =
    JSON.parse(
      localStorage.getItem(
        `myBlogs_${approvedBlog.createdBy}`
      )
    ) || [];

  const updatedUserBlogs =
    userBlogs.map((blog) => {

      if (
        blog.date === approvedBlog.date
      ) {

        return {
          ...blog,
          status: "Approved",
        };
      }

      return blog;
    });

  localStorage.setItem(
    `myBlogs_${approvedBlog.createdBy}`,
    JSON.stringify(updatedUserBlogs)
  );

  // REMOVE FROM PENDING
  const updatedPending =
    pendingBlogs.filter(
      (blog) => blog.id !== id
    );

  setPendingBlogs(updatedPending);

  localStorage.setItem(
    "pendingBlogs",
    JSON.stringify(updatedPending)
  );

  // NOTIFICATION
  if (
    blogToApprove.userEmail ||
    blogToApprove.createdBy
  ) {

    addNotification(
      blogToApprove.userEmail ||
      blogToApprove.createdBy,

      `Your blog "${blogToApprove.title}" was Approved 🎉`,

      "approved"
    );
  }
};

  // REJECT BLOG

  const rejectBlog = (id) => {

    const rejectedBlog =
      pendingBlogs.find(
        (blog) => blog.id === id
      );

    if (!rejectedBlog) return;

    // UPDATE USER SUBMISSIONS

    const userBlogs =
      JSON.parse(
        localStorage.getItem(
          `myBlogs_${rejectedBlog.createdBy}`
        )
      ) || [];

    const updatedUserBlogs =
      userBlogs.map((blog) => {

        if (
          blog.date ===
          rejectedBlog.date
        ) {

          return {
            ...blog,
            status: "Rejected",
          };
        }

        return blog;
      });

    localStorage.setItem(
      `myBlogs_${rejectedBlog.createdBy}`,
      JSON.stringify(updatedUserBlogs)
    );

    setPendingBlogs((prev) =>
      prev.filter(
        (blog) => blog.id !== id
      )
    );
    if (rejectedBlog.userEmail || rejectedBlog.createdBy) {
  addNotification(
    rejectedBlog.userEmail || rejectedBlog.createdBy,
    `Your blog "${rejectedBlog.title}" was Rejected 😔`,
    "rejected"
  );
}
  };

  // ===============================
// NOTIFICATION SYSTEM (NEW)
// ===============================

const addNotification = (email, message, type) => {
  const key = `notifications_${email}`;

  const existing = JSON.parse(localStorage.getItem(key)) || [];

  const newNotification = {
    id: Date.now(),
    message,
    type,
    date: new Date().toLocaleDateString()
  };

  localStorage.setItem(
    key,
    JSON.stringify([newNotification, ...existing])
  );
};

const getNotifications = (email) => {
  const key = `notifications_${email}`;
  return JSON.parse(localStorage.getItem(key)) || [];
};
// COMMENTS

  const addComment = (blogId, comment) => {

  const updatedBlogs = blogs.map((blog) => {

    if (blog.id === blogId) {

      return {
        ...blog,
        comments: [
          ...(blog.comments || []),
          comment,
        ],
      };
    }

    return blog;
  });

  setBlogs(updatedBlogs);

  // IMPORTANT LOCALSTORAGE SYNC
  localStorage.setItem(
    "approvedBlogs",
    JSON.stringify(updatedBlogs)
  );
};

  return (

    <BlogContext.Provider
      value={{
        blogs,
        pendingBlogs,
        submitBlog,
        approveBlog,
        rejectBlog,
        addComment,
        addNotification,
getNotifications,
      }}
    >

      {children}

    </BlogContext.Provider>
  );
}

export default BlogProvider;