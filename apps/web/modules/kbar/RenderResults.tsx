import { KBarResults, useMatches } from "kbar";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <button
          className={`w-full rounded-lg transition flex items-center gap-3 p-3 ${
            active ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
        >
          <span
            className={`${
              active
                ? "text-gray-400 dark:text-gray-600"
                : "text-gray-300 dark:text-gray-700"
            } transition`}
          >
            {typeof item !== "string" && item.icon ? item.icon : null}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {typeof item === "string" ? item : item.name}
          </span>
        </button>
      )}
    />
  );
}
