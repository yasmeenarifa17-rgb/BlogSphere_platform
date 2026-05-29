import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import { BlogContext } from "../context/BlogContext";

import BlogCard from "../components/blog/BlogCard";

function Profile() {

  const { username } =
    useParams();

  const { blogs } =
    useContext(BlogContext);

  // PROFILE DATA

  const [profileData, setProfileData] =
    useState({

      bio: "",

      linkedin: "",

      github: "",

      portfolio: "",
    });

  // USER BLOGS

  const userBlogs = blogs.filter(

    (blog) =>

      blog.author
        ?.toLowerCase()
        ===
      username?.toLowerCase()

  );

  // TOTAL LIKES

  const totalLikes = userBlogs.reduce(

    (acc, blog) =>

      acc + (blog.likes || 0),

    0

  );

  // LOAD SAVED PROFILE

  useEffect(() => {

    const savedProfile =

      JSON.parse(

        localStorage.getItem(
          `profile_${username}`
        )

      );

    if (savedProfile) {

      setProfileData(savedProfile);
    }

  }, [username]);

  // SAVE PROFILE

  const saveProfile = () => {

    localStorage.setItem(

      `profile_${username}`,

      JSON.stringify(profileData)
    );

    alert("Profile Updated");
  };

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
      py-10
      px-6
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* PROFILE HERO */}

        <div className="
          bg-white
          rounded-[40px]
          p-10
          border
          border-pink-100
          shadow-[0_0_40px_rgba(236,72,153,0.08)]
          mb-14
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            md:items-start
            gap-8
          ">

            {/* AVATAR */}

            <div className="
              w-32
              h-32
              rounded-full
              bg-linear-to-r
              from-pink-500
              to-violet-500
              flex
              items-center
              justify-center
              text-white
              text-5xl
              font-black
              shadow-[0_0_40px_rgba(236,72,153,0.30)]
            ">

              {username?.charAt(0).toUpperCase()}

            </div>

            {/* USER INFO */}

            <div className="flex-1">

              <h1 className="
                text-5xl
                font-black
                text-gray-800
                mb-3
              ">

                {username}

              </h1>

              <p className="
                text-gray-600
                text-lg
                leading-8
                max-w-3xl
              ">

                Passionate creator sharing
                modern technology,
                development and innovation
                articles on BlogSphere.

              </p>

              {/* STATS */}

              <div className="
                flex
                flex-wrap
                gap-5
                mt-8
              ">

                <div className="
                  bg-pink-50
                  px-6
                  py-4
                  rounded-2xl
                ">

                  <h3 className="
                    text-3xl
                    font-black
                    text-pink-500
                  ">

                    {userBlogs.length}

                  </h3>

                  <p className="text-gray-600">
                    Articles
                  </p>

                </div>

                <div className="
                  bg-violet-50
                  px-6
                  py-4
                  rounded-2xl
                ">

                  <h3 className="
                    text-3xl
                    font-black
                    text-violet-500
                  ">

                    {totalLikes}

                  </h3>

                  <p className="text-gray-600">
                    Likes
                  </p>

                </div>

              </div>

              {/* BIO */}

              <div className="mt-10">

                <textarea
                  rows="4"
                  value={profileData.bio}
                  onChange={(e) =>

                    setProfileData({

                      ...profileData,

                      bio: e.target.value,
                    })
                  }
                  placeholder="Write your creator bio..."
                  className="
                    w-full
                    p-5
                    rounded-3xl
                    border
                    border-pink-100
                    bg-[#fafafa]
                    outline-none
                    resize-none
                    mt-2
                  "
                />

              </div>

              {/* SOCIAL LINKS */}

              <div className="
                grid
                md:grid-cols-3
                gap-5
                mt-6
              ">

                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={profileData.linkedin}
                  onChange={(e) =>

                    setProfileData({

                      ...profileData,

                      linkedin: e.target.value,
                    })
                  }
                  className="
                    p-4
                    rounded-2xl
                    border
                    border-pink-100
                    bg-[#fafafa]
                    outline-none
                  "
                />

                <input
                  type="text"
                  placeholder="GitHub URL"
                  value={profileData.github}
                  onChange={(e) =>

                    setProfileData({

                      ...profileData,

                      github: e.target.value,
                    })
                  }
                  className="
                    p-4
                    rounded-2xl
                    border
                    border-pink-100
                    bg-[#fafafa]
                    outline-none
                  "
                />

                <input
                  type="text"
                  placeholder="Portfolio URL"
                  value={profileData.portfolio}
                  onChange={(e) =>

                    setProfileData({

                      ...profileData,

                      portfolio: e.target.value,
                    })
                  }
                  className="
                    p-4
                    rounded-2xl
                    border
                    border-pink-100
                    bg-[#fafafa]
                    outline-none
                  "
                />

              </div>

              {/* SAVE BUTTON */}

              <button
                onClick={saveProfile}
                className="
                  mt-6
                  bg-pink-500
                  hover:bg-pink-600
                  transition
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  shadow-[0_0_30px_rgba(236,72,153,0.25)]
                "
              >

                Save Profile

              </button>

              {/* PUBLIC SOCIAL LINKS */}

              <div className="
                flex
                flex-wrap
                gap-4
                mt-8
              ">

                {profileData.linkedin && (

                  <a
                    href={profileData.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      bg-blue-50
                      text-blue-600
                      px-5
                      py-3
                      rounded-full
                      font-medium
                    "
                  >

                    LinkedIn

                  </a>

                )}

                {profileData.github && (

                  <a
                    href={profileData.github}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      bg-gray-100
                      text-gray-700
                      px-5
                      py-3
                      rounded-full
                      font-medium
                    "
                  >

                    GitHub

                  </a>

                )}

                {profileData.portfolio && (

                  <a
                    href={profileData.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      bg-pink-50
                      text-pink-600
                      px-5
                      py-3
                      rounded-full
                      font-medium
                    "
                  >

                    Portfolio

                  </a>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* USER ARTICLES */}

        <div>

          <p className="
            text-cyan-500
            font-semibold
            mb-2
          ">
            CREATOR ARTICLES
          </p>

          <h2 className="
            text-5xl
            font-black
            text-gray-800
            mb-10
          ">
            Published Stories
          </h2>

          {userBlogs.length === 0 ? (

            <div className="
              bg-white
              rounded-[35px]
              p-14
              text-center
            ">

              <h3 className="
                text-3xl
                font-bold
                text-gray-800
                mb-4
              ">
                No Articles Yet
              </h3>

            </div>

          ) : (

            <div className="
              grid
              md:grid-cols-2
              gap-8
            ">

              {userBlogs.map((blog) => (

                <BlogCard
                  key={blog.id}
                  blog={blog}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Profile;