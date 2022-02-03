$(document).ready(function () {
  var results = [];
  var url =
    "https://sheets.googleapis.com/v4/spreadsheets/1CS6TU1metcFNxhuWKDg7TmyPWdlffp7t-HTZbYdG5Ck/values/Sheet1?key=AIzaSyD2s4QcRqjyuXotnrwm3EIPTJCp1mX8pVo";

  $.getJSON(url, {}, function (data) {

    for (let i = 1; i < data["values"].length; i++) {
      const currRow = data["values"][i];

      var title = currRow[0];
      var year = currRow[7] || "";
      var categories = currRow[6];
      var type = currRow[5];
      var link = currRow[4];

      results.push([title, year, categories, type, link]);
    }

    var table = $("#example").DataTable({
      data: results,
      responsive: true,
      dom: "Pfrtip",
      searchPanes: {
        controls: false,
        cascadePanes: true,
        threshold: 1,
        columns: [2, 3],
      },
      order: [1, "desc"],
      columns: [
        { title: "Title" },
        { title: "Year" },
        { title: "Topic Areas" },
        { title: "Material Type" },
        {
          title: "Link",
          render: function (data, type, row, meta) {
            return '<a href="' + data + '" target=_blank >View File</a>';
          },
        },
      ],
      columnDefs: [
        {
          targets: [2],
          visible: false,
          render: function (data, type, row) {
            if (type === "sp") {
              return data.split("; ");
            }
            return data;
          },
          searchPanes: {
            orthogonal: "sp",
          },
        },
      ],
    });
    new $.fn.dataTable.FixedHeader(table);
  })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("complete");
    });
});
