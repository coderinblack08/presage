import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import React from "react";
import { MdAdd } from "react-icons/md";
import { Button } from "../../components/button";
import { createUrqlClient } from "../../lib/createUrqlClient";
import { Layout } from "../../modules/dashboard/Layout";
import { ResponsiveSidebar } from "../../modules/dashboard/sidebar/ResponsiveSidebar";

const RewardDashboard: NextPage = () => {
  return (
    <Layout>
      <nav className="px-5 pt-4 border-b">
        <div className="flex space-x-8 lg:space-x-12 max-w-5xl mx-auto w-full">
          <ResponsiveSidebar mobile />
          <a className="font-bold border-b-2 border-gray-600 pb-3">Claimed</a>
          <a className="text-gray-500">Created</a>
        </div>
      </nav>
      <main className="px-5 py-16 max-w-5xl w-full mx-auto">
        <h1 className="text-2xl font-bold">Manage Rewards</h1>
        <p className="text-gray-500 mt-1">
          Select from a variety of reward presets and customize them to your
          liking.
        </p>
        <div className="align-middle inline-block min-w-full">
          <table className="mt-8">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th>Description</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tr>
              <td>
                <span className="font-semibold text-gray-900">Shoutout</span>
              </td>
              <td className="truncate max-w-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                quasi ipsa veritatis facilis ad dolorum distinctio fugit ducimus
                natus unde, qui minus, voluptates beatae quibusdam provident
                eveniet, ea voluptate earum!
              </td>
              <td>5</td>
              <td>78</td>
            </tr>
          </table>
        </div>
        <Button className="mt-6" icon={<MdAdd className="w-5 h-5" />} outline>
          Add Reward
        </Button>
      </main>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(RewardDashboard);
