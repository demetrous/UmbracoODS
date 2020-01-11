var degreeProgramChart = function(){

//Width and height
var w = 563;
var h = 245;
var padding = 20;

//Scales and axes
var xScale, yScale, xAxis, yAxis;

//For converting strings to Dates
var parseTime = d3.timeParse("%Y"); //d3.timeParse("%Y-%m");

//For converting Dates to strings
var formatTime = d3.timeFormat("%Y"); //d3.timeFormat("%b %Y");

//Define key function to be used when binding data
var key = function(d) {
  return d.key;
};

//Set up stack methods
var levelStack = d3.stack();

  d3.json("../data/degree-program.json", function(json){
    //console.log(json);

    //Keys for sorting, here: Undergraduate, Graduate, Professional
    var rootKeys = [];

    //Dates for new aggregated array and xAxis
    var dates = [];

    //Levels dataset
    var levels = [];

    for(var i = 0; i < json.length; i++){

      //Collecting sorting keys, unique values
      if(rootKeys.indexOf(json[i].level) == -1){
        rootKeys.push(json[i].level);
      }

      //Collecting dates, unique values
      if(dates.indexOf(json[i].date) == -1){
        dates.push(json[i].date);

        //Create a new object with unique year(date)
        levels[levels.length] = {
          date: parseTime(json[i].date)
        };

      }

      levels.forEach(function(item, index){

        //temp vars to make dates comparison properly
        var itemdate = item.date.getTime();
        var jsondate = parseTime(json[i].date).getTime();

        //compare dates in levels to json, add a level property with headcount
        if (itemdate === jsondate){
          item[json[i].level] = json[i].headcount;
        }
      });


    }
    //console.log(levels);

    levelStack.keys(rootKeys);
                /*.value(function value(d, key){
                  return d[key];
                });*/

    //Data, stacked
    var series = levelStack(levels);
    //console.log(series);

    //Set up scales
    xScale = d3.scaleBand()
      //.domain(d3.range(levels.length))
      .domain(levels.map(function(d){ return d.date; }))
      .range([
      padding, w - padding * 2])
      .padding(0.1);

    yScale = d3.scaleLinear()
      .domain([0,
        d3.max(levels, function(d) {
          //console.log(d);
          var sum = 0;

          rootKeys.forEach(function(item){
            sum += d[item];
          });

          return sum;
        })
      ])
      .range([h - padding, padding / 2])
      .nice();

      //Define X axis
      xAxis = d3.axisBottom()
                .scale(xScale)
                .ticks(10)
                .tickFormat(formatTime);

      //Define Y axis
      yAxis = d3.axisRight()
                .scale(yScale)
                .ticks(5);


    //Easy colors accessible via a 10-step ordinal scale
    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    //Create SVG element
    var svg = d3.select("#degree-program-chart")
          .append("svg")
          .attr("id","levels")
          .attr("width", w)
          .attr("height", h);

    // Add a group for each row of data
    var groups = svg.selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .attr("class", function(d){return d.key;})
      .style("fill", function(d, i) {
        //console.log(d);
        return colors(i);
      });

    // Add a rect for each data value
    var rects = groups.selectAll("rect")
      .data(function(d, key) {
        //d.data;
        d.forEach(function(item){
          item.level = d.key;
          item.headcount = item[1] - item[0];
        })
        //console.log(d);
         return d;
       })
      .enter()
      .append("rect")
      .attr("class", function(d) {
        return d.level + "-" + formatTime(d.data.date);
      })
      .attr("x", function(d, i) {
        return xScale(d.data.date);
      })
      .attr("y", function(d) {
        return yScale(d[1]);
      })
      .attr("height", function(d) {
        return yScale(d[0]) - yScale(d[1]);
      })
      .attr("width", xScale.bandwidth())
      .attr("opacity",1)
      .on("click", function(d, i){

        //Which level was clicked
        var thisLevel = d.level;

        var hiddenRects = d3.selectAll("#degree-program-chart #levels g rect")
              .classed("unclickable",true) //Prevent future clicks
              .filter(function(d){
                if(d.level !== thisLevel){
                  //console.log("nope: " + d.level);
                  return true;
                }
              })
              .transition()
              .duration(500)
              .attr("opacity",0);

        //console.log(d3.selectAll("#levels g." + thisLevel).data());

        console.log(i);

        //Drop current rects to zero line
        var thisRects = d3.selectAll("#degree-program-chart #levels g." + thisLevel +" rect")
          .transition()
          //.delay(1000)
          .duration(function(d){

            return 0;
          })
          .attr("y", function(d) {
            return yScale(0) - (yScale(d[0]) - yScale(d[1]));
          });

        //console.log(d);

        var thisData = d3.selectAll("#levels g." + thisLevel).data()[0];
        // thisData.forEach(function(item){
        //   console.log(item);
        //   console.log("===");
        // });
        xScale.domain(thisData.map(function(d){ return  d.data.date; }));

        yScale.domain([0,
            d3.max(thisData, function(d) {
              return d.headcount;
            })
          ]);

        //"Grow" rects according to the new Scales
        thisRects
            .transition()
            .duration(1000)
            .attr("y", function(d) {
              return yScale(0) - (yScale(d[0]) - yScale(d[1]));
            })
            .attr("height", function(d) {
              return yScale(d[0]) - yScale(d[1]);
            })
            .on("start", function(){
              //Transition axes to new scale concurrently
              d3.select("g.axis.x")
                .transition()
                .duration(1000)
                .call(xAxis);

              d3.select("g.axis.y")
                .transition()
                .duration(1000)
                .call(yAxis);
            })
            .on("end", function(d, i){
              //Restore clickability
              d3.select(this).classed("unclickable",false);

              // if (i == 0) {
              //   toggleBackButton();
              // }
            });



      })
      .on("mouseover", function(d){
        var classRect = d3.select(this).attr("class");
        d3.select("#degree-program-table td." + classRect).classed("highlight-cell",true);
        d3.select("#degree-program-table tr." + d.level).classed("highlight-row",true);

      })
      .on("mouseout", function(d){
        var classRect = d3.select(this).attr("class");
        d3.select("#degree-program-table td." + classRect).classed("highlight-cell",false);
        d3.select("#degree-program-table tr." + d.level).classed("highlight-row",false);
      })
      .append("title")
      .text(function(d){
        return formatTime(d.data.date) + " " + d.level + ": " + d.headcount;
      });

      //Create axes
      svg.append("g")
          .attr("class", "axis x")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "axis y")
          .attr("transform", "translate(" + (w - padding*2) + ", 0)")
          .call(yAxis);


  });//d3.json
}

degreeProgramChart();
