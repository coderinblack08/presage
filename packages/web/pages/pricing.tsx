import React from "react";
import { Layout } from "../components/Layout";
import { PricingPage } from "../modules/home/PricingPage";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <PricingPage />
    </Layout>
  );
};

export default HomePage;
