import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { UMAMI_CONFIG, UMAMI_URL } from "../lib/constants";
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
  // await fetch(`${UMAMI_URL}/api/collect`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     type: "event",
  //     payload: {
  //       ...UMAMI_CONFIG,
  //       url: `/referral?token=${token}`,
  //       event_type: "referred",
  //       event_value: `User was referred to article ${referral.articleId}`,
  //     },
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  return {
    redirect: {
      destination: `/article/${referral.articleId}?referred=true`,
      permanent: false,
    },
  };
};

export default ReferralPage;
