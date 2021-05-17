import React from "react";
import { Layout } from "../layout/Layout";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <h3 className="text-2xl md:text-3xl text-center mt-12 md:mt-20">
        Whoops, that page isn't here
      </h3>
      <p className="text-center text-gray mt-2">
        Sorry mate, the programmer never taught me about this page
      </p>
    </Layout>
  );
};

export default NotFound;
