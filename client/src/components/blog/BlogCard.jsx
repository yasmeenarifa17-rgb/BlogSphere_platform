import { Link } from "react-router-dom";

function BlogCard({ blog }) {

  return (
    <Link to={`/blog/${blog.id}`}>

      <div className="
        bg-white
        rounded-[35px]
        overflow-hidden
        border
        border-gray-100
        shadow-[0_0_35px_rgba(236,72,153,0.08)]
        hover:shadow-[0_0_50px_rgba(236,72,153,0.16)]
        transition
        duration-300
        hover:-translate-y-1
      ">

        <img
          src={blog.image}
          alt={blog.title}
          className="
            w-full
            h-65
            object-cover
          "
        />

        <div className="p-8">

          <p className="text-pink-500 font-semibold mb-4">
            {blog.category}
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-gray-800
            leading-tight
            mb-5
          ">
            {blog.title}
          </h2>

          <p className="
            text-gray-600
            leading-8
            mb-8
          ">
            {blog.description}
          </p>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="
                w-12
                h-12
                rounded-full
                bg-pink-200
              "></div>

              <div>

                <h4 className="font-semibold text-gray-800">
                  {blog.author}
                </h4>

                <p className="text-sm text-gray-400">
                  {blog.role}
                </p>

              </div>

            </div>

            <div className="text-sm text-gray-500 text-right">
              <p>{blog.readTime}</p>
              <p>{blog.comments?.length || 0} comments</p>
            </div>

          </div>

        </div>

      </div>

    </Link>
  );
}

export default BlogCard;