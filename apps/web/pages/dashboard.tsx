import { NextPage } from "next";
import React from "react";
import { SideNav } from "../modules/dashboard/SideNav";

const Dashboard: NextPage = () => {
  return (
    <div className="flex">
      <SideNav />
      <main className="w-full h-screen"></main>
    </div>
  );
};

export default Dashboard;
