import { useEffect, useRef, useState } from "react";
import { SplitterProps } from "react-resizable-layout";

export const cn = (...args: any[]) => args.filter(Boolean).join(" ");

const SampleSplitter: React.FC<SplitterProps & { isDragging: boolean }> = ({
  dir,
  isDragging,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const splitterRef = useRef<HTMLDivElement>(null);

  return (
    <div
      tabIndex={0}
      ref={splitterRef}
      className={cn(
        "sticky top-0 focus:outline-none flex-shrink-0 w-3 -ml-3 z-50 h-screen border-r bg-transparent border-gray-200 dark:border-gray-800 cursor-col-resize hover:border-r-4 hover:border-blue-400",
        (isDragging || isFocused) && "border-blue-400 border-r-4"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default SampleSplitter;
