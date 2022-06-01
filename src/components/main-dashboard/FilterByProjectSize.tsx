import { Action, State } from "../../App";

interface FilterByProjectSizeProps {
  filters: State["filters"];
  dispatch: React.Dispatch<Action>;
}

type SizeClassType = "min" | "max";

export function FilterByProjectSize({
  filters,
  dispatch,
}: FilterByProjectSizeProps): JSX.Element {
  function handleProjectSize(input: string, sizeClass: SizeClassType) {
    if (sizeClass === "min") {
      if (input === "") {
        dispatch({
          type: "set-filters",
          results: {
            ...filters,
            projectSize: { ...filters.projectSize, min: null },
          },
        });
      } else {
        dispatch({
          type: "set-filters",
          results: {
            ...filters,
            projectSize: { ...filters.projectSize, min: input },
          },
        });
      }
    } else if (sizeClass === "max") {
      if (input === "") {
        dispatch({
          type: "set-filters",
          results: {
            ...filters,
            projectSize: { ...filters.projectSize, max: null },
          },
        });
      } else {
        dispatch({
          type: "set-filters",
          results: {
            ...filters,
            projectSize: { ...filters.projectSize, max: input },
          },
        });
      }
    }
  }

  return (
    <>
      {!filters.projectSize.max ? (
        <input
          className="filterInput"
          value={filters.projectSize.min ? filters.projectSize.min : ""}
          type="number"
          placeholder="Project Size Greater Than..."
          onChange={(e) => handleProjectSize(e.target.value, "min")}
        />
      ) : (
        <input
          className="filterInputDisabled"
          value={filters.projectSize.min ? filters.projectSize.min : ""}
          type="number"
          disabled
          placeholder="Project Size Greater Than..."
          onChange={(e) => handleProjectSize(e.target.value, "min")}
        />
      )}
      {!filters.projectSize.min ? (
        <input
          className="filterInput"
          value={filters.projectSize.max ? filters.projectSize.max : ""}
          type="number"
          placeholder="Project Size Smaller Than..."
          onChange={(e) => handleProjectSize(e.target.value, "max")}
        />
      ) : (
        <input
          className="filterInputDisabled"
          value={filters.projectSize.max ? filters.projectSize.max : ""}
          type="number"
          disabled
          placeholder="Project Size Smaller Than..."
          onChange={(e) => handleProjectSize(e.target.value, "max")}
        />
      )}
    </>
  );
}
