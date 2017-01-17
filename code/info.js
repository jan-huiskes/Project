// Make svg tag
var svg3 = d3.select("#bar").append("svg").attr("id", "chart2")


var margin = {top: 20, right: 30, bottom: 50, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    padding = 100

// Scale y
var y = d3.scale.linear()
    .range([height, margin.top / 2]);

// Scale x
var x = d3.scale.ordinal()
    .rangeRoundBands([padding / 2, (width - padding * 2)], .1);

// Make axes
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


// d3.tip for mouse events on bars
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span>Percentage: " + d.per + "</span><strong>%</strong>";
  })

// Make space fro chart
var chartinfo = d3.select("#chart2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg3.call(tip);

// Gather the JSON datas for first barchart
d3.json("data/data.json", function(error, data) {


  // Make the x and y data for barchart
  data = data.data.tot
  var scaleDatax = [ "Donald Trump", "Hillary Clinton",  "Overigen"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), parseFloat(data.Lvote), parseFloat(data.Ovote)]
  var data = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : Math.round((100 - scaleDatay[0] - scaleDatay[1])*10)/10, "col" : colors[3]}]
  x.domain(scaleDatax);
  y.domain([0, 100]);

// Make the axes with tags
chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding / 2 + ", 0)")
    .call(yAxis);

// Make the rectangle bars with mouse events
chartinfo.selectAll(".barinfo")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d) { return x(d.type); })
    .attr("y", function(d) { return y(d.per); })
    .attr("height", function(d) { return height - y(d.per); })
    .attr("width", x.rangeBand())
    .attr("class", "barinfo")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .style("fill", function(d) { return d.col; });

// Titles for axes and graph
svg3.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (padding/2) +","+(height / 2)+")rotate(-90)")
    .text("Percentage (%)");

svg3.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width/2 - padding /2) +","+ (height + padding / 1.8)+")")
    .text("Kandidaten");

svg3.append("text")
    .attr("class", 'Titleinfo')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width / 2) +","+ padding / 5 +")")
    .text("Percentage (in %) van het totaal aantal stemmen");

});
