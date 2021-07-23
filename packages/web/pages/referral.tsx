import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { fetcher } from "../lib/fetcher";
import { Referral } from "../lib/types";

const ReferralPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token;
  const referral: Referral = await fetcher(
    { queryKey: `/referrals/token/${token}` },
    context.req.cookies.jid
  );

  return {
    redirect: {
      destination: `/article/${referral.articleId}`,
      permanent: false,
    },
  };
};

export default ReferralPage;
