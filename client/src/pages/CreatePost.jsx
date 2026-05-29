import { useState, useContext, useEffect } from "react";
import GlowButton from "../components/ui/GlowButton";
import { AuthContext } from "../context/AuthContext";
import { BlogContext } from "../context/BlogContext";

function CreatePost() {

  const { user } = useContext(AuthContext);
 const {
  submitBlog,
  fetchPendingBlogs
} = useContext(BlogContext);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: ""
  });

  const [preview, setPreview] = useState(null);

  const [submittedBlogs, setSubmittedBlogs] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadBlogs = () => {
      const savedBlogs =
        JSON.parse(localStorage.getItem(`myBlogs_${user.email}`)) || [];
      setSubmittedBlogs(savedBlogs);
    };

    loadBlogs();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE HANDLER (NEW)
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result
      });

      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {

    if (!formData.title || !formData.category || !formData.content) {
      alert("Please fill all fields");
      return;
    }

   const newBlog = {
  ...formData,
  image:
    formData.image ||
    "https://images.unsplash.com/photo-1518770660439-4636190af475",
  author: user.email.split("@")[0],
  role:
    user.role === "admin"
      ? "Administrator"
      : "Community Writer",
  readTime: "5 min read",
  comments: [],
  description:
    formData.content.slice(0, 120) + "...",
  date: new Date().toLocaleString(),
  status:
    user?.role === "admin"
      ? "Approved"
      : "Pending",

  email: user.email,

  createdBy: user.email
};

   await submitBlog(newBlog);
await fetchPendingBlogs();
    const updatedBlogs = [newBlog, ...submittedBlogs];

    setSubmittedBlogs(updatedBlogs);

    localStorage.setItem(
      `myBlogs_${user.email}`,
      JSON.stringify(updatedBlogs)
    );

    setFormData({
      title: "",
      category: "",
      content: "",
      image: ""
    });

    setPreview(null);
  };

  return (
    <div className="bg-[#f7f7fb] min-h-screen py-10 px-5">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-[35px] p-10 border border-cyan-100 shadow-[0_0_55px_rgba(6,182,212,0.18)]">

          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            Create New Story
          </h1>

          <p className="text-gray-500 mb-10">
            Share your thoughts with the BlogSphere community.
          </p>

          {/* IMAGE UPLOAD */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mb-5"
          />

          {preview && (
            <img
              src={preview}
              className="w-full h-60 object-cover rounded-2xl mb-6"
            />
          )}

          <div className="space-y-6">

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full p-5 rounded-2xl border"
            />

            <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full p-5 rounded-2xl border"
>
  <option value="">Select Category</option>

  <option>Artificial Intelligence</option>
  <option>Machine Learning</option>
  <option>Web Development</option>
  <option>Technology</option>
  <option>Programming</option>
  <option>Cloud Computing</option>
  <option>Quantum Computing</option>
  <option>Cybersecurity</option>
  <option>Startups</option>
  <option>UI/UX Design</option>
</select>
           <textarea
  rows="16"
  name="content"
  value={formData.content}
  onChange={handleChange}
  placeholder={`Example:

# Main Heading

## Sub Heading

Write normal paragraph text here...

`}
  className="
    w-full
    p-5
    rounded-2xl
    border
    resize-none
    text-lg
    leading-9
  "
/>
          </div>

          <div className="mt-8" onClick={handleSubmit}>
            <GlowButton
              text={
                user?.role === "admin"
                  ? "Publish Blog"
                  : "Submit For Review"
              }
              color="cyan"
            />
          </div>

        </div>

        {/* USER SUBMISSIONS (UNCHANGED) */}
        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-8">
            Your Submissions
          </h2>

          <div className="space-y-6">

            {submittedBlogs.map((blog, index) => (
              <div key={index} className="bg-white p-6 rounded-3xl border">

                <h3 className="text-2xl font-bold">{blog.title}</h3>

                <p className="text-gray-500 mt-2">
                  Submitted on {blog.date}
                </p>

                <span className="text-sm font-semibold">
                  {blog.status}
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default CreatePost;