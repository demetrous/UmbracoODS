using System.Collections.Generic;
using System.Collections;
using System.Linq;
using UmbracoODS.Models.Reports.AppliedAdmittedEnrolled;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Controllers.Api;


namespace UmbracoODS.Services.Reports
{
  public class AppliedAdmittedEnrolledService
  {
    public ViewModel GetReportData(Params clientParams)
    {

      var _contextIAP = new IAPWebReportsEntities();


      var viewModel = new ViewModel();

      // Default retrospective period in years
      var yearsBack = 5;

      var shortTerm = "2188"; // WIP: get latest from DB     
                              //var planCollege = "All";

      //if (clientParams != null)
      //{
      if (clientParams.ShortTerm != null)
      {
        shortTerm = clientParams.ShortTerm;
      }

      if (clientParams.YearsBack > 0)
      {
        yearsBack = clientParams.YearsBack;
      }
      //}
      //else
      //{
      viewModel.ShortTermList = _contextIAP
        .Rpt_AppliedAdmittedEnrolled_EPM_TermChoices()
        .Select(x => new ShortTerm
        {
          Term = x.Term,
          TermName = x.TermName,
          AvgHsgpaNewFreshmen = x.AvgHsgpaNewFreshmen
         
        })
        .Take(yearsBack)
        .ToList();



      //  viewModel.CensusKey = _contextIAP.GetRecentPrelimFallTerms_EPM().Select(x => new CensusKeyTable
      //  {
      //    CensusKey = x.CensusKey,
      //    TermName = x.TermName
      //  }).Take(5).ToList();   
      // }



      IList results;

      //if (planCollege == "All")
      //{
      results = new IAPWebReportsEntities()
          .MultipleResults($"[dbo].[Rpt_AppliedAdmittedEnrolled_EPM] " +
          $"'{shortTerm}', {yearsBack}")
          .With<AdmittedTable>()
          .With<AverageHsgpa>()
          .With<ShortTerm>()
          .With<FiveYearTrend>()
          .Execute();
      //}

      //else
      //{
      //  results = new IAPWebReportsEntities()
      //      .MultipleResults($"[dbo].[Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType_EPM] " +
      //      $"'{censusKey}', '{planCollege}'")
      //      .With<TermSingle>()
      //      .With<CollegeTable>()
      //      .With<Headcount>()
      //      .Execute();
      //}




      viewModel.AdmittedTable = (IEnumerable<AdmittedTable>)results[0];
      viewModel.AverageHsgpa = (IEnumerable<AverageHsgpa>)results[1];
      viewModel.ShortTerm = (IEnumerable<ShortTerm>)results[2];
      viewModel.FiveYearTrend = (IEnumerable<FiveYearTrend>)results[3];



      //var storedProcCollegeList = new IAPWebReportsEntities()
      //         .MultipleResults($"[dbo].[GetCPCollegeListingByCensusKey_EPM] " +
      //         $"'{censusKey}'")
      //         .With<PlanCollege>()
      //         .Execute();

      //IList<PlanCollege> returnedColleges = (IList<PlanCollege>)storedProcCollegeList[0];

      //returnedColleges.Add(new PlanCollege() { CollegeCode = "GRAD", CollegeName = "Graduate College" }); //"Graduate College", "GRAD"

      //returnedColleges = returnedColleges.OrderBy(x => x.CollegeName).ToList();

      //returnedColleges.Insert(0, new PlanCollege() { CollegeCode = "All", CollegeName = "All Colleges" });



      //var foundCollegeCode = returnedColleges.SingleOrDefault(x => x.CollegeCode == planCollege);






      //viewModel.PlanCollege = returnedColleges;

      ////To prevent sending data for college that not in the list if different year was selected
      //if (foundCollegeCode != null)
      //{
      //  if (planCollege == "All")
      //  {

      //    viewModel.TermSingle = (IEnumerable<TermSingle>)results[0];
      //    viewModel.Headcount = (IEnumerable<Headcount>)results[1];
      //    viewModel.CareerLevelTable = (IEnumerable<CareerLevelTable>)results[2];
      //    viewModel.DegreeTypeTable = (IEnumerable<DegreeTypeTable>)results[3];
      //  }
      //  else
      //  {
      //    viewModel.TermSingle = (IEnumerable<TermSingle>)results[0];
      //    viewModel.CollegeTable = (IEnumerable<CollegeTable>)results[1];
      //    viewModel.Headcount = (IEnumerable<Headcount>)results[2];
      //  }
      //}



      return viewModel;
    }
  }
}