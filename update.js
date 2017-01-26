// Jan Huiskes
// 10740929
// JS bestand voor de update functie. Dit bestand linkt ook alle visualisaties met elkaar

// Als je klikt of kiest van dropdown worden de barchart, scatterplot en donutchart aangepast
function updateData(id) {

d3.json("data/data.json", function(error, data) {

  // Verwijder wat weg moet
  d3.selectAll(".Title").remove();
  d3.selectAll('.arc').remove();

  // Goeie dataset en ook juiste kiesmannen
  data1 = data.data[id]
  name = data1.state
  kiesman = data1.kiesman
  if (kiesman == null){
    kiesman = data1.totkiesman
  }

  // Voor een state
  if (id != 'US'){

    // Pas kaart aan met de staat te highlighten en de vorige staat weer normaal te kleuren
    var m = {};
    if (clickedstate != null){
      m[clickedstate] = USmap.options.fills[data.data[clickedstate].fillKey]
    };
    m[id] = "#F5FF2E";
    USmap.updateChoropleth(m);
    clickedstate = id

    // Vervaagt de punten in de scatter plot behalve de gekozen staat
    var templist = scatter[0]
    for (var i = 0; i < templist.length; i++) {
      if (templist[i].__data__.id == id)
      {
        templist[i].style.opacity = 1
      }
      else{
        templist[i].style.opacity = 0.25
      }
    }

    // Zet de dropdown menu op de goede staat
    templist = options[0]
    for (var i = 0; i < templist.length; i++) {
      if (templist[i].__data__.id == id)
      {
        templist[i].selected = true
      }
    }

    // Juiste titels
    svg2.append("text")
        .attr("class", 'Title')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ 0 +","+ -185 +")")
        .text("Verdeling (in %) van opleidingiveau's in " + name);

     svg.append("text")
        .attr("class", 'Title')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width / 2.2) +","+ padding / 5 +")")
        .text('Percentage (in %) stemmen gewonnen in ' + name + ' (' + kiesman + ' kiesmannen)');

  }

  // Reset alle data als Amerika wordt gekozen of op de reset button wordt gedrukt
  else {
    // Kleurt kaart weer zoals begin
    var m = {};
    if (clickedstate != null)
    {
      m[clickedstate] = USmap.options.fills[data.data[clickedstate].fillKey]
    };
    USmap.updateChoropleth(m);

    // Maakt alle punten weer zichtbaar
    var templist = scatter[0]
    for (var i = 0; i < templist.length; i++) {
        templist[i].style.opacity = 1
    }

    // Zet de dropdown menu op Amerika
    templist = options[0]
    for (var i = 0; i < templist.length; i++) {
      if (templist[i].__data__.id == 'US')
      {
        templist[i].selected = true
      }
    }

    // Juiste titels
    svg2.append("text")
        .attr("class", 'Title')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ 0 +","+ -185 +")")
        .text("Percentage (in %) van opleidingiveau's in Amerika");

     svg.append("text")
        .attr("class", 'Title')
        .attr("text-anchor", "middle")
        .attr("transform", "translate("+ (width / 2.2) +","+ padding / 5 +")")
        .text('Percentage (in %) stemmen gewonnen in Amerika (' + kiesman + ' kiesmannen)');

  };

  // Maakt bar chart met transition
  var scaleDatax = [ "Donald Trump", "Hillary Clinton", "Overigen"]
  var scaleDatay = [parseFloat(data1.Rvote), parseFloat(data1.Dvote), round(parseFloat(data1.Lvote) + parseFloat(data1.Ovote))]
  var data = [{"type" : scaleDatax[0], "per" : scaleDatay[0], "col" : colors[0]},{"type" : scaleDatax[1], "per" : scaleDatay[1], "col" : colors[1]},{"type" : scaleDatax[2], "per" : scaleDatay[2], "col" : colors[3]}]

  var bar = chart.selectAll(".bar")
      .data(data)
    .transition().duration(500)
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.type); })
      .attr("y", function(d) { return y(d.per); })
      .attr("height", function(d) { return height - y(d.per); })

});

// Maakt pie chart met coole transition
d3.json("data/dataedu.json", function(error, data) {
  data = data.data[id]
  color.domain(data.map(function(d) { return d.type; }));

  path = svg2.selectAll("path")
      .data(pie(data))
      .enter().append("path")
      .attr("class", "arc")
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)
      .style("fill", function(d) { return color(d.data.type); })
      .transition()
      .duration(function(d, i) {
        return i * 400;
      })
          .attrTween('d', function(d) {
     var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
     return function(t) {
         d.endAngle = i(t);
       return arc(d);
     }
  });


});

};
