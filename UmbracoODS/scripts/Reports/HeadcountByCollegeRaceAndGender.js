

// Begin scoping function
(function () {


  let ferpaPlaceholder = '<div id="ferpaPlaceholder" class="alert alert-warning small" style="display: none !important;">The below content may contain information that is protected under <a href="http://www.ed.gov/policy/gen/guid/fpco/ferpa/index.html" target="_blank">FERPA (the Family Educational Rights Privacy Act)</a>. You are granted access to this information in your capacity as a UNLV employee. As a reminder, in reporting information, if cell size (typically 10 or fewer) or other information would make a student’s identity "easily traceable," that information would be considered "personally identifiable." <a href="http://www.ed.gov/policy/gen/reg/ferpa/index.html" target="_blank"> See 34 CFR § 99.3.</a> The educational agency or institution should use generally accepted statistical principles and methods to ensure that the data are reported in a manner that fully prevents the identification of students. If that cannot be done, the data must not be reported.</div>';
  $('#reportContent').prepend(ferpaPlaceholder);

  let loaderDiv = $(`<div id="loaderDiv" class="d-flex justify-content-center p-4">
                          <div class="spinner-border text-danger" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        </div>`);    //WIP: Image to local res
  $('#reportContent').append(loaderDiv);


  //let loaderDiv = $('<div id="loaderDiv" class="text-center p-4"><img src="https://ir.unlv.edu/images/ajax-loader.gif" /></div>');    //WIP: Image to local res
  //$('#reportContent').append(loaderDiv);

  let noDataPlaceholder = '<div id="noDataPlaceholder" class="alert alert-warning text-center p-4" style="display: none !important; font-size: 1.5em; font-weight:300;">No data available for the selected parameters</div>';
  $('#reportContent').prepend(noDataPlaceholder);

  let controlsPlaceholder = $('<div id="controlsPlaceholder" class="d-flex flex-row mb-3" />');
  $('#reportContent').prepend(controlsPlaceholder);



  const rowContent = `
    <div class="row row-margin">
      <div class="col-lg-6">
        <table id="reportContentDataTable" class="hover"></table>
      </div>
      <div class="col-lg-6">       
        <div id="reportContentDataTable_pyramidChart" style="height: 600px;"></div>
      </div>
    </div>
<div class="row row-margin">
      <div class="col-lg-6">
        <div id="chartPlaceholder"></div>
      </div>
      <div class="col-lg-6">       
        <div id="chartPlaceholder2"></div>
      </div>
    </div>
`;


  $('#reportContent').append(rowContent);




  ////$('#reportContent').append('<div id="reportContentTable"></div><div id="stacked-bar" class="d-flex justify-content-center pb-5"></div>');





  //updateAll();


  //$.getJSON('/UmbracoODS/umbraco/api/ReportsApi/GetAllColleges')
  //    .done(function (data) {
  //        $.each(data, function(key, item) {
  //            console.log(key);
  //            console.log(item);
  //            console.log('************');
  //        });
  //    });

})();
// End scoping function



//GENERAL
function calcPercent(dividend, divisor) {
  return Math.round(dividend / divisor * 100) + '%'
}


//GENERAL
function showHideFerpaWarning(ferpa) {
  if (ferpa) {
    $('#ferpaPlaceholder').fadeIn("slow");
  } else {
    $('#ferpaPlaceholder').hide().fadeOut("slow");
  }
}

//GENERAL
function showHideNoDataWarning(noData) {
  if (noData) {
    $('#noDataPlaceholder').fadeIn("slow");
  } else {
    $('#noDataPlaceholder').hide().fadeOut("slow");
  }
}


//CUSTOM, checks if dropdown has LAWS or DENT values
function isLawsDentMed(ddSelector) {
  let acadCVal = $(ddSelector).val();

  if (acadCVal == "LAWS"
    || acadCVal == "DENT"
    || acadCVal == "MEDI") {
    return true;
  } else {
    return false;
  }
}


//CUSTOM, hides College dropdown if selected Academic Career value in "LAWS", "DENT", "D"
function showOrHideCollegeDropDown() {

  if (isLawsDentMed('#inputGroupSelect_acadCareer')) {

    $('#inputGroupSelect_planCollege').val("All");
    $('#inputGroupSelect_planCollege').prop('disabled', 'disabled');
    $('#InputGroup_planCollege').css('visibility', 'hidden');


  } else {
    $('#inputGroupSelect_planCollege').prop('disabled', false);
    $('#InputGroup_planCollege').css('visibility', 'visible');
  }
}


//CUSTOM, draws DataTable with given placeholder, data and separately calculated totals
function drawDataTable(tablePlaceholder, data, totals) {


  $(tablePlaceholder).DataTable().destroy();


  table = $(tablePlaceholder).DataTable({
    data: data,
    paging: false,
    info: false,
    searching: false,
    order: [], // to keep original sort order
    initComplete: function (settings, json) {

      $(this.api().column('.female-column.amount').footer()).html(totals.female);
      $(this.api().column('.female-column.percent').footer()).html(calcPercent(totals.female, totals.total));

      $(this.api().column('.male-column.amount').footer()).html(totals.male);
      $(this.api().column('.male-column.percent').footer()).html(calcPercent(totals.male, totals.total));

      $(this.api().column('.total-column.amount').footer()).html(totals.total);
      $(this.api().column('.total-column.percent').footer()).html(calcPercent(totals.total, totals.total));


    },
    columns: [
      {
        data: 'raceEthnicity'
      },
      {
        data: 'female',
        class: 'female-column amount'
      },
      {
        data: '%',
        class: 'female-column percent',                             // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.female / totals.total * 100) + '%';
        }
      },
      {
        data: 'male',
        class: 'male-column amount'
      },
      {
        data: '%',
        class: 'male-column percent',                               // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.male / totals.total * 100) + '%';
        }
      },
      {
        data: 'total',
        class: 'total-column amount'
      },
      {
        data: 'calculated column',
        class: 'total-column percent',                              // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.total / totals.total * 100) + '%';
        }
      }
    ]
    //,
    //order: [[5, "desc"]]
  });




}


//GENERAL, returns html with input group containing <select> dropdown
function createDropdownHtml(param) {

  let optionValue = Object.keys(param.data[0])[0]; //Getting value name for <option value='....>
  let optionText = Object.keys(param.data[0])[1]; //Getting text for <option >...</option>


  $(`#InputGroup_${param.id}`).remove();

  let inputGroupHtml = $(`<div id="InputGroup_${param.id}" class="input-group" ${param.htmlAttr}>
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect_${param.id}">
                                    ${param.name}
                                </label>
                            </div>
                          </div >`);

  let selectControlHtml = $(`<select id="inputGroupSelect_${param.id}" class="form-control" onchange="updateAll(this);" />`);

  $(inputGroupHtml).append(selectControlHtml);

  param.data.map(function (row) {
    $('<option />',
      { value: row[optionValue], text: row[optionText] }
    )
      .appendTo(selectControlHtml);
  });

  return $(inputGroupHtml);

}


//GENERAL, appends dropdown to container, param = {id: '...', name: '...', data: someJsonData}
function createDropDown(param) {

  $('#controlsPlaceholder').append(createDropdownHtml(param));
}


//CUSTOM, getting raceEthnicity data based on selected college
function getRaceEthnicityData(data, postData) {

  let raceEthnicityData = [];

  if (postData.PlanCollege != null && postData.PlanCollege !== "All" && data.allCollegesTable != null) {
    data.allCollegesTable.map((row) => {


      let indexOfRaceName = raceEthnicityData.findIndex(raceEthn => raceEthn.raceEthnicity === row.raceEthnicity);

      if (indexOfRaceName == -1) {
        raceEthnicityData.push({
          raceEthnicity: row.raceEthnicity,
          female: row.female,
          male: row.male,
          total: row.total
        });
      } else {

        raceEthnicityData[indexOfRaceName].female += row.female;
        raceEthnicityData[indexOfRaceName].male += row.male;
        raceEthnicityData[indexOfRaceName].total += row.total;
      }




    });
  } else {
    raceEthnicityData = data.raceEthnicityTable;
  }

  // sort by name
  raceEthnicityData.sort(function (a, b) {
    const totalA = a.total;
    const totalB = b.total;
    if (totalA < totalB) {
      return -1;
    }
    if (totalA > totalB) {
      return 1;
    }

    // names must be equal
    return 0;
  });


  return raceEthnicityData;
}


//CUSTOM, putting all together and placing all content into its placeholders
function generateTableAndCharts(raceEthnicityData) {


  let ferpa = false;
  let ferpaTreshold = 10;
  let barChartGenderData = [];
  let pyramidData = [{
    name: 'Male',
    data: []
  }, {
    name: 'Female',
    data: []
  }];

  let censusKeyText = null;
  let acadCareerText = null;
  let planCollegeText = null;

  let dataTotals = {
    female: 0,
    male: 0,
    total: 0
  };

  let female = [];
  let male = [];
  let categories = [];

  let barChartRaceData = [{
    name: "Female",
    data: female
  },
  {
    name: "Male",
    data: male
  }
  ];

  let pyramidCategories = [];





  raceEthnicityData.map((value, index, arr) => {

    //console.log(value);

    dataTotals.female += value.female;
    dataTotals.male += value.male;
    dataTotals.total += value.total;

    //highcharts data
    categories.unshift(value.raceEthnicity);
    female.unshift(value.female);
    male.unshift(value.male);

    barChartGenderData.unshift({
      name: value.raceEthnicity,
      data: [value.female, value.male]
    });



    pyramidData[0].data.push(value.male * -1);
    pyramidData[1].data.push(value.female);
    pyramidCategories.push(value.raceEthnicity);





    if (!ferpa && (value.female < ferpaTreshold || value.male < ferpaTreshold)) {
      ferpa = true;
    }
  });

  //console.log(pyramidData);
  //console.log(pyramidCategories);

  //#region $('#reportContentDataTable')
  $('#reportContentDataTable')
    .html(`
                    <thead>
                      <tr class='top-row'>
                        <th rowspan='2' class='race-ethnicity-column'>Race/Ethnicity</th>
                        <th colspan='2' class='female-column'>Female</th>
                        <th colspan='2' class='male-column'>Male</th>
                        <th colspan='2' class='total-column'>Total</th>
                      </tr>
                      <tr class='bottom-row'>
                        <th class='female-column amount'>#</th>
                        <th class='female-column percent'>%</th>
                        <th class='male-column amount'>#</th>
                        <th class='male-column percent'>%</th>
                        <th class='total-column amount'>#</th>
                        <th class='total-column percent'>%</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                        <th class='race-ethnicity-column'>Total</th>
                        <th class='female-column amount'></th>
                        <th class='female-column percent'></th>
                        <th class='male-column amount'></th>
                        <th class='male-column percent'></th>
                        <th class='total-column amount'></th>
                        <th class='total-column percent'></th>
                    </tfoot>
                            `);

  //#endregion


  showHideFerpaWarning(ferpa);

  //console.table(raceEthnicityData);


  $('#reportContentDataTable')
    .html(drawDataTable('#reportContentDataTable', raceEthnicityData.reverse(), dataTotals))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");



  censusKeyText = $('#inputGroupSelect_censusKey option:selected').text();
  acadCareerText = $('#inputGroupSelect_acadCareer option:selected').text();
  planCollegeText = $('#inputGroupSelect_planCollege option:selected').text();





  Highcharts.chart('reportContentDataTable_pyramidChart', {
    colors: ['#53a2e8', '#e44848'],
    chart: {
      type: 'bar',
      style: {
        "fontFamily": "Roboto, Arial, sans-serif"
      }
    },
    title: {
      text: 'Gender Pyramid',
      align: 'center',
      x: 60
    }
    ,
    //subtitle: {
    //  text: 'Source: <a href="http://populationpyramid.net/germany/2018/">Population Pyramids of the World from 1950 to 2100</a>'
    //},
    xAxis: [{
      categories: pyramidCategories,
      //opposite: true,
      reversed: false,
      labels: {
        //useHTML: true,//Set to true
        style: {
          width: '100px',
          whiteSpace: 'normal'//set to normal
        },
        step: 1
       
      }
    }
      //,
      //{ // mirror axis on right side
      //opposite: true,
      //reversed: false,
      //categories: pyramidCategories,
      //linkedTo: 0,
      //labels: {
      //  step: 1
      //}
      //}
    ],

    yAxis: {
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value);// + '%';
        }
      }
    },

    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },

    tooltip: {
      
      formatter: function () {
        return '<div>' + this.series.name + '<br/>' +
          this.point.category + '<br/>' +
          Math.abs(this.point.y) + '</div>';
      }
    },

    series: pyramidData
  });



  Highcharts.chart('chartPlaceholder', {
    colors: ['#e44848','#53a2e8'],

    chart: {
      type: 'bar',
      height: 800,
      style: {
        "fontFamily": "Roboto, Arial, sans-serif"
      }
    },
    title: {
      text:
        `${planCollegeText}, ${acadCareerText}, ${censusKeyText}, sorted by Race`
    },
    //subtitle: {
    //    text: 'All Colleges, 2018'
    //},
    xAxis: {
      categories: categories,
      title: {
        text: null
      },

      labels: {
        //useHTML: true,//Set to true
        style: {
          width: '100px',
          whiteSpace: 'normal'//set to normal
        },
        step: 1

      }
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: 'Student Count'
        //align: 'high'
      }
    },
    tooltip: {
      //valueSuffix: ' millions'
      //positioner: function (labelWidth, labelHeight, point) {
      //  let tooltipX, tooltipY;
      //  tooltipX = point.plotX + 150;
      //  tooltipY = point.plotY - 15;
      //  return {
      //    x: tooltipX,
      //    y: tooltipY
      //  };
      //}
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    //legend: {
    //  layout: 'vertical',
    //  align: 'right',
    //  verticalAlign: 'top',
    //  x: -40,
    //  y: 40,
    //  floating: true,
    //  borderWidth: 1,
    //  backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    //  shadow: true,
    //  padding: 10,
    //  itemMarginTop: 3,
    //  itemMarginBottom: 3,
    //  itemStyle: {
    //    lineHeight: '14px'
    //  }
    //},
    credits: {
      enabled: true //Must be shown in free/non-profit version
    },
    series: barChartRaceData
  });

  Highcharts.chart('chartPlaceholder2', {
    //colors: ['#53a2e8', '#e44848'],

    chart: {
      type: 'bar',
      height: 800,
      style: {
        "fontFamily": "Roboto, Arial, sans-serif"
      }
    },
    title: {
      text: `${planCollegeText}, ${acadCareerText}, ${censusKeyText}, sorted by Gender`
    },
    //subtitle: {
    //    text: 'All Colleges, 2018'
    //},
    xAxis: {
      categories: ["Female", "Male"],
      title: {
        text: null
      },     
      labels: {
        //useHTML: true,//Set to true
        style: {
          width: '100px',
          whiteSpace: 'normal'//set to normal
        },
        step: 1

      }
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: 'Student Count'
        //align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      //valueSuffix: ' millions'
      //positioner: function (labelWidth, labelHeight, point) {
      //  let tooltipX, tooltipY;
      //  tooltipX = point.plotX + 20;
      //  tooltipY = point.plotY - 20;
      //  return {
      //    x: tooltipX,
      //    y: tooltipY
      //  };
      //}
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    //legend: {
    //  layout: 'vertical',
    //  align: 'right',
    //  verticalAlign: 'top',
    //  x: -40,
    //  y: 40,
    //  floating: true,
    //  borderWidth: 1,
    //  backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    //  shadow: true,
    //  padding: 10,
    //  itemMarginTop: 3,
    //  itemMarginBottom: 3,
    //  itemStyle: {
    //    lineHeight: '14px'
    //  }
    //},
    credits: {
      enabled: false
    },
    series: barChartGenderData
  });
}



//CUSTOM, main function, puts everything together
function updateAll(callElem) {



  //Id of the dropdown caused a call of updateAll()
  //var currDDId = $(callElem).attr("id") !== undefined ? $(callElem).attr("id") : "";


  let postData = {
    CensusKey: $('#inputGroupSelect_censusKey').val(),
    AcadCareer: $('#inputGroupSelect_acadCareer').val(),
    PlanCollege: isLawsDentMed('#inputGroupSelect_acadCareer')
      ? 'All'
      : $('#inputGroupSelect_planCollege option:selected').val()
  };

  let rootUrl = APP_URL;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/HeadcountByCollegeRaceAndGender',
    dataType: 'json',
    data: postData,

    beforeSend: function () {

      showHideNoDataWarning(false);

      $('#reportContentDataTable').hide();
      $('#ferpaPlaceholder').hide().fadeOut("slow");
      $("#loaderDiv").attr('style', 'display:flex !important');
      $('#reportContentDataTable_pyramidChart').empty();
      $('#chartPlaceholder').empty();
      $('#chartPlaceholder2').empty();

    },

    success: function (data) {

      //console.log(data);

      let raceEthnicityData = getRaceEthnicityData(data, postData);
      let planCollegeName = $('#inputGroupSelect_planCollege option:selected').text();


      // NO DATA CHECK
      let noData = raceEthnicityData == null || raceEthnicityData.length == 0
        ? true
        : false;

      if (postData.CensusKey == null) {
        createDropDown({ id: 'censusKey', name: 'Term', data: data.censusKey, htmlAttr: 'style="width: 63%;"' });
      }

      if (postData.AcadCareer == null) {
        createDropDown({ id: 'acadCareer', name: 'Academic Career', data: data.acadCareer });
      }

      createDropDown({ id: 'planCollege', name: 'College', data: data.planCollege });

      if (postData.PlanCollege != null) {
        $('#inputGroupSelect_planCollege').val(postData.PlanCollege);
      }

      $("#loaderDiv").attr('style', 'display:none !important');
      showHideNoDataWarning(noData);
      showOrHideCollegeDropDown();

      if (!noData) {
        generateTableAndCharts(raceEthnicityData);
      } else {
        $('#inputGroupSelect_planCollege')
          .prepend(`<option value='${postData.PlanCollege}'disabled selected style='display: none;'>${planCollegeName}</option>`);
      }


    },

    error: function (ex) {
      let r = jQuery.parseJSON(response.responseText);
      alert("Message: " + r.Message);
      alert("StackTrace: " + r.StackTrace);
      alert("ExceptionType: " + r.ExceptionType);

    }
  });
}


