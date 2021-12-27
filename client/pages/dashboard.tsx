import { NextPage } from "next";
import React from "react";
import { Sidebar } from "../modules/sidebar/Sidebar";

const Dashboard: NextPage = () => {
  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
