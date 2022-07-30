import { KBarResults, useMatches } from "kbar";

export function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => (
        <button
          className={`w-full rounded-lg transition flex items-center gap-3 p-3 bg-white ${
            active ? "bg-gray-100" : ""
          }`}
        >
          <span
            className={`${
              active ? "text-gray-400" : "text-gray-300"
            } transition`}
          >
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
