import React, { useEffect, useMemo, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import create from "zustand";
import { combine } from "zustand/middleware";
import shallow from "zustand/shallow";
import { Input } from "../../../components/input";
import { useIsMac } from "../../../lib/useIsMac";

interface JumpToProps {}

export const useJumpToHandlers = create(
  combine(
    {
      ref: null as React.RefObject<HTMLInputElement> | null,
      query: "",
    },
    (set, get) => ({
      setRef: (ref: React.RefObject<HTMLInputElement>) => set({ ref }),
      setQuery: (query: string) => set({ query }),
      handler: () => {
        const { ref } = get();
        ref?.current?.focus();
      },
    })
  )
);

export const JumpTo: React.FC<JumpToProps> = ({}) => {
  const isMac = useIsMac();
  const ref = useRef<HTMLInputElement>(null);
  const shortcut = useMemo(() => (isMac ? "⌘K" : "⌃K"), [isMac]);
  const [setRef, setQuery, query] = useJumpToHandlers(
    (x) => [x.setRef, x.setQuery, x.query],
    shallow
  );

  useEffect(() => setRef(ref), [ref]);

  return (
    <Input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      icon={<FiSearch className="w-5 h-5 text-gray-400" />}
      placeholder="Jump to..."
      shortcut={shortcut}
      ref={ref}
      outline
    />
  );
};
