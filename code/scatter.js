// Jan Huiskes
// 10740929
// JS Bestand voor de scatterplot

// Globale variabele voor scatterplot zodat deze upgedate kan worden
var scatter;

// Maak weer ruimte en variable om de scatterplot te maken
var width3 = 960 - margin.left - margin.right,
    height3 = 500 - margin.top - margin.bottom;

var x3 = d3.scale.linear()
    .range([0, width3]);

var y3 = d3.scale.linear()
    .range([height3, 0]);

var xAxis3 = d3.svg.axis()
    .scale(x3)
    .orient("bottom");

var yAxis3 = d3.svg.axis()
    .scale(y3)
    .orient("left");

var tip3 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    var string = '<strong>' + d.state + '</strong> (' + d.smart + '; ' + d.vote + ')'
    string += '<br></br>'
    string += 'Kiesmannen: ' + d.kiesman + ''
    return string
  })

svg.call(tip3)

var svg5 = d3.select("#scatter").append("svg")
    .attr("width", width3 + margin.left + margin.right)
    .attr("height", height3 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/datascatter.json", function(error, data) {

  data = data.data

  // Domein van de x en y as, hiervoor kies ik de min en max waarden en tel daar wat bij op zodat de punten goed in de plot zitten
  x3.domain([d3.min(data, function(d) { return d.smart; })-4, d3.max(data, function(d) { return d.smart; })+4]);
  y3.domain([d3.min(data, function(d) { return d.vote; })-4, d3.max(data, function(d) { return d.vote; })+4]);

  // Axes met mooie opmaak
  svg5.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height3 + ")")
      .call(xAxis3)
    .append("text")
      .attr("class", "label")
      .attr("x", width3)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Hoger opgeleid (%)");

  svg5.append("g")
      .attr("class", "y axis")
      .call(yAxis3)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Stemmen gewonnen (%)")

// Title en ondertitel
svg5.append("text")
    .attr("class", 'Titlescatter')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width/1.2) +", -10)")
    .text("Het percentage hogeropgeleiden (bachelor of hoger) tegen het percentage stemmen naar de winnaar in de staten")

svg5.append("text")
    .attr("class", 'Titlescatter2')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width/1.2) +", 5)")
    .text("(De grootte van een cirkel representeert het aantal kiesmannen en de kleur de winst van de partij in de staat)")

// Voeg de punten toe aan de plot met hover effecten en grootte op basis van de kiesmannen en kleur op basis van de winst van de partij
scatter = svg5.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")

scatter.on('mouseover', tip3.show)
      .on('mouseout', tip3.hide)
      .on('click', function(d){updateData(d.id)})
      .attr("r", function(d) { return parseFloat(d.radius); })
      .attr("cx", function(d) { return x3(d.smart); })
      .attr("cy", function(d) { return y3(d.vote); })
      .attr("fill", function(d) { return d.color; })

});
