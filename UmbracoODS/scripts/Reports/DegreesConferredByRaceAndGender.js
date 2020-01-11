(function () {




  //let ferpaPlaceholder = `
  //    <div id="ferpaPlaceholder" style="display: none !important;">
  //      <div>
  //        <button type="button" class="btn btn-warning btn-block" data-toggle="collapse" href="#collapseFerpa" aria-expanded="false" aria-controls="collapseFerpa">
  //          FERPA Warning!
  //        </button>
  //      </div>
  //      <div class="collapse" id="collapseFerpa">
  //        <div class="alert alert-warning small mb-0" >
  //          The below content may contain information that is protected under <a href="http://www.ed.gov/policy/gen/guid/fpco/ferpa/index.html" target="_blank">FERPA (the Family Educational Rights Privacy Act)</a>. You are granted access to this information in your capacity as a UNLV employee. As a reminder, in reporting information, if cell size (typically 10 or fewer) or other information would make a student’s identity "easily traceable," that information would be considered "personally identifiable." <a href="http://www.ed.gov/policy/gen/reg/ferpa/index.html" target="_blank"> See 34 CFR § 99.3.</a> The educational agency or institution should use generally accepted statistical principles and methods to ensure that the data are reported in a manner that fully prevents the identification of students. If that cannot be done, the data must not be reported.
  //        </div>
  //      </div>
  //    </div>`;
  //$('#reportContent').prepend(ferpaPlaceholder);


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

  //$('#reportContent').append('<table id="reportContentDataTable" class="hover"></table>');





  //let chartPlaceholder = $('<div id="chartPlaceholder" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder);


  //let chartPlaceholder2 = $('<div id="chartPlaceholder2" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder2);

})();

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



//GENERAL, returns html with input group containing <select> dropdown
function createDropdownHtml(param) {

  let optionValue = Object.keys(param.data[0])[0]; //Getting value name for <option value='....>
  let optionText = (Object.keys(param.data[0])[1] != null) ? Object.keys(param.data[0])[1] : Object.keys(param.data[0])[0]; //Getting text for <option >...</option>


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


//CUSTOM, checks if dropdown has LAWS or DENT values
function isLawsDent(ddSelector) {
  let acadCVal = $(ddSelector).val();

  if (acadCVal == "LAWS"
    || acadCVal == "DENT"
    || acadCVal == "D") {
    return true;
  } else {
    return false;
  }
}



//CUSTOM, hides College dropdown if selected Academic Career value in "LAWS", "DENT", "D"
function showOrHideCollegeDropDown() {

  if (isLawsDent('#inputGroupSelect_acadCareer')) {

    $('#inputGroupSelect_planCollege').val("All");
    $('#inputGroupSelect_planCollege').prop('disabled', 'disabled');
    $('#InputGroup_planCollege').css('display', 'none');


  } else {
    $('#inputGroupSelect_planCollege').prop('disabled', false);
    $('#InputGroup_planCollege').css('display', 'flex');
  }
}


//CUSTOM, draws DataTable with given placeholder, data and separately calculated totals
function drawDataTable(tablePlaceholder, data, totals, firstColumn = 'raceEthnicity', tableHeader) {


  //$(tablePlaceholder).DataTable().destroy();


  let table = $(tablePlaceholder).DataTable({
    data: data,
    paging: false,
    info: false,
    searching: false,
    order: [], // to keep original sort order
    ordering: data.length == 1 ? false : true,
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
        data: firstColumn,
        class: 'first-column'
      },
      {
        data: 'female',
        class: 'female-column amount'
      },
      {
        data: '%',
        class: 'female-column percent',                                       // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.female / totals.total * 100) + '%';
        },
      },
      {
        data: 'male',
        class: 'male-column amount'
      },
      {
        data: '%',
        class: 'male-column percent',                                       // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.male / totals.total * 100) + '%';
        },
      },
      {
        data: 'total',
        class: 'total-column amount'
      },
      {
        data: 'calculated column',
        class: 'total-column percent',                                       // WIP
        render: function (data, type, row) {                        // WIP
          return Math.round(row.total / totals.total * 100) + '%';
        }
      }
    ]
  });


  if (tableHeader != null) { $(tablePlaceholder).before(`<h3 class="mt-3">${tableHeader}</h3>`); }


}



//CUSTOM, putting all together and placing all content into its placeholders
function generateUniversityTable(raceEthnicityData) {


  let ferpa = false;
  let ferpaTreshold = 10;
  let barChartGenderData = new Array();

  let pyramidData = [{
    name: 'Male',
    data: []
  }, {
    name: 'Female',
    data: []
  }];

  let pyramidCategories = [];

  let dataTotals = {
    female: 0,
    male: 0,
    total: 0
  };

  let female = new Array();
  let male = new Array();
  let categories = new Array();




  raceEthnicityData.map((value, index, arr) => {

    dataTotals.female += value.female;
    dataTotals.male += value.male;
    dataTotals.total += value.total;

    pyramidData[0].data.push(value.male * -1);
    pyramidData[1].data.push(value.female);
    pyramidCategories.push(value.raceEthnicity);

    if (!ferpa && (value.female < ferpaTreshold || value.male < ferpaTreshold)) {
      ferpa = true;
    }
  });



  //#region $('#reportContentDataTable')

  let htmlBoilerplate = `
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
                            `;


  //#endregion


  $('#reportContent').append(`
    <div class="row row-margin inner-table-chart-content">
      <div class="col-lg-6">
        <table id="reportContentDataTable" class="hover"></table>
      </div>
      <div class="col-lg-6">       
        <div id="reportContentDataTable_pyramidChart"></div>
      </div>
    </div>`);

  $('#reportContentDataTable')
    .html(htmlBoilerplate);

  showHideFerpaWarning(ferpa);



  $('#reportContentDataTable')
    .html(drawDataTable('#reportContentDataTable', raceEthnicityData.reverse(), dataTotals))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");


  const tableWrapperHeight = $(`#reportContentDataTable_wrapper`).parent().height();


  $(`#reportContentDataTable_pyramidChart`).height(tableWrapperHeight + 65);



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
      //x: 60
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
      allowDecimals: false,
      title: {
        text: null
      },
      labels: {
        formatter: function () {
          return Math.abs(this.value);// + '%';
        },
        step: 1
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



}



//CUSTOM, get tables with departments
function generateDeptTables(data) {

  let collegeData = {

    collegeName: data.allCollegesRaceEthnGenTable[0].college,

    //totalUnduplicated: [{
    //  major: "Total",
    //  summer: data.degreeCertTable[0].summer,
    //  fall: data.degreeCertTable[0].fall,
    //  spring: data.degreeCertTable[0].spring,
    //  total: data.degreeCertTable[0].total
    //}]

  };


  data.allCollegesRaceEthnGenTable.map((row, index, arr) => {


    if (collegeData.data == null) collegeData.data = new Array();

    //if (row.major != "Total") {

    if (collegeData.data[row.department] == null) {



      collegeData.data[row.department] = new Array();

      collegeData.data[row.department].rows = new Array();

      collegeData.data[row.department].total = {
        raceEthnicity: "Total",
        female: 0,
        male: 0,
        total: 0
      };
    }



    //}


    collegeData.data[row.department].rows.push({
      raceEthnicity: row.raceEthnicity,
      female: row.female,
      male: row.male,
      total: row.total
    });

    collegeData.data[row.department].total.female += row.female;
    collegeData.data[row.department].total.male += row.male;
    collegeData.data[row.department].total.total += row.total;



    //if (row.degreeType != "College Sum" && row.major != "Total") {
    //  collegeData.data[row.degreeType].rows.push({
    //    major: row.major,
    //    summer: row.summer,
    //    fall: row.fall,
    //    spring: row.spring,
    //    total: row.total
    //  });
    //} else if (row.degreeType != "College Sum" && row.major == "Total") {
    //  collegeData.data[row.degreeType].total = {
    //    summer: row.summer,
    //    fall: row.fall,
    //    spring: row.spring,
    //    total: row.total
    //  }
    //} else if (row.degreeType == "College Sum" && row.major == "Total") {
    //  collegeData.total = [{
    //    major: "Total",
    //    summer: row.summer,
    //    fall: row.fall,
    //    spring: row.spring,
    //    total: row.total
    //  }]
    //}





  });


  generateMultipleTables(collegeData);

  //console.log(collegeData);


}


//CUSTOM, generate multiple html tables from JSON array
function generateMultipleTables(collegeData) {

  let htmlBoilerplate = `
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
                            `;





  //$(`[id^='reportContentDataTable']`).DataTable().destroy();






  Object.entries(collegeData.data).map((row, index, arr) => {

    //console.log(index);


    let pyramidData = [{
      name: 'Male',
      data: []
    }, {
      name: 'Female',
      data: []
    }];

    let pyramidCategories = [];


    let tablePlaceholderName = `reportContentDataTable_${index}`;

    const pyramidChartHeight = row[1].rows.length > 1 ? 75 * row[1].rows.length : 200;


    row[1].rows.map((value, index, arr) => {


      pyramidData[0].data.push(value.male * -1);
      pyramidData[1].data.push(value.female);
      pyramidCategories.push(value.raceEthnicity);

    });

    if (index === 0) {
      $('#reportContent').append(`<h3 class="mb-5 font-italic by-department-header">By Department</h3>`);
    }


    $('#reportContent').append(`
    <div class="row row-margin inner-table-chart-content">
      <div class="col-lg-6">
        <table id="${tablePlaceholderName}" class="hover"></table>
      </div>
      <div class="col-lg-6">       
        <div id="${tablePlaceholderName}_pyramidChart" ></div>
      </div>
    </div>`);





    $(`#${tablePlaceholderName}`)
      .html(htmlBoilerplate);

    //console.log($(`#${tablePlaceholderName}`));


    $(`#${tablePlaceholderName}`)
      .html(drawDataTable(`#${tablePlaceholderName}`, row[1].rows.reverse(), row[1].total, undefined, row[0]))
      .width('100%')  // ...width '100%' is fix for style=0px DataTables
      .fadeIn("slow");

    const tableWrapperHeight = $(`#${tablePlaceholderName}_wrapper`).parent().height();


    $(`#${tablePlaceholderName}_pyramidChart`).height(tableWrapperHeight);

    Highcharts.chart(`${tablePlaceholderName}_pyramidChart`, {
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
        //x: 60
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
        allowDecimals: false,
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


  });





}





//CUSTOM, main function, puts everything together
function updateAll(callElem) {



  //Id of the dropdown caused a call of updateAll()
  //var currDDId = $(callElem).attr("id") !== undefined ? $(callElem).attr("id") : "";


  let postData = {
    AcadYear: $('#inputGroupSelect_acadYear').val(),
    AcadCareer: $('#inputGroupSelect_acadCareer').val(),
    PlanCollege: isLawsDent('#inputGroupSelect_acadCareer')
      ? 'All'
      : $('#inputGroupSelect_planCollege option:selected').val(),
    IncludeCerts: $('#inputGroupSelect_includeCerts').val()
  };

  //let postData = {
  //  AcadYear: '2017-18',
  //  AcadCareer: 'All',
  //  PlanCollege: 'All',
  //  IncludeCerts: null
  //};

  let rootUrl = APP_URL;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/DegreesConferredByRaceAndGender',
    dataType: 'json',
    data: postData,

    beforeSend: function () {

      showHideNoDataWarning(false);


      $('.dataTables_wrapper').remove();
      $('.by-department-header').remove();
      $('.inner-table-chart-content').remove();

      $('#reportContentDataTable').hide();
      $('#ferpaPlaceholder').hide().fadeOut("slow");
      $("#loaderDiv").attr('style', 'display:flex !important');
      $('#chartPlaceholder').empty();
      $('#chartPlaceholder2').empty();

    },

    success: function (data) {



      let raceEthnicityData = data.raceEthnGenTable;
      let planCollegeName = $('#inputGroupSelect_planCollege option:selected').text();


      // NO DATA CHECK
      let noData = raceEthnicityData == null || raceEthnicityData.length == 0
        ? true
        : false;

      if (postData.AcadYear == null) {
        createDropDown({ id: 'acadYear', name: 'Year', data: data.acadYearList, htmlAttr: 'style="width: 11rem; order: 1; flex-wrap: nowrap;"' });
      }

      if (postData.AcadCareer == null) {
        createDropDown({ id: 'acadCareer', name: 'Academic Career', data: data.acadCareer, htmlAttr: 'style="width: 20rem; order: 2; flex-wrap: nowrap;"' });
      }

      createDropDown({ id: 'planCollege', name: 'College', data: data.planCollege, htmlAttr: 'style="width: 20rem; order: 3; flex-wrap: nowrap;"' });

      if (postData.PlanCollege != null) {
        $('#inputGroupSelect_planCollege').val(postData.PlanCollege);
      }


      let includeCertData = [                     //WIP: move to server?
        { value: "true", name: "Yes" },
        { value: "false", name: "No" }
      ];

      if (postData.IncludeCerts == null) {
        createDropDown({ id: 'includeCerts', name: 'Include Certificates', data: includeCertData, htmlAttr: 'style="width: 15rem; order: 4; flex-wrap: nowrap;"' });
      }

      $("#loaderDiv").attr('style', 'display:none !important');
      showHideNoDataWarning(noData);
      showOrHideCollegeDropDown();

      if (!noData) {
        generateUniversityTable(raceEthnicityData);

        if (postData.PlanCollege === undefined || postData.PlanCollege === "All") {

          $('#reportContentDataTable').before(`<h3 class="mt-3">University Total (${$('#inputGroupSelect_acadCareer option:selected').text()})</h3>`);
        }

      } else {
        $('#inputGroupSelect_planCollege')
          .prepend(`<option value='${postData.PlanCollege}'disabled selected style='display: none;'>${planCollegeName}</option>`);
      }


      if (postData.PlanCollege != null && postData.PlanCollege !== "All" && data.allCollegesRaceEthnGenTable != null) {
        $('#reportContentDataTable').before(`<h3 class="mt-3">College Total - ${data.allCollegesRaceEthnGenTable[0].college} (${$('#inputGroupSelect_acadCareer option:selected').text()})</h3>`);
        generateDeptTables(data);
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