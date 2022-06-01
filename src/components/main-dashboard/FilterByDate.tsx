import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Action, State } from "../../App";

interface FilterByDateProps {
  filters: State["filters"];
  dispatch: React.Dispatch<Action>;
}

type DateClass = "startBefore" | "startAfter" | "endBefore" | "endAfter";

export function FilterByDate({
  filters,
  dispatch,
}: FilterByDateProps): JSX.Element {
  function handleDate(date: Date, dateClass: DateClass) {
    const formattedDate = date.toString().substring(0, 15);
    if (dateClass === "startBefore") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, startBefore: formattedDate },
        },
      });
    } else if (dateClass === "startAfter") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, startAfter: formattedDate },
        },
      });
    } else if (dateClass === "endBefore") {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, endBefore: formattedDate },
        },
      });
    } else {
      dispatch({
        type: "set-filters",
        results: {
          ...filters,
          timeFrame: { ...filters.timeFrame, endAfter: formattedDate },
        },
      });
    }
  }

  //conditional rendering of datepickers depending on whether their opposite has been activated
  return (
    <>
      {!filters.timeFrame.startAfter ? (
        <DatePicker
          className="filterInput"
          value={
            filters.timeFrame.startBefore ? filters.timeFrame.startBefore : ""
          }
          placeholderText="Projects Started Before"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startBefore");
          }}
        ></DatePicker>
      ) : (
        <DatePicker
          className="filterInputDisabled"
          value={
            filters.timeFrame.startBefore ? filters.timeFrame.startBefore : ""
          }
          placeholderText="Projects Started Before"
          peekNextMonth
          showMonthDropdown
          disabled
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startBefore");
          }}
        ></DatePicker>
      )}
      {!filters.timeFrame.startBefore ? (
        <DatePicker
          className="filterInput"
          value={
            filters.timeFrame.startAfter ? filters.timeFrame.startAfter : ""
          }
          placeholderText="Projects Started After"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startAfter");
          }}
        ></DatePicker>
      ) : (
        <DatePicker
          className="filterInputDisabled"
          value={
            filters.timeFrame.startAfter ? filters.timeFrame.startAfter : ""
          }
          placeholderText="Projects Started After"
          peekNextMonth
          showMonthDropdown
          disabled
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "startAfter");
          }}
        ></DatePicker>
      )}
      {!filters.timeFrame.endAfter ? (
        <DatePicker
          className="filterInput"
          value={filters.timeFrame.endBefore ? filters.timeFrame.endBefore : ""}
          placeholderText="Projects Completed Before"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endBefore");
          }}
        ></DatePicker>
      ) : (
        <DatePicker
          className="filterInputDisabled"
          value={filters.timeFrame.endBefore ? filters.timeFrame.endBefore : ""}
          placeholderText="Projects Completed Before"
          peekNextMonth
          showMonthDropdown
          disabled
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endBefore");
          }}
        ></DatePicker>
      )}
      {!filters.timeFrame.endBefore ? (
        <DatePicker
          className="filterInput"
          value={filters.timeFrame.endAfter ? filters.timeFrame.endAfter : ""}
          placeholderText="Projects Completed After"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endAfter");
          }}
        ></DatePicker>
      ) : (
        <DatePicker
          className="filterInputDisabled"
          value={filters.timeFrame.endAfter ? filters.timeFrame.endAfter : ""}
          placeholderText="Projects Completed After"
          peekNextMonth
          showMonthDropdown
          disabled
          showYearDropdown
          dropdownMode="select"
          onChange={(date) => {
            date && handleDate(date, "endAfter");
          }}
        ></DatePicker>
      )}
    </>
  );
}
