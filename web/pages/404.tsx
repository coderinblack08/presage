import React from "react";
import { Layout } from "../layout/Layout";

const NotFound: React.FC = () => {
  return (
    <Layout>
      <h4 className="text-center mt-12 md:mt-24">Page not found</h4>
      <p className="text-center text-gray mt-2">
        Sorry mate, the programmer never taught me about this page
      </p>
    </Layout>
  );
};

export default NotFound;
