export const userTableColumns = [
  {
    accessor: "name",
    label: "Name",
  },
  {
    accessor: "phone",
    label: "Phone",
  },
  {
    accessor: "newsletter",
    label: "Newsletter",
    format: (value) => (value ? "✔️" : "✖️"),
  },
  {
    accessor: "gender",
    label: "Gender",
    format: (value) => (value === "male" ? "M" : "F"),
  },
];

export const rowsPerPageOptions = [5, 10, 15];
