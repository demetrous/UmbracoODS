
  //Width and heighth
  var w = 563;
  var h = 245;
  var padding = 20;

  //Tracks view state.  Possible values:
  // 0 = default (vehicle types)
  // 1 = vehicles (of one type)
  // 2 = vehicle (singular)
  var viewState = 0;

  //Tracks most recently viewed/clicked 'type'. Possible values: HEV, PHEV, BEV, FCEV
  var viewType;

  var dataset, typeDataset, thisTypeDataset, xScale, yScale, xAxis, yAxis, area; //Empty, for now

  //For converting strings to Dates
  var parseTime = d3.timeParse("%Y"); //("%Y-%m");

  //For converting Dates to strings
  var formatTime = d3.timeFormat("%Y"); //("%b %Y");

  //Define key function to be used when binding data
  var key = function(d) {
    return d.key;
  };

  //Set up stack methods
  var vehicleStack = d3.stack();
  var typeStack = d3.stack();
                  //.order(d3.stackOrderDescending); //Flipped stacking order

  //Load in data
  d3.request("../data/degree_program_data.csv")
        .mimeType("text/csv")
        .get(function(response){

            //DATA PARSING

            //Parse each row of the CSV into an array of string values
            var rows = d3.csvParseRows(response.responseText);
            //console.log(rows);

            //Make dataset and empty array so we can start adding values
            dataset = [];

            //Loop once for each row fo the CSV, starting at row 3, since rows 0-2 contain only vehicle info, not sales values.
            for (var i=3; i < rows.length; i++){

              //Create a new object
              dataset[i - 3] = {
                    date: parseTime(rows[i][0]) //Make a new Date object for each year + month
              };

              //Loop once for each vehicle in this row (i.e., for this date)
              for (var j=1; j< rows[i].length; j++){
                var make = rows[0][j]; //'Make' from 1st row in csv
                var model = rows[1][j]; //'Model' from 2nd row in csv
                var makeModel = rows[0][j] + " " + rows[1][j] + " " + rows[2][j]; // Make and model will serve as our key
                var type = rows[2][j]; // 'Type' from 3rd row in csv
                var sales = rows[i][j]; // 'Sales' for this vehicle and month

                //If sales value exists:
                if (sales){
                  sales = parseInt(sales); //Convert from string to int
                } else {
                  sales = 0;
                }

                //Append a new object with data for this vehicle and month
                dataset[i-3][makeModel] = {
                  "make": make,
                  "model": model,
                  "type": type,
                  "sales": sales
                };
              }
            }

            //Log out the final state of dataset
            //console.log(dataset);

            //STACKING (removed to click event...)



            //TYPE DATA SERIES

            //Make typeDataset an empty array
            typeDataset = [];

            //The goal is to make just monthly totals for each type "Undergraduate", "Graduate", "Professional"
            for (var i = 3; i < rows.length; i++){
              //Create a new object
              typeDataset[i-3] = {
                date: parseTime(rows[i][0]),
                "Undergraduate": 0,
                "Graduate": 0,
                "Professional": 0
              };

              //Loop once for each vehicle in this row (i.e., for this date)
              for(j = 1; j < rows[i].length; j++) {
                var type = rows[2][j]; //3rd row contains type
                var sales = rows[i][j];

                if(sales){
                  sales = parseInt(sales);
                }else {
                  sales = 0;
                }

                //Add sales value to existing sum
                typeDataset[i-3][type] += sales;

              }
            }

            //console.log(typeDataset);

            // STACKING OF TYPES

            //Tell stack function where to find the keys
            var types = [ "Undergraduate", "Graduate", "Professional" ];
            typeStack.keys(types);


            //Stack the data
            var typeSeries = typeStack(typeDataset);
            //console.log(typeSeries);

            //
            // MAKE A CHART
            //

            //Create scale functions
            xScale = d3.scaleTime()
                        .domain([
                          d3.min(dataset, function(d){ return d.date;}),
                          d3.max(dataset, function(d){ return d.date;}),
                        ])
                        .range([
                        padding, w - padding * 2]);

            yScale = d3.scaleLinear()
                        .domain([
                          0,
                          d3.max(typeDataset, function(d) {
                            var sum = 0;

                            //Loops once for each row to calculate the total (sum) of sales of all vehicles
                            for (var i = 0; i < types.length; i++){
                              //console.log(types[i]);
                              sum += d[types[i]];
                            }
                            return sum;
                          })
                        ])
                        .range([h - padding, padding / 2])
                        .nice();

            //Define axes
            xAxis = d3.axisBottom()
                      .scale(xScale)
                      .ticks(10)
                      .tickFormat(formatTime);

            //Define Y axis
            yAxis = d3.axisRight()
                      .scale(yScale)
                      .ticks(5);

            //Define area generator
            area = d3.area()
                        .x(function(d){ return xScale(d.data.date); })
                        .y0(function(d){ return yScale(d[0]); })
                        .y1(function(d){ return yScale(d[1]); });

            //Create SVG element
            var svg = d3.select("#degree-program-chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);

            //Create areas for individual VEHICLES
            //
            //(Removed here, now happens only after click…)
            //
            svg.append("g")
              .attr("id", "vehicles");

            //Create areas for TYPES
            svg.append("g")
              .attr("id", "types")
              .selectAll("path")
              .data(typeSeries, key)
              .enter()
              .append("path")
              .attr("class", "area")
              .attr("opacity", 1) //Put init opacity to make hiding smooth
              .attr("d", area)
              .attr("fill", function(d) {
                //Which type is this?
                var thisType = d.key;

                //New color var "Undergraduate", "Graduate", "Professional"
                var color;
                switch (thisType) {
                  case "Undergraduate":
                    color = "rgb(110, 64, 170)";
                    break;
                  case "Graduate":
                    color = "rgb(76, 110, 219)";
                    break;
                  case "Professional":
                    color = "rgb(35, 171, 216)";
                    break;
                }

                return color;
              })
              .on("click", function(d) {

                //Update view state
                viewState++;

                // TYPES

                //Which type was clicked?
                var thisType = d.key;

                //Update this for later reference
                viewType = thisType;
                //console.log(thisType);


                //Generate a new data set with all-zero values, except for this type's data "Undergraduate", "Graduate", "Professional"
                thisTypeDataset = [];

                for (var i = 0; i < typeDataset.length; i++){
                  thisTypeDataset[i] = {
                    date: 		typeDataset[i].date,
                    Undergraduate:		0,
                    Graduate:		0,
                    Professional:		0,
                    [thisType]:  typeDataset[i][thisType] //Overwrites the appropriate zero value above
                  }
                }

                //console.log(thisTypeDataset);

                //Stack the data even though there's just one "layer"
                var thisTypeSeries = typeStack(thisTypeDataset);
                //console.log(thisTypeSeries)

                //Bind the new data set to paths, overwriting old bound data
                var paths =  d3.selectAll("#types path")
                                .data(thisTypeSeries, key)
                                .classed("unclickable", "true");

                //Transition areas into new positions (i.e. thisType's area will go to a zero baseline; all others will flatten out). Store this transition in a new variable for later reference
                var areaTransitions = paths.transition()
                          .duration(1000)
                          .attr("d", area);

                var adjustedMin = d3.min(thisTypeDataset, function(d){
                  var prevDate = xScale.domain()[1];
                  var dateUpdated = d[thisType] == 0? prevDate: d.date;

                  return dateUpdated;
                });

                //Subtract one month to get chart fit into x axis
                adjustedMin.setMonth(adjustedMin.getMonth()-1);

                //Update scale
                xScale.domain([
                  adjustedMin,
                  d3.max(thisTypeDataset, function(d){
                    var prevDate = xScale.domain()[0];
                    var dateUpdated = d[thisType] == 0? prevDate: d.date;
                    return dateUpdated;
                  })
                ]);

                yScale.domain([
                  0,
                  d3.max(thisTypeDataset, function(d){
                    var sum = 0;
                    //Calculate the total (sum) of sales of this type, ignoring the others (for now)
                    sum += d[thisType];


                    return sum;
                  })
                ]);

                //Append this transition to the one already in progress (from above). Transition areas to newly updated scale
                areaTransitions.transition()
                              .delay(200)
                              .on("start", function(){
                                //Transition axis to new scale concurrently
                                d3.select("g.axis.x")
                                    .transition()
                                    .duration(1000)
                                    .call(xAxis);

                                d3.select("g.axis.y")
                                    .transition()
                                    .duration(1000)
                                    .call(yAxis);
                              })
                              .duration(1000)
                              .attr("d", area)
                              .transition()
                              .on("start", function(){
                                //Makes vehicles vilible instantly, so they're revealed when this fades out
                                d3.selectAll("g#vehicles path")
                                  .attr("opacity", 1);
                              })
                              .duration(1000)
                              .attr("opacity", 0)
                              .on("end", function(d, i) {
                                //Reveal back button
                                if (i == 0) {
                                  toggleBackButton();
                                }
                              });

                  //STACKING VEHICLES

                  //Now that we know the column names in the data, get all the keys (make + model), but toss out 'date'
                  var keysAll = Object.keys(dataset[0]).slice(1);
                  //console.log("keysAll "+ keysAll);
                  //console.log(thisType);

                  var keysOfThisType = [];
                  //Loop once for each key, and save out just the ones of thisType
                  for(var i = 0; i < keysAll.length; i++){

                    if (dataset[0][keysAll[i]].type == thisType){
                      keysOfThisType.push(keysAll[i]);
                    }
                  }
                  //console.log(keysOfThisType);

                  //Give the new keys to the stack function
                  vehicleStack.keys(keysOfThisType)
                        .value(function value(d, key){
                          return d[key].sales;
                        });

                  //Stack the data and log it out
                  var vehicleSeries = vehicleStack(dataset);
                  //console.log(vehicleSeries);

                  //Create areas for individual VEHICLES
                  svg.select("g#vehicles")
                      .selectAll("path")
                      .data(vehicleSeries, key)
                      .enter()
                      .append("path")
                      .attr("class", "area")
                      .attr("opacity", 0)
                      .attr("d", area)
                      .attr("fill", function(d, i){

                        //which vehicle is this?
                        var thisKey = d.key;

                        //What type is this vehicle?
                        var thisType = d[0].data[thisKey].type;
                        //console.log(thisType);

                        //Used to find a cool color below
                        var spread = 0.6;
                        var startingPoint;

                        //Choose where in the color spectrum we start, based on type "Undergraduate", "Graduate", "Professional"
                        switch(thisType){
                          case "Undergraduate":
                            startingPoint = 0;
                            break;
                          case "Graduate":
                            startingPoint = 0.2;
                            break;
                          case "Professional":
                            startingPoint = 0.4;
                            break;
                        }

                        //How many cars
                        var numVehicles = keysOfThisType.length;

                        //Get a value between 0.0 and 1.0
                        var normalized = startingPoint + ((i/numVehicles) * spread);
                        //console.log(normalized);

                        //Get that color on the spectrum
                        return d3.interpolateCool(normalized);

                      })
                      .on("click", function(d){

                        //Update view state
                        viewState++;

                        //Hide the back button during this view transition
                        toggleBackButton();

                        //Which type of vehicle was clicked?
                        var thisType = d.key;

                        //Fade out all other vehicle areas
                        d3.selectAll("g#vehicles path")
                          .classed("unclickable","true") //Prevent future clicks
                          .filter(function(d){ //Filter out this one
                            if (d.key !== thisType){
                            return true;
                            }
                          })
                          .transition()
                          .duration(1000)
                          .attr("opacity",0);

                          //Define area generator that will be used just this one time
                          var singleVehicleArea = d3.area()
                              .x(function(d) { return xScale(d.data.date); })
                              .y0(function(d){ return yScale(0); }) //Note zero baseline
                              .y1(function(d) {return yScale(d.data[thisType].sales); });
                              // Raw data value for y1 not stacked


                          //Use this new area generator to transition the area downward, to have a flat (zero) baseline
                          var thisAreaTransition = d3.select(this)
                            .transition()
                            .delay(1000)
                            .duration(1000)
                            .attr("d", singleVehicleArea);

                          var adjustedMin = d3.min(dataset, function(d){
                            var prevDate = xScale.domain()[1];
                            var dateUpdated = d[thisType].sales == 0? prevDate: d.date;

                            return dateUpdated;
                          });

                          //Subtract one month to get chart fit into x axis
                          adjustedMin.setMonth(adjustedMin.getMonth() - 1);

                          //Update scale
                          xScale.domain([
                            adjustedMin,
                            d3.max(dataset, function(d){
                              var prevDate = xScale.domain()[0];
                              var dateUpdated = d[thisType].sales == 0? prevDate: d.date;
                              return dateUpdated;
                            })
                          ]);



                          yScale.domain([
                            0,
                            d3.max(dataset, function(d){
                               return d[thisType].sales;
                            })
                          ]);

                          //Transition the clicked area and axes into place, to fit the new domain
                          thisAreaTransition
                            .transition()
                            .duration(1000)
                            .attr("d", singleVehicleArea)
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
                              d3.select(this).classed("unclickable","false");

                              if (i == 0) {
                                toggleBackButton();
                              }
                            });


                      })
                      .append("title")  //Make tooltip
                      .text(function(d) {
                        return d.key;
                      });



                })
                /*.append("title")  //Make tooltip
                .text(function(d) {
                  return d.key;
                });*/
                .on("mouseover", function(d){

                 //Get this bar's x/y values
                  var xPosition = parseFloat(d3.event.x);
                  //console.log(xPosition);

                  var yPosition = parseFloat(d3.event.y);

                 //Update the tooltip position and value
                 d3.select("#tooltip")
                  .style("left", xPosition + "px")
                  .style("top", yPosition + "px")
                   .select("#value")
                  .text(d.key);

                d3.select("#tooltip").classed("hidden", false);


                })
                .on("mouseout", function(){
                  //hide the tooltip
                  d3.select("#tooltip").classed("hidden", true);
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


            //Create back button
            var backButton = svg.append("g")
                .attr("id", "backButton")
                .attr("opacity", 0) //Initially hidden
                .classed("unclickable", true)
                .attr("transform","translate(" + xScale.range()[0] + "," + yScale.range()[1] + ")");

            backButton.append("rect")
              .attr("x", 0)
              .attr("y", 0)
              .attr("rx", 5)
              .attr("rx", 5)
              .attr("width", 70)
              .attr("height", 30);

            backButton.append("text")
              .attr("x", 7)
              .attr("y", 20)
              .html("&larr; Back");


            //Define click behavior
            backButton.on("click", function(){

              //Hide back button, as it was just clicked
              toggleBackButton();

              if(viewState == 1) {
                //Go back to default viewed

                //Update view state
                viewState--;

                //Re-bind type data and fade in types
                var typeAreaTransitions = d3.selectAll("g#types path")
                        .data(typeSeries, key)
                        .transition()
                        .duration(250)
                        .attr("opacity", 1)
                        .on("end", function(){
                          //Remove all vehicles once this fades in; they will be recreated later as needed.
                          d3.selectAll("g#vehicles path").remove();
                        });

                        //Set x scale back to original domain
                        xScale.domain([
                                      d3.min(dataset, function(d){ return d.date;}),
                                      d3.max(dataset, function(d){ return d.date;}),
                                    ])
                                    .range([
                                    padding, w - padding * 2]);

                        //Set y scale back to original domain
                        yScale.domain([
                            0,
                            d3.max(typeDataset, function(d) {
                              var sum = 0;
                              //Loops once for each row, to calculate
                              //the total (sum) of sales of all vehicles
                              for (var i = 0; i < types.length; i++){
                                sum += d[types[i]];
                              };

                              return sum;
                            })
                        ]);

                      //Transition type areas and scales back into place
                      typeAreaTransitions.transition()
                            .duration(1000)
                            .on("start", function(){

                              //Transition axes to a new scale concurrently
                              d3.select("g.axis.x")
                                .transition()
                                .duration(1000)
                                .call(xAxis);

                              d3.select("g.axis.y")
                                .transition()
                                .duration(1000)
                                .call(yAxis);
                            })
                            .attr("d", area)
                            .on("end", function(){
                              d3.select(this).classed("unclickable", false)
                            });
              } else if (viewState == 2){
                //Go back to vehicles view

                //Update viewState
                viewState--;

                //Restore the old scales
                var adjustedMin = d3.min(thisTypeDataset, function(d){
                  var prevDate = xScale.domain()[1];
                  var dateUpdated = d[viewType] == 0? prevDate: d.date;

                  return dateUpdated;
                });

                //Subtract one month to get chart fit into x axis
                adjustedMin.setMonth(adjustedMin.getMonth()-1);

                //Update scale
                xScale.domain([
                  adjustedMin,
                  d3.max(thisTypeDataset, function(d){
                    var prevDate = xScale.domain()[0];
                    var dateUpdated = d[viewType] == 0? prevDate: d.date;
                    return dateUpdated;
                  })
                ]);

                yScale.domain([
                  0,
                  d3.max(thisTypeDataset, function(d){
                    var sum = 0;

                    //Calculate the total (sum) of sales of this type
                    sum += d[viewType];
                    return sum;
                  })
                ]);

                //Transition the axes and visible area back into place
                d3.selectAll("g#vehicles path")
                  .transition()
                  .on("start", function(){

                  })
                  .duration(1000)
                  .attr("d", area) //Effectively changes only the selected area
                  .transition()
                  .duration(1000)
                  .attr("opacity", 1) //Fade in all areas
                  .on("end", function(d, i){

                    //Restore clickability
                    d3.select(this).classed("unclickable", false);

                    //Reveal back button
                    if (i == 0){
                      toggleBackButton();
                    }
                  });


              }
            });
        });

      var toggleBackButton = function() {

        //Select the button
        var backButton = d3.select("#backButton");

        var hidden = backButton.classed("unclickable");

        if (hidden) {

          //Reveal it

          //Set up dynamic button text
          var buttonText = "&larr; Back to ";

          //Text varies by mode and type
          if(viewState == 1){
            buttonText += "all levels";
          } else if (viewState == 2) {
            buttonText += "all " + viewType;// + " vehicles";
          }

          //Set text
          backButton.select("text").html(buttonText);

          //Resize button depending on text width
          var rectWidth = Math.round(backButton.select("text").node().getBBox().width + 16);
          backButton.select("rect")
                    .attr("width", rectWidth);

          //Fade button in
          backButton.classed("unclickable", false)
                .transition()
                .duration(1000)
                .attr("opacity", 1);
        } else {

          //Hide it
          backButton.classed("unclickable", true)
                .transition()
                .duration(1000)
                .attr("opacity", 0);
        }
      };
