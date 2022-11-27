import { useState, useMemo } from "react";
import { sortRows, filterRows, paginateRows } from "../../Utils/helpers";
import { Pagination } from "../../Components/Pagination";

export const UserListing = ({ columns, rows, onEdit, onDelete }) => {
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  const filteredRows = useMemo(
    () => filterRows(rows, filters),
    [rows, filters]
  );

  const sortedRows = useMemo(
    () => sortRows(filteredRows, sort),
    [filteredRows, sort]
  );

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const handleSearch = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order:
        prevSort.order === "asc" && prevSort.orderBy === accessor
          ? "desc"
          : "asc",
      orderBy: accessor,
    }));
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === "asc") {
                    return "⬆️";
                  }
                  return "⬇️";
                } else {
                  return "️↕️";
                }
              };
              return (
                <th key={column.accessor}>
                  <span>{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>
                    {sortIcon()}
                  </button>
                </th>
              );
            })}
            <th></th>
          </tr>
          <tr>
            {columns.map((column) => {
              return (
                <th key={`${column.accessor}-search`}>
                  <input
                    type="search"
                    placeholder={`Search ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) =>
                      handleSearch(event.target.value, column.accessor)
                    }
                  />
                </th>
              );
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  if (column.format) {
                    return (
                      <td key={column.accessor}>
                        {column.format(row[column.accessor])}
                      </td>
                    );
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
                <td>
                  <button onClick={() => onEdit(row.id)}>📝 Edit</button>
                  <button onClick={() => onDelete(row.id)}>🗑️ Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
          setRowsPerPage={setRowsPerPage}
        />
      ) : (
        <div className="pagination">
          <p>No data found</p>
        </div>
      )}
    </>
  );
};
