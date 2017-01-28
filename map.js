// Jan Huiskes
// 10740929
// JS bestand voor de map en dropdown menu


var USmap;
var clickedstate;
var options;


d3.json("data/data.json", function(error, data) {
  // Tweede dataset voor labels
  d3.json("data/datalabel.json", function(error, data1) {

USmap = new Datamap({element: document.getElementById('container2'),
scope: 'usa',
geographyConfig: {
  borderColor: '#A9A9A9',
      highlightBorderColor: '#bada55',
  // Pop up als men over een land hovert
 popupTemplate: function(geography, data) {

string = '<div class="hoverinfo">'
string += '<strong>' + geography.properties.name + '</strong>'
string += '</div> '
   return string },
highlightFillColor: function(datamap){
  return USmap.options.fills[datamap.fillKey]
},
    highlightBorderWidth: 3
},

fills: {
  'republican': colors[0],
  'democrat': colors[1],
  'libertarian': colors[2],
  'other': colors[3],
  'tot' : colors[1],
  defaultFill: 'black'
},

data : data.data,

// Klik functie die de data update als een land wordt geklikt
done: function(datamap) {
       datamap.svg.selectAll('.datamaps-subunit').on('click', function( geography) {
           updateData(geography.id)

       });
    }
})

// Label kaart met label data
USmap.labels({'customLabelText': data1.data});

});
});


// Dropdown menu
d3.json("data/datadrop.json", function(error, data) {

  // Change functie update de data op basis van keuze
  var dropDown = d3.select(".drop")
                      .append("select")
                      .on("change", function() {updateData(this.value)})
                      .attr("name", "country-list")
                      .attr("class", "btn btn-primary dropdown-toggle")

  // Opties op basis van de data
  options = dropDown.selectAll("option")
             .data(data.data)
           .enter()
             .append("option")

  options.text(function (d) {return d.state})
        .attr("value", function (d) { return d.id; })
});
