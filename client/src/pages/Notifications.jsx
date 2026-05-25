import { useContext } from "react";

import { BlogContext } from "../context/BlogContext";
import { AuthContext } from "../context/AuthContext";

function Notifications() {

  const { user } = useContext(AuthContext);

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
        max-w-4xl
        mx-auto
      ">

        <div className="
          mb-10
        ">

          <h1 className="
            text-5xl
            font-bold
            text-gray-800
          ">
            Notifications
          </h1>

          <p className="
            text-gray-500
            mt-3
          ">
            Your latest blog updates.
          </p>

        </div>

        {notifications.length === 0 ? (

          <div className="
            bg-white
            rounded-[35px]
            p-10
            text-center
            shadow-[0_0_40px_rgba(236,72,153,0.08)]
          ">

            <h2 className="
              text-2xl
              font-bold
              text-gray-800
            ">
              No Notifications Yet
            </h2>

          </div>

        ) : (

          <div className="space-y-6">

            {notifications.map((item) => (

              <div
                key={item.id}
                className={`
                  bg-white
                  rounded-[30px]
                  p-6
                  border-l-8
                  shadow-[0_0_30px_rgba(236,72,153,0.08)]

                  ${
                    item.type === "approved"
                      ? "border-green-500"
                      : "border-red-500"
                  }
                `}
              >

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-800
                  mb-2
                ">
                  {item.message}
                </h3>

                <p className="text-gray-500">
                  {item.date}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;