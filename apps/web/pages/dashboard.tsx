import { NextPage } from "next";
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
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;
