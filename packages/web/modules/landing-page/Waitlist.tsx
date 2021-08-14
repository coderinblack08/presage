import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../../components/primatives/Button";
import { Input } from "../../components/primatives/Input";

interface WaitlistProps {}

const notify = () => toast.success("Success! Thanks for joining the Waitlist.");

export const Waitlist: React.FC<WaitlistProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex items-center space-x-3 max-w-lg lg:max-w-xl w-full mt-6"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/waitlist", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        setLoading(false);
        notify();
        setEmail("");
      }}
    >
      <Input
        placeholder="Email Address"
        type="email"
        className="w-full"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <Button
        size="medium"
        color="black"
        type="submit"
        className="flex-shrink-0"
        loading={loading}
      >
        Join Waitlist
      </Button>
    </form>
  );
};
