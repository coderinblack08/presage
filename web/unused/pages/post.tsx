import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Layout from "../components/Layout";

const Post: React.FC = () => {
  return (
    <Layout>
      <h4>Post Message</h4>
      <p className="text-gray mt-1">
        Fill out the following fields to post your message
      </p>
      <form className="grid gap-4 mt-8">
        <div className="space-y-1">
          <Input className="h-32" placeholder="Message Body" textarea />
          <div className="flex items-center justify-between">
            <p className="text-gray">0/500 character limit</p>
            <div className="flex items-center space-x-2.5">
              <button>
                <PhotographIcon className="w-6 h-6 text-faint-primary" />
              </button>
              <button>
                <EmojiHappyIcon className="w-6 h-6 text-faint-primary" />
              </button>
            </div>
          </div>
        </div>
        <Button>Send Message</Button>
      </form>
    </Layout>
  );
};

export default Post;
