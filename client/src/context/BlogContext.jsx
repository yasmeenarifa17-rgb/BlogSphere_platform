import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

export const BlogContext =
  createContext();

function BlogProvider({ children }) {

  const [blogs, setBlogs] =
    useState([]);

  const [pendingBlogs, setPendingBlogs] =
    useState([]);

  // =========================
  // FETCH APPROVED BLOGS
  // =========================

  const fetchBlogs = async () => {

    try {

      const snapshot =
        await getDocs(
          collection(db, "blogs")
        );

      const blogsData =
        snapshot.docs.map((doc) => ({

          id: doc.id,

          ...doc.data(),
        }));

      setBlogs(blogsData);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // FETCH PENDING BLOGS
  // =========================

  const fetchPendingBlogs =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "pendingBlogs"
            )
          );

        const pendingData =
          snapshot.docs.map((doc) => ({

            id: doc.id,

            ...doc.data(),
          }));

        setPendingBlogs(
          pendingData
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchBlogs();

    fetchPendingBlogs();

  }, []);

  // =========================
  // SUBMIT BLOG
  // =========================

const submitBlog = async (blog) => {

  try {

    console.log("Submitting Blog:", blog);

    // =========================
    // ADMIN BLOG
    // =========================

    if (
      blog.createdBy ===
      "yasmeenarifa17@gmail.com"
    ) {

      await addDoc(
        collection(db, "blogs"),
        {
          ...blog,
          status: "Approved",
          createdAt:
            new Date().toISOString(),
        }
      );

      console.log(
        "Admin blog published"
      );

    } else {

      // =========================
      // USER BLOG -> PENDING
      // =========================

      await addDoc(
        collection(
          db,
          "pendingBlogs"
        ),
        {
          ...blog,
          status: "Pending",
          createdAt:
            new Date().toISOString(),
        }
      );

      console.log(
        "Blog added to pendingBlogs"
      );
    }

    await fetchBlogs();

    await fetchPendingBlogs();

  } catch (error) {

    console.log(
      "SUBMIT ERROR:",
      error
    );
  }
};


  // =========================
  // APPROVE BLOG
  // =========================

  const approveBlog =
    async (blogId) => {

      try {

        const pendingRef =
          doc(
            db,
            "pendingBlogs",
            blogId
          );

        const pendingSnap =
          await getDoc(
            pendingRef
          );

        if (
          !pendingSnap.exists()
        ) return;

        const blogData =
          pendingSnap.data();

        // ADD TO APPROVED
        await addDoc(
          collection(db, "blogs"),
          {
            ...blogData,
            status:
              "Approved",
          }
        );

        // DELETE FROM PENDING
        await deleteDoc(
          pendingRef
        );

        // NOTIFICATION
        const notification = {

          email:
            blogData.createdBy,

          type:
            "approved",

          message:
            `Your blog "${blogData.title}" was approved and published.`,

          date:
            new Date().toLocaleString(),
        };

        const existingNotifications =
          JSON.parse(
            localStorage.getItem(
              "notifications"
            )
          ) || [];

        localStorage.setItem(
          "notifications",
          JSON.stringify([
            notification,
            ...existingNotifications,
          ])
        );

        fetchBlogs();

        fetchPendingBlogs();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // REJECT BLOG
  // =========================

  const rejectBlog =
    async (blogId) => {

      try {

        const pendingRef =
          doc(
            db,
            "pendingBlogs",
            blogId
          );

        const pendingSnap =
          await getDoc(
            pendingRef
          );

        if (
          !pendingSnap.exists()
        ) return;

        const blogData =
          pendingSnap.data();

        // DELETE BLOG
        await deleteDoc(
          pendingRef
        );

        // NOTIFICATION
        const notification = {

          email:
            blogData.createdBy,

          type:
            "rejected",

          message:
            `Your blog "${blogData.title}" was rejected by admin.`,

          date:
            new Date().toLocaleString(),
        };

        const existingNotifications =
          JSON.parse(
            localStorage.getItem(
              "notifications"
            )
          ) || [];

        localStorage.setItem(
          "notifications",
          JSON.stringify([
            notification,
            ...existingNotifications,
          ])
        );

        fetchPendingBlogs();

      } catch (error) {

        console.log(error);
      }
    };

  // =========================
  // GET NOTIFICATIONS
  // =========================

  const getNotifications =
    (email) => {

      const notifications =
        JSON.parse(
          localStorage.getItem(
            "notifications"
          )
        ) || [];

      return notifications.filter(
        (item) =>
          item.email === email
      );
    };

  // =========================
  // COMMENTS
  // =========================

  const addComment = async (
    blogId,
    comment
  ) => {

    try {

      const blogRef =
        doc(db, "blogs", blogId);

      await updateDoc(blogRef, {

        comments:
          arrayUnion(comment),
      });

      fetchBlogs();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // LIKES
  // =========================

  const toggleLike = async (
    blogId,
    currentLikes = 0
  ) => {

    try {

      const blogRef =
        doc(db, "blogs", blogId);

      await updateDoc(blogRef, {

        likes:
          currentLikes + 1,
      });

      fetchBlogs();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // BOOKMARKS
  // =========================

  const toggleBookmark =
    (blog) => {

      const existingBookmarks =

        JSON.parse(
          localStorage.getItem(
            "bookmarks"
          )
        ) || [];

      const alreadyBookmarked =

        existingBookmarks.some(
          (item) =>
            item.id === blog.id
        );

      let updatedBookmarks;

      if (
        alreadyBookmarked
      ) {

        updatedBookmarks =
          existingBookmarks.filter(
            (item) =>
              item.id !== blog.id
          );

      } else {

        updatedBookmarks = [
          blog,
          ...existingBookmarks,
        ];
      }

      localStorage.setItem(
        "bookmarks",
        JSON.stringify(
          updatedBookmarks
        )
      );
    };

  return (

    <BlogContext.Provider
      value={{
        blogs,
        pendingBlogs,
        fetchPendingBlogs,

        submitBlog,

        approveBlog,
        rejectBlog,

        getNotifications,

        addComment,

        toggleLike,

        toggleBookmark,
      }}
    >

      {children}

    </BlogContext.Provider>
  );
}

export default BlogProvider;