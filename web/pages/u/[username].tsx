import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { MdPerson, MdPersonAdd } from "react-icons/md";
import useSWR from "swr";
import { Avatar } from "../../components/avatar/Avatar";
import { Button } from "../../components/Button";
import { SoundbiteCard } from "../../components/SoundBiteCard";
import { Layout } from "../../layout/Layout";
import { supabase } from "../../lib/supabase";
import { useUser } from "../../stores/auth";
import { definitions } from "../../types/supabase";

const fetchUserSoundbites = async (profile) =>
  (
    await supabase
      .from("soundbites")
      .select("*, profiles:userId(*)")
      .eq("userId", profile.id)
  ).data;

const fetchProfile = async (_, username: string) =>
  (
    await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single()
  ).data;

const Profile: React.FC<{
  profile: definitions["profiles"];
  soundbites: definitions["soundbites"] & { profiles: definitions["profiles"] };
}> = ({ profile: profileInitialData, soundbites: soundbitesInitialData }) => {
  const {
    query: { username },
  } = useRouter();
  const { profile: myProfile } = useUser();
  const { data: profile } = useSWR<definitions["profiles"]>(
    ["profiles", username],
    fetchProfile,
    { initialData: profileInitialData }
  );
  const { data: soundbites } = useSWR<
    (definitions["soundbites"] & { profiles: definitions["profiles"] })[]
  >(
    () => (profile ? ["soundbites_for_user", username] : null),
    () => fetchUserSoundbites(profile),
    { initialData: soundbitesInitialData }
  );

  return (
    <Layout>
      <div className="absolute top-0 w-full">
        <header className="relative pt-12">
          <img
            className="absolute inset-x-0 top-0 z-0 w-full h-full object-cover opacity-[0.15]"
            src="https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg"
          />
          <div className="relative lg:max-w-7xl xl:max-w-8xl mx-auto px-6 py-20 z-20">
            <div className="mb-8">
              <Avatar
                src={profile?.avatarUrl}
                displayName={profile?.displayName}
                size={100}
              />
            </div>
            <div className="space-x-2 flex items-center">
              <h4 className="text-white">{profile?.displayName}</h4>
              <p className="text-gray">@{profile?.username}</p>
            </div>
            <div className="flex items-center space-x-5 mt-1">
              <p className="text-light-gray">
                <span className="text-white font-bold">1.5k</span> followers
              </p>
              <p className="text-light-gray">
                <span className="text-white font-bold">178</span> following
              </p>
            </div>
            {profile?.bio && (
              <p className="text-light-gray max-w-lg mt-2">{profile?.bio}</p>
            )}
            <div className="mt-6">
              {myProfile?.username === profile?.username ? (
                <Button size="small" icon={<MdPerson className="w-5 h-5" />}>
                  Edit Profile
                </Button>
              ) : (
                <Button size="small" icon={<MdPersonAdd className="w-5 h-5" />}>
                  Follow
                </Button>
              )}
            </div>
          </div>
        </header>
        <main className="lg:max-w-7xl xl:max-w-8xl mx-auto px-6 py-20">
          <h4>Recent Uploads</h4>
          <div className="space-x-8 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            {soundbites?.map((soundbite) => (
              <SoundbiteCard key={soundbite.id} {...soundbite} />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { username },
}) => {
  if (Array.isArray(username)) username = username[0];
  const profile = await fetchProfile(null, username);
  const soundbites = await fetchUserSoundbites(profile);
  return {
    props: {
      profile,
      soundbites,
    },
  };
};

export default Profile;