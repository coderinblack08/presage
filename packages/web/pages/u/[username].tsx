import { GetServerSideProps } from "next";
import React from "react";
import { useQuery } from "react-query";
import { Button } from "../../components/Button";
import { Layout } from "../../components/Layout";
import { User } from "../../lib/types";

const Profile: React.FC<{ username: string }> = ({ username }) => {
  const { data: user, isFetching } = useQuery<User>(`/auth/${username}`);

  return (
    <Layout>
      {isFetching || !user ? (
        <div className="spinner" />
      ) : (
        <main className="max-w-2xl mx-auto">
          <div className="flex space-x-10">
            <img
              src={user.profilePicture}
              alt={user.displayName}
              className="rounded-full w-28 h-28"
            />
            <div>
              <h4>{user.displayName}</h4>
              <p className="text-gray-300">@{user.username}</p>
              {user.bio && <p className="mt-2 text-gray-200">{user.bio}</p>}
              <Button className="mt-6">Follow</Button>
            </div>
          </div>
          <nav className="relative flex items-center space-x-12 mt-14 after:absolute after:bottom-0 after:block after:w-full after:h-0.5 after:bg-gray-600">
            <a
              href="#"
              className="relative text-primary font-sans font-bold pb-5 border-b-2 border-primary z-10"
            >
              Activity
            </a>
            <a
              href="#"
              className="relative font-sans font-bold pb-5 border-b-2 border-gray-600 z-10"
            >
              Likes
            </a>
          </nav>
          <div className="w-full bg-gray-800 h-[2px] mt-[-2px]" />
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { username: context.query.username },
  };
};

export default Profile;
