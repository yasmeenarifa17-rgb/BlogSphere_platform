function Footer() {

  return (

    <footer className="
      mt-24
      bg-white
      border-t
      border-pink-100
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-16
      ">

        <div className="
          grid
          md:grid-cols-4
          gap-10
        ">

          {/* BRAND */}

          <div>

            <h2 className="
              text-3xl
              font-bold
              text-pink-500
              mb-4
            ">
              BlogSphere
            </h2>

            <p className="
              text-gray-600
              leading-8
            ">
              A premium modern publishing
              platform for developers,
              creators and innovators
              around the world.
            </p>

          </div>

          {/* LINKS */}

          <div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-5
            ">
              Platform
            </h3>

            <div className="
              flex
              flex-col
              gap-3
              text-gray-600
            ">

              <p>Home</p>
              <p>Trending Blogs</p>
              <p>Write Story</p>
              <p>Notifications</p>

            </div>

          </div>

          {/* CATEGORIES */}

          <div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-5
            ">
              Categories
            </h3>

            <div className="
              flex
              flex-col
              gap-3
              text-gray-600
            ">

              <p>Artificial Intelligence</p>
              <p>Programming</p>
              <p>Cloud Computing</p>
              <p>Startups</p>

            </div>

          </div>

          {/* CONTACT */}

          <div>

            <h3 className="
              text-xl
              font-bold
              text-gray-800
              mb-5
            ">
              Connect
            </h3>

            <div className="
              flex
              flex-col
              gap-3
              text-gray-600
            ">

              <p>LinkedIn</p>
              <p>GitHub</p>
              <p>Email Support</p>

            </div>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="
          mt-16
          pt-6
          border-t
          border-pink-100
          text-center
          text-gray-500
        ">

          © 2026 BlogSphere.
          Built with React & Passion.

        </div>

      </div>

    </footer>

  );
}

export default Footer;