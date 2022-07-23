import {
  IconBadge,
  IconBeach,
  IconCreditCard,
  IconListCheck,
  IconPencil,
  IconPlus,
  IconTrophy,
} from "@tabler/icons";
import { NextPage } from "next";
import { Button, ThemeIcon } from "ui";
import { DashboardLayout } from "../modules/layout/DashboardLayout";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <main className="max-w-3xl mx-auto py-20 px-5">
        <h1 className="text-3xl font-bold font-display tracking-tight">
          Getting Started
        </h1>
        <p className="text-gray-500 mt-4">
          Presage is a feature packed platform with an intuitive design. The
          getting started page is supposed to be used as a FAQ, guide, and
          reference.
        </p>
        {/* <Button
          variant="light"
          className="mt-4 inline-flex"
          as="a"
          href="#profile"
        >
          Edit profile page
        </Button> */}
        <div className="grid gap-4 grid-cols-2 mt-8">
          <div className="p-5 rounded-lg border hover:scale-105 transition col-span-1">
            <ThemeIcon className="mb-5">
              <IconPencil />
            </ThemeIcon>
            <h1 className="text-gray-700 font-bold text-lg mb-1">Write</h1>
            <p className="text-gray-500">
              Write drafts using our all-inclusive editor. Structure your
              content with folders and publications.
            </p>
          </div>
          <div className="p-5 rounded-lg border hover:scale-105 transition col-span-1">
            <ThemeIcon className="mb-5">
              <IconListCheck />
            </ThemeIcon>
            <h1 className="text-gray-700 font-bold text-lg mb-1">Publish</h1>
            <p className="text-gray-500">
              Publish your content with built-in comments, reactions, and
              sharing.
            </p>
          </div>

          <div className="p-5 rounded-lg border hover:scale-105 transition col-span-1">
            <ThemeIcon className="mb-5">
              <IconTrophy />
            </ThemeIcon>
            <h1 className="text-gray-700 font-bold text-lg mb-1">
              Reward sharing
            </h1>
            <p className="text-gray-500">
              Incentive your audience to share your content by rewarding them
              with a &quot;twitch channel points&quot; like system.
            </p>
          </div>
          <div className="p-5 rounded-lg border hover:scale-105 transition col-span-1">
            <ThemeIcon className="mb-5">
              <IconBeach />
            </ThemeIcon>
            <h1 className="text-gray-700 font-bold text-lg mb-1">
              Upgrade to Pro{" "}
              <span className="bg-yellow-200 rounded-md p-1">$12/mo</span>
            </h1>
            <p className="text-gray-500">
              Incentive your audience to share your content by rewarding them
              with a &quot;twitch channel points&quot; like system.
            </p>
          </div>

          <div className="p-5 rounded-lg border hover:scale-105 transition col-span-2">
            <ThemeIcon className="mb-5">
              <IconCreditCard />
            </ThemeIcon>
            <h1 className="text-gray-700 font-bold text-lg mb-1">
              Subscriptions
            </h1>
            <p className="text-gray-500">
              Monetize your content by adding a subscriber-only paywall for any
              of your articles.
            </p>
          </div>
        </div>
        <p className="mt-5 text-gray-500">
          Read our{" "}
          <a className="text-blue-500 underline underline-offset-2" href="#">
            getting started wiki
          </a>{" "}
          for more details.
        </p>
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
