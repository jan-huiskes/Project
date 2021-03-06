// Jan Huiskes
// 10740929
// JS bestand voor de barcharts in  het informatie gedeeelte van de webpagina. Dit zijn twee barcharts, een over de totale stemmen
// en de ander over de kiesmannen
// bron: https://bost.ocks.org/mike/bar/3/

// Algemene kleuren voor de visualisaties
var colors = ['#B01733',
'#1441C7',
'#FFF700',
'#A9A9A9',
'#E0E084'
]

// Maak svg tag
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

// Maak axes
var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");


// d3.tip voor muis events op de bars
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<span>" + d.per + "</span><strong>%</strong>";
  })

// Maak ruimte voor de barcharts
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

// functie die een getal op 1 decimal afrondt
function round(x){
  return Math.round(x * 10)/10
}

d3.json("data/data.json", function(error, data) {

  // x en y data voor de barchart klaarmaken
  data = data.data.US
  var scaleDatax = [ "Donald Trump", "Hillary Clinton",  "Overigen"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), parseFloat(data.Ovote)]
  var data1 = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : round(100 - scaleDatay[0] - scaleDatay[1]), "col" : colors[3]}]
  x2.domain(scaleDatax);
  y2.domain([0, 100]);

// Maak de axes
chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height2 + ")")
    .call(xAxis2);

chartinfo.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding / 2 + ", 0)")
    .call(yAxis2);

// Maak de bars in de barchart met muis events
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
    .style("fill", function(d) { return d.col; })
    .attr("stroke", function(d) { return d.col; })
    .style("stroke-width", 2);

// Titels
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
    .text("Verdeling (in %) van het totaal aantal stemmen");

    // Zelfde voor de tweede barchart
    var scaleDatax = [ "Donald Trump", "Hillary Clinton",  "Overigen"]
    var scaleDatay = [(parseFloat(data.Rkiesman)/parseFloat(data.totkiesman))*100, (parseFloat(data.Dkiesman)/parseFloat(data.totkiesman))*100,  0]
    var data = [{"type" : scaleDatax[0], "per" : round(scaleDatay[0]), "col" : colors[0]},{"type" : scaleDatax[1], "per" : round(scaleDatay[1]), "col" : colors[1]},{"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[3]}]
    x2.domain(scaleDatax);
    y2.domain([0, 100]);

  chartkiesman.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  chartkiesman.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(" + padding / 2 + ", 0)")
      .call(yAxis2);

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
      .style("fill", function(d) { return d.col; })
      .attr("stroke", function(d) { return d.col; })
      .style("stroke-width", 2);

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
      .text("Verdeling (in %) van de totaal 538 kiesmannen");


});
