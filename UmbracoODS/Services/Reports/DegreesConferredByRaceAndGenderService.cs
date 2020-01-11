using System.Collections.Generic;
using System.Linq;
using UmbracoODS.Models.Reports.DegreesConferredByRaceAndGender;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Services.Helpers;
using UmbracoODS.Controllers.Api;

namespace UmbracoODS.Services.Reports
{
  public class DegreesConferredByRaceAndGenderService
  {
    public ViewModel GetReportData(Params fromClientParams)
    {
      var _contextIAP = new IAPWebReportsEntities();

      var viewModel = new ViewModel();

      var acadYear = "2017-18"; //WIP: get the most recent acad year
      var acadCareer = "All";
      var planCollege = "All";
      bool? includeCerts = true;

      if (fromClientParams != null)
      {
        if (fromClientParams.AcadYear != null)
        {
          acadYear = fromClientParams.AcadYear;
        }

        if (fromClientParams.AcadCareer != null)
        {
          acadCareer = fromClientParams.AcadCareer;
        }
        
        if (fromClientParams.PlanCollege != null)
        {
          planCollege = fromClientParams.PlanCollege;
        }

        if (fromClientParams.IncludeCerts != null)
        {
          includeCerts = fromClientParams.IncludeCerts;
        }

      }
      else
      {
        viewModel.AcadYearList = _contextIAP.Globals
                                      .FirstOrDefault(x => x.GlobalKey == "RecentAcadYears_Degrees_EPM")
                                      .GlobalValue
                                      .Split(',')
                                      .Select(x => new AcadYear { acadYear = x })
                                      .ToList()
                                      .Take(5);

        viewModel.AcadCareer = StaticHelpers.AcadCareerNoMedi();

      }

      var storedProcCollegeList = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[GetDCollegeListingByAcadYearAndCareer_EPM] " +
               $"'{acadYear}', '{acadCareer}'")
               .With<PlanCollege>()
               .Execute();

      IList<PlanCollege> returnedColleges = (IList<PlanCollege>)storedProcCollegeList[0];
      returnedColleges.Insert(0, new PlanCollege() { CollegeCode = "All", CollegeName = "All Colleges" });



      var foundCollegeCode = returnedColleges.SingleOrDefault(x => x.CollegeCode == planCollege);

      viewModel.PlanCollege = returnedColleges;


      //To prevent sending data for college that not in the list if different year was selected
      if (foundCollegeCode != null)
      {

        var storedProcMain = new IAPWebReportsEntities()
         .MultipleResults($"[dbo].[Rpt_DegreesConferredByRaceAndGender_EPM_EF] " +
         $"'{acadYear}', '{acadCareer}', '{planCollege}', '{includeCerts}'")
         .With<AllCollegesTable>()
         .With<AcadYear>()
         .With<RaceEthnicityTable>()
         .Execute();

        viewModel.AllCollegesRaceEthnGenTable = ((IEnumerable<AllCollegesTable>)storedProcMain[0]).OrderBy(c => c.Total);
        viewModel.AcadYearSingle = (IEnumerable<AcadYear>)storedProcMain[1];
        viewModel.RaceEthnGenTable = ((IEnumerable<RaceEthnicityTable>)storedProcMain[2]).OrderBy(c => c.Total);
      }



      return viewModel;
    }
  }
}