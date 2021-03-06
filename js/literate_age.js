d3.json("json1.json", function(err, result1){
  var data = [];
  if (err){
    return console.log(err);
  }
  for (var index = 0, len = result1.length; index < len; index++) {
    var obj={};
    obj.age = result1[index].ageGroup;
    obj.literatePopulation = parseInt(result1[index].literatePopulation);
    data[index] = obj;
  }

  var margin = {top: 20, right: 20, bottom: 85, left: 100},
      width = 1016 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom,
      max = d3.max(data, function(d) { return d.literatePopulation; }),
      heightScale = d3.scale.linear()
                      .domain([0, max])
                      .range([height, 0]),
      widthScale = d3.scale.ordinal().rangeRoundBands([0, width], .05)
      xAxis = d3.svg.axis()
                .scale(widthScale)
                .orient("bottom"),
      yAxis = d3.svg.axis()
                .scale(heightScale)
                .orient("left")
                .ticks(10),
      axis = d3.svg.axis(),
      canvas = d3.select("body")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Literate Population:</strong> <span style='color:red'>" + d.literatePopulation + "</span>";
              });
      canvas.call(tip);
  widthScale.domain(data.map(function(d){return d.age;}));

  canvas.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor","end")
        .attr("dx", "-.8em")
        .attr("dy", "-0.55em")
        .attr("transform", "rotate(-90)");

  canvas.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -90)
        .attr("x", -100)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Literate Population");

  var bars = canvas.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .style("fill", "steelblue")
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .attr("width", 20)
                    .attr ("y", height)
                    .attr ("x", function(d, i){return 20+(i*31);})
                    .attr ("height", 0)
                    .transition()
                    .duration(1000)
                    .attr ("y", function(d) {return heightScale(d.literatePopulation);})
                    .attr("height", function(d){return height-heightScale(d.literatePopulation);});
});
