
var GS = {}; // Global Object Storage



function globalStorageInit(c) { // c - containerId

    if (!GS[c]) {

        GS[c] = {

            drillLevel: 0,

            //Margin convention by Mike Bostock
            margin: { top: 20, right: 20, bottom: 10, left: 20 },
            totalsPadding: 3,

            //Extra bottom marging for height to match table margin
            extraMargin: 4 * 16, // 5em = 5 * 16px

            svg: undefined,

            containerParent: undefined,

            //Array of objects (data array) that contain this drill level arrays: keys, data, stack function
            dataset: [],

            //Filter that collects chosen drill category, e.g. name of level, college, department etc.
            drillPath: [],

            roomForBack: 1.1,

            xScale: undefined,

            yScale: undefined,

            xAxis: undefined,

            yAxis: undefined


        };

    }//if

}//function globalStorageInit


function cleanName(str) {
    return str.replace(/[^A-Z0-9]+/ig, "_");
}

//For converting strings to Dates
var parseTime = d3.timeParse("%Y"); //d3.timeParse("%Y-%m");

//For converting Dates to strings
var formatTime = d3.timeFormat("%Y"); //d3.timeFormat("%b %Y");

//For displaying number in 1,234 format
function formatNumberComma(arg) {
    var formatTemplate = d3.format(",");
    return isNaN(arg) ? agr : formatTemplate(arg);
}

//Define key function to be used when binding data
function key(d) {
    return d.key;
};

//Easy colors accessible via a 10-step ordinal scale
var colors = d3.scaleOrdinal(d3.schemeCategory10);
//var colors = d3.scaleOrdinal(d3.schemeSet1); 


function firstToUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Move svg element to the front, used for back button
d3.selection.prototype.moveToFront = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};

//Select the first child
d3.selection.prototype.first = function () {
    return d3.select(this[0][0]);
};

function drillDownZeroLevel(sourceJson, xAxisColumn, yAxisColumn, drillCategories, c, showTotals) { // c - containerId

    globalStorageInit(c);
           
   
    //Assign the value to the global variable
    //showTotals = showTotalsParam;

    //Get rect of the container's parent to use it for width and height of the SVG element
    // for SVG - getBBox(),  for HTML elements - getBoundingClientRect()

    //GS[c].containerParent = d3.select(c).node().parentNode.getBoundingClientRect(); TEMP, REWORK

    GS[c].containerParent = d3.select(c).node().getBoundingClientRect();

    //Width and height of an html element that contains chart
    var containerWidth = parseInt(GS[c].containerParent.width);
    var containerHeight = parseInt(GS[c].containerParent.height);

    var contParent = d3.select(c).node().getBoundingClientRect();;

    console.log({ containerWidth, containerHeight, contParent });

    //Margin convention continued...
    var width = containerWidth - GS[c].margin.left - GS[c].margin.right,
        height = containerHeight - GS[c].margin.top - GS[c].margin.bottom - GS[c].extraMargin;

    //Create SVG element
    GS[c].svg = d3.select(c)
        .append("svg")
        .attr("id", c + "-stacked-barchart")
        .attr("width", width + GS[c].margin.left + GS[c].margin.right)
        .attr("height", height + GS[c].margin.top + GS[c].margin.bottom);

    createBackButton(c, drillCategories, showTotals);

    //currentCategoryLevel = drillCategories;


    //Load data from json file
    d3.json(sourceJson).then(function (json) {

        console.log(json);

        //Create arrays of drill datasets and stack functions matching drillCategories array length
        drillCategories.forEach(function (item, index) {

            GS[c].dataset.push({
                //dates: [], //Helper array, collects a unique set of dates (In General: xAxisColumn)
                keys: [], //Keys stacking, here: Und, Grad, Prof; deeper level: AHS, Business, etc.
                data: [], //Array of data for drill levels
                stack: d3.stack(), //Stack function
                series: undefined, //Placeholder for stacked data
            });

        });



        for (var i = 0; i < json.length; i++) {

            //Collecting unique category values
            if (GS[c].dataset[0].keys.indexOf(json[i][drillCategories[0]]) == -1) {
                GS[c].dataset[0].keys.push(json[i][drillCategories[0]]);
            }

            //Search for existing value X dataset array of objects
            var foundValueX = GS[c].dataset[0].data.find(function (item) {

                //temp vars to make dates comparison properly
                var itemdate = item.date.getTime();
                var jsondate = parseTime(json[i][xAxisColumn]).getTime();

                return item.date.getTime() === parseTime(json[i][xAxisColumn]).getTime();
            });


            //If value X was not found push a new object into the object of arrays
            if (!foundValueX) {

                //Create a new object with unique year(date)
                GS[c].dataset[0].data.push({
                    date: parseTime(json[i][xAxisColumn]),
                    total: 0
                });
            }


            /*
            //Collecting dates, unique values
            if(dataset[0].dates.indexOf(json[i][xAxisColumn]) == -1){
      
              //if there is no such date push it into the dates array
              dataset[0].dates.push(json[i][xAxisColumn]);
      
              //Create a new object with unique year(date)
              dataset[0].data.push({
                date: parseTime(json[i][xAxisColumn]),
                total: 0
              });
            }
            */


            //Run through all existing drill data, summarizing values for each drill level item
            GS[c].dataset[0].data.forEach(function (item, index) {

                //temp vars to make dates comparison properly
                var itemdate = item.date.getTime();
                var jsondate = parseTime(json[i][xAxisColumn]).getTime();

                //compare dates in drill data to json, add a level property with headcount
                if (itemdate === jsondate) {

                    //Summarize data for each college with the same level: Undergraduate, Graduate...
                    if (item[json[i][drillCategories[0]]]) {

                        item[json[i][drillCategories[0]]] += json[i][yAxisColumn];
                        item.total += json[i][yAxisColumn];

                    } else {

                        item[json[i][drillCategories[0]]] = json[i][yAxisColumn];
                        item.total += json[i][yAxisColumn];

                    }


                }
            });


        }

        createTable(GS[c].dataset[GS[c].drillLevel], drillCategories[GS[c].drillLevel], c);


        //Stack data
        GS[c].dataset[0].stack
            .keys(GS[c].dataset[0].keys.reverse());

        //Data, stacked
        GS[c].dataset[0].series = GS[c].dataset[0].stack(GS[c].dataset[0].data);


        //Set up scales
        GS[c].xScale = d3.scaleBand()
            .domain(GS[c].dataset[0].data.map(function (d) { return d.date; }))
            .rangeRound([0, width])
            .padding(0.1);

        GS[c].yScale = d3.scaleLinear()
            .domain([0,
                d3.max(GS[c].dataset[0].data, function (d) {
                    //console.log(d);
                    var sum = 0;

                    GS[c].dataset[0].keys.forEach(function (item) {
                        sum += d[item];
                    });

                    return sum;
                }) * GS[c].roomForBack //multiply max y to allow room for "back" button
            ])
            .rangeRound([height, GS[c].margin.top / 4])//rangeRound - Round to the nearest whole number to avoid blur edges
            .nice();

        //Define X axis
        GS[c].xAxis = d3.axisBottom()
            .scale(GS[c].xScale)
            .ticks(10)
            .tickFormat(formatTime);

        //Define Y axis
        GS[c].yAxis = d3.axisRight()
            .scale(GS[c].yScale)
            .ticks(5);




        // Add a group for each row of data
        var groups = GS[c].svg.selectAll("g.level-" + GS[c].drillLevel)
            .data(GS[c].dataset[0].series)
            .enter()
            .append("g")
            .attr("class", function (d) { return "level-" + GS[c].drillLevel + " " + cleanName(d.key); })
            .style("fill", function (d, i) {
                return colors(i);
            })
            .attr("opacity", 1);


        // Add a rect for each data value
        var rects = groups.selectAll("rect")
            .data(function (d, key) {
                //d.data;
                d.forEach(function (item) {
                    item.level = d.key;
                    item.headcount = item[1] - item[0];
                })
                //console.log(d);
                return d;
            })
            .enter()
            .append("rect")
            .attr("class", function (d) {
                return "level-" + GS[c].drillLevel + " " + cleanName(d.level) + "-" + formatTime(d.data.date);
            })
            .attr("x", function (d, i) {
                return GS[c].xScale(d.data.date);
            })
            .attr("y", function (d) {
                return GS[c].yScale(d[1]);
            })
            .attr("height", function (d) {
                return GS[c].yScale(d[0]) - GS[c].yScale(d[1]);
            })
            .attr("width", GS[c].xScale.bandwidth())
            .attr("opacity", 1)
            .append("title")
            .text(function (d) {
                return formatTime(d.data.date) + " " + d.level + ": " + d.headcount;
            });

        if (showTotals) {

            var totalsText = GS[c].svg.selectAll(".level-" + GS[c].drillLevel + ".totals-text")
                .data(GS[c].dataset[0].data)
                .enter()
                .append("text")
                .text(function (d) { return formatNumberComma(d.total); })
                .attr("class", "level-" + GS[c].drillLevel + " totals-text")
                .attr("text-anchor", "middle")
                .attr("x", function (d, i) {
                    return GS[c].xScale(d.date) + GS[c].xScale.bandwidth() / 2;;
                })
                .attr("y", function (d) { return (GS[c].yScale(d.total) - GS[c].totalsPadding); })
                .attr("font-family", "Roboto")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .attr("opacity", 1);
        }

        //Create axes
        GS[c].svg.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(0," + height + ")")
            .call(GS[c].xAxis);

        GS[c].svg.append("g")
            .attr("class", "axis y")
            .attr("transform", "translate(" + width + ", 0)")
            .call(GS[c].yAxis);

        //console.log(rects);


        //if(drillCategories.length > (GS[c].drillLevel + 1){
        drillDownDeeper(drillCategories, json, GS[c].dataset, xAxisColumn, yAxisColumn, c, showTotals);
        //}//if(drillCategories>1)...

        highlightItems(c);
        clickRow(c);



    })//d3.json

}//drillDownZeroLevel

function drillDownDeeper(drillCategories, json, dataset, xAxisColumn, yAxisColumn, c, showTotals) {


    if (drillCategories.length > (GS[c].drillLevel + 1)) {

        var selectedRect = GS[c].svg.selectAll("g.level-" + GS[c].drillLevel + " rect")
            .on("click", function (d) {

                //console.log(d);

                //Drilling down to the next level category
                GS[c].drillLevel++;


                //Currently selected higher level category, a parameter for this data level
                var thisCategory = d[drillCategories[GS[c].drillLevel - 1]];

                GS[c].drillPath.push(thisCategory);


                for (var i = 0; i < json.length; i++) {

                    //PROBABLY BAD DESIGN, TRY TO IMPROVE
                    //temp var to store whether this category in this chain of right parents
                    var thisFilter = true;

                    //Check if this Category belongs to parent category(ies)
                    GS[c].drillPath.forEach(function (item, index) {
                        if (json[i][drillCategories[index]] != item) {
                            thisFilter = false;
                        }
                    });


                    if (json[i][drillCategories[GS[c].drillLevel - 1]] == thisCategory && thisFilter) {

                        // console.log('*********');
                        // console.log(json[i][drillCategories[GS[c].drillLevel-1]]);

                        //Collecting unique category values
                        if (GS[c].dataset[GS[c].drillLevel].keys.indexOf(json[i][drillCategories[GS[c].drillLevel]]) == -1) {

                            GS[c].dataset[GS[c].drillLevel].keys.push(json[i][drillCategories[GS[c].drillLevel]]);

                        }




                        //Search for existing value X dataset array of objects
                        var foundValueX = GS[c].dataset[GS[c].drillLevel].data.find(function (item) {

                            //temp vars to make dates comparison properly
                            var itemdate = item.date.getTime();
                            var jsondate = parseTime(json[i][xAxisColumn]).getTime();

                            return (item.date.getTime() === parseTime(json[i][xAxisColumn]).getTime());
                        });


                        //If value X was not found push a new object into the object of arrays
                        if (!foundValueX) {

                            //Create a new object with unique year(date)
                            GS[c].dataset[GS[c].drillLevel].data.push({
                                date: parseTime(json[i][xAxisColumn]),
                                total: 0
                            });
                        }



                        //Run through all existing drill data, summarizing values for each drill level item
                        GS[c].dataset[GS[c].drillLevel].data.forEach(function (item, index) {

                            //temp vars to make dates comparison properly
                            var itemdate = item.date.getTime();
                            var jsondate = parseTime(json[i][xAxisColumn]).getTime();

                            //compare dates in drill data to json, add a level property with headcount
                            if (itemdate === jsondate) {

                                //Summarize data for each college
                                if (item[json[i][drillCategories[GS[c].drillLevel]]]) {
                                    item[json[i][drillCategories[GS[c].drillLevel]]] += json[i][yAxisColumn];
                                    item.total += json[i][yAxisColumn];
                                    //console.log(item);
                                } else {
                                    item[json[i][drillCategories[GS[c].drillLevel]]] = json[i][yAxisColumn];
                                    item.total += json[i][yAxisColumn];
                                    //console.log(item);
                                }


                            }
                        });


                    }
                }



                createTable(GS[c].dataset[GS[c].drillLevel], drillCategories[GS[c].drillLevel], c);

                //Stack data
                GS[c].dataset[GS[c].drillLevel].stack
                    .keys(GS[c].dataset[GS[c].drillLevel].keys.reverse());

                //Data, stacked
                GS[c].dataset[GS[c].drillLevel].series = GS[c].dataset[GS[c].drillLevel].stack(GS[c].dataset[GS[c].drillLevel].data);


                //Set up scales
                GS[c].xScale.domain(GS[c].dataset[GS[c].drillLevel].data.map(function (d) { return d.date; }));

                GS[c].yScale.domain([0,
                    d3.max(GS[c].dataset[GS[c].drillLevel].data, function (d) {
                        return d.total;
                    }) * GS[c].roomForBack //multiply max y to allow room for "back" button
                ])
                    .nice();


                //Hide 0 layer
                GS[c].svg.selectAll("g.level-" + (GS[c].drillLevel - 1))
                    .transition()
                    .duration(500)
                    .attr("opacity", 0)
                    .on("end", function () {
                        d3.select(this).style("visibility", "hidden");
                    });

                if (showTotals) {

                    GS[c].svg.selectAll(".level-" + (GS[c].drillLevel - 1) + ".totals-text").transition().duration(500).attr("opacity", 0);

                }

                // Add a group for each row of data
                var groupsDrilled = GS[c].svg.selectAll("g.level-" + GS[c].drillLevel)
                    .data(GS[c].dataset[GS[c].drillLevel].series)
                    .enter()
                    .append("g")
                    .attr("class", function (d) { return "level-" + GS[c].drillLevel + " " + cleanName(d.key); })
                    .style("fill", function (d, i) {
                        return colors(i);
                    })
                    .attr("opacity", 1);


                // Add a rect for each data value
                var rectsDrilled = groupsDrilled.selectAll("rect.level-" + GS[c].drillLevel)
                    .data(function (d, key) {
                        //d.data;
                        d.forEach(function (item) {
                            //console.log(item);
                            item[drillCategories[GS[c].drillLevel]] = d.key;
                            item.headcount = item[1] - item[0];
                        })
                        //console.log(d);
                        return d;
                    })
                    .enter()
                    .append("rect")
                    .attr("class", function (d) {
                        return "level-" + GS[c].drillLevel + " " + cleanName(d[drillCategories[GS[c].drillLevel]]) + "-" + formatTime(d.data.date);
                    })
                    .attr("x", function (d, i) {
                        return GS[c].xScale(d.data.date);
                    })
                    .attr("y", function (d) {
                        if (isNaN(d[0]) || isNaN(d[1])) {
                            return 0;
                        } else {
                            // console.log("GS[c].drillLevel="+GS[c].drillLevel);
                            // console.log(yScale.domain());
                            // console.log(d[1]);
                            // console.log(yScale(d[1]));
                            return GS[c].yScale(d[1]);
                        }
                    })
                    .attr("height", function (d) {
                        if (isNaN(d[0]) || isNaN(d[1])) {
                            return 0;
                        } else {
                            return GS[c].yScale(d[0]) - GS[c].yScale(d[1]);
                        }

                    })
                    .attr("width", GS[c].xScale.bandwidth())
                    .attr("opacity", 0)
                    .append("title")
                    .text(function (d) {
                        return formatTime(d.data.date) + " " + d[drillCategories[GS[c].drillLevel]] + ": " + d.headcount;
                    });

                if (showTotals) {

                    var totalsTextDrilled = GS[c].svg.selectAll(".level-" + GS[c].drillLevel + ".totals-text")
                        .data(GS[c].dataset[GS[c].drillLevel].data)
                        .enter()
                        .append("text")
                        .text(function (d) { return formatNumberComma(d.total); })
                        .attr("class", "level-" + GS[c].drillLevel + " totals-text")
                        .attr("text-anchor", "middle")
                        .attr("x", function (d, i) {
                            return GS[c].xScale(d.date) + GS[c].xScale.bandwidth() / 2;;
                        })
                        .attr("y", function (d) { return (GS[c].yScale(d.total) - GS[c].totalsPadding); })
                        .attr("font-family", "Roboto")
                        .attr("font-size", "11px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .attr("opacity", 0)
                        .transition()
                        .delay(500)
                        .duration(1000)
                        .attr("opacity", 1);
                }

                groupsDrilled.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("opacity", 1);



                GS[c].svg.select("g.axis.x")
                    .transition()
                    .duration(1000)
                    .call(GS[c].xAxis);

                GS[c].svg.select("g.axis.y")
                    .transition()
                    .duration(1000)
                    .call(GS[c].yAxis);

                //------------REWORK------------

                //show back button
                var btn = GS[c].svg.select(".back-button")
                    .style("visibility", "visible")
                    .moveToFront();

                btn.selectAll("text").remove();


                btn.append("text")
                    .attr("x", 7)
                    .attr("y", 20)
                    .html("&#9668; Back to " + drillCategories[GS[c].drillPath.length - 1]);
                //.html("&#9668; Back to " + currentCategoryLevel[GS[c].drillPath.length-1]);
                //------------REWORK------------

                drillDownDeeper(drillCategories, json, GS[c].dataset, xAxisColumn, yAxisColumn, c, showTotals);

                highlightItems(c);
                clickRow(c);

            });//.on("click")...
    }
}// function drillDownDeeper()

function createTable(currentDataset, currentDrillCategory, c) {

    var dataForTable = currentDataset.data;

    var keysForTable = currentDataset.keys;

    var transposed = [];

    //var jqTest = $("#tablePlaceholder");

    //Going through keys (stack function) that are used as first column in the table
    keysForTable.forEach(function (keyItem, index) {

        //Pushing an empty array to be able to use push
        transposed.push([]);
        transposed[transposed.length - 1].push(keyItem);

        //Going through rows, pushing appropriate GS[c].drillLevel items' values
        dataForTable.forEach(function (dataItem, index) {

            if (!dataItem[keyItem]) {
                transposed[transposed.length - 1].push("-");
            } else {
                transposed[transposed.length - 1].push(formatNumberComma(dataItem[keyItem]));
            }
        });
    });

    //Inserting row in the begging of the array with years
    transposed.unshift([]);
    transposed[0].push(firstToUpper(currentDrillCategory));

    //Appending totals in the end of array
    transposed.push(["Total"]);

    dataForTable.forEach(function (item, index) {
        transposed[0].push(formatTime(item.date)); //Convert data to string
        transposed[transposed.length - 1].push(formatNumberComma(item.total));

    });

    generateHtmlTable(transposed, c);

    selectRows(c + "-table");


}//createTable

function generateHtmlTable(tableData, c) {
    // get the reference for the placeholder
    var placeholder = document.getElementById(c.slice(1) + "-table-placeholder"); //slice # from containerId

    console.log(tableData);

    placeholder.innerHTML = "";

    //console.log(placeholder);

    // creates a <table> element and a <tplaceholder> element
    var tbl = document.createElement("table");
    var expLink = document.createElement("button");



    tbl.id = c.slice(1) + "-table"; //Slicing beginning '#' from containerId
    tbl.className = "table table-hover text-right table-report";

    tbl.setAttribute("style", "display: none;");

    expLink.setAttribute("onclick", "exportToExcel('" + tbl.id + "')");
    expLink.setAttribute("class", "btn btn-link");
    expLink.innerHTML = "Export to Excel";

    // creating all cells

    var isSingleCategory = tableData.length < 4 ? 1 : 0;

    for (var i = 0; i < tableData.length - isSingleCategory; i++) {
        // creates a table row
        var row = document.createElement("tr");

        row.className = tableData[i][0] ? "level-" + GS[c].drillLevel + " " + cleanName(tableData[i][0]) : "";

        for (var j = 0; j < tableData[0].length; j++) {
            //console.log(tableData[i][j]);
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = (i === 0 ? document.createElement("th") : document.createElement("td"));


            var cellText = document.createTextNode(tableData[i][j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table placeholder
        tbl.appendChild(row);
    }

    // appends <table> into <placeholder>
    placeholder.appendChild(tbl);

    placeholder.appendChild(expLink);

    drillDownPath(c);

    $(c + "-table").fadeIn(200);

}//generateHtmlTable

function highlightItems(c) {

    $(c + ' g[class^="level-"]').hover(
        function () {
            $(this).siblings('g[class^="level-"]').addClass("fillGray");
            //console.log($(c + "-table"));
            var allElems = $(this).attr("class").replace(/ /g, ".");
            //console.log($(this).attr("class"));
            $(c + "-table tr." + allElems).addClass("highlightRow");
        },
        function () {
            $(this).siblings('g[class^="level-"]').removeClass("fillGray");
            var allElems = $(this).attr("class").replace(/ /g, ".");
            $(c + "-table tr." + allElems).removeClass("highlightRow");
        }
    );

    $(c + "-table" + " tr[class^='level-']").hover(
        function () {

            var classes = $(this).attr("class").replace(/ /g, ".");

            $(c + " g." + classes).siblings('g[class^="level-"]').addClass("fillGray");
            //console.log($(c + " g." + classes).siblings('g[class^="level-"]'));
            $(this).addClass("highlightRow");


        },
        function () {
            var classes = $(this).attr("class").replace(/ /g, ".").replace(".highlightRow", ".fillGray");


            // console.log($(c + " g[class^='level-']"));
            // console.log(classes);
            // console.log(c + " g." + classes);


            //$(c + " g." + classes).siblings('g[class^="level-"]').removeClass("fillGray");
            $(c + " g[class^='level-']").removeClass("fillGray");


            $(this).removeClass("highlightRow");
        }
    );


}

function clickRow(c) {
    $(c + "-table" + " tr[class^='level-']").click(function () {
        var classes = $(this).attr("class").replace(/ /g, ".").replace(".highlightRow", "");

        var firstChild = d3.select(c + " g." + classes + " rect");

        if (firstChild._groups[0][0] !== null) {

            firstChild.on("click")(firstChild.datum());

        }
    });
}

function createBackButton(c, drillCategories, showTotals) {

    //Create back button
    var backButton = GS[c].svg.append("g")
        .attr("class", "back-button")
        .style("visibility", "hidden") //Initially hidden
        .classed("unclickable", true)
        .attr("transform", "translate(" + 0 + "," + 0 + ")");

    backButton.append("text")
        .attr("x", 7)
        .attr("y", 20);

    //Define click behavior
    backButton.on("click", function () {

        if (GS[c].drillLevel == 0) {
            return;
        } else {

            //Lowering a drill level
            GS[c].drillLevel--;

            //Remove the very last element from drill sequence
            GS[c].drillPath.pop();


            if (GS[c].drillLevel > 0) {
                backButton.style("visibility", "visible");
            } else {
                backButton.style("visibility", "hidden"); //Initially hidden
            }


            createTable(GS[c].dataset[GS[c].drillLevel], drillCategories[GS[c].drillPath.length], c);

            //show back button
            var btn = GS[c].svg.select(".back-button");

            btn.selectAll("text").remove();

            btn.append("text")
                .attr("x", 7)
                .attr("y", 20)
                .html("&#9668; Back to " + drillCategories[GS[c].drillPath.length - 1]);

            //Set up scales
            GS[c].xScale.domain(GS[c].dataset[GS[c].drillLevel].data.map(function (d) { return d.date; }));

            GS[c].yScale.domain([0,
                d3.max(GS[c].dataset[GS[c].drillLevel].data, function (d) {
                    return d.total;
                }) * GS[c].roomForBack //multiply max y to allow room for "back" button
            ])
                .nice();


            //Hide 0 layer
            GS[c].svg.selectAll("g.level-" + (GS[c].drillLevel + 1))
                .transition()
                .duration(500)
                .attr("opacity", 0)
                .on("end", function () {
                    d3.select(this).style("visibility", "hidden");
                })
                .remove();

            if (showTotals) {
                GS[c].svg.selectAll(".level-" + (GS[c].drillLevel + 1) + ".totals-text")
                    .transition()
                    .duration(500)
                    .attr("opacity", 0)
                    .remove();
            }

            GS[c].dataset[GS[c].drillLevel + 1] = {
                //dates: [], //Helper array, collects a unique set of dates (In General: xAxisColumn)
                keys: [], //Keys stacking, here: Und, Grad, Prof; deeper level: AHS, Business, etc.
                data: [], //Array of data for drill levels
                stack: d3.stack(), //Stack function
                series: undefined, //Placeholder for stacked data
            };


            // Add a group for each row of data
            var groupsDrilled = GS[c].svg.selectAll("g.level-" + GS[c].drillLevel)
                .attr("opacity", 0)
                .style("visibility", "visible")
                .transition()
                .duration(1000)
                .attr("opacity", 1);

            groupsDrilled.selectAll("rect")
                .transition()
                .duration(1000)
                .attr("opacity", 1);

            if (showTotals) {

                var totalsTextDrilled = GS[c].svg.selectAll(".level-" + GS[c].drillLevel + ".totals-text")
                    .transition()
                    .duration(1000)
                    .attr("opacity", 1);
            }


            GS[c].svg.select("g.axis.x")
                .transition()
                .duration(1000)
                .call(GS[c].xAxis);

            GS[c].svg.select("g.axis.y")
                .transition()
                .duration(1000)
                .call(GS[c].yAxis);
        }

        highlightItems(c);
        clickRow(c);


    });//backButton on click
}


function exportToExcel(tableId) {
    var tabText = "<table border='2px'>";
    var textRange;
    var j = 0;

    tab = document.getElementById(tableId); // id of table

    console.log(tab);

    for (j = 0; j < tab.rows.length; j++) {
        tabText = tabText + tab.rows[j].innerHTML + "</tr>";
        //tabText=tabText+"</tr>";
    }

    tabText = tabText + "</table>";
    tabText = tabText.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tabText = tabText.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tabText = tabText.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(tabText);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand("SaveAs", true, "Export.xls");
        return (sa);
    }
    else                 //other browser not tested on IE 11
        //sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tabText));

        var uri = 'data:application/vnd.ms-excel,' + encodeURIComponent(tabText);
    var downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = "Export.xls";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function drillDownPath(c) {

    var drillPathElem = $(c + '-drill-level');
    //console.log(drillPathElem);

    var drillPath = GS[c].drillPath.length > 0 ? GS[c].drillPath.toString().replace(",", ", ") : "University wide";
    drillPathElem.html(drillPath);
}


//drillDownZeroLevel(
//    "/data/degree-program-depts-sample.json",
//    "date",
//    "headcount",
//    ["level", "college", "department"],
//    "#degree-program-chart",
//    false
//);

//drillDownZeroLevel(
//    "/data/degree-program-depts-sample.json",
//    "date",
//    "headcount",
//    ["level", "college", "department"],
//    "#degree-program-chart2",
//    true
//);

function selectRows(tId) {
    var tableRows = document.querySelectorAll(tId + " tr");
    //console.log(tableRows); <----- WORK WITH THIS
}
