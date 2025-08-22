import { Check, Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useState } from "react";

type CopyButtonProps = {
  getContent: () => string;
};

export function CopyButton({ getContent }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(getContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={copyToClipboard}
          size="icon"
          variant="ghost"
          className="absolute right-8 top-2 w-6 h-6"
        >
          {copied ? <Check /> : <Clipboard />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {copied ? "Copied!" : "Copy to clipboard"}
      </TooltipContent>
    </Tooltip>
  );
}
