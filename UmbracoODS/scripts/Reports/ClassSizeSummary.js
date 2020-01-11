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

  let controlsPlaceholder = $('<div id="controlsPlaceholder" class="d-flex flex-row mb-3" />');
  $('#reportContent').prepend(controlsPlaceholder);


  $('#reportContent').append(`<div id="totalsContent" class="row" />`);

  $('#reportContent').append('<div id="tableContent"/>');


  var notes = `<div id="ReportNotes" class="row" style="display: none !important;">
									<div class="col">
											Notes:
											<ol>
												<li>Dual indicates course sections with both undergraduate and graduate enrollments.</li>
												<li>Figures include both formal and informal instruction.</li>												
											</ol>
										<ul style="list-style-type: none; padding-inline-start: 0;">
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
  return Math.round(dividend / divisor * 100) + '%'
}


//GENERAL, returns date string like "May 24, 2019"
function getShortDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const d = new Date();

  let dateString = `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

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


//CUSTOM calculate average from enrollment/sectionCount
function getAvg(enrollment, sectionCount) {
  return sectionCount != 0 ? Math.round(enrollment / sectionCount) : 0;
}


//CUSTOM, draws DataTable with given placeholder, data and separately calculated totals
function drawDataTable(tablePlaceholder, data, totals, firstColumn = 'deptName', tableHeader) {


  //$(tablePlaceholder).DataTable().destroy();
  //$('.dataTables_wrapper').remove();

  let table = $(tablePlaceholder).DataTable({
    data: data,
    paging: false,
    info: false,
    searching: false,
    order: [], // to keep original sort order
    ordering: data.length == 1 ? false : true,
    initComplete: function (settings, json) {

      if (totals != null) {


        $(this.api().column('.u-column.enr').footer()).html(totals.u_Enrollment);
        $(this.api().column('.u-column.sec').footer()).html(totals.u_SectionCount);
        $(this.api().column('.u-column.avg').footer())
          .html(getAvg(totals.u_Enrollment, totals.u_SectionCount));

        $(this.api().column('.g-column.enr').footer()).html(totals.g_Enrollment);
        $(this.api().column('.g-column.sec').footer()).html(totals.g_SectionCount);
        $(this.api().column('.g-column.avg').footer())
          .html(getAvg(totals.g_Enrollment, totals.g_SectionCount));

        $(this.api().column('.dual-column.enr').footer()).html(totals.dual_Enrollment);
        $(this.api().column('.dual-column.sec').footer()).html(totals.dual_SectionCount);
        $(this.api().column('.dual-column.avg').footer())
          .html(getAvg(totals.dual_Enrollment, totals.dual_SectionCount));

        $(this.api().column('.total-column.enr').footer()).html(totals.total_Enrollment);
        $(this.api().column('.total-column.sec').footer()).html(totals.total_SectionCount);
        $(this.api().column('.total-column.avg').footer())
          .html(getAvg(totals.total_Enrollment, totals.total_SectionCount));

      }
    }
    ,
    columns: [
      {
        data: firstColumn,
        className: 'first-column'
      },
      {
        data: 'u_Enrollment',
        title: 'Enr',
        className: 'u-column enr'
      },
      {
        data: 'u_SectionCount',
        title: 'Sec',
        className: 'u-column sec'
      },
      {
        title: 'Avg',
        render: function (data, type, row) {
          return getAvg(row.u_Enrollment, row.u_SectionCount);
        },
        className: 'u-column avg'
      },
      {
        data: 'g_Enrollment',
        title: 'Enr',
        className: 'g-column enr'
      },
      {
        data: 'g_SectionCount',
        title: 'Sec',
        className: 'g-column sec'
      },
      {
        title: 'Avg',
        render: function (data, type, row) {
          return getAvg(row.g_Enrollment, row.g_SectionCount);
        },
        className: 'g-column avg'
      },
      {
        data: 'dual_Enrollment',
        title: 'Enr',
        className: 'dual-column enr'
      },
      {
        data: 'dual_SectionCount',
        title: 'Sec',
        className: 'dual-column sec'
      },
      {
        title: 'Avg',
        render: function (data, type, row) {
          return getAvg(row.dual_Enrollment, row.dual_SectionCount);
        },
        className: 'dual-column avg'
      },
      {
        data: 'total_Enrollment',
        title: 'Enr',
        className: 'total-column enr'
      },
      {
        data: 'total_SectionCount',
        title: 'Sec',
        className: 'total-column sec'
      },
      {
        title: 'Avg',
        render: function (data, type, row) {
          return getAvg(row.total_Enrollment, row.total_SectionCount);
        },
        className: 'total-column avg'
      }
    ]

  });


  if (tableHeader != null) { $(tablePlaceholder).before(`<h3 class="mt-5">${tableHeader}</h3>`); }
}



//CUSTOM, generates table with drawDataTable function and custom html
function generateTable(classSizeTable) {

  let universityData = {
    total: [{
      collegeName: "University Total",
      u_Enrollment: 0,
      u_SectionCount: 0,

      g_Enrollment: 0,
      g_SectionCount: 0,

      dual_Enrollment: 0,
      dual_SectionCount: 0,

      total_Enrollment: 0,
      total_SectionCount: 0
    }]

  };


  classSizeTable.map((row) => {


    if (universityData.data == null) universityData.data = new Array();

    if (universityData.data[row.collegeName] == null) universityData.data[row.collegeName] = new Array();

    if (universityData.data[row.collegeName].rows == null) universityData.data[row.collegeName].rows = new Array();

    if (universityData.data[row.collegeName].total == null) universityData.data[row.collegeName].total =
      {

        collegeName: row.college,
        dept: row.dept,
        deptName: row.deptName,

        u_Enrollment: 0,
        u_SectionCount: 0,

        g_Enrollment: 0,
        g_SectionCount: 0,

        dual_Enrollment: 0,
        dual_SectionCount: 0,

        total_Enrollment: 0,
        total_SectionCount: 0
      };



    universityData.data[row.collegeName].rows.push({

      dept: row.dept,
      deptName: row.deptName,

      u_Enrollment: row.u_Enrollment,
      u_SectionCount: row.u_SectionCount,

      g_Enrollment: row.g_Enrollment,
      g_SectionCount: row.g_SectionCount,

      dual_Enrollment: row.dual_Enrollment,
      dual_SectionCount: row.dual_SectionCount,

      total_Enrollment: row.total_Enrollment,
      total_SectionCount: row.total_SectionCount

    });


    universityData.data[row.collegeName].total.u_Enrollment += row.u_Enrollment;
    universityData.data[row.collegeName].total.u_SectionCount += row.u_SectionCount;

    universityData.data[row.collegeName].total.g_Enrollment += row.g_Enrollment;
    universityData.data[row.collegeName].total.g_SectionCount += row.g_SectionCount;

    universityData.data[row.collegeName].total.dual_Enrollment += row.dual_Enrollment;
    universityData.data[row.collegeName].total.dual_SectionCount += row.dual_SectionCount;

    universityData.data[row.collegeName].total.total_Enrollment += row.total_Enrollment;
    universityData.data[row.collegeName].total.total_SectionCount += row.total_SectionCount;



    universityData.total[0].u_Enrollment += row.u_Enrollment;
    universityData.total[0].u_SectionCount += row.u_SectionCount;

    universityData.total[0].g_Enrollment += row.g_Enrollment;
    universityData.total[0].g_SectionCount += row.g_SectionCount;

    universityData.total[0].dual_Enrollment += row.dual_Enrollment;
    universityData.total[0].dual_SectionCount += row.dual_SectionCount;

    universityData.total[0].total_Enrollment += row.total_Enrollment;
    universityData.total[0].total_SectionCount += row.total_SectionCount;



  });


  let htmlBoilerplate = `
									<thead>


                      <tr class='top-row'>
                        <th rowspan='2' class='college-column first-column'>College</th>
                        <th colspan='3' class='u-column'>Undergraduate</th>
                        <th colspan='3' class='g-column'>Graduate</th>
                        <th colspan='3' class='dual-column'>Dual</th>
                        <th colspan='3' class='total-column'>Total</th>
                      </tr>
                      <tr class='bottom-row'>

                        <th class='u-column enr'></th>
                        <th class='u-column sec'></th>
                        <th class='u-column avg'></th>


                        <th class='g-column enr'></th>
                        <th class='g-column sec'></th>
                        <th class='g-column avg'></th>


                        <th class='dual-column enr'></th>
                        <th class='dual-column sec'></th>
                        <th class='dual-column avg'></th>


                        <th class='total-column enr'></th>
                        <th class='total-column sec'></th>
                        <th class='total-column avg'></th>
                      </tr>



										
									</thead>
									<tbody>                     
									</tbody>
									<tfoot>
										<tr>
											<th class='college-column first-column'>Total</th>
											<th class='u-column enr'></th>
                      <th class='u-column sec'></th>
                      <th class='u-column avg'></th>


                      <th class='g-column enr'></th>
                      <th class='g-column sec'></th>
                      <th class='g-column avg'></th>


                      <th class='dual-column enr'></th>
                      <th class='dual-column sec'></th>
                      <th class='dual-column avg'></th>


                      <th class='total-column enr'></th>
                      <th class='total-column sec'></th>
                      <th class='total-column avg'></th>
											
										</tr>
									</tfoot>
													`;



  Object.entries(universityData.data).map((row, index, arr) => {

    let tablePlaceholderName = `reportContentDataTable_${index}`;

    $('#tableContent').append(`
												<div class="row">
													<div class="col">
														<table id="${tablePlaceholderName}" class="hover mb-5"></table>
													</div>													
												</div>`);


    $(`#${tablePlaceholderName}`)
      .html(htmlBoilerplate);


    $(`#${tablePlaceholderName}`)
      .html(drawDataTable(`#${tablePlaceholderName}`, row[1].rows, row[1].total, 'deptName', row[0]))
      .width('100%')  // ...width '100%' is fix for style=0px DataTables
      .fadeIn("slow");

  });

}





//=========================================================================

//CUSTOM, main function, puts everything together
function updateAll() {

  let postData = {
    TermChoiceKey: $('#inputGroupSelect_termChoiceKey').val()
  };

  //TODO: move to separate function (or file)
  let rootUrl = APP_URL;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/ClassSizeSummary',
    dataType: 'json',
    data: postData,

    beforeSend: function () {


      showNotes(false);
      showHideNoDataWarning(false);
      $('.dataTables_wrapper,#byLevelContent').remove();
      $('#totalsContent,#tableContent').empty();
      showLoader(true);


    },

    success: function (data) {

      //console.log(data);

      // NO DATA check
      let noData = (data.classSizeTable == null) ? true : false;



      if (postData.TermChoiceKey == null) {
        createDropDown({
          id: 'termChoiceKey', name: 'Term', data: data.termChoice, htmlAttr: 'style="width: 12rem; order: 1;"'
        });
      }


      showLoader(false);
      showHideNoDataWarning(noData);



      if (!noData) {
        generateTable(data.classSizeTable);
      }

      showNotes(true);

    },

    error: function (ex) {
      let r = jQuery.parseJSON(response.responseText);
      alert("Message: " + r.Message);
      alert("StackTrace: " + r.StackTrace);
      alert("ExceptionType: " + r.ExceptionType);

    }
  });
}

