$(document).ready(function() {
    var results = [];
    var url = "https://spreadsheets.google.com/feeds/list/1DJlGJsiLK4EZUp3MuX8iqY_eFYgwze4l8S_jNZGskCw/1/public/values?alt=json";
    
    var jqxhr = $.getJSON(url, function() {
        console.log( "success" );
	})
  	.done(function(data) {
    	console.log( "second success" );
        var entry = data.feed.entry;
 		$(entry).each(function(){
            results.push([this.gsx$program.$t, this.gsx$category.$t, this.gsx$type.$t, this.gsx$apply.$t, this.gsx$synopsis.$t,  this.gsx$window.$t, this.gsx$match.$t, this.gsx$max.$t, this.gsx$eligibilities.$t, this.gsx$link.$t]);
  		});
	    var table = $('#example').DataTable( {
    		data: results,
		    responsive: true,
        language: {
            searchPanes: {
            dataLength: false,
                clearMessage: 'Clear Selections',
                collapse: {0: 'SEARCH OPTIONS', _: 'Search Options (%d)'},
            },},
        buttons: [
            {
                extend: 'searchPanes',
                config: {
          controls: false,
          cascadePanes: true,
      threshold: 1,
      columns: [1,2,3]
                }
            }
        ],
        dom: 'Bfrtip',
       columns: [
      { title: "Program" },
	    { title: "Category" },
	    { title: "Type" },
      { title: "Who Can Apply" },
	    { title: "Description" },
            { title: "Application Window"},
            { title: "Match Requirement? (grants only)" },
            { title: "Maximum Amount" },
                        { title: "Detailed Eligibilities" },
            { title: "Link",
                "render": function ( data, type, row, meta ) {
      return '<a href="'+data+'" target=_blank >Learn More</a>';
            },
             
        }],
    	columnDefs: [
      {targets: [0],
className: 'bolded'},
      {
        targets: [2,3],
        "visible": true,
        render: function (data, type, row) {
          if (type === 'sp') {
            return data.split('; ')
          }
          return data;
        },
        searchPanes: {
          orthogonal:'sp'
        }
      }
      ]}
  	)
            new $.fn.dataTable.FixedHeader(table);
            })
  	.fail(function() {
    	console.log( "error" );
  	})
  	.always(function() {
    	console.log( "complete" );
  	});
    });
