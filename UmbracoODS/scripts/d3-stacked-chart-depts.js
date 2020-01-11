var degreeProgramChartDepts = function(){

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
var deptStack = d3.stack();

  d3.json("data/degree-program-depts.json", function(json){
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

          //Summarize data for each college with the same level: Undergraduate, Graduate...
          if(item[json[i].level]){
            item[json[i].level] += json[i].headcount;
          }else{
            item[json[i].level] = json[i].headcount;
          }

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
    var svg = d3.select("#degree-program-depts-chart")
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

        var hiddenRects = d3.selectAll("#degree-program-depts-chart #levels g rect")
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

        //What is the series number, will use to determine zero-based bars
        var seriesNumber = d[0];
        console.log(seriesNumber);

        //Drop current rects to zero line
        var thisRects = d3.selectAll("#degree-program-depts-chart #levels g." + thisLevel +" rect")
          .transition()
          //.delay(1000)
          .duration(function(d){
            if (seriesNumber == 0){
              return 0;
            }else{
              return 1000;
            }
          })
          .attr("y", function(d) {
            return yScale(0) - (yScale(d[0]) - yScale(d[1]));
          });

        //console.log(d);

        var thisData = d3.selectAll("#degree-program-depts-chart #levels g." + thisLevel).data()[0];
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

        console.log(thisData);

        //Adjust axes with 1000 ms delay, to match the time of dropping
        d3.select("#degree-program-depts-chart g.axis.x")
          .transition()
          .delay(1000)
          .duration(1000)
          .call(xAxis);

        d3.select("#degree-program-depts-chart g.axis.y")
          .transition()
          .delay(1000)
          .duration(1000)
          .call(yAxis);


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
            .transition() //Fade out one solid rect, showing a new stacked barchart
            .delay(1000)
            .attr("opacity",0);


            //Declare an array for headcount detailed to college level
            var thisLevelDepts = [];

            //Colleges array for stack function
            var deptKeys = [];

            var deptDates = [];

            for (var i = 0; i < json.length; i++){

              //Collecting sorting keys, unique values
              if(deptKeys.indexOf(json[i].college) == -1){
                deptKeys.push(json[i].college);
              }

              //Collecting records with this level only
              //Collecting dates, unique values
              if(deptDates.indexOf(json[i].date) == -1){
                deptDates.push(json[i].date);

                //Create a new object with unique year(date)
                thisLevelDepts[thisLevelDepts.length] = {
                  date: parseTime(json[i].date),
                  thisLevel: json[i].level
                };

              }

              thisLevelDepts.forEach(function(item, index){

                //temp vars to make dates comparison properly
                var itemdate = item.date.getTime();
                var jsondate = parseTime(json[i].date).getTime();

                //compare dates in levels to json, add a level property with headcount
                if (itemdate === jsondate && json[i].level == thisLevel){
                item[json[i].college] = json[i].headcount;

                }
              });


            }

            console.log(thisLevelDepts);

            deptStack.keys(deptKeys);
                        /*.value(function value(d, key){
                          return d[key];
                        });*/

            //Data, stacked
            var seriesDept = deptStack(thisLevelDepts);
            //console.log(seriesDept);

            // Add a group for each row of data
            var groupsDept = svg.selectAll("g." + thisLevel + "drillDown")
              .data(seriesDept)
              .enter()
              .append("g")
              .attr("class", function(d){return d.key + "drillDown";})
              .style("fill", function(d, i) {
                return colors(1 + i);
              });

            // Add a rect for each data value
            var rectsDept = groupsDept.selectAll("rect")
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
                if (!d[1]){
                  return yScale(d[0]);// If no data return base value
                }else{
                  return yScale(d[1]);
                }
              })
              .attr("height", function(d) {
                if (!d[1]){
                  return 0;// If no data return base value o
                }else{
                return yScale(d[0]) - yScale(d[1]);
                }
              })
              .attr("width", xScale.bandwidth())
              .attr("opacity", 0)
              .transition()
              .duration(1000)
              .delay(function(){
                if (seriesNumber == 0){
                  return 1000;
                }else{
                  return 2000;
                }
              })
              .attr("opacity", 1);

              groupsDept.selectAll("rect")
                .append("title")
                .text(function(d){
                  return formatTime(d.data.date) + " " + d.level + ": " + d.headcount;
                });


      })
      .on("mouseover", function(d){
        var classRect = d3.select(this).attr("class");
        d3.select("#degree-program-depts-table td." + classRect).classed("highlight-cell",true);
        d3.select("#degree-program-depts-table tr." + d.level).classed("highlight-row",true);

      })
      .on("mouseout", function(d){
        var classRect = d3.select(this).attr("class");
        d3.select("#degree-program-depts-table td." + classRect).classed("highlight-cell",false);
        d3.select("#degree-program-depts-table tr." + d.level).classed("highlight-row",false);
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

degreeProgramChartDepts();
