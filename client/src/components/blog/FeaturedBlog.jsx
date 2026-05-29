import { Link } from "react-router-dom";

function FeaturedBlog() {

  return (

    <div className="
      relative
      bg-white
      rounded-[45px]
      overflow-hidden
      border
      border-pink-100
      shadow-[0_0_80px_rgba(236,72,153,0.15)]
    ">

      {/* BACKGROUND GLOW */}

      <div className="
        absolute
        top-30
        right-30
        w-96
        h-96
        bg-pink-300/30
        blur-3xl
        rounded-full
      "></div>

      <div className="
        absolute
        bottom-25
        left-25
        w-80
        h-80
        bg-cyan-300/20
        blur-3xl
        rounded-full
      "></div>

      <div className="
        relative
        grid
        lg:grid-cols-2
      ">

        {/* LEFT CONTENT */}

        <div className="
          p-12
          lg:p-16
          flex
          flex-col
          justify-center
        ">

          {/* BADGE */}

          <div className="
            inline-flex
            items-center
            gap-3
            bg-pink-50
            border
            border-pink-100
            text-pink-500
            px-5
            py-3
            rounded-full
            font-semibold
            w-fit
            mb-8
          ">

            🔥 Featured Technology Article

          </div>

          {/* TITLE */}

          <h1 className="
            text-5xl
            lg:text-7xl
            font-black
            text-gray-800
            leading-tight
            mb-8
          ">

            The Future of
            {" "}

            <span className="
              text-transparent
              bg-clip-text
              bg-linear-to-r
              from-pink-500
              to-violet-500
            ">

              Modern
              Full Stack
              Development

            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="
            text-gray-600
            text-xl
            leading-10
            mb-10
            max-w-2xl
          ">

            Explore how developers are building
            scalable AI-powered applications using
            React, Node.js, cloud infrastructure
            and intelligent automation systems.

          </p>

          {/* BUTTONS */}

          <div className="
            flex
            flex-wrap
            gap-5
            mb-12
          ">

            <Link to="/blog/1">

              <button className="
                bg-pink-500
                hover:bg-pink-600
                transition
                text-white
                px-8
                py-4
                rounded-2xl
                font-semibold
                shadow-[0_0_35px_rgba(236,72,153,0.35)]
              ">

                Read Featured Story

              </button>

            </Link>

            <Link to="/create">

              <button className="
                bg-white
                border
                border-gray-200
                hover:border-pink-300
                transition
                text-gray-700
                px-8
                py-4
                rounded-2xl
                font-semibold
              ">

                Start Writing

              </button>

            </Link>

          </div>

          {/* STATS */}

          <div className="
            flex
            flex-wrap
            gap-10
          ">

            <div>

              <h3 className="
                text-3xl
                font-black
                text-gray-800
              ">
                20+
              </h3>

              <p className="
                text-gray-500
                mt-2
              ">
                Published Articles
              </p>

            </div>

            <div>

              <h3 className="
                text-3xl
                font-black
                text-gray-800
              ">
                120+
              </h3>

              <p className="
                text-gray-500
                mt-2
              ">
                Community Comments
              </p>

            </div>

            <div>

              <h3 className="
                text-3xl
                font-black
                text-gray-800
              ">
                100%
              </h3>

              <p className="
                text-gray-500
                mt-2
              ">
                Admin Moderated
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="
          relative
          overflow-hidden
        ">

          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475"
            alt="featured"
            className="
              w-full
              h-full
              object-cover
              min-h-162.5
            "
          />

          {/* IMAGE OVERLAY */}

          <div className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/60
            via-black/10
            to-transparent
          "></div>

          {/* FLOATING INFO CARD */}

          <div className="
            absolute
            bottom-8
            left-8
            right-8
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-[30px]
            p-6
            text-white
          ">

            <div className="
              flex
              items-center
              justify-between
              mb-4
            ">

              <span className="
                bg-white/20
                px-4
                py-2
                rounded-full
                text-sm
              ">
                AI + Development
              </span>

              <span className="text-sm">
                15 min read
              </span>

            </div>

            <h3 className="
              text-2xl
              font-bold
              leading-snug
              mb-3
            ">

              Discover the technologies shaping
              the next generation of scalable
              applications.

            </h3>

            <p className="
              text-white/80
              leading-7
            ">

              React, Node.js, AI systems and
              cloud-native architecture are
              transforming software engineering.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FeaturedBlog;