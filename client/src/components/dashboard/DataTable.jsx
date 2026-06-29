function DataTable({ title, columns, data }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">

      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100">

              {columns.map((column) => (
                <th
                  key={column}
                  className="text-left p-3 border"
                >
                  {column}
                </th>
              ))}

            </tr>
          </thead>

          <tbody>

            {data.map((row, index) => (
              <tr key={index}>

                {columns.map((column, i) => (
                  <td
                    key={i}
                    className="p-3 border"
                  >
                    {row[column]}
                  </td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DataTable;