import { Button, Input } from "ui";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface WaitlistProps {}

const notify = () => toast.success("Success! Thanks for joining the Waitlist.");

export const Waitlist: React.FC<WaitlistProps> = ({}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 max-w-xl w-full mt-4 sm:mt-6"
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
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <Button
        size="md"
        type="submit"
        className="w-full sm:w-auto flex-shrink-0"
        loading={loading}
      >
        Join Waitlist
      </Button>
    </form>
  );
};
