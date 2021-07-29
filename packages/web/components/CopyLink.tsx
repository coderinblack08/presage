import useClipboard from "react-use-clipboard";
import React from "react";
import { MdContentCopy } from "react-icons/md";
import { Button } from "./Button";
import { Input } from "./Input";

interface CopyLinkProps {
  url: string;
}

export const CopyLink: React.FC<CopyLinkProps> = ({ url }) => {
  const [isCopied, setCopied] = useClipboard(url, {
    successDuration: 1000,
  });

  return (
    <div className="flex items-center space-x-2">
      <Input color="gray" name="url" value={url} readOnly />
      <Button onClick={setCopied} icon={<MdContentCopy className="w-5 h-5" />}>
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};
