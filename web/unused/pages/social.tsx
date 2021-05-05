import { UploadIcon } from "@heroicons/react/outline";
import { HeartIcon, ReplyIcon } from "@heroicons/react/solid";
import React from "react";
import Layout from "../../layout/Layout";

const Social: React.FC = () => {
  return (
    <Layout>
      <div className="flex items-end space-x-2">
        <h4>
          Your Home{" "}
          <span className="text-gray">
            — Based on your followers, topics, and likes
          </span>
        </h4>
      </div>
      <div className="mt-12">
        <div className="flex items-start space-x-4">
          <img
            className="w-12 h-12 rounded-full"
            src="https://assets.fontsinuse.com/static/use-media-items/28/27012/full-1400x1400/5670256f/cnn-logo-square.png"
          />
          <div>
            <p className="font-bold text-lg text-lighter-gray">CNN</p>
            <p className="inline text-light-gray">@cnn · </p>
            <time className="inline text-gray">April 29</time>
          </div>
        </div>
        <p className="mt-3.5">Facts don't care about your feelings. #memes</p>
        <div className="flex items-center space-x-6 mt-3.5 text-gray">
          <button className="flex items-center">
            <HeartIcon className="w-6 h-6 mr-2" />
            <p>12 Likes</p>
          </button>
          <div className="flex items-center">
            <ReplyIcon className="w-6 h-6 mr-2" />
            <p>8 Replies</p>
          </div>
          <button>
            <UploadIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Social;
