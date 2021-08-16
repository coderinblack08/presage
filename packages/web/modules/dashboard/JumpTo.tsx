import React, { useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { Input } from "../../components/input";
import { useIsMac } from "../../lib/useIsMac";
import create from "zustand";
import { combine } from "zustand/middleware";
import { useRef } from "react";
import { useEffect } from "react";

interface JumpToProps {}

export const useJumpToHandlers = create(
  combine(
    {
      ref: null as React.RefObject<HTMLInputElement> | null,
    },
    (set, get) => ({
      setRef: (ref: React.RefObject<HTMLInputElement>) => set({ ref }),
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

  useEffect(() => {
    useJumpToHandlers.getState().setRef(ref);
  }, [ref]);

  return (
    <Input
      icon={<FiSearch className="w-5 h-5 text-gray-400" />}
      placeholder="Jump to..."
      shortcut={shortcut}
      ref={ref}
      outline
    />
  );
};
