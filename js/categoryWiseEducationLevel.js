d3.json("json3.json", function(err,data){

  var margin = {top: 20, right: 20, bottom: 170, left: 100},
      width = 1016 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom,
      seriesNames = ["GE","SC","ST"],
      x0 = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1),
      x1 = d3.scale.ordinal(),
      y = d3.scale.linear()
            .range([height, 0]),
      color = d3.scale.ordinal()
                .range(["#097054", "#6599FF", "#FFDE00"]),
      xAxis = d3.svg.axis()
                .scale(x0)
                .orient("bottom"),
      yAxis = d3.svg.axis()
                .scale(y)
                .orient("left"),
      svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
      seriesKeys = d3.keys(data[0]).filter(function (key) { return (key !== "tableName"); }),
      data1 = [],
      tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<strong>Population:</strong> <span style='color:red'>" + d.value + "</span>";
                  });
  svg.call(tip);

  for (var i = 0; i < parseInt(seriesKeys.length); i++) {
    var arr = [];
    for (var j = 0, dataLength = data.length; j < dataLength; j++) {
      var tempData = data[j];
      var obj = {name: seriesNames[j], value: +tempData[seriesKeys[i]]};
      arr.push(obj);
    }
    var objTemp = {};
    objTemp.xAxisIndex = seriesKeys[i];
    objTemp.educationLevel = arr;
    data1[i] = objTemp;
  }
  x0.domain(data1.map(function (d) { return d.xAxisIndex; }));
  x1.domain(seriesNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, (10 + d3.max(data1, function (d) { return d3.max(d.educationLevel, function (d) { return d.value; }); }))]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor","end")
      .attr("dx", "-.8em")
      .attr("dy", "-0.55em")
      .attr("transform", "rotate(-90)");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -90)
      .attr("x", -100)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Population");

  var state = svg.selectAll(".state")
                  .data(data1)
                  .enter().append("g")
                  .attr("class", "g")
                  .attr("transform", function (d) { return "translate(" + x0(d.xAxisIndex) + ",0)"; });

  state.selectAll("rect")
        .data(function (d) { return d.educationLevel; })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("x", function (d) {return x1(d.name); })
        .attr("y", height)
        .attr ("height", 0)
        .transition()
        .duration(1000)
        .attr("y", function (d) { return y(d.value); })
        .attr("height", function (d) { return height - y(d.value); })
        .style("fill", function (d) { return color(d.name); })
        ;

  var legend = svg.selectAll(".legend")
                  .data(seriesNames.slice().reverse())
                  .enter().append("g")
                  .attr("class", "legend")
                  .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

  legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) { return d; });

});
