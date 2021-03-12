<<<<<<< HEAD
function updateTimer() {
    future = Date.parse("dec 1, 2020 00:00:00");
    now = new Date();
    diff = future - now;

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor(diff / (1000 * 60 * 60));
    mins = Math.floor(diff / (1000 * 60));
    secs = Math.floor(diff / 1000);

    d = days;
    h = hours - days * 24;
    m = mins - hours * 60;
    s = secs - mins * 60;

    document.getElementById("timer")
        .innerHTML =
        '<div>' + d + '<span>days</span></div>' +
        '<div>' + h + '<span>hours</span></div>' +
        '<div>' + m + '<span>minutes</span></div>' +
        '<div>' + s + '<span>seconds</span></div>';
}
setInterval('updateTimer()', 1000);
=======
sets = [{
	sets : ["ENV"],
	label : "ENVIRONMENTAL HEALTH",
	size : 150
}, {
	sets : ["SOC"],
	label : "SOCIAL EQUITY",
	size : 150	
}, {
	sets : ["ECON"],
	label : "ECONOMIC PROFITABILITY",
	size : 150
}, {
	sets : ["ENV", "SOC"],
	//label : "720k",
	size : 50
}, {
	sets : ["ENV", "ECON"],
	//label : "645k",
	size : 50
}, {
	sets : ["SOC", "ECON"],
	//label : "1.09M",
	size : 50
}];

console.log(sets);
var chart = venn.VennDiagram()
                 .width(500)
                 .height(500);
console.log('1');
var div = d3.select("body")
div.datum(sets).call(chart);
console.log('1');

var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");
console.log('1');

div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 0)
console.log('1');

div.selectAll("g")
    .on("mouseover", function(d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);

        // Display a tooltip with the current size
      //  tooltip.transition().duration(400).style("opacity", .9);
      //  tooltip.text(d.size + " users");

        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 3)
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })

    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
    })

    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("stroke-width", 0)
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });
console.log('end');
>>>>>>> d898ea7bce341dd60a49ddd8bd1c62af4e2ed98f
