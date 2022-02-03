$(document).ready(function () {
  var results = [];
  var url =
    "https://sheets.googleapis.com/v4/spreadsheets/1DJlGJsiLK4EZUp3MuX8iqY_eFYgwze4l8S_jNZGskCw/values/Sheet1?key=AIzaSyD2s4QcRqjyuXotnrwm3EIPTJCp1mX8pVo";

  $.getJSON(url, {}, function (data) {
    for (let i = 1; i < data["values"].length; i++) {
      const currRow = data["values"][i];

      var program = currRow[0];
      var category = currRow[1];
      var type = currRow[5];
      var apply = currRow[2];
      var synopsis = currRow[8];
      var window = currRow[4];
      var match = currRow[6];
      var max = currRow[7];
      var eligibilities = currRow[3];
      var link = currRow[9];

      results.push([
        program,
        category,
        type,
        apply,
        synopsis,
        window,
        match,
        max,
        eligibilities,
        link,
      ]);
    }

    var table = $("#example").DataTable({
      data: results,
      responsive: true,
      language: {
        searchPanes: {
          dataLength: false,
          clearMessage: "Clear Selections",
          collapse: { 0: "SEARCH OPTIONS", _: "Search Options (%d)" },
        },
      },
      buttons: [
        {
          extend: "searchPanes",
          config: {
            controls: false,
            cascadePanes: true,
            threshold: 1,
            columns: [1, 2, 3],
          },
        },
      ],
      dom: "Bfrtip",
      columns: [
        { title: "Program" },
        { title: "Issue Area" },
        { title: "Funding Type" },
        { title: "Who Can Apply" },
        { title: "Description" },
        { title: "Application Window" },
        { title: "Match Requirement? (grants only)" },
        { title: "Maximum Amount" },
        { title: "Detailed Eligibilities" },
        {
          title: "Link",
          render: function (data, type, row, meta) {
            return '<a href="' + data + '" target=_blank >Learn More</a>';
          },
        },
      ],
      columnDefs: [
        { targets: [0], className: "bolded" },
        {
          targets: [2, 3],
          visible: true,
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
