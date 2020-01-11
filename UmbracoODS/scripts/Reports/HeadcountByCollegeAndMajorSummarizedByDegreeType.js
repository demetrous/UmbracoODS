
(function () {




  let ferpaPlaceholder = `
			<div id="ferpaPlaceholder" style="display: none !important;">
				<div>
					<button type="button" class="btn btn-warning btn-block" data-toggle="collapse" href="#collapseFerpa" aria-expanded="false" aria-controls="collapseFerpa">
						FERPA Warning!
					</button>
				</div>
				<div class="collapse" id="collapseFerpa">
					<div class="alert alert-warning small" >
						The below content may contain information that is protected under <a href="http://www.ed.gov/policy/gen/guid/fpco/ferpa/index.html" target="_blank">FERPA (the Family Educational Rights Privacy Act)</a>. You are granted access to this information in your capacity as a UNLV employee. As a reminder, in reporting information, if cell size (typically 10 or fewer) or other information would make a student’s identity "easily traceable," that information would be considered "personally identifiable." <a href="http://www.ed.gov/policy/gen/reg/ferpa/index.html" target="_blank"> See 34 CFR § 99.3.</a> The educational agency or institution should use generally accepted statistical principles and methods to ensure that the data are reported in a manner that fully prevents the identification of students. If that cannot be done, the data must not be reported.
					</div>
				</div>
			</div>`;
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


  $('#reportContent').append(`<div id="totalsContent" class="row" />`);

  $('#reportContent').append('<div id="tableContent"/>');


  var notes = `<div id="ReportNotes" class="row" style="display: none !important;">
                  <div class="col">
                      Notes:
                      <ol>
                        <li>Headcount figures within each category (row) are unduplicated.  However, totals include duplication across categories, to reflect students pursuing multiple degree programs.</li>
                        <li>Data are as of the official preliminary enrollment census date for the term.</li>
                        <li>Includes students enrolled in state-supported and non-state-supported courses.</li>
                      </ol>
                    <ul style="list-style-type: none;">
                       <li>Source: UNLV Office of Decision Support </li>
                       <li>Report date: ${getShortDate()} </li>
                    </ul>
                  </div>
                </div>`;

  $('#reportContent').append(`
    <div class="row justify-content-center row-margin">   
      <div class="col-10">       
        <div id="sunburtsChart" class="pb-4 px-4"></div>
      </div>
    </div>`);

  $('#reportContent').append(notes);

  //$('#reportContent').append('<table id="reportContentDataTable" class="hover"></table>');





  //let chartPlaceholder = $('<div id="chartPlaceholder" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder);


  //let chartPlaceholder2 = $('<div id="chartPlaceholder2" class="mt-5 pt-5"/>');
  //$('#reportContent').append(chartPlaceholder2);



  

})();



//*************** SUNBURTS TEST ******************


function makeSunburst() {

 


  const data = [

    /* #############	Center of the Sun	############# */
    {
      id: '0.0',
      parent: '',
      name: 'UNLV',
      color: '#BF0B23'
    },

    /* #############	Rings	############# */

    {
      id: 'CAREER_UGRD',
      parent: '0.0',
      name: 'Undergraduate',
      value: 25288,
      color: '#ffa44c'

    },
    {
      id: 'UGRD_EDU',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Education',
      value: 1148
    },
    {
      id: 'UGRD_EDU_01',
      parent: 'UGRD_EDU',
      name: 'Coun Ed, Schl Psy and Hmn Srvc',
      value: 139
    },
    {
      id: 'UGRD_EDU_02',
      parent: 'UGRD_EDU',
      name: 'Erly Chldhd, Mltlngl and Sp Ed',
      value: 266
    },
    {
      id: 'UGRD_EDU_03',
      parent: 'UGRD_EDU',
      name: 'Teaching and Learning',
      value: 802
    },
    {
      id: 'UGRD_ENGR',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Engineering',
      value: 2586
    },
    {
      id: 'UGRD_ENGR_01',
      parent: 'UGRD_ENGR',
      name: 'Aerospace Studies',
      value: 3
    },
    {
      id: 'UGRD_ENGR_02',
      parent: 'UGRD_ENGR',
      name: 'Civil and Environmental Enginr',
      value: 280
    },
    {
      id: 'UGRD_ENGR_03',
      parent: 'UGRD_ENGR',
      name: 'College of Engineering',
      value: 93
    },
    {
      id: 'UGRD_ENGR_04',
      parent: 'UGRD_ENGR',
      name: 'Computer Science',
      value: 1053
    },
    {
      id: 'UGRD_ENGR_05',
      parent: 'UGRD_ENGR',
      name: 'Construction Management',
      value: 81
    },
    {
      id: 'UGRD_ENGR_06',
      parent: 'UGRD_ENGR',
      name: 'Electrical and Computer Engineering',
      value: 531
    },
    {
      id: 'UGRD_ENGR_07',
      parent: 'UGRD_ENGR',
      name: 'Mechanical Engineering',
      value: 654
    },
    {
      id: 'UGRD_ENGR_08',
      parent: 'UGRD_ENGR',
      name: 'Military Science',
      value: 2
    },
    {
      id: 'UGRD_FA',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Fine Arts',
      value: 1989
    },
    {
      id: 'UGRD_FA_01',
      parent: 'UGRD_FA',
      name: 'Architecture',
      value: 405
    },
    {
      id: 'UGRD_FA_02',
      parent: 'UGRD_FA',
      name: 'Art',
      value: 578
    },
    {
      id: 'UGRD_FA_03',
      parent: 'UGRD_FA',
      name: 'College of Fine Arts',
      value: 86
    },
    {
      id: 'UGRD_FA_04',
      parent: 'UGRD_FA',
      name: 'Dance',
      value: 112
    },
    {
      id: 'UGRD_FA_05',
      parent: 'UGRD_FA',
      name: 'Film',
      value: 397
    },
    {
      id: 'UGRD_FA_06',
      parent: 'UGRD_FA',
      name: 'Music',
      value: 377
    },
    {
      id: 'UGRD_FA_07',
      parent: 'UGRD_FA',
      name: 'Theatre',
      value: 238
    },
    {
      id: 'UGRD_HOSPITALITY',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Hospitality',
      value: 2169
    },
    //{
    //  id: 'UGRD_HOSPITALITY_01',
    //  parent: 'UGRD_HOSPITALITY',
    //  name: 'College of Hospitality',
    //  value: 2168
    //},
    //{
    //  id: 'UGRD_HOSPITALITY_02',
    //  parent: 'UGRD_HOSPITALITY',
    //  name: 'EXPIRED-Hotel Management',
    //  value: 1
    //},
    {
      id: 'UGRD_LA',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Liberal Arts',
      value: 3302
    },
    {
      id: 'UGRD_LA_01',
      parent: 'UGRD_LA',
      name: 'Anthropology',
      value: 133
    },
    {
      id: 'UGRD_LA_02',
      parent: 'UGRD_LA',
      name: 'College of Liberal Arts',
      value: 6
    },
    {
      id: 'UGRD_LA_03',
      parent: 'UGRD_LA',
      name: 'English',
      value: 403
    },
    {
      id: 'UGRD_LA_04',
      parent: 'UGRD_LA',
      name: 'History',
      value: 164
    },
    {
      id: 'UGRD_LA_05',
      parent: 'UGRD_LA',
      name: 'Interdis, Gender and Ethnic Stdy',
      value: 298
    },
    {
      id: 'UGRD_LA_06',
      parent: 'UGRD_LA',
      name: 'Philosophy',
      value: 102
    },
    {
      id: 'UGRD_LA_07',
      parent: 'UGRD_LA',
      name: 'Political Science',
      value: 418
    },
    {
      id: 'UGRD_LA_08',
      parent: 'UGRD_LA',
      name: 'Psychology',
      value: 1495
    },
    {
      id: 'UGRD_LA_09',
      parent: 'UGRD_LA',
      name: 'Sociology',
      value: 228
    },
    {
      id: 'UGRD_LA_10',
      parent: 'UGRD_LA',
      name: 'World Languages and Cultures',
      value: 102
    }
    ,

    {
      id: 'UGRD_SCIENCES',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Sciences',
      value: 2500
    },
    {
      id: 'UGRD_SCIENCES_01',
      parent: 'UGRD_SCIENCES',
      name: 'Chemistry and Biochemistry',
      value: 336
    },
    {
      id: 'UGRD_SCIENCES_02',
      parent: 'UGRD_SCIENCES',
      name: 'College of Sciences',
      value: 9
    },
    {
      id: 'UGRD_SCIENCES_03',
      parent: 'UGRD_SCIENCES',
      name: 'Geoscience',
      value: 160
    },
    {
      id: 'UGRD_SCIENCES_04',
      parent: 'UGRD_SCIENCES',
      name: 'Life Sciences',
      value: 1743
    },
    {
      id: 'UGRD_SCIENCES_05',
      parent: 'UGRD_SCIENCES',
      name: 'Mathematical Sciences',
      value: 180
    },
    {
      id: 'UGRD_SCIENCES_06',
      parent: 'UGRD_SCIENCES',
      name: 'Physics and Astronomy',
      value: 85
    },
    {
      id: 'UGRD_UA',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'College of Urban Affairs',
      value: 2396
    },
    {
      id: 'UGRD_UA_01',
      parent: 'UGRD_UA',
      name: 'Communication Studies',
      value: 385
    },
    {
      id: 'UGRD_UA_02',
      parent: 'UGRD_UA',
      name: 'Criminal Justice',
      value: 1152
    },
    {
      id: 'UGRD_UA_03',
      parent: 'UGRD_UA',
      name: 'Journalism and Media Studies',
      value: 440
    },
    {
      id: 'UGRD_UA_04',
      parent: 'UGRD_UA',
      name: 'Public Policy and Leadership',
      value: 107
    },
    {
      id: 'UGRD_UA_05',
      parent: 'UGRD_UA',
      name: 'Social Work',
      value: 325
    },
    {
      id: 'UGRD_IHS',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'Integrated Health Sciences',
      value: 1951
    },
    {
      id: 'UGRD_IHS_01',
      parent: 'UGRD_IHS',
      name: 'Health Phy and Diagnostic Sci',
      value: 499
    },
    {
      id: 'UGRD_IHS_02',
      parent: 'UGRD_IHS',
      name: 'Kinesiology and Nutrition Sci',
      value: 1463
    },
    {
      id: 'UGRD_BUSI',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'Lee Business School',
      value: 3133
    },
    {
      id: 'UGRD_BUSI_01',
      parent: 'UGRD_BUSI',
      name: 'Accounting',
      value: 432
    },
    {
      id: 'UGRD_BUSI_02',
      parent: 'UGRD_BUSI',
      name: 'Economics',
      value: 165
    },
    {
      id: 'UGRD_BUSI_03',
      parent: 'UGRD_BUSI',
      name: 'Finance',
      value: 314
    },
    {
      id: 'UGRD_BUSI_04',
      parent: 'UGRD_BUSI',
      name: 'Lee Business School',
      value: 1545
    },
    {
      id: 'UGRD_BUSI_05',
      parent: 'UGRD_BUSI',
      name: 'Management, Entrenp, and Tech',
      value: 409
    },
    {
      id: 'UGRD_BUSI_06',
      parent: 'UGRD_BUSI',
      name: 'Marketing and International Bus',
      value: 315
    },
    {
      id: 'UGRD_NURS',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'Nursing',
      value: 1602
    },
    //{
    //  id: 'UGRD_NURS_01',
    //  parent: 'UGRD_NURS',
    //  name: 'Nursing',
    //  value: 1602
    //},
    {
      id: 'UGRD_PH',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'Public Health',
      value: 322
    },
    {
      id: 'UGRD_PH_01',
      parent: 'UGRD_PH',
      name: 'Health Care Administration',
      value: 203
    },
    {
      id: 'UGRD_PH_02',
      parent: 'UGRD_PH',
      name: 'Health Promotion',
      value: 120
    },
    {
      id: 'UGRD_UNLV',
      parent: 'CAREER_UGRD', parentName: '(Undergraduate)',
      name: 'UNLV',
      value: 2951
    },
    //{
    //  id: 'UGRD_UNLV_01',
    //  parent: 'UGRD_UNLV',
    //  name: 'UNLV',
    //  value: 2951
    //},

    //############################# CAREER_GRAD #############################

    {
      id: 'CAREER_GRAD',
      parent: '0.0',
      name: 'Graduate',
      value: 4298,
      color:'#92bbff'
    },
    {
      id: 'GRAD_EDU',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Education',
      value: 1435
    },
    {
      id: 'GRAD_EDU_01',
      parent: 'GRAD_EDU',
      name: 'Coun Ed, Schl Psy and Hmn Srvc',
      value: 121
    },
    {
      id: 'GRAD_EDU_02',
      parent: 'GRAD_EDU',
      name: 'Educ Psychology and Higher Ed',
      value: 159
    },
    {
      id: 'GRAD_EDU_03',
      parent: 'GRAD_EDU',
      name: 'Erly Chldhd, Mltlngl and Sp Ed',
      value: 392
    },
    {
      id: 'GRAD_EDU_04',
      parent: 'GRAD_EDU',
      name: 'Teaching and Learning',
      value: 770
    },
    {
      id: 'GRAD_ENGR',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Engineering',
      value: 249
    },
    {
      id: 'GRAD_ENGR_01',
      parent: 'GRAD_ENGR',
      name: 'Civil and Environmental Enginr',
      value: 83
    },
    {
      id: 'GRAD_ENGR_02',
      parent: 'GRAD_ENGR',
      name: 'Computer Science',
      value: 56
    },
    {
      id: 'GRAD_ENGR_03',
      parent: 'GRAD_ENGR',
      name: 'Construction Management',
      value: 2
    },
    {
      id: 'GRAD_ENGR_04',
      parent: 'GRAD_ENGR',
      name: 'Electrical and Comp Engineering',
      value: 40
    },
    {
      id: 'GRAD_ENGR_05',
      parent: 'GRAD_ENGR',
      name: 'Mechanical Engineering',
      value: 69
    },
    {
      id: 'GRAD_FA',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Fine Arts',
      value: 182
    },
    {
      id: 'GRAD_FA_01',
      parent: 'GRAD_FA',
      name: 'Architecture',
      value: 39
    },
    {
      id: 'GRAD_FA_02',
      parent: 'GRAD_FA',
      name: 'Art',
      value: 10
    },
    {
      id: 'GRAD_FA_03',
      parent: 'GRAD_FA',
      name: 'Film',
      value: 8
    },
    {
      id: 'GRAD_FA_04',
      parent: 'GRAD_FA',
      name: 'Music',
      value: 95
    },
    {
      id: 'GRAD_FA_05',
      parent: 'GRAD_FA',
      name: 'Theatre',
      value: 30
    },
    {
      id: 'GRAD_HOSPITALITY',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Hospitality',
      value: 114
    },
    //{
    //  id: 'GRAD_HOSPITALITY_01',
    //  parent: 'GRAD_HOSPITALITY',
    //  name: 'College of Hospitality',
    //  value: 114
    //},
    {
      id: 'GRAD_LA',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Liberal Arts',
      value: 327
    },
    {
      id: 'GRAD_LA_01',
      parent: 'GRAD_LA',
      name: 'Anthropology',
      value: 39
    },
    {
      id: 'GRAD_LA_02',
      parent: 'GRAD_LA',
      name: 'College of Liberal Arts',
      value: 3
    },
    {
      id: 'GRAD_LA_03',
      parent: 'GRAD_LA',
      name: 'English',
      value: 84
    },
    {
      id: 'GRAD_LA_04',
      parent: 'GRAD_LA',
      name: 'History',
      value: 36
    },
    {
      id: 'GRAD_LA_05',
      parent: 'GRAD_LA',
      name: 'Political Science',
      value: 30
    },
    {
      id: 'GRAD_LA_06',
      parent: 'GRAD_LA',
      name: 'Psychology',
      value: 79
    },
    {
      id: 'GRAD_LA_07',
      parent: 'GRAD_LA',
      name: 'Sociology',
      value: 48
    },
    {
      id: 'GRAD_LA_08',
      parent: 'GRAD_LA',
      name: 'World Languages and Cultures',
      value: 11
    },
    {
      id: 'GRAD_SCIENCES',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Sciences',
      value: 221
    },
    {
      id: 'GRAD_SCIENCES_01',
      parent: 'GRAD_SCIENCES',
      name: 'Chemistry and Biochemistry',
      value: 39
    },
    {
      id: 'GRAD_SCIENCES_02',
      parent: 'GRAD_SCIENCES',
      name: 'Geoscience',
      value: 38
    },
    {
      id: 'GRAD_SCIENCES_03',
      parent: 'GRAD_SCIENCES',
      name: 'Life Sciences',
      value: 54
    },
    {
      id: 'GRAD_SCIENCES_04',
      parent: 'GRAD_SCIENCES',
      name: 'Mathematical Sciences',
      value: 57
    },
    {
      id: 'GRAD_SCIENCES_05',
      parent: 'GRAD_SCIENCES',
      name: 'Physics and Astronomy',
      value: 30
    },
    {
      id: 'GRAD_SCIENCES_06',
      parent: 'GRAD_SCIENCES',
      name: 'Water Resources Management',
      value: 3
    },
    {
      id: 'GRAD_UA',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'College of Urban Affairs',
      value: 467
    },
    {
      id: 'GRAD_UA_01',
      parent: 'GRAD_UA',
      name: 'College of Urban Affairs',
      value: 5
    },
    {
      id: 'GRAD_UA_02',
      parent: 'GRAD_UA',
      name: 'Communication Studies',
      value: 20
    },
    {
      id: 'GRAD_UA_03',
      parent: 'GRAD_UA',
      name: 'Criminal Justice',
      value: 40
    },
    {
      id: 'GRAD_UA_04',
      parent: 'GRAD_UA',
      name: 'Journalism and Media Studies',
      value: 18
    },
    {
      id: 'GRAD_UA_05',
      parent: 'GRAD_UA',
      name: 'Public Policy and Leadership',
      value: 191
    },
    {
      id: 'GRAD_UA_06',
      parent: 'GRAD_UA',
      name: 'Social Work',
      value: 195
    },
    {
      id: 'GRAD_DENT',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Dentistry',
      value: 18
    },
    //{
    //  id: 'GRAD_DENT_01',
    //  parent: 'GRAD_DENT',
    //  name: 'Dentistry',
    //  value: 18
    //},
    {
      id: 'GRAD_IHS',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Integrated Health Sciences',
      value: 212
    },
    {
      id: 'GRAD_IHS_01',
      parent: 'GRAD_IHS',
      name: 'Health Phy and Diagnostic Sci',
      value: 41
    },
    {
      id: 'GRAD_IHS_02',
      parent: 'GRAD_IHS',
      name: 'Kinesiology and Nutrition Sci',
      value: 44
    },
    {
      id: 'GRAD_IHS_03',
      parent: 'GRAD_IHS',
      name: 'Physical Therapy',
      value: 127
    },
    {
      id: 'GRAD_BUSI',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Lee Business School',
      value: 429
    },
    {
      id: 'GRAD_BUSI_01',
      parent: 'GRAD_BUSI',
      name: 'Accounting',
      value: 107
    },
    {
      id: 'GRAD_BUSI_02',
      parent: 'GRAD_BUSI',
      name: 'Economics',
      value: 21
    },
    {
      id: 'GRAD_BUSI_03',
      parent: 'GRAD_BUSI',
      name: 'Lee Business School',
      value: 16
    },
    {
      id: 'GRAD_BUSI_04',
      parent: 'GRAD_BUSI',
      name: 'MBA',
      value: 205
    },
    {
      id: 'GRAD_BUSI_05',
      parent: 'GRAD_BUSI',
      name: 'Management, Entrenp, and Tech',
      value: 107
    },
    {
      id: 'GRAD_NURS',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Nursing',
      value: 152
    },
    //{
    //  id: 'GRAD_NURS_01',
    //  parent: 'GRAD_NURS',
    //  name: 'Nursing',
    //  value: 152
    //},

    {
      id: 'GRAD_PSYBE',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Psychiatry and Behavioral Health',
      value: 82
    },
    //{
    //  id: 'GRAD_PSYBE_01',
    //  parent: 'GRAD_PSYBE',
    //  name: 'Psychiatry and Behavioral Health',
    //  value: 82
    //},
    {
      id: 'GRAD_PH',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'Public Health',
      value: 160
    },
    {
      id: 'GRAD_PH_01',
      parent: 'GRAD_PH',
      name: 'Environ and Occupational Health',
      value: 10
    },
    {
      id: 'GRAD_PH_02',
      parent: 'GRAD_PH',
      name: 'Health Care Administration',
      value: 61
    },
    {
      id: 'GRAD_PH_03',
      parent: 'GRAD_PH',
      name: 'Public Health',
      value: 93
    },
    {
      id: 'GRAD_UNLV',
      parent: 'CAREER_GRAD', parentName: '(Graduate)',
      name: 'UNLV',
      value: 393
    },
    //{
    //  id: 'GRAD_UNLV_01',
    //  parent: 'GRAD_UNLV',
    //  name: 'UNLV',
    //  value: 393
    //},

    //############################# CAREER_LAWS #############################

    {
      id: 'CAREER_LAWS',
      parent: '0.0',
      name: 'LAWS',
      value: 418
    },
    /*{
      id: 'LAWS_LAWS',
      parent: 'CAREER_LAWS',
      name: 'Law',
      value: 418
    },
    {
      id: 'LAWS_LAWS_01',
      parent: 'LAWS_LAWS',
      name: 'Law',
      value: 418
    },*/

    //############################# CAREER_DENT #############################

    {
      id: 'CAREER_DENT',
      parent: '0.0',
      name: 'DENT',
      value: 350
    },
    /*
    {
      id: 'DENT_DENT',
      parent: 'CAREER_DENT',
      name: 'Dentistry',
      value: 350
    },
    {
      id: 'DENT_DENT_01',
      parent: 'DENT_DENT',
      name: 'Dentistry',
      value: 350
    },*/

    //############################# CAREER_MEDI #############################

    {
      id: 'CAREER_MEDI',
      parent: '0.0',
      name: 'MEDI',
      value: 120
    }
    /*
    ,
    {
      id: 'MEDI_MEDI',
      parent: 'CAREER_MEDI',
      name: 'School of Medicine',
      value: 120
    },
    {
      id: 'MEDI_MEDI_01',
      parent: 'MEDI_MEDI',
      name: 'School of Medicine',
      value: 120
    }
    */

  ]
    ;


  
  // Splice in transparent for the center circle
  //Highcharts.getOptions().colors.splice(0, 0, 'transparent');


  Highcharts.chart('sunburtsChart', {

    chart: {
      height: '100%',
      style: {
        fontFamily: "Roboto, Arial, sans-serif"
      },
      events: {
        redraw: function () {
          if (this.series[0].drillUpButton) {
            this.series[0].drillUpButton.hide();
          }
        }
      }
    },

    title: {
      text: 'UNLV Headcount by Level'
    },
    //subtitle: {
    //  text: 'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
    //},
    plotOptions: {
      series: {
        dataLabels: {
         
          style: {
            fontSize: '14px',
            fontWeight: 'normal',
            textOutline: false
          }
          //softConnector: true
        }

      }
    },
    series: [{
      type: "sunburst",
      data: data,
      allowDrillToNode: true,      
      cursor: 'pointer',
      //dataLabels: {
      //  format: '{point.name}',
      //  filter: {
      //    property: 'innerArcLength',
      //    operator: '>',
      //    value: 16
      //  }

      //},    
      levels: [{
        level: 1,
        colorByPoint: true,
        levelIsConstant: false,
        dataLabels: {
          format: '{point.name}<br/>{point.parentName}',
          style: { fontSize: '16px', fontWeight:'bold', transform: 'translate(0, 10px)' },          

          //filter: {
          //  property: 'outerArcLength',
          //  operator: '>',
          //  value: 64
          //}
        }
      },
      {
        level: 2,
        colorByPoint: true
      },
      {
        level: 3,
        colorVariation: {
          key: 'brightness',
          to: -0.5
        }
      }, {
        level: 4,
        colorVariation: {
          key: 'brightness',
          to: -0.5
        }
      }]

    }],
    tooltip: {
      headerFormat: "",
      pointFormat: '<b>{point.name}</b><br/><b>{point.value}</b>'
    }
  });


}



//*************** SUNBURTS TEST ******************



//GENERAL, returns date string like "May 24, 2019"
function getShortDate() {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const d = new Date();

  let dateString = `${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

  return dateString;
}


//GENERAL
function showHideNoDataWarning(noData) {
  if (noData) {
    $('#noDataPlaceholder').fadeIn("slow");
  } else {
    $('#noDataPlaceholder').hide().fadeOut("slow");
  }
}


//GENERAL
function showLoader(show) {
  if (show) {
    $("#loaderDiv").attr('style', 'display:flex !important');
  } else {
    $("#loaderDiv").attr('style', 'display:none !important');
  }
}


//GENERAL
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



//CUSTOM, draws DataTable with given placeholder, data and separately calculated totals
function drawDataTable(tablePlaceholder, data, totals, firstColumn = 'degreeType', tableHeader, headcountUnduplicated) {


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
        $(this.api().column('.headcount-column.amount').footer()).html(totals.headcount);
      }

      if (headcountUnduplicated !== undefined) {
        $('tr:eq(1) th:eq(1)', this.api().table().footer()).html(headcountUnduplicated);
      }

    }
    ,
    'footerCallback': function (row, data, start, end, display) {
      //console.log(row);
    },
    columns: [
      {
        data: firstColumn
      },
      {
        data: 'headcount',
        class: 'headcount-column amount'
      }
    ]
    //,
    //'columnDefs': [
    //  { 'orderData': [2], 'targets': [0] }

    //]
  });


  if (tableHeader != null) { $(tablePlaceholder).before(`<h3 class="mt-5">${tableHeader}</h3>`); }


}






//ALL COLLEGES

//CUSTOM, generate headcount totals by level
function generateHeadcountByLevel(byLevelData, headcountUnduplicated) {

  let headcountTotal = { headcountTitle: 'University Total - by Level', headcount: 0 };


  let htmlBoilerplateTotals = `
									<thead>
										<tr>
										 <th>Student Level</th>
											<th>Headcount</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
									<tfoot>
										<tr>
											<th>Total by Level</th>
											<th></th>
										</tr>
                    <tr>
											<th>Total Unduplicated</th>
											<th class="headcount-column amount"></th>
										</tr>
									</tfoot>

													`;

  byLevelData.map((value) => {
    headcountTotal.headcount += value.headcount;
  });

  tablePlaceholderName = `reportContentDataTable_HeadcountByLevel`;


  //$('#tableContent').before(`<div id="byLevelContent" class="row" />`);


  $('#totalsContent').append(`
                              <div class="col-6">
                                <table id="${tablePlaceholderName}" class="hover mb-5"></table>
                              </div>`);


  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplateTotals);


  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, byLevelData, headcountTotal, 'careerLevel', 'Headcount by Level', headcountUnduplicated))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");


  return byLevelData;

}


//CUSTOM, generate tables for 'All Colleges' selected option
function generateCareerLevelTables(careerLevelData, headcountByLevelData) {

  let universityData = {
    totalByDegreeType: [{
      degreeType: "University Total - by Degree Type",
      headcount: 0
    }]

  };


  careerLevelData.map((row) => {

    if (universityData.data == null) universityData.data = new Array();

    if (universityData.data[row.careerLevel] == null) universityData.data[row.careerLevel] = new Array();

    if (universityData.data[row.careerLevel].rows == null) universityData.data[row.careerLevel].rows = new Array();

    if (universityData.data[row.careerLevel].total == null) universityData.data[row.careerLevel].total = { headcount: 0 };



    universityData.data[row.careerLevel].rows.push({
      degreeType: row.degreeType,
      headcount: row.headcount
    });

    universityData.data[row.careerLevel].total.headcount += row.headcount;

    universityData.totalByDegreeType[0].headcount += row.headcount;

  });

  //console.log(universityData);

  let htmlBoilerplate = `
								<thead>
									<tr>
										<th>Degree Type</th>
										<th>Headcount</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
								<tfoot>
									<tr>
										<th>Total - by Degree Type</th>
										<th></th>
									</tr>
                  <tr>
										<th>Total Unduplicated</th>
										<th class="headcount-column amount"></th>
									</tr>
								</tfoot>
												`;

  let htmlBoilerplateTotals = `
								<thead>
									<tr>
										<th></th>
										<th>Headcount</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
												`;



  Object.entries(universityData.data).map((row, index, arr) => {

    let tablePlaceholderName = `reportContentDataTable_${index}`;

    let headcountUnduplicated = headcountByLevelData.find(item => item.careerLevel === row[0]).headcount;

    $('#tableContent').append(`
                      <div class="row">
                        <div class="col-4">
                          <table id="${tablePlaceholderName}" class="hover mb-5"></table>
                        </div>
                        <div id="${tablePlaceholderName}_piechart" class="col-8 my-5">                         
                        </div>
                      </div>`);


    $(`#${tablePlaceholderName}`)
      .html(htmlBoilerplate);


    $(`#${tablePlaceholderName}`)
      .html(drawDataTable(`#${tablePlaceholderName}`, row[1].rows, row[1].total, 'degreeType', row[0], headcountUnduplicated))
      .width('100%')  // ...width '100%' is fix for style=0px DataTables
      .fadeIn("slow");





    let piechartData = row[1].rows.map(obj => {
      //var rObj = {};
      //rObj[obj.key] = obj.value;
      //return rObj;

      return { name: obj.degreeType, y: obj.headcount };

    });

    //console.log(row[1].rows);

    let piechartSeries = [{
      type: 'pie',
      allowPointSelect: true,
      keys: ['name', 'y', 'selected', 'sliced'],
      data: piechartData.reverse()//,
      //showInLegend: true
    }];


    Highcharts.chart(`${tablePlaceholderName}_piechart`, {

      chart: {
        //styledMode: true
        height: 400,
      },

      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b><br/>{point.y} '
      },



      series: piechartSeries
    });




  });


  //let tablePlaceholderName = `reportContentDataTable_TotalsByDegree`;

  //$('#tableContent').append(`<div class="col-6"><table id="${tablePlaceholderName}" class="hover mb-5"></table></div>`);


  //$(`#${tablePlaceholderName}`)
  //	.html(htmlBoilerplateTotals);

  //$(`#${tablePlaceholderName}`)
  //	.html(drawDataTable(`#${tablePlaceholderName}`, universityData.totalByDegreeType, undefined, 'degreeType', 'University Total - by Degree Type'))
  //	.width('100%')  // ...width '100%' is fix for style=0px DataTables
  //	.fadeIn("slow");

  return universityData.totalByDegreeType[0].headcount;

}


//CUSTOM, table that aggregates both unduplicated and degree total amounts
function generateUniversityTotalsTable(degreeTotal, headcountTotal) {

  let totalsData = [
    { itemTitle: 'By Degree Type', headcount: degreeTotal },
    { itemTitle: 'Headcount Unduplicated', headcount: headcountTotal }
  ];

  let htmlBoilerplateTotals = `
									<thead>
										<tr>
										 <th>Totals</th>
											<th>Headcount</th>
										</tr>
									</thead>
									<tbody>
									</tbody>

													`;


  tablePlaceholderName = `reportContentDataTable_UniversityTotals`;


  //$('#reportContent').append('<div id="tableContent" class="row" />');

  //$('#tableContent').before(`<div id="totalsContent" class="row" />`);


  $('#totalsContent').append(`<div class="col-6"><table id="${tablePlaceholderName}" class="hover mb-5"></table></div>`);


  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplateTotals);

  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, totalsData, undefined, 'itemTitle', 'University Totals'))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");

}







//SPECIFIC COLLEGE

//CUSTOM, multiple tables with degree details like "Health Physics BS" for "Bachelor"
function generateDegreeTables(degreeData) {

  let collegeData = {
    totalByMajor: [{
      major: "Total College Majors",
      headcount: 0
    }]

  };

  let collegeDegreeTotal = [];


  degreeData.map((row) => {

    if (collegeData.data == null) collegeData.data = new Array();

    if (collegeData.data[row.degreeType] == null) collegeData.data[row.degreeType] = new Array();

    if (collegeData.data[row.degreeType].rows == null) collegeData.data[row.degreeType].rows = new Array();

    if (collegeData.data[row.degreeType].total == null) collegeData.data[row.degreeType].total = { headcount: 0 };



    collegeData.data[row.degreeType].rows.push({
      major: row.major,
      headcount: row.headcount
    });

    collegeData.data[row.degreeType].total.headcount += row.headcount;

    collegeData.totalByMajor[0].headcount += row.headcount;

  });


  let htmlBoilerplate = `
								<thead>
									<tr>
										<th>Major</th>
										<th>Headcount</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
								<tfoot>
									<tr>
										<th>Total Majors</th>
										<th></th>
									</tr>
								</tfoot>
												`;


  //console.log(collegeData);

  Object.entries(collegeData.data).map((row, index, arr) => {

    let tablePlaceholderName = `reportContentDataTableTotals_${index}`;


    collegeDegreeTotal.push({ degreeType: row[0], headcount: row[1].total.headcount });


    $('#tableContent').append(`
                      <div class="row">
                        <div class="col-4">
                          <table id="${tablePlaceholderName}" class="hover mb-5"></table>
                        </div>
                        <div id="${tablePlaceholderName}_piechart" class="col-8 my-5">                         
                        </div>
                      </div>`);

    $(`#${tablePlaceholderName}`)
      .html(htmlBoilerplate);


    $(`#${tablePlaceholderName}`)
      .html(drawDataTable(`#${tablePlaceholderName}`, row[1].rows, row[1].total, 'major', row[0]))
      .width('100%')  // ...width '100%' is fix for style=0px DataTables
      .fadeIn("slow");



    let piechartData = row[1].rows.map(obj => {
      //var rObj = {};
      //rObj[obj.key] = obj.value;
      //return rObj;

      return { name: obj.major, y: obj.headcount };

    });

    //console.log(piechartData);

    let piechartSeries = [{
      type: 'pie',
      allowPointSelect: true,
      keys: ['name', 'y', 'selected', 'sliced'],
      data: piechartData,
      //showInLegend: true
    }];


    Highcharts.chart(`${tablePlaceholderName}_piechart`, {

      chart: {
        //styledMode: true
        height: 400,
      },

      title: {
        text: ''
      },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b><br/>{point.y} '
      },



      series: piechartSeries
    });

  });



  //collegeDegreeTotal.reduce((acc, cur) => acc + cur);

  //let tablePlaceholderName = `reportContentDataTable_TotalsByMajor`;

  //$('#tableContent').append(`<div class="col-6"><table id="${tablePlaceholderName}" class="hover mb-5"></table></div>`);


  //$(`#${tablePlaceholderName}`)
  //	.html(htmlBoilerplateTotals);

  //$(`#${tablePlaceholderName}`)
  //	.html(drawDataTable(`#${tablePlaceholderName}`, collegeData.totalUnduplicated, undefined, 'major', 'Total College Majors'))
  //	.width('100%')  // ...width '100%' is fix for style=0px DataTables
  //	.fadeIn("slow");

  //return collegeData.totalByMajor[0].headcount;

  return {
    totalByMajorHeadcount: collegeData.totalByMajor[0].headcount,
    collegeDegreeTotal: collegeDegreeTotal
  };

}


//CUSTOM, generates college table with total unduplicated headcount
function generateCollegeTotalsTable(majorTotal, headcountTotal) {

  let totalsData = [
    { itemTitle: 'College Majors', headcount: majorTotal.totalByMajorHeadcount },
    { itemTitle: 'Headcount Unduplicated', headcount: headcountTotal }
  ];

  let htmlBoilerplateTotals = `
									<thead>
										<tr>
										 <th>Totals</th>
											<th>Headcount</th>
										</tr>
									</thead>
									<tbody>
									</tbody>

													`;

  let htmlBoilerplateDegreeTotal = `
								<thead>
									<tr>
										<th>Degree Type</th>
										<th>Headcount</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
								<tfoot>
									<tr>
										<th>Total</th>
										<th></th>
									</tr>
								</tfoot>

												`;

  let tablePlaceholderName = `reportContentDataTable_DegreeTypeTotals`;

  let degreeTypeTotal = { headcount: majorTotal.collegeDegreeTotal.reduce((acc, cur) => acc + cur.headcount, 0) };

  $('#totalsContent').append(`<div class="col-6"><table id="${tablePlaceholderName}" class="hover mb-5"></table></div>`);


  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplateDegreeTotal);

  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, majorTotal.collegeDegreeTotal, degreeTypeTotal, 'degreeType', 'Totals by Degree Type'))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");



  tablePlaceholderName = `reportContentDataTable_CollegeTotals`;


  $('#totalsContent').append(`<div class="col-6"><table id="${tablePlaceholderName}" class="hover mb-5"></table></div>`);


  $(`#${tablePlaceholderName}`)
    .html(htmlBoilerplateTotals);

  $(`#${tablePlaceholderName}`)
    .html(drawDataTable(`#${tablePlaceholderName}`, totalsData, undefined, 'itemTitle', 'College Totals'))
    .width('100%')  // ...width '100%' is fix for style=0px DataTables
    .fadeIn("slow");






}








//=========================================================================

//CUSTOM, main function, puts everything together
function updateAll() {

  //Id of the dropdown caused a call of updateAll()
  //var currDDId = $(callElem).attr("id") !== undefined ? $(callElem).attr("id") : "";


  let postData = {
    CensusKey: $('#inputGroupSelect_censusKey').val(),
    //AcadYear: $('#inputGroupSelect_acadYear').val(),
    PlanCollege: $('#inputGroupSelect_planCollege option:selected').val()
    //  //? 'All'
    //  //: $('#inputGroupSelect_planCollege option:selected').val()
  };

  //TODO: move to separate function (or file)
  let rootUrl = APP_URL;//'@HttpContext.Current.Request.ApplicationPath' !== '/' ? '@HttpContext.Current.Request.ApplicationPath' : '';


  $.ajax({
    type: 'POST',
    url: rootUrl + '/umbraco/api/ReportsApi/HeadcountByCollegeAndMajorSummarizedByDegreeType',
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

      let selectedCollege = $('#inputGroupSelect_planCollege option:selected').text();


      // NO DATA check
      let noData = (data.careerLevelTable == null
        && data.degreeTypeTable == null
        && data.collegeTable == null) ? true : false;



      if (postData.CensusKey == null) {
        createDropDown({
          id: 'censusKey', name: 'Term', data: data.censusKey, htmlAttr: 'style="width: 12rem; order: 1;"'
        });
      }

      createDropDown({ id: 'planCollege', name: 'College', data: data.planCollege, htmlAttr: 'style="width: 22rem; order: 2;"' });

      if (postData.PlanCollege != null) {
        $('#inputGroupSelect_planCollege').val(postData.PlanCollege);
      }

      showLoader(false);
      showHideNoDataWarning(noData);




      if (!noData && (postData.PlanCollege == "All" || postData.PlanCollege == null)) {

        let headcountByLevelData = generateHeadcountByLevel(data.careerLevelTable, data.headcount[0].headcount);

        let degreeTotal = generateCareerLevelTables(data.degreeTypeTable, headcountByLevelData);

        generateUniversityTotalsTable(degreeTotal, data.headcount[0].headcount);





      } else if (!noData && (postData.PlanCollege !== "All" || postData.PlanCollege !== null)) {

        let majorTotal = generateDegreeTables(data.collegeTable);

        generateCollegeTotalsTable(majorTotal, data.headcount[0].headcount);





      } else {
        $('#inputGroupSelect_planCollege')
          .prepend(`<option value='${postData.PlanCollege}'disabled selected style='display: none;'>${selectedCollege}</option>`);
      }

      makeSunburst();

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








