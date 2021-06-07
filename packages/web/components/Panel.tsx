import React from "react";

interface PanelProps {
  footer?: string;
  header: string;
}

export const Panel: React.FC<PanelProps> = ({ children, footer, header }) => {
  return (
    <article className="w-full divide-y divide-gray-700 rounded-xl overflow-hidden">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <h6 className="font-bold font-sans">{header}</h6>
      </header>
      {children}
      {footer && (
        <footer>
          <a href="#" className="block text-primary px-4 py-3 bg-gray-800">
            {footer}
          </a>
        </footer>
      )}
    </article>
  );
};
