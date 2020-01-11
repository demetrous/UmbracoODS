
(function () {



  $('#reportContent').append(`
    <div class="row justify-content-center mb-5">

        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-outline-secondary active">
            <input type="radio" name="options" value="2013" autocomplete="off" checked> 2013
          </label>
          <label class="btn btn-outline-secondary">
            <input type="radio" name="options" value="2014" autocomplete="off"> 2014
          </label>
          <label class="btn btn-outline-secondary">
            <input type="radio" name="options" value="2015" autocomplete="off"> 2015
          </label>
          <label class="btn btn-outline-secondary">
            <input type="radio" name="options" value="2016" autocomplete="off"> 2016
          </label>
          <label class="btn btn-outline-secondary">
            <input type="radio" name="options" value="2017" autocomplete="off"> 2017
          </label>
        </div>

    </div>
    <div class="row justify-content-center row-margin">   
      <div class="col-12">       
        <div id="areaChart" class="pb-4 px-4"></div>
      </div>
    </div>`);




})();


const chartData = {
  2013: {
    categories: [
      '1st Fall, 2013',
      '1st Spring, 2014',
      '1st Year Rate for 2nd Fall, 2014',
      '1st Year Rate for 2nd Spring, 2015',
      '2nd Year Rate for 3rd Fall, 2015',
      '2nd Year Rate for 3rd Spring, 2016',
      '3nd Year Rate for 4th Fall, 2016',
      '3nd Year Rate for 4th Spring, 2017',
      '4th Year Rate for 5th Fall, 2017',
      '4th Year Rate for 5th Spring, 2018',
      '5th Year Rate for 6th Fall, 2018',
      '5th Year Rate for 6th Spring, 2019'],
    series: [{
      name: 'Graduated',
      data: [0, 0, 0, 0, 4, 11, 42, 119, 600, 898, 1284, 1446],
      color: '#75de66'
    },
    {
      name: 'Still Enrolled',
      data: [3564, 3229, 2735, 2542, 2344, 2233, 2148, 1991, 1442, 1106, 688, 493],
      color: '#2b83ba'
    },

    {
      name: 'Not Enrolled',
      data: [0, 335, 829, 1022, 1216, 1320, 1374, 1454, 1522, 1560, 1592, 1625],
      color: '#f39951'
    }]
  },
  2014: {
    categories: ['1st Fall, 2014', '1st Spring, 2015', '2nd Fall, 2015', '2nd Spring, 2016', '3rd Fall, 2016', '3rd Spring, 2017', '4th Fall, 2017', '4th Spring, 2018', '5th Fall, 2018', '5th Spring, 2019'],
    series: [{
      name: 'Graduated',
      data: [0, 0, 0, 0, 2, 8, 36, 123, 638, 963],
      color: '#75de66'
    },
    {
      name: 'Still Enrolled',
      data: [3716, 3364, 2754, 2613, 2461, 2329, 2228, 2064, 1466, 1108],
      color: '#2b83ba'
    },

    {
      name: 'Not Enrolled',
      data: [0, 352, 962, 1103, 1253, 1379, 1452, 1529, 1612, 1645],
      color: '#f39951'
    }]
  },
  2015: {
    categories: ['1st Fall, 2015', '1st Spring, 2016', '2nd Fall, 2016', '2nd Spring, 2017', '3rd Fall, 2017', '3rd Spring, 2018', '4th Fall, 2018', '4th Spring, 2019'],
    series: [{
      name: 'Graduated',
      data: [0, 0, 0, 0, 6, 11, 46, 161],
      color: '#75de66'
    },
    {
      name: 'Still Enrolled',
      data: [3658, 3360, 2821, 2613, 2458, 2304, 2198, 2004],
      color: '#2b83ba'
    },

    {
      name: 'Not Enrolled',
      data: [0, 298, 837, 1045, 1194, 1343, 1414, 1493],
      color: '#f39951'
    }]
  },
  2016: {
    categories: ['1st Fall, 2016', '1st Spring, 2017', '1 Year Rate for 2nd Fall, 2017', '2nd Spring, 2018', '3rd Fall, 2018', '3rd Spring, 2019'],
    series: [{
      name: 'Graduated',
      data: [0, 0, 0, 1, 9, 19],
      color: '#75de66'
    },
    {
      name: 'Still Enrolled',
      data: [3752, 3390, 2793, 2564, 2394, 2283],
      color: '#2b83ba'
    },

    {
      name: 'Not Enrolled',
      data: [0, 362, 959, 1187, 1349, 1450],
      color: '#f39951'
    }]
  },
  2017: {
    categories: ['1st Fall, 2017', '1st Spring, 2018', '2nd Fall, 2018', '2nd Spring, 2019'],
    series: [{
      name: 'Graduated',
      data: [0, 0, 0],
      color: '#75de66'
    },
    {
      name: 'Still Enrolled',
      data: [3671,	3073,	2893],
      color: '#2b83ba'
    },

    {
      name: 'Not Enrolled',
      data: [377, 975, 1155],
      color: '#f39951'
    }]
  }
};


$(".btn-group > .btn ").on("click", function () {
  //num = +this.innerHTML;
  //alert("Value is " + num);

  let valueSelected = $(this).children("input").attr("value");

  const updateData = { ...chartData[valueSelected] };

  updateChart(updateData);

  console.log(valueSelected);

  console.log(chartData[valueSelected]);


});



createPersistenceChart = (data) => {

  const { categories, series } = data;


  Highcharts.chart('areaChart', {
    chart: {
      type: 'area',
      height: 700,
      style: {
        fontFamily: 'Roboto'
      }
    },
    title: {
      text: ''
    },
    //subtitle: {
    //  text: 'Source: Wikipedia.org'
    //},
    xAxis: {
      categories: categories, //['1st Fall, 2013', '1st Spring, 2014', '2nd Fall, 2014', '2nd Spring, 2015', '3rd Fall, 2015', '3rd Spring, 2016', '4th Fall, 2016', '4th Spring, 2017', '5th Fall, 2017', '5th Spring, 2018', '6th Fall, 2018', '6th Spring, 2019'],
      tickmarkPlacement: 'on',
      title: {
        enabled: false
      }
    },
    yAxis: {
      title: {
        text: 'Headcount'
      }
      ,
      labels: {
        formatter: function () {
          return this.value;// / 1000;
        }
      }
    },
    tooltip: {
      split: true,
      pointFormat: '{series.name}: <b>{point,y}</b><br/><b>{point.percentage:.0f}%</b>',
      //formatter: function () { console.log(this); },
      //valueSuffix: ' {point.percentage}'
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        //lineColor: '#666666',
        lineWidth: 1,
        marker: {

          radius: 3,
          symbol: 'circle',
          states: {
            hover: {
              enabled: true,
              radius: 5,
              //radiusPlus: 2,
              //lineColor: '#ff0000',
              //fillColor: '#ff0000'
            }
          }
          //enabled: false,
          //lineWidth: 1,
          //lineColor: '#666666'
        }
      }
    },
    series: series
  });
};



updateChart = ({ categories, series }) => {

  let chart = $(`#areaChart`).highcharts();

  //let chartCategories = [];

  //let chartSeries = [{
  //  name: 'Graduated',
  //  data: [0, 0, 0, 0, 4, 11, 42, 219, 700, 898, 1584, 2446],
  //  color: '#75de66'
  //},
  //{
  //  name: 'Still Enrolled',
  //  data: [3564, 3229, 3735, 2542, 2344, 2233, 2148, 1991, 2442, 3106, 688, 493],
  //  color: '#2b83ba'
  //},

  //{
  //  name: 'Not Enrolled',
  //  data: [0, 335, 829, 1022, 1216, 2320, 1374, 1454, 1522, 1560, 1592, 1625],
  //  color: '#f39951'
  //}];


  chart.update({
    xAxis: {
      categories: categories
    },
    series: series
  });

  chart.redraw();
};

//=========================================================================

//CUSTOM, main function, puts everything together
function updateAll() {





  createPersistenceChart(chartData[2013]);




}








