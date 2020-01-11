(function () {




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




  $('#reportContent').append(`<div id="totalsContent" class="row" />`);

  $('#reportContent').append('<div id="tableContent" class="mt-3"/>');

  $('#reportContent').append('<div id="avgHsgpaContent" class="mt-3"/>');


  var notes = `<div id="ReportNotes" class="row" style="display: none !important;">
									<div class="col">
											Notes:
											<ol>
												<li>Enrolled includes students in both state- and non-state-supported courses.</li>
												<li>Applications from the Fall term only.</li>
											</ol>
										<ul style="list-style-type: none;">
											 <li>Source: UNLV Office of Decision Support </li>
											 <li>Report date: ${getShortDate()} </li>
										</ul>
									</div>
								</div>`;

  $('#reportContent').append(notes);

  //$('#reportContent').append('<table id="reportContentDataTable" class="hover"></table>');





  //let chartPlaceholder = $('<div id="chartPlaceholder" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder);


  //let chartPlaceholder2 = $('<div id="chartPlaceholder2" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder2);

})();


//GENERAL
function calcPercent(dividend, divisor) {
  return Math.round(dividend / divisor * 100) + '%';
}


//GENERAL, returns date string like "May 24, 2019"
function getShortDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const d = new Date();

  let dateString = `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  return dateString;
}


//GENERAL, show if no data has been sent
function showHideNoDataWarning(noData) {
  if (noData) {
    $('#noDataPlaceholder').fadeIn("slow");
  } else {
    $('#noDataPlaceholder').hide().fadeOut("slow");
  }
}


//GENERAL, stores data in browser storage with key
function setLocal(keyName, data) {
  localStorage.setItem(keyName, JSON.stringify(data));
}


//GENERAL, retrieves data with a particular key
function getLocal(keyName) {
  return JSON.parse(localStorage.getItem(keyName));
}


//GENERAL, show or hide loader spinner while data is loading
function showLoader(show) {
  if (show) {
    $("#loaderDiv").attr('style', 'display:flex !important');
  } else {
    $("#loaderDiv").attr('style', 'display:none !important');
  }
}

//GENERAL, show or hide notes div in the end of the page
function showNotes(show) {
  if (show) {
    $("#ReportNotes").attr('style', 'display:block !important');
  } else {
    $("#ReportNotes").attr('style', 'display:none !important');
  }
}


//GENERAL, returns html with input group containing <select> dropdown
function createDropdownHtml(param) {


  ////console.log(param);

  let optionValue = Object.keys(param.data[0])[0]; //Getting value name for <option value='....>
  let optionText = Object.keys(param.data[0])[1] !== undefined
    ? Object.keys(param.data[0])[1]
    : Object.keys(param.data[0])[0]; //Getting text for <option >...</option>

  let onChangeFunc = param.onChangeFunc !== undefined ? param.onChangeFunc : "updateAll(this);";

  const containerCssClass = param.containerCssClass !== undefined ? param.containerCssClass : "";


  $(`#InputGroup_${param.id}`).remove();

  let inputGroupHtml = $(`<div id="InputGroup_${param.id}" class="input-group ${containerCssClass}" ${param.htmlAttr}>
														<div class="input-group-prepend">
																<label class="input-group-text" for="inputGroupSelect_${param.id}">
																		${param.name}
																</label>
														</div>
													</div >`);

  //inputGroupSelect_reportContentDataTable_0_funnelChart_select
  let selectControlHtml = $(`<select id="inputGroupSelect_${param.id}" class="form-control" onchange="${onChangeFunc}" />`);

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




//CUSTOM, draws DataTable with given placeholder, data and separately calculated totals
function drawDataTable(tablePlaceholder, data, totals, firstColumn = 'category', tableHeader) {


  //$(tablePlaceholder).DataTable().destroy();
  //$('.dataTables_wrapper').remove();

  let table = $(tablePlaceholder).DataTable({
    data: data,
    paging: false,
    info: false,
    searching: false,
    order: [], // to keep original sort order
    ordering: data.length === 1 ? false : true,
    initComplete: function (settings, json) {

      if (totals !== undefined) {
        $(this.api().column('.applied-column.amount').footer()).html(totals.applied);

        $(this.api().column('.admitted-column.amount').footer()).html(totals.admitted);
        $(this.api().column('.admitted-divby-applied-column.percent').footer()).html(`${totals.admittedApplied}%`);

        $(this.api().column('.enrolled-column.amount').footer()).html(totals.enrolled);
        $(this.api().column('.enrolled-divby-admitted-column.percent').footer()).html(`${totals.enrolledAdmitted}%`);



      }
    }
    ,
    columns: [
      {
        data: firstColumn
      },
      {
        data: 'applied',
        class: 'applied-column amount'
      },
      {
        data: 'admitted',
        class: 'admitted-column amount'
      },
      {
        data: 'admittedApplied',
        class: 'admitted-divby-applied-column percent',
        render: function (data, type, row) {
          return `${data}%`;
        }
      },
      {
        data: 'enrolled',
        class: 'enrolled-column amount'
      },
      {
        data: 'enrolledAdmitted',
        class: 'enrolled-divby-admitted-column percent',
        render: function (data, type, row) {
          return `${data}%`;
        }
      }
    ]

  });


  //if (tableHeader != null) { $(tablePlaceholder).before(`<h3 class="mt-5">${tableHeader}</h3>`); }
}



//CUSTOM, initiates table and chart when JSON is received through ajax from the server
function initiateTable(index, careerName) {


  let tablePlaceholderName = `reportContentDataTable_${index}`;

  let initData = {
    category: "-=Initial Category=-",
    applied: 0,
    admitted: 0,
    admittedApplied: 0,
    enrolled: 0,
    enrolledAdmitted: 0
  };

  let htmlBoilerplate = `
									<thead>
										<tr>
											<th>Category</th>
											<th>Applied</th>
											<th>Admitted</th>
											<th>Adm/App</th>
											<th>Enrolled</th>
											<th>Enr/Adm</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
									<tfoot>
										<tr>
											<th>Total</th>
											<th class="applied-column amount"></th>
											<th class="admitted-column amount"></th>
											<th class="admitted-divby-applied-column percent"></th>
											<th class="enrolled-column amount"></th>
											<th class="enrolled-divby-admitted-column amount"></th>
										</tr>
									</tfoot>`;



  if ($('#controlsPlaceholder').length === 0) {

    let controlsPlaceholder = $('<h2>Admissions by Level per Term</h2><div id="controlsPlaceholder" class="d-flex flex-row" />');

    let shortTermList = getLocal('shortTermList');

    $('#tableContent').append(controlsPlaceholder);


    $(`#controlsPlaceholder`)
      .append(createDropdownHtml({
        id: 'shortTerm',
        name: 'Term',
        data: shortTermList,
        htmlAttr: 'style="width: 11rem; order: 1;"',
        onChangeFunc: `onChangeTerm(this.options[this.selectedIndex].value);`//`updateAll('${rootUrl}');`
      }));

  }


  $('#tableContent').append(`
                      <div class="row">
                         <div class="col">
                          <h3 class="mb-4 text-center">${careerName}</h3>
                         </div>
                      </div>
                     <div class="row row-margin">
                        <div class="col-lg-7">
                          <table id="${tablePlaceholderName}" class="hover"></table>
                        </div>
                        <div class="col-lg-5">

                         <div id="${tablePlaceholderName}_funnelChart_dropDownContainer" class="d-flex justify-content-center"></div>
                         <div id="${tablePlaceholderName}_funnelChart" ></div>
                                                
                        </div>                       
                      </div>  
                    `);


  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplate);

  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, initData, undefined, 'category', undefined))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");

}



//CUSTOM, updates career level tables (Undergrad, Grad) and related charts
function onChangeTerm(term) {


  let shortTermList = getLocal('shortTermList');

  let data = getLocal('fiveYearTrend');

  let careerList;

  let avgHsgpa = shortTermList.find(t => t.term === term).avgHsgpaNewFreshmen;

  //console.log(shortTermList.filter(t => t.term === term));


  let filteredFiveYearTrend = data.filter(t => t.term === term);

  filteredFiveYearTrend.forEach(item => {
    item.admittedApplied = item.applied !== 0 ? Math.round(item.admitted / item.applied * 100) : 0;
    item.enrolledAdmitted = item.admitted !== 0 ? Math.round(item.enrolled / item.admitted * 100) : 0;

  });

  // Getting a unique career list using spread ... operator and Set that returns unique values
  careerList = [...new Set(filteredFiveYearTrend.map(x => x.career))];

  careerList.forEach((item, index, array) => {

    let filteredCategoryData = filteredFiveYearTrend.filter(c => c.career === item);

    let categoryDropDownData = [{ category: "All Categories" }];

    if ($(`#reportContentDataTable_${index}`).length === 0) {

      initiateTable(index, item);

    }

    let datatableContainer = $(`#reportContentDataTable_${index}`);


    let datatable = datatableContainer.DataTable();

    let totals = {
      applied: 0,
      admitted: 0,
      admittedApplied: 0,
      enrolled: 0,
      enrolledAdmitted: 0
    };





    filteredCategoryData.forEach(item => {

      totals.applied += item.applied;
      totals.admitted += item.admitted;

      totals.enrolled += item.enrolled;

      categoryDropDownData.push({ category: item.category });


    });

    totals.admittedApplied = totals.applied !== 0 ? Math.round(totals.admitted / totals.applied * 100) : 0;
    totals.enrolledAdmitted = totals.admitted !== 0 ? Math.round(totals.enrolled / totals.admitted * 100) : 0;



    $(datatable.column('.applied-column.amount').footer()).html(totals.applied);

    $(datatable.column('.admitted-column.amount').footer()).html(totals.admitted);
    $(datatable.column('.admitted-divby-applied-column.percent').footer()).html(`${totals.admittedApplied}%`);

    $(datatable.column('.enrolled-column.amount').footer()).html(totals.enrolled);
    $(datatable.column('.enrolled-divby-admitted-column.percent').footer()).html(`${totals.enrolledAdmitted}%`);


    $(`#reportContentDataTable_${index}`).hide();


    datatable.clear();
    datatable.rows.add(filteredCategoryData);
    datatable.draw();

    ////console.log(categoryDropDownData);

    $(`#reportContentDataTable_${index}`).fadeIn('slow');





    $(`#reportContentDataTable_${index}_funnelChart_dropDownContainer`)
      .append(createDropdownHtml({
        id: `reportContentDataTable_${index}_funnelChart_select`,
        name: `Category`,
        //containerCssClass:`d-flex justify-content-center`,
        data: categoryDropDownData,
        htmlAttr: `style="width: 23em; order: ${index + 2};"`,
        onChangeFunc: `onChangeFunnelDropDown('${item}', this.options[this.selectedIndex].value,'#reportContentDataTable_${index}_funnelChart');`
      }));


    let funnelDataAllCats = [{
      term: term,
      career: item,
      category: "All Categories",
      applied: totals.applied,
      admitted: totals.admitted,
      admittedApplied: totals.admittedApplied,
      enrolled: totals.enrolled,
      enrolledAdmitted: totals.enrolledAdmitted
    }];

    let funnelData = funnelDataAllCats.concat(filteredCategoryData);



    // Put the object into storage
    setLocal(item, funnelData);


    //FUNNEL

    let funnelChartData = [{
      name: 'Applicants',
      data: [
        ['Applied', totals.applied],
        ['Admitted', totals.admitted],
        ['Enrolled', totals.enrolled]
      ]
    }];


    let funnelChartParams = {
      chart: {
        type: 'funnel',
        style: {
          fontFamily: 'Roboto'
        },
        height: '59%' // 16:9 ratio

      },

      title: {
        text: '',
        x: -50
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            useHTML: true,
            format: '<div style="text-align: center">{point.name}<br/>{point.y:,.0f}</div>',
            inside: true,
            style: {
              fontSize: '1rem',
              fontWeight: 'normal',
              textOutline: false
            }
            //softConnector: true
          },
          center: ['50%', '50%'],
          neckWidth: '30%',
          neckHeight: '25%',
          width: '80%',
          colors: [
            'rgba(255, 202, 202, 1)',
            'rgba(255, 142, 142, 1)',
            'rgba(255, 70, 70, 1)'
          ],
          enableMouseTracking: false

        }
      },
      legend: {
        enabled: false
      },
      series: funnelChartData

      //responsive: {
      //  rules: [{
      //    condition: {
      //      maxWidth: 500
      //    },
      //    chartOptions: {
      //      plotOptions: {
      //        series: {
      //          dataLabels: {
      //            inside: true
      //          },
      //          center: ['50%', '50%'],
      //          width: '90%'
      //        }
      //      }
      //    }
      //  }]
      //}



    };







    let chart = Highcharts.chart(`reportContentDataTable_${index}_funnelChart`, funnelChartParams);



  });

  averageHighSchoolGPA(avgHsgpa);

}


//CUSTOM, changes funnel when a different category is selected
function onChangeFunnelDropDown(careerName, valueSelected, chartId) {

  let chart = $(chartId).highcharts();



  let data = getLocal(careerName);


  let chartData = [];

  data.forEach(item => {
    if (item.category === valueSelected) {
      chartData = [{
        name: 'Applicants',
        data: [
          ['Applied', item.applied],
          ['Admitted', item.admitted],
          ['Enrolled', item.enrolled]
        ]
      }];
    }
  });


  chart.series[0].update({
    data: chartData[0].data
  });

  chart.redraw();

}




//CUSTOM, five-year trend section
function generateFiveYearTrend() {


  let data = getLocal('fiveYearTrend');
  let termData = getLocal('shortTermList');


  let htmlBoilerplate = `
									<thead>
										<tr>
											<th>Year</th>
											<th>Applied</th>
											<th>Admitted</th>
											<th>Adm/App</th>
											<th>Enrolled</th>
											<th>Enr/Adm</th>
										</tr>
									</thead>
									<tbody>
									</tbody>									
													`;



  //let categoryDropDownData = [{ category: "All Categories" }];

  //row[1].rows.forEach((item) => {
  //  categoryDropDownData.push({ category: item.category });
  //});


  let tablePlaceholderName = `reportContentDataTable_trendTable`;

  let trendData = {};

  let dropDownData = [{ category: "All Categories" }];

  let tableData = [];

  let chartCategories = [];

  let chartSeries = [{
    name: 'Applied',
    color: 'rgba(255, 145, 145, 1)',
    data: []
  }, {
    name: 'Admitted',
    color: 'rgba(214, 100, 100, 1)',
    data: []
  }, {
    name: 'Enrolled',
    color: 'rgba(198, 39, 39, 1)',
    data: []
  }];

  trendData.data = {};



  ////console.log('Object.entries(data)', Object.entries(data));


  //console.log('data', data);

  data.map(row => {

    //if (categorySelected !== "All Categories" && categorySelected === row.category) {

    if (trendData.data[row.term] === undefined) trendData.data[row.term] = {
      year: "",
      applied: 0,
      admitted: 0,
      admittedApplied: 0,
      enrolled: 0,
      enrolledAdmitted: 0

    };


    trendData.data[row.term].applied += row.applied;
    trendData.data[row.term].admitted += row.admitted;

    trendData.data[row.term].enrolled += row.enrolled;

    //}



    ////console.log('findCategory', dropDownData.find(t => t.category === row.category));

    if (dropDownData.find(t => t.category === row.category) === undefined)
      dropDownData.push({ category: row.category });




  });




  Object.entries(trendData.data).map(row => {

    let year = "";

    let termName = termData.find(termCode => termCode.term === row[0]).termName;

    year = termName.split(" ");

    row[1].year = year[1];

    chartCategories.push(year[1]);

    chartSeries[0].data.push(row[1].applied);   //Applied
    chartSeries[1].data.push(row[1].admitted);  //Admitted
    chartSeries[2].data.push(row[1].enrolled);  //Enrolled


    row[1].admittedApplied = row[1].applied !== 0 ? Math.round(row[1].admitted / row[1].applied * 100) : 0;
    row[1].enrolledAdmitted = row[1].admitted !== 0 ? Math.round(row[1].enrolled / row[1].admitted * 100) : 0;

    tableData.push(row[1]);

  });


  //console.log('dropDownData', dropDownData);
  //console.log('trendData', trendData);
  //console.log('tableData', tableData);
  //console.log('chartSeries', chartSeries);


  $('#tableContent').append(`
                      <div class="row">
                         <div class="col">
                          <h3 class="text-center">Admission Trends</h3>
                         </div>
                      </div>
                      <div class="row mb-5 pb-5 pt-2">
                          <div class="col-lg-6">
                            <div id="${tablePlaceholderName}_fiveYearTrend_dropDownContainer"></div>
                            <table id="${tablePlaceholderName}" class="hover mt-3"></table>
                          </div>
                          <div class="col-lg-6">
                             
                            <div id="${tablePlaceholderName}_fiveYearTrendChart"></div>
                          </div>
                      </div>                      
                    `);

  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplate);


  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, tableData.reverse(), undefined, 'year', undefined))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");



  $(`#${tablePlaceholderName}_fiveYearTrend_dropDownContainer`)
    .append(createDropdownHtml({
      id: `${tablePlaceholderName}_fiveYearTrend_select`,
      name: `Category`,
      data: dropDownData,
      //onChangeFunc: `onChangeCategoryFiveYearTrendDropDown('${row[0]}', this.options[this.selectedIndex].value,'#${tablePlaceholderName}_fiveYearTrendChart');`
      onChangeFunc: `onChangeCategoryFiveYearTrendDropDown(this.options[this.selectedIndex].value,'${tablePlaceholderName}');`
    }));



  Highcharts.chart(`${tablePlaceholderName}_fiveYearTrendChart`, {
    chart: {
      type: 'area',
      spacingBottom: 30,
      style: {
        fontFamily: 'Roboto'
      }
    },
    title: {
      text: ''
    },
    //subtitle: {
    //    text: '* Jane\'s banana consumption is unknown',
    //    floating: true,
    //   align: 'right',
    //   verticalAlign: 'bottom',
    //    y: 15
    //},
    //legend: {
    //  layout: 'vertical',
    //  align: 'left',
    //  verticalAlign: 'top',
    //  x: 100,
    //  y: 50,
    //  floating: true,
    //  borderWidth: 0,
    //  backgroundColor:
    //    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    //},
    xAxis: {
      categories: chartCategories
    },
    yAxis: {
      title: {
        text: 'Applicants'
      },
      labels: {
        formatter: function () {
          return this.value;
        }
      }
    },
    tooltip: {
      formatter: function () {
        return `${this.y} ${this.series.name} in ${this.x}`;//'<b>' + this.series.name + '</b><br/>' + 'Year: ' + this.x + '<br/>' + 'Applicants: ' + this.y;

      }
    },
    plotOptions: {
      area: {
        fillOpacity: .5
      }
    },
    credits: {
      enabled: false
    },
    series: chartSeries
  });



}


//CUSTOM, updates five year trend table and chart
function onChangeCategoryFiveYearTrendDropDown(categorySelected, tablePlaceholderName) {

  let datatable = $(`#${tablePlaceholderName}`).DataTable();


  let data = getLocal('fiveYearTrend');
  let termData = getLocal('shortTermList');


  let trendData = {};

  let tableData = [];


  let chart = $(`#${tablePlaceholderName}_fiveYearTrendChart`).highcharts();

  let chartCategories = [];

  let chartSeries = [{
    name: 'Applied',
    color: 'rgba(255, 145, 145, 1)',
    data: []
  }, {
    name: 'Admitted',
    color: 'rgba(214, 100, 100, 1)',
    data: []
  }, {
    name: 'Enrolled',
    color: 'rgba(198, 39, 39, 1)',
    data: []
  }];

  trendData.data = {};



  data.map((row, index, arr) => {

    if (categorySelected === "All Categories" || categorySelected === row.category) {

      if (trendData.data[row.term] === undefined) trendData.data[row.term] = {
        year: "",
        applied: 0,
        admitted: 0,
        admittedApplied: 0,
        enrolled: 0,
        enrolledAdmitted: 0

      };


      trendData.data[row.term].applied += row.applied;
      trendData.data[row.term].admitted += row.admitted;

      trendData.data[row.term].enrolled += row.enrolled;

    }
  });



  Object.entries(trendData.data).map(row => {

    let year = "";

    let termName = termData.find(termCode => termCode.term === row[0]).termName;

    year = termName.split(" ");

    row[1].year = year[1];

    chartCategories.push(year[1]);

    chartSeries[0].data.push(row[1].applied);   //Applied
    chartSeries[1].data.push(row[1].admitted);  //Admitted
    chartSeries[2].data.push(row[1].enrolled);  //Enrolled


    row[1].admittedApplied = row[1].applied !== 0 ? Math.round(row[1].admitted / row[1].applied * 100) : 0;
    row[1].enrolledAdmitted = row[1].admitted !== 0 ? Math.round(row[1].enrolled / row[1].admitted * 100) : 0;

    tableData.push(row[1]);

  });


  $(`#${tablePlaceholderName}`).hide();

  datatable.clear();
  datatable.rows.add(tableData.reverse());

  //datatable.order([0, 'desc']).draw();
  datatable.draw();

  chart.update({
    xAxis: {
      categories: chartCategories
    },
    series: chartSeries
  });

  chart.redraw();

  $(`#${tablePlaceholderName}`).fadeIn("slow");

}


//CUSTOM, appends a div with average GPA for a new freshmen
function averageHighSchoolGPA(avgHsgpa) {
  $('#avgHsgpaContent').html(`
                      <div class="row mb-5">
                         <div class="col">
                          <h4>Average High School GPA of New Freshmen = ${avgHsgpa}</h2>
                         </div>
                      </div>
                               
                    `);

}













//=========================================================================

//CUSTOM, main function, puts everything together
function updateAll(rootUrlParam, yearsBack = 5) {

  let postData = {
    ShortTerm: $('#inputGroupSelect_shortTerm').val(),
    YearsBack: yearsBack
  };


  let rootUrl = rootUrlParam;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/AppliedAdmittedEnrolled',
    dataType: 'json',
    data: postData,

    beforeSend: function () {

      localStorage.clear();

      showNotes(false);
      showHideNoDataWarning(false);
      $('.dataTables_wrapper,#byLevelContent').remove();
      $('#totalsContent,#tableContent').empty();
      showLoader(true);


    },

    success: function (data) {

      //console.table(data.fiveYearTrend);

      // NO DATA check
      let noData = data.fiveYearTrend === undefined ? true : false;


      if (postData.ShortTerm === undefined) {
        //createDropDown({
        //  id: 'shortTerm',
        //  name: 'Term',
        //  data: data.shortTermList,
        //  htmlAttr: 'style="width: 11rem; order: 1;"',
        //  onChangeFunc: `onChangeTerm(this.options[this.selectedIndex].value);`//`updateAll('${rootUrl}');` H!5+e164costcotravel
        //});
      }


      showLoader(false);
      showHideNoDataWarning(noData);



      if (!noData) {

        let term = data.shortTerm[0].term;

        setLocal('fiveYearTrend', data.fiveYearTrend);
        setLocal('shortTermList', data.shortTermList);

        generateFiveYearTrend();

        onChangeTerm(term);

        //averageHighSchoolGPA(data.averageHsgpa[0].averageHsgpa_NewFreshmen);

      }

      showNotes(true);


      //**************


      makeSunburst();



    },

    error: function (ex) {
      let r = jQuery.parseJSON(response.responseText);
      alert("Message: " + r.Message);
      alert("StackTrace: " + r.StackTrace);
      alert("ExceptionType: " + r.ExceptionType);

    }
  });
}


