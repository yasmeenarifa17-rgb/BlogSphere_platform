function FeaturedBlog() {

  return (
    <div className="
      bg-white
      rounded-[40px]
      overflow-hidden
      border
      border-pink-100
      shadow-[0_0_60px_rgba(236,72,153,0.18)]
    ">

      <div className="grid lg:grid-cols-2">

        <div className="p-12 flex flex-col justify-center">

          <p className="text-pink-500 font-semibold mb-5">
            Featured Article
          </p>

          <h1 className="
            text-5xl
            lg:text-6xl
            font-bold
            text-gray-800
            leading-tight
            mb-6
          ">
            The Future of Modern Full Stack Development
          </h1>

          <p className="
            text-gray-600
            text-lg
            leading-9
            mb-8
          ">
            Discover how modern developers are building scalable,
            intelligent and cloud-native applications using React,
            Node.js and AI powered systems.
          </p>

          <div className="flex items-center gap-6 text-gray-500">
            <span>15 min read</span>
            <span>•</span>
            <span>42 comments</span>
          </div>

        </div>

        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          alt="featured"
          className="
            w-full
            h-full
            object-cover
            min-h-112.5
          "
        />

      </div>
    </div>
  );
}

export default FeaturedBlog;