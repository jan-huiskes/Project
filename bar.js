// Jan Huiskes
// 10740929
// JS bestand voor de barchart in de resultaten sectie


// Zie info.js voor commentaar (is exact hetzelfde)
var svg = d3.select("#bar2").append("svg").attr("class", "chart")

var margin = {top: 20, right: 30, bottom: 50, left: 40},
    width = 580 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var y = d3.scale.linear()
    .range([height, margin.top / 2]);

var x = d3.scale.ordinal()
    .rangeRoundBands([padding / 2, (width - padding * 2)], .1);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span>" + d.per + "</span><strong>%</strong>";
  })

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

d3.json("data/data.json", function(error, data) {


  data = data.data.US
  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Overigen"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), round(parseFloat(data.Lvote) + parseFloat(data.Ovote))]
  var data = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]}, {"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[3]}]
  x.domain(scaleDatax);
  y.domain([0, 100]);

chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding / 2 + ", 0)")
    .call(yAxis);

chart.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("x", function(d) { return x(d.type); })
    .attr("y", function(d) { return y(d.per); })
    .attr("height", function(d) { return height - y(d.per); })
    .attr("width", x.rangeBand())
    .attr("class", "bar")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .style("fill", function(d) { return d.col; })
    .attr("stroke", function(d) { return d.col; })
    .style("stroke-width", 2);

svg.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (padding/2) +","+(height / 2)+")rotate(-90)")
    .text("Percentage (%)");

svg.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width/2 - padding /2) +","+ (height + padding / 1.8)+")")
    .text("Kandidaten");

svg.append("text")
    .attr("class", 'Title')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width / 2.2) +","+ padding / 5 +")")
    .text("Verdeling (in %) van stemmen in Amerika (538 kiesmannen)");

});
