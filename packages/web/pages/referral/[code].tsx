import { GetServerSideProps } from "next";
import firebaseAdmin from "firebase-admin";
import Error from "next/error";
import { admin } from "../../lib/firebase/admin";
import { verifySessionCookie } from "../../lib/firebase/verifySessionCookie";
import { Referral } from "../../types";
import to from "await-to-js";

const ReferralPage: React.FC<{ errorCode: number }> = ({ errorCode }) => {
  return <Error statusCode={errorCode} />;
};

export default ReferralPage;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { code } = query;
  const [error, token] = await to(verifySessionCookie(req));
  if (code) {
    const referral = (
      await admin.db.collection("referrals").doc(code.toString()).get()
    ).data() as Referral | undefined;
    if (referral) {
      if (
        token?.uid !== referral.userId &&
        token?.uid &&
        referral.claimCount < 20 &&
        !referral.referredUsers?.includes(token.uid)
      ) {
        const batch = admin.db.batch();
        const increment = firebaseAdmin.firestore.FieldValue.increment(1);
        const pointsRef = admin.db
          .collection("users")
          .doc(referral.userId)
          .collection("points")
          .doc(referral.authorId);
        batch.set(pointsRef, { count: increment }, { merge: true });
        const referralRef = admin.db
          .collection("referrals")
          .doc(code.toString());
        batch.update(referralRef, {
          claimCount: increment,
          referredUsers: firebaseAdmin.firestore.FieldValue.arrayUnion(
            token.uid
          ),
        });
        await batch.commit();
      }
      return {
        redirect: {
          destination: `/article/${referral.articleId}`,
          permanent: false,
        },
      };
    } else {
      return {
        props: { errorCode: "404" },
      };
    }
  }
  return {
    props: { errorCode: "422" },
  };
};
