import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { MdPersonAdd } from "react-icons/md";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { User } from "../../lib/types";

const UserPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ username }) => {
  const { data: user } = useQuery<User>(`/user/${username}`);

  return (
    <Layout>
      {user ? (
        <>
          {" "}
          <header className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
              alt="wallpaper"
              className="h-60 w-full object-cover object-center"
            />
            <div className="px-10 py-12">
              <img
                src={user.profilePicture}
                alt={user.displayName}
                className="relative z-10 w-28 h-28 rounded-full -mt-28 ring ring-white"
              />
              <div className="mt-4">
                <div className="flex items-center space-x-3">
                  <h4>{user.displayName}</h4>
                  <Button
                    size="small"
                    icon={<MdPersonAdd className="w-5 h-5" />}
                    rounded
                  >
                    Follow
                  </Button>
                </div>
                <p className="text-gray-500 mt-1">@{user.username}</p>
                <p className="text-gray-600 mt-4">
                  <span className="font-semibold">0</span> Followers ·{" "}
                  <span className="font-semibold">0</span> Following
                </p>
              </div>
            </div>
          </header>
        </>
      ) : (
        <div className="spinner" />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: context.query.username,
    },
  };
};

export default UserPage;
