
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
            results.push([this.gsx$program.$t, this.gsx$category.$t, this.gsx$type.$t, this.gsx$synopsis.$t, this.gsx$apply.$t, this.gsx$eligibilities.$t, this.gsx$window.$t, this.gsx$match.$t, this.gsx$max.$t, this.gsx$link.$t]);
  		});
	    var table = $('#example').DataTable( {
    		data: results,
		    responsive: true,
        dom: 'Pfrtip',
        searchPanes:{
          controls: false,
          cascadePanes: true,
      threshold: 1,
      columns: [4]
    }, 
           "order": [ 0, 'desc' ],
       columns: [
            { title: "Program" },
	    { title: "Category" },
	    { title: "Type" },
	    { title: "Description" },
	    { title: "Who Can Apply" },
            { title: "Detailed Eligibilities" },
            { title: "Application Window"},
            { title: "Match Requirement? (grants only)" },
            { title: "Maximum Amount" },
            { title: "Link",
                "render": function ( data, type, row, meta ) {
      return '<a href="'+data+'">Learn More</a>';
            },
             
        }],
    	columnDefs: [
      {
        targets: [4],
        "visible": false,
        render: function (data, type, row) {
          if (type === 'sp') {
            return data.split('; ')
          }
          return data;
        },
	{ "width": "200%", "targets": 3,4 },
        searchPanes: {
          orthogonal:'sp'
        }
      }]}
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
