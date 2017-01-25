// Jan Huiskes
// 10740929
// JS bestand voor de donut chart

// Globale variabele voor de donut chart
var path;

// Maak ook hier weer ruimte vrij en variabelen/tooltips voor de donut char zoals bij de barchart
var widthcirc = 400 - margin.left - margin.right;
    heightcirc = 500 - margin.top - margin.bottom;

var radius = Math.min(widthcirc, heightcirc) / 2;


var color = d3.scale.category20c()

// innerRadius een waarde geven boven 0 maakt een donut chart ipv pie
var arc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(0.5*radius);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

// Bepaalt welke waarden de ratio's vormen
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.per; });

var svg2 = d3.select("#pie").append("svg")
    .attr("width", widthcirc)
    .attr("height", heightcirc)
  .append("g")
    .attr("transform", "translate(" + widthcirc / 2 + "," + heightcirc / 2 + ")");

var legendRectSize = 18;
var legendSpacing = 4;

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d, i) {
    return "<span>" + d.value + "</span><strong>%</strong>";
  })

svg.call(tip2)

d3.json("data/dataedu.json", function(error, data) {

  // Begin met de data van Amerika in het geheel
  data = data.data.US
  color.domain(data.map(function(d) { return d.type; }));

  // donutchart maken
  path = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  // Tooltip als je hovert over een gedeelte
  path.on('mouseover', tip2.show)
  path.on('mouseout', tip2.hide)

  path.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.type); });

  // Maakt een legenda midden in de donut chart
  var legend = svg2.selectAll('.legend2')
  .data(color.domain())
  .enter()
  .append('g')
  .attr('class', 'legend2')
  .attr('transform', function(d, i) {
    var height = legendRectSize + legendSpacing;
    var offset =  height * color.domain().length / 2;
    var horz = -2 * legendRectSize;
    var vert = i * height - offset;
    return 'translate(' + horz + ',' + vert + ')';
  });

  legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', color)
  .style('stroke', color);

  legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing)
  .text(function(d) { return d; });

  // Titel
  svg2.append("text")
      .attr("class", 'Title')
      .attr("text-anchor", "middle")
      .attr("transform", "translate("+ 0 +","+ -185 +")")
      .text("Verdeling (in %) van opleidingniveau's in Amerika");
});
