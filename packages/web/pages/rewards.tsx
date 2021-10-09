import { NextPage } from "next";
import React from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Button } from "../components/button";
import { Layout } from "../modules/dashboard/Layout";

const RewardsPage: NextPage = () => {
  return (
    <Layout>
      <div className="w-full">
        <nav className="px-5 pt-4 border-b">
          <div className="flex space-x-8 lg:space-x-12 max-w-5xl mx-auto w-full">
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
          <div className="mt-8">
            <div className="align-middle inline-block min-w-full w-full overflow-x-auto border border-gray-200/75 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200/75">
                <thead>
                  <tr>
                    <th scope="col" className="w-4 pl-5 pr-2">
                      <input type="checkbox" />
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Points</th>
                    <th scope="col">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tr>
                  <td className="pl-5 pr-2">
                    <input type="checkbox" />
                  </td>
                  <td>Shoutout</td>
                  <td className="truncate">
                    Get a shoutout at the top of my article the next time I post
                  </td>
                  <td>5</td>
                  <td className="flex items-center pr-0 space-x-1">
                    <Button
                      icon={<MdEdit className="text-gray-400/75 w-5 h-5" />}
                      size="small"
                      shadow={false}
                    />
                    <Button
                      icon={<MdDelete className="text-gray-400/75 w-5 h-5" />}
                      size="small"
                      shadow={false}
                    />
                  </td>
                </tr>
              </table>
              <Button
                className="w-full !rounded-none border-t"
                icon={<MdAdd className="w-6 h-6" />}
              >
                <span className="font-semibold">New Reward</span>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default RewardsPage;
