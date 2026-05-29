function ProfileSubmissionCard({ blog }) {

  return (

    <div className="
      bg-white
      rounded-[30px]
      p-6
      border
      border-pink-100
      shadow-[0_0_30px_rgba(236,72,153,0.08)]
    ">

      <div className="
        flex
        items-start
        justify-between
        gap-5
      ">

        <div>

          <h2 className="
            text-2xl
            font-bold
            text-gray-800
            mb-3
          ">
            {blog.title}
          </h2>

          <p className="
            text-gray-500
            leading-7
          ">
            {blog.description}
          </p>

          <p className="
            text-sm
            text-gray-400
            mt-4
          ">
            Submitted on {blog.date}
          </p>

        </div>

        <div>

          <span className={`
            px-5
            py-2
            rounded-full
            text-sm
            font-semibold

            ${
              blog.status === "Approved"
                ? "bg-green-100 text-green-700"

              : blog.status === "Rejected"
                ? "bg-red-100 text-red-700"

              : "bg-yellow-100 text-yellow-700"
            }
          `}>

            {blog.status}

          </span>

        </div>

      </div>

    </div>

  );
}

export default ProfileSubmissionCard;