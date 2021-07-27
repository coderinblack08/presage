import { GetServerSideProps } from "next";
import React from "react";

const Redirect: React.FC = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/explore?reset=true",
      permanent: true,
    },
  };
};

export default Redirect;
