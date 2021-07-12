import React from "react";
import { Layout } from "../components/Layout";
import { LandingPage } from "../modules/home/LandingPage";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default HomePage;
