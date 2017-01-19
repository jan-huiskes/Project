// Jan Huiskes
// 10740929


// Make svg tag
var svg3 = d3.select("#bar").append("svg").attr("id", "chart2")
var svg4 = d3.select("#barkiesman").append("svg").attr("id", "chart3")

var margin = {top: 20, right: 30, bottom: 50, left: 40},
    width2 = 700 - margin.left - margin.right,
    height2 = 400 - margin.top - margin.bottom;
    padding = 100

// Scale y
var y2 = d3.scale.linear()
    .range([height2, margin.top / 2]);

// Scale x
var x2 = d3.scale.ordinal()
    .rangeRoundBands([padding / 2, (width2 - padding * 2)], .1);

// Make axes
var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
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
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var chartkiesman = d3.select("#chart3")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


svg3.call(tip);

function round(x){
  return Math.round(x * 10)/10
}

// Gather the JSON datas for first barchart
d3.json("data/data.json", function(error, data) {


  // Make the x and y data for barchart
  data = data.data.tot
  var scaleDatax = [ "Donald Trump", "Hillary Clinton",  "Overigen"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), parseFloat(data.Ovote)]
  var data1 = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : round(100 - scaleDatay[0] - scaleDatay[1]), "col" : colors[3]}]
  x2.domain(scaleDatax);
  y2.domain([0, 100]);

// Make the axes with tags
chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding / 2 + ", 0)")
    .call(yAxis2);

// Make the rectangle bars with mouse events
chartinfo.selectAll(".barinfo")
    .data(data1)
  .enter().append("rect")
    .attr("x", function(d) { return x2(d.type); })
    .attr("y", function(d) { return y2(d.per); })
    .attr("height", function(d) { return height2 - y2(d.per); })
    .attr("width", x2.rangeBand())
    .attr("class", "barinfo")
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .style("fill", function(d) { return d.col; });

// Titles for axes and graph
svg3.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (padding/2) +","+(height2 / 2)+")rotate(-90)")
    .text("Percentage (%)");

svg3.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width2/2 - padding /2) +","+ (height2 + padding / 1.8)+")")
    .text("Kandidaten");

svg3.append("text")
    .attr("class", 'Titleinfo')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width2 / 2) +","+ padding / 5 +")")
    .text("Percentage (in %) van het totaal aantal stemmen naar de kandidaten");

    var scaleDatax = [ "Donald Trump", "Hillary Clinton",  "Overigen"]
    var scaleDatay = [(parseFloat(data.Rkiesman)/parseFloat(data.totkiesman))*100, (parseFloat(data.Dkiesman)/parseFloat(data.totkiesman))*100,  0]
    var data = [{"type" : scaleDatax[0], "per" : round(scaleDatay[0]), "col" : colors[0]},{"type" : scaleDatax[1], "per" : round(scaleDatay[1]), "col" : colors[1]},{"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[3]}]
    x2.domain(scaleDatax);
    y2.domain([0, 100]);

  // Make the axes with tags
  chartkiesman.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  chartkiesman.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding / 2 + ", 0)")
      .call(yAxis2);

  // Make the rectangle bars with mouse events
  chartkiesman.selectAll(".barinfo")
      .data(data)
    .enter().append("rect")
      .attr("x", function(d) { return x2(d.type); })
      .attr("y", function(d) { return y2(d.per); })
      .attr("height", function(d) { return height2 - y2(d.per); })
      .attr("width", x2.rangeBand())
      .attr("class", "barinfo")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .style("fill", function(d) { return d.col; });

  // Titles for axes and graph
  svg4.append("text")
      .attr("class", 'axTitle')
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (padding/2) +","+(height2 / 2)+")rotate(-90)")
      .text("Percentage (%)");

  svg4.append("text")
      .attr("class", 'axTitle')
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width2/2 - padding /2) +","+ (height2 + padding / 1.8)+")")
      .text("Kandidaten");

  svg4.append("text")
      .attr("class", 'Titleinfo')
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ (width2 / 2) +","+ padding / 5 +")")
      .text("Percentage (in %) van het totaal aantal kiesmannen naar de kandidaten");


});
