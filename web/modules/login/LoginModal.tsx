import { Dialog } from "@headlessui/react";
import firebase from "firebase/app";
import "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { useProfileModalStore } from "./ProfileModal";

interface LoginModalProps {}

export const LoginModal: React.FC<LoginModalProps> = ({}) => {
  const auth = firebase.auth();
  const [open, setOpen] = useState(false);
  const [setProfileModalOpen, setDefaultValues] = useProfileModalStore(
    (x: any) => [x.setOpen, x.setDefaultValues]
  );

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        Login
      </Button>
      <Modal setOpen={setOpen} open={open} className="py-10 px-8 max-w-xl">
        <Dialog.Title as="h4" className="text-xl font-bold">
          Sign in to Presage
        </Dialog.Title>
        <div className="mt-4 mb-2">
          <Button
            className="w-full"
            color="secondary"
            icon={<FaGoogle />}
            onClick={async () => {
              const provider = new firebase.auth.GoogleAuthProvider();
              provider.addScope(
                "https://www.googleapis.com/auth/userinfo.email"
              );
              try {
                const { user, additionalUserInfo } = await auth.signInWithPopup(
                  provider
                );
                setOpen(false);
                if (additionalUserInfo.isNewUser) {
                  await firebase
                    .firestore()
                    .collection("users")
                    .doc(user.uid)
                    .set({
                      uid: user.uid,
                      displayName: user.displayName,
                      createdAt:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    });
                  // setProfileModalOpen(true);
                  // setDefaultValues({ displayName: user.displayName });
                }
              } catch (error) {
                console.error(error);
              }
            }}
          >
            Continue with Google
          </Button>
        </div>
        <p className="small text-gray">
          By logging in, you agree to the{" "}
          <a className="small link">Terms of Service</a>.
        </p>
      </Modal>
    </>
  );
};
