
const rowContent = `
    <div class="row justify-content-center row-margin">
      <div class="col-10" id="drillDownChart">        
      </div>
    </div>`;


$('#reportContent').prepend(rowContent);


let chart = $(`#drillDownChart`).highcharts();



createChart = () => {
  let postData = {
    CensusKey: 'EP2198', //$('#inputGroupSelect_censusKey').val(),
    AcadCareer: 'All',//$('#inputGroupSelect_acadCareer').val(),
    PlanCollege: 'All'//isLawsDentMed('#inputGroupSelect_acadCareer')
    //? 'All'
    //: $('#inputGroupSelect_planCollege option:selected').val()
  };

  let rootUrl = APP_URL;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/HeadcountByCollegeRaceAndGender',
    dataType: 'json',
    data: postData,

    beforeSend: function () {

    },

    success: function (data) {


      console.log(data);

      let initSeries = [];


      initSeries = [{
        name: 'Colleges',
        colorByPoint: true,
        data: [{
          name: 'Animals',
          y: 5,
          drilldown: true
        }, {
          name: 'Fruits',
          y: 2,
          drilldown: true
        }, {
          name: 'Cars',
          y: 4,
          drilldown: true
        }]
      }];


      let colleges = {};

      data.allCollegesTable.map((row) => {



        //let indexOfRaceName = raceEthnicityData.findIndex(raceEthn => raceEthn.raceEthnicity === row.raceEthnicity);

        //if (indexOfRaceName == -1) {
        //  raceEthnicityData.push({
        //    raceEthnicity: row.raceEthnicity,
        //    female: row.female,
        //    male: row.male,
        //    total: row.total
        //  });
        //} else {

        //  raceEthnicityData[indexOfRaceName].female += row.female;
        //  raceEthnicityData[indexOfRaceName].male += row.male;
        //  raceEthnicityData[indexOfRaceName].total += row.total;
        //}


        console.log(row);

      });
    


      // Create the chart
      Highcharts.chart('drillDownChart', {
        chart: {
          type: 'column',
          events: {
            drilldown: function (e) {
              if (!e.seriesOptions) {

                var chart = this,
                  drilldowns = {
                    Animals: {
                      name: 'Animals',
                      data: [
                        ['Cows', 2],
                        ['Sheep', 3]
                      ]
                    },
                    Fruits: {
                      name: 'Fruits',
                      data: [
                        ['Apples', 5],
                        ['Oranges', 7],
                        ['Bananas', 2]
                      ]
                    },
                    Cars: {
                      name: 'Cars',
                      data: [
                        ['Toyota', 1],
                        ['Volkswagen', 2],
                        ['Opel', 5]
                      ]
                    }
                  },
                  series = drilldowns[e.point.name];

                // Show the loading label
                chart.showLoading('Simulating Ajax ...');

                setTimeout(function () {
                  chart.hideLoading();
                  chart.addSeriesAsDrilldown(e.point, series);
                }, 1000);
              }

            }
          }
        },
        title: {
          text: 'Async drilldown'
        },
        xAxis: {
          type: 'category'
        },

        legend: {
          enabled: false
        },

        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true
            }
          }
        },

        // Initial series to get from ajax
        series: initSeries,

        drilldown: {
          series: []
        }
      });


    },

    error: function (ex) {
      let r = jQuery.parseJSON(response.responseText);
      alert("Message: " + r.Message);
      alert("StackTrace: " + r.StackTrace);
      alert("ExceptionType: " + r.ExceptionType);

    }
  });
};


if (chart === undefined) createChart();




