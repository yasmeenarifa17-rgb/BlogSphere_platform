function About() {

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
      py-20
      px-6
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        <div className="
          bg-white
          rounded-[40px]
          p-12
          shadow-[0_0_50px_rgba(236,72,153,0.08)]
        ">

          <p className="
            text-pink-500
            font-semibold
            mb-4
          ">
            ABOUT PLATFORM
          </p>

          <h1 className="
            text-5xl
            font-bold
            text-gray-800
            mb-8
          ">
            Welcome to BlogSphere
          </h1>

          <div className="
            space-y-8
            text-gray-600
            leading-9
            text-lg
          ">

            <p>
              BlogSphere is a modern
              publishing platform built
              for developers, creators,
              engineers and innovators
              who love sharing knowledge
              with the world.
            </p>

            <p>
              The platform provides
              professional publishing,
              community engagement,
              admin moderation,
              notifications and
              interactive discussions.
            </p>

            <p>
              Built using React,
              Context API and
              modern UI architecture,
              BlogSphere focuses on
              scalability, performance
              and premium user experience.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

export default About;