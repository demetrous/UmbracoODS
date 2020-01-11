// Setup svg using Bostock's margin convention

var margin = {
  top: 20,
  right: 160,
  bottom: 35,
  left: 30
};

var width = 563 - margin.left - margin.right,
  height = 245 - margin.top - margin.bottom;

var svg = d3.select("#degree-program-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Data in strings like it would be if imported from a csv */

var data = [{
    year: "2012",
    redDelicious: "22432",
    mcintosh: "4204",
    oranges: "776"
  },
  {
    year: "2013",
    redDelicious: "23099",
    mcintosh: "4023",
    oranges: "742"
  },
  {
    year: "2014",
    redDelicious: "23813",
    mcintosh: "4010",
    oranges: "715"
  },
  {
    year: "2015",
    redDelicious: "23801",
    mcintosh: "4106",
    oranges: "713"
  },
  {
    year: "2016",
    redDelicious: "24715",
    mcintosh: "4288",
    oranges: "717"
  },
  {
    year: "2017",
    redDelicious: "25282",
    mcintosh: "4429",
    oranges: "776"
  }
];

var parse = d3.time.format("%Y").parse;


// Transpose the data into layers
var dataset = d3.layout.stack()(["redDelicious", "mcintosh", "oranges"].map(function(fruit) {
  return data.map(function(d) {
    return {
      x: parse(d.year),
      y: +d[fruit]
    };
  });
}));


// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(dataset[0].map(function(d) {
    return d.x;
  }))
  .rangeRoundBands([10, width - 10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d3.max(d, function(d) {
      return d.y0 + d.y;
    });
  })])
  .range([height, 0]);

var colors = ["b33040", "#d25c4d", "#f2b447"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat(function(d) {
    return d
  });

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);


// Create groups for each series, rects for each segment
var groups = svg.selectAll("g.cost")
  .data(dataset)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) {
    return colors[i];
  });

var rect = groups.selectAll("rect")
  .data(function(d) {
    return d;
  })
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return x(d.x) + 5;
  })
  .attr("y", function(d) {
    return y(d.y0 + d.y);
  })
  .attr("height", function(d) {
    return y(d.y0) - y(d.y0 + d.y);
  })
  .attr("width", x.rangeBand() - 10)
  .on("mouseover", function() {
    tooltip.style("display", null);
  })
  .on("mouseout", function() {
    tooltip.style("display", "none");
  })
  .on("mousemove", function(d, i) {
    var xPosition = d3.mouse(this)[0] - 15;
    var yPosition = d3.mouse(this)[1] - 25;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d.y);
  });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) {
    return "translate(30," + i * 19 + ")";
  });

legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {
    return colors.slice().reverse()[i];
  });

legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) {
    return categoryName(i);
  });


// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g")
  .attr("class", "tooltip1")
  .style("display", "none");

tooltip.append("rect")
  .attr("width", 40)
  .attr("height", 20)
  .attr("fill", "white")
  .style("opacity", 0.5);

tooltip.append("text")
  .attr("x", 20)
  .attr("dy", "1.2em")
  .style("text-anchor", "middle")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");


function categoryName(i) {
  switch (i) {
    case 0:
      return "Professional";
    case 1:
      return "Graduate";
    case 2:
      return "Undergraduate";
  }
}




//***********************************

function studEnrl() {

  var data = [{
      "name": "Freshmen",
      "value": 6027,
    },
    {
      "name": "Sophomores",
      "value": 4888,
    },
    {
      "name": "Juniors",
      "value": 5560,
    },
    {
      "name": "Seniors",
      "value": 7722,
    },
    {
      "name": "Non-Admitted",
      "value": 518,
    }
  ];

  /*
  //sort bars based on value
  data = data.sort(function (a, b) {
      return d3.ascending(a.value, b.value);
  })*/

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 45,
    right: 50, //25,
    bottom: 15,
    left: 0 //was 60
  };

  var width = 563 - margin.left - margin.right,
    height = 315 - margin.top - margin.bottom;

  var svg = d3.select("#student-enrollment-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

  var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1)
    .domain(data.map(function(d) {
      return d.name;
    }));

  //make y axis to show bar names
  var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

  var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

  //append rects
  bars.append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function(d) {
      return x(d.value);
    });

  //add a value label to the right of each bar
  bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return y(d.name) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return x(d.value) + 3;
    })
    .text(function(d) {
      return d.value;
    });

}

function enrlByCollege() {

  var data = [{
      "name": "Allied Health Sciences",
      "value": 1971,
    },
    {
      "name": "Business",
      "value": 3296,
    },
    {
      "name": "Community Health Sciences",
      "value": 300,
    },
    {
      "name": "Education",
      "value": 1137,
    },
    {
      "name": "Engineering",
      "value": 2388,
    },
    {
      "name": "Fine Arts",
      "value": 1868,
    },
    {
      "name": "Hotel Administration",
      "value": 2262,
    },
    {
      "name": "Liberal Arts	",
      "value": 3158,
    },
    {
      "name": "Nursing",
      "value": 1502,
    },
    {
      "name": "Sciences",
      "value": 2759,
    },
    {
      "name": "Urban Affairs",
      "value": 2515,
    },
    {
      "name": "Academic Success Center",
      "value": 1458,
    }





  ];

  /*
  //sort bars based on value
  data = data.sort(function (a, b) {
      return d3.ascending(a.value, b.value);
  })*/

  //set up svg using margin conventions - we'll need plenty of room on the left for labels
  var margin = {
    top: 45,
    right: 50, //25,
    bottom: 15,
    left: 0 //was 60
  };

  var width = 563 - margin.left - margin.right,
    height = 658 - margin.top - margin.bottom;

  var svg = d3.select("#enrollment-by-college-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function(d) {
      return d.value;
    })]);

  var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], .1)
    .domain(data.map(function(d) {
      return d.name;
    }));

  //make y axis to show bar names
  var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

  var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

  var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

  //append rects
  bars.append("rect")
    .attr("class", "bar")
    .attr("y", function(d) {
      return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function(d) {
      return x(d.value);
    });

  //add a value label to the right of each bar
  bars.append("text")
    .attr("class", "label")
    //y position of the label is halfway down the bar
    .attr("y", function(d) {
      return y(d.name) + y.rangeBand() / 2 + 4;
    })
    //x position is 3 pixels to the right of the bar
    .attr("x", function(d) {
      return x(d.value) + 3;
    })
    .text(function(d) {
      return d.value;
    });

}
