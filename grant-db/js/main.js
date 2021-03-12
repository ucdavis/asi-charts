
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
            results.push([this.gsx$program.$t,this.gsx$category.$t, this.gsx$apply.$t, this.gsx$eligibilities.$t, this.gsx$window.$t, this.gsx$type.$t, this.gsx$match.$t, this.gsx$max.$t, this.gsx$match.$synopsis, this.gsx$link.$t]);
  		});
	    var table = $('#example').DataTable( {
    		data: results,
		    responsive: true,
        dom: 'Pfrtip',
        searchPanes:{
          controls: false,
          cascadePanes: true,
      threshold: 1,
      columns: [2,8]
    }, 
           "order": [ 1, 'desc' ],
       columns: [
            { title: "Program" },
	    { title: "Category" },
            { title: "Who Can Apply" },
            { title: "Detailed Eligibilities" },
            { title: "Application Window"},
            { title: "Type" },
            { title: "Match Requirement (grants only)" },
            { title: "Maximum Amount" },
	    { title: "Description" },
	{ title: "Link",
                "render": function ( data, type, row, meta ) {
      return '<a href="'+data+'">Learn More</a>';
            },
             
        }],
    	columnDefs: [
      {
        targets: [8],
        "visible": false,
        render: function (data, type, row) {
          if (type === 'sp') {
            return data.split('; ')
          }
          return data;
        },
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
