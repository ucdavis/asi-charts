
$(document).ready(function() {
    var results = [];
    var url = "https://sheets.googleapis.com/v4/spreadsheets/1CS6TU1metcFNxhuWKDg7TmyPWdlffp7t-HTZbYdG5Ck/values/Sheet1?key=AIzaSyD2s4QcRqjyuXotnrwm3EIPTJCp1mX8pVo";
    
    var jqxhr = $.getJSON(url, function() {
        console.log( "success" );
	})
  	.done(function(data) {
    	console.log( "second success" );
        var entry = data.feed.entry;
 		$(entry).each(function(){
            results.push([this.gsx$title.$t , this.gsx$year.$t, this.gsx$categories.$t, this.gsx$type.$t, this.gsx$link.$t]);
  		});
	    var table = $('#example').DataTable( {
    		data: results,
		    responsive: true,
        dom: 'Pfrtip',
        searchPanes:{
          controls: false,
          cascadePanes: true,
      threshold: 1,
      columns: [2,3]
    }, 
           "order": [ 1, 'desc' ],
        columns: [
            { title: "Title" },
            { title: "Year" },
            { title: "Topic Areas"},
            { title: "Material Type" },
						{ title: "Link",
                "render": function ( data, type, row, meta ) {
      return '<a href="'+data+'" target=_blank >View File</a>';
            },
             
        }],
    	columnDefs: [
      {
        targets: [2],
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
