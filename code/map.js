// Jan Huiskes
// 10740929
colors = ['#B01733',
'#1441C7',
'#FFF700',
'#02AD05'
]

d3.json("data/data.json", function(error, data) {

// make map
var map = new Datamap({element: document.getElementById('container'),
scope: 'usa',
geographyConfig: {
  // pop up with name and population, if there is data, else unknown population
 popupTemplate: function(geography, data) {
string = '<div class="hoverinfo">'
string += '<strong>' + geography.properties.name + '</strong>'
string += '<br></br>'
if (data.kiesman != null){
  string += 'Kiesmannen: ' + data.kiesman
}
else {
  string += 'Kiesmannen democratic: ' + data.Dkiesman
  string += '<br></br>'
  string += 'Kiesmannen republican: ' + data.Rkiesman
}
string += '</div> '
   return string },
},

fills: {
  'republican': colors[0], // > 10^9
  'democrat': colors[1], // > 10^8 and < 10^9
  'libertarian': colors[2], // > 6*10^7  and < 10^8
  'other': colors[3],
  defaultFill: colors[1]
},
// data
data : data.data,

done: function(datamap) {
       datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           updateData(geography.id)

       });
    }
})
});

// Gather the JSON datas for dropDown
d3.json("data/data2.json", function(error, data) {

  // Make drop down menu with the right options
  var dropDown = d3.select("body").append("div")
                      .attr("class", "drop")
                      .append("select").on("change", function() {updateData(this.value)})
                      .attr("name", "country-list")

  var options = dropDown.selectAll("option")
             .data(data.data)
           .enter()
             .append("option");

  options.text(function (d) {return d.state})
        .attr("value", function (d) { return d.id; })
});

// Make svg tag
var svg = d3.select("body").append("svg").attr("class", "chart")

var margin = {top: 20, right: 30, bottom: 50, left: 40},
    width = 960 - margin.left - margin.right,
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
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);

// Gather the JSON datas for first barchart
d3.json("data/data.json", function(error, data) {


  // Make the x and y data for barchart
  data = data.data.tot
  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Garry Johnson", "Other"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), parseFloat(data.Lvote), parseFloat(data.Ovote)]
  var data = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[2]}, {"type" : scaleDatax[3], "per" : scaleDatay[3], "col" : colors[3]}]
  x.domain(scaleDatax);
  y.domain([0, 100]);

// Make the axes with tags
chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

chart.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding / 2 + ", 0)")
    .call(yAxis);

// Make the rectangle bars with mouse events
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
    .style("fill", function(d) { return d.col; });

// Titles for axes and graph
svg.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (padding/2) +","+(height / 2)+")rotate(-90)")
    .text("Percentage (%)");

svg.append("text")
    .attr("class", 'axTitle')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width/2 - padding /2) +","+ (height + padding / 1.8)+")")
    .text("Candidates");

svg.append("text")
    .attr("class", 'Title')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width / 2) +","+ padding / 5 +")")
    .text("Percentage (in %) of total votes to candidates");


// Sources and whitespace
// d3.select("body").append("br")
// d3.select("body").append("a").attr("href", "http://data.worldbank.org/indicator/SP.POP.TOTL").html("Bron voor data")
// d3.select("body").append("br")
// d3.select("body").append("p").html('Jan Huiskes 10740929');


});

// When clicked or chosen from drop down menu, change barchart
function updateData(id) {

d3.json("data/data.json", function(error, data) {

  // Remove stuff that needs to be changed
  d3.selectAll(".Title").remove();
  d3.selectAll(".bar").remove();
  d3.selectAll("#unknown-text").remove();

  data = data.data[id]
  name = data.state

  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Garry Johnson", "Other"]
  var scaleDatay = [parseFloat(data.Rvote), parseFloat(data.Dvote), parseFloat(data.Lvote), parseFloat(data.Ovote)]
  var data = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[2]}, {"type" : scaleDatax[3], "per" : scaleDatay[3], "col" : colors[3]}]



      // Make the rectangle bars with mouse events and fading
      var bar = chart.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.type); })
          .attr("y", function(d) { return y(d.per); })
          .attr("height", function(d) { return height - y(d.per); })
          .attr("width", x.rangeBand())
          .attr("opacity", 0)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .style("fill", function(d) { return d.col; });

      bar.transition().duration(2000).attr("opacity", 1)




  // Change title with fading
  var title = svg.append("text")
      .attr("class", 'Title')
      .attr("text-anchor", "middle")
      .attr("opacity", 0)
      .attr("transform", "translate("+ (width / 2) +","+ padding / 5 +")")
      .text("Percentage (in %) of votes in " + name);

      title.transition().duration(2000).attr("opacity", 1)
});
};
