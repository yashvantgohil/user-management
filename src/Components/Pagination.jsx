import { rowsPerPageOptions } from "../Utils/users";

export const Pagination = ({
  activePage,
  count,
  rowsPerPage,
  totalPages,
  setActivePage,
  setRowsPerPage,
}) => {
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="pagination">
        <div>
          <button
            disabled={activePage === 1}
            onClick={() => setActivePage(activePage - 1)}
          >
            ⬅️ Previous
          </button>
          <button
            disabled={activePage === totalPages}
            onClick={() => setActivePage(activePage + 1)}
          >
            Next ➡️
          </button>
          <button disabled>
            Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
          </button>
        </div>
        <div>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(+e.target.value)}
          >
            {rowsPerPageOptions.map((nRow, index) => (
              <option value={nRow} key={index}>{`${nRow} / Page`}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
