using System.Collections.Generic;
using System.Collections;
using System.Linq;
using UmbracoODS.Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Controllers.Api;
using Umbraco.Core;
using UmbracoODS.Services.Helpers;

namespace UmbracoODS.Services.Reports
{
  public class HeadcountByCollegeAndMajorSummarizedByDegreeTypeService
  {
    public ViewModel GetReportData(Params clientParams)
    {

      var _contextIAP = new IAPWebReportsEntities();

      IList results;
      IList resultsPsych;

      var viewModel = new ViewModel();

      // Get the most recent term key for initial report
      var censusKey = StaticHelpers.GetLatestPrelimTerm();
      var planCollege = "All";

      if (clientParams != null)
      {
        if (clientParams.CensusKey != null)
        {
          censusKey = clientParams.CensusKey;
        }

        if (clientParams.PlanCollege != null)
        {
          planCollege = clientParams.PlanCollege;
        }

      }
      else
      {
        viewModel.CensusKey = _contextIAP.GetRecentPrelimFallTerms_EPM().Select(x => new CensusKeyTable
        {
          CensusKey = x.CensusKey,
          TermName = x.TermName
        }).Take(5).ToList();



      }



      if (planCollege == "All")
      {
        results = new IAPWebReportsEntities()
            .MultipleResults($"[dbo].[Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType_EPM_EF] " +
            $"'{censusKey}', '{planCollege}'")
            .With<Term>()
            .With<Headcount>()
            .With<CareerLevelTable>()
            .With<DegreeTypeTable>()
            .Execute();
      }

      else
      {
        results = new IAPWebReportsEntities()
            .MultipleResults($"[dbo].[Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType_EPM_EF] " +
            $"'{censusKey}', '{planCollege}'")
            .With<Term>()
            .With<CollegeTable>()
            .With<Headcount>()
            .Execute();
      }





      var storedProcCollegeList = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[GetCPCollegeListingByCensusKey_EPM_EF] " +
               $"'{censusKey}'")
               .With<PlanCollege>()
               .Execute();

      IList<PlanCollege> returnedColleges = (IList<PlanCollege>)storedProcCollegeList[0];

      returnedColleges.Add(new PlanCollege() { CollegeCode = "GRAD", CollegeName = "Graduate College" }); //"Graduate College", "GRAD"

      returnedColleges = returnedColleges.OrderBy(x => x.CollegeName).ToList();

      returnedColleges.Insert(0, new PlanCollege() { CollegeCode = "All", CollegeName = "All Colleges" });



      //var psychIndex = returnedColleges.FindIndex(x => x.CollegeCode == "LV3060");

      //var psych = returnedColleges.FirstOrDefault(x => x.CollegeCode == "LV3060");

      //returnedColleges.RemoveAt(psychIndex);



      var foundCollegeCode = returnedColleges.SingleOrDefault(x => x.CollegeCode == planCollege);






      viewModel.PlanCollege = returnedColleges;

      //To prevent sending data for college that not in the list if different year was selected
      if (foundCollegeCode != null)
      {
        if (planCollege == "All")
        {

          viewModel.Term = (IEnumerable<Term>)results[0];
          viewModel.Headcount = (IEnumerable<Headcount>)results[1];
          viewModel.CareerLevelTable = (IEnumerable<CareerLevelTable>)results[2];
          viewModel.DegreeTypeTable = (IEnumerable<DegreeTypeTable>)results[3];
        }
        else
        {
          viewModel.Term = (IEnumerable<Term>)results[0];


          //if (planCollege == "LV7020")
          //{

          //  var medResult = (IList<CollegeTable>)results[1];

          //  resultsPsych = new IAPWebReportsEntities()
          //    .MultipleResults($"[dbo].[Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType_EPM_EF] " +
          //    $"'{censusKey}', 'LV3060'")
          //    .With<Term>()
          //    .With<CollegeTable>()
          //    .With<Headcount>()
          //    .Execute();

          //  var resultsPsychCollegeTable = (IEnumerable<CollegeTable>)resultsPsych[1];


          //  foreach (CollegeTable item in resultsPsychCollegeTable)
          //  {
          //    medResult.Add(
          //      new CollegeTable
          //      {
          //        College = "School of Medicine",
          //        DegreeType = item.DegreeType,
          //        Major = item.Major,
          //        Headcount = item.Headcount,
          //        DegreeTypeSort = item.DegreeTypeSort
          //      });
          //  }

          //  viewModel.CollegeTable = medResult;

          //}
          //else
          //{
          //  viewModel.CollegeTable = (IEnumerable<CollegeTable>)results[1];
          //}



          viewModel.CollegeTable = (IEnumerable<CollegeTable>)results[1];



          viewModel.Headcount = (IEnumerable<Headcount>)results[2];
        }
      }



      return viewModel;
    }
  }
}