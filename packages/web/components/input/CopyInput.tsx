import useClipboard from "react-use-clipboard";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import { Input } from ".";
import { Button } from "../button";

interface CopyInputProps {
  url: string;
}

export const CopyInput: React.FC<CopyInputProps> = ({ url }) => {
  const [isCopied, setCopied] = useClipboard(url, {
    successDuration: 1000,
  });

  return (
    <div className="flex items-center space-x-2">
      <Input color="gray" outline name="url" value={url} readOnly />
      <Button
        onClick={setCopied}
        size="medium"
        icon={<MdContentCopy className="w-5 h-5" />}
        color="black"
      >
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};
