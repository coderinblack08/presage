import { KBarResults, useMatches } from "kbar";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <button
          className={`w-full flex items-center gap-2 p-3 bg-white ${
            active ? "bg-gray-100" : ""
          }`}
        >
          <span>
            {typeof item !== "string" && item.icon ? item.icon : null}
          </span>
          <span className="text-gray-600">
            {typeof item === "string" ? item : item.name}
          </span>
        </button>
      )}
    />
  );
}
