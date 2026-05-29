import { useContext } from "react";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

function Notifications() {

  const { user } =
    useContext(AuthContext);

  const { getNotifications } =
    useContext(BlogContext);

  const notifications =
    user
      ? getNotifications(user.email)
      : [];

  return (

    <div className="
      bg-[#f7f7fb]
      min-h-screen
      py-10
      px-5
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-5
          mb-12
        ">

          <div>

            <p className="
              text-pink-500
              font-semibold
              mb-3
            ">
              BLOGSPHERE ALERT CENTER
            </p>

            <h1 className="
              text-5xl
              font-black
              text-gray-800
            ">
              Notifications
            </h1>

            <p className="
              text-gray-500
              mt-4
              text-lg
            ">
              Stay updated with your latest
              blog approvals, rejections
              and publishing activity.
            </p>

          </div>

          {/* TOTAL */}

          <div className="
            bg-white
            rounded-[30px]
            px-8
            py-6
            border
            border-pink-100
            shadow-[0_0_30px_rgba(236,72,153,0.08)]
          ">

            <p className="
              text-gray-500
              text-sm
              mb-2
            ">
              Total Notifications
            </p>

            <h2 className="
              text-4xl
              font-black
              text-gray-800
            ">
              {notifications.length}
            </h2>

          </div>

        </div>

        {/* EMPTY STATE */}

        {notifications.length === 0 ? (

          <div className="
            bg-white
            rounded-[40px]
            p-16
            text-center
            border
            border-pink-100
            shadow-[0_0_40px_rgba(236,72,153,0.08)]
          ">

            <div className="
              w-24
              h-24
              mx-auto
              rounded-full
              bg-pink-100
              flex
              items-center
              justify-center
              text-4xl
              mb-8
            ">
              🔔
            </div>

            <h2 className="
              text-3xl
              font-bold
              text-gray-800
              mb-4
            ">
              No Notifications Yet
            </h2>

            <p className="
              text-gray-500
              max-w-xl
              mx-auto
              leading-8
            ">
              Once your blogs are reviewed
              by the admin team, updates
              about approvals or rejections
              will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-7">

            {notifications.map((item) => (

              <div
                key={item.id}
                className={`
                  relative
                  overflow-hidden
                  bg-white
                  rounded-[35px]
                  p-8
                  border
                  shadow-[0_0_35px_rgba(236,72,153,0.08)]
                  transition
                  hover:-translate-y-1

                  ${
                    item.type === "approved"
                      ? "border-green-100"
                      : "border-red-100"
                  }
                `}
              >

                {/* GLOW */}

                <div
                  className={`
                    absolute
                    top-0
                    right-0
                    w-40
                    h-40
                    rounded-full
                    blur-3xl
                    opacity-20

                    ${
                      item.type === "approved"
                        ? "bg-green-400"
                        : "bg-red-400"
                    }
                  `}
                ></div>

                <div className="
                  relative
                  z-10
                  flex
                  flex-col
                  md:flex-row
                  md:items-start
                  md:justify-between
                  gap-8
                ">

                  {/* LEFT */}

                  <div className="
                    flex
                    gap-5
                  ">

                    {/* ICON */}

                    <div
                      className={`
                        min-w-17.5
                        h-17.5
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-3xl

                        ${
                          item.type === "approved"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }
                      `}
                    >

                      {item.type === "approved"
                        ? "✅"
                        : "❌"}

                    </div>

                    {/* CONTENT */}

                    <div>

                      <div className="
                        flex
                        items-center
                        gap-3
                        flex-wrap
                        mb-4
                      ">

                        <span
                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold

                            ${
                              item.type === "approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >

                          {item.type === "approved"
                            ? "Approved"
                            : "Rejected"}

                        </span>

                        <span className="
                          text-gray-400
                          text-sm
                        ">
                          Blog Review Update
                        </span>

                      </div>

                      <h3 className="
                        text-2xl
                        font-bold
                        text-gray-800
                        leading-10
                        mb-4
                      ">
                        {item.message}
                      </h3>

                      <p className="
                        text-gray-500
                      ">
                        {item.date}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;