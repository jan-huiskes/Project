// Jan Huiskes
// 10740929
colors = ['#B01733',
'#1441C7',
'#FFF700',
'#02AD05',
'#E0E084'
]

// smooth scrolling
$(document).on('click', 'a', function(event){
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
});

var USmap;


d3.json("data/data.json", function(error, data) {
  d3.json("data/datalabel.json", function(error, data1) {

// make map
USmap = new Datamap({element: document.getElementById('container2'),
scope: 'usa',
geographyConfig: {
  // pop up with name and population, if there is data, else unknown population
 popupTemplate: function(geography, data) {
string = '<div class="hoverinfo">'
string += '<strong>' + geography.properties.name + '</strong>'
string += '</div> '
   return string },
},

fills: {
  'republican': colors[0],
  'democrat': colors[1],
  'libertarian': colors[2],
  'other': colors[3],
  'tot' : colors[1],
  defaultFill: 'black'
},
// data
data : data.data,

done: function(datamap) {
       datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
           updateData(geography.id)

       });
    }
})

  USmap.labels({'customLabelText': data1.data});

});
});

var check = 0
function change() {
  if (check == 0 ){
      d3.json("data/databubble.json", function(error, data2) {
USmap.bubbles(data2.data, {
  popupTemplate: function(geo, data) {
    string = '<div class="hoverinfo">'
    string += '<strong>' + data.state + '</strong>'
    string += '<br></br>'
    string += 'Kiesmannen: ' + data.kiesman + ''
    string += '</div> '
    return string
  }});
  d3.selectAll(".datamaps-bubble").on('click', function(bubble, i) {
      updateData(data2.data[i].centered);
  })
check = 1

})
}
else {
  USmap.bubbles([])
  check = 0
}
}

// Gather the JSON datas for dropDown
d3.json("data/datadrop.json", function(error, data) {

  // Make drop down menu with the right options
  var dropDown = d3.select(".drop")
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
var svg = d3.select("#bar2").append("svg").attr("class", "chart")

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
  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Garry Johnson", "Overigen"]
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
    .text("Kandidaten");

svg.append("text")
    .attr("class", 'Title')
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (width / 2) +","+ padding / 5 +")")
    .text("Percentage (in %) van het totaal aantal stemmen");

});

var radius = Math.min(width, height) / 2;

var color = d3.scale.category20b()

var arc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(0.5*radius);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.per; });

var svg2 = d3.select("#pie").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var legendRectSize = 18;
var legendSpacing = 4;

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d, i) {
    return "<span>Percentage: " + d.value + "</span><strong>%</strong>";
  })

svg.call(tip2)

d3.json("data/dataedu.json", function(error, data) {
  data = data.data.US
  color.domain(data.map(function(d) { return d.type; }));


  var piechart = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  piechart.on('mouseover', tip2.show)
  piechart.on('mouseout', tip2.hide)

  piechart.append("path")
      .attr("d", arc)
      .style("fill", function(d) {return color(d.data.type); });


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

      svg2.append("text")
          .attr("class", 'Title')
          .attr("text-anchor", "middle")
          .attr("transform", "translate("+ 0 +","+ -185 +")")
          .text("Percentage (in %) verdeling opleidingen in Amerika");
});

// When clicked or chosen from drop down menu, change barchart
function updateData(id) {

d3.json("data/data.json", function(error, data) {

  // Remove stuff that needs to be changed
  d3.selectAll(".arc").remove();
  d3.selectAll(".Title").remove();
  d3.selectAll(".bar").remove();


  data = data.data[id]
  name = data.state
  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Garry Johnson", "Overigen"]
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
      .text("Percentage (in %) stemmen in " + name);

      title.transition().duration(2000).attr("opacity", 1)
});

d3.json("data/dataedu.json", function(error, data) {
  data = data.data[id]

  var piechart = svg2.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

    piechart.on('mouseover', tip2.show)
    piechart.on('mouseout', tip2.hide)

  piechart.append("path")
      .attr("d", arc)
      .style("fill", function(d) {return color(d.data.type); });

      svg2.append("text")
          .attr("class", 'Title')
          .attr("text-anchor", "middle")
          .attr("transform", "translate("+ 0 +","+ -185 +")")
          .text("Percentage (in %) verdeling opleidingen in " + name);

});

};
