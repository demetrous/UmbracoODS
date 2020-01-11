using System.Collections.Generic;
using System.Linq;
using UmbracoODS.Models.Reports.HeadcountByCollegeRaceAndGender;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Services.Helpers;
using UmbracoODS.Controllers.Api;


namespace UmbracoODS.Services.Reports
{
  public class HeadcountByCollegeRaceAndGenderService
  {
    public ViewModel GetReportData(Params headcountParams)
    {

      var _contextIAP = new IAPWebReportsEntities();

      var viewModel = new ViewModel();

      // Get the most recent term key for initial report
      var censusKey = StaticHelpers.GetLatestPrelimTerm();

      var acadCareer = "All";
      var planCollege = "All";

      if (headcountParams != null)
      {
        if (headcountParams.CensusKey != null)
        {
          censusKey = headcountParams.CensusKey;
        }

        if (headcountParams.AcadCareer != null)
        {
          acadCareer = headcountParams.AcadCareer;
        }
        else
        {
          viewModel.AcadCareer = StaticHelpers.AcadCareer();
        }

        if (headcountParams.PlanCollege != null)
        {
          planCollege = headcountParams.PlanCollege;
        }

      }
      else
      {
        viewModel.CensusKey = _contextIAP.GetRecentPrelimFallTerms_EPM().Select(x => new CensusKeyTable
        {
          CensusKey = x.CensusKey,
          TermName = x.TermName
        }).Take(5).ToList();

        viewModel.AcadCareer = StaticHelpers.AcadCareer();


      }




      var results = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[Rpt_HeadcountByCollegeRaceAndGender_EPM_EF] " +
               $"'{censusKey}', '{acadCareer}', '{planCollege}'")
               .With<AllCollegesTable>()
               .With<Term>()
               .With<RaceEthnicityTable>()
               .Execute();



      var storedProcCollegeList = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[GetCPCollegeListingByCensusKeyAndCareer_EPM_EF] " +
               $"'{censusKey}', '{acadCareer}'")
               .With<PlanCollege>()
               .Execute();

      IList<PlanCollege> returnedColleges = (IList<PlanCollege>)storedProcCollegeList[0];

      returnedColleges.Add(new PlanCollege() { CollegeCode = "GRAD", CollegeName = "Graduate College" }); //"Graduate College", "GRAD"

      returnedColleges = returnedColleges.OrderBy(x => x.CollegeName).ToList();

      returnedColleges.Insert(0, new PlanCollege() { CollegeCode = "All", CollegeName = "All Colleges" });



      var foundCollegeCode = returnedColleges.SingleOrDefault(x => x.CollegeCode == planCollege);






      viewModel.PlanCollege = returnedColleges;

      //To prevent sending data for college that not in the list if different year was selected
      if (foundCollegeCode != null)
      {
        viewModel.AllCollegesTable = ((IEnumerable<AllCollegesTable>)results[0]).OrderBy(c => c.Total);
        viewModel.Term = (IEnumerable<Term>)results[1];
        viewModel.RaceEthnicityTable = ((IEnumerable<RaceEthnicityTable>)results[2]).OrderBy(c => c.Total);





        var AllCollegesTableFerpa = viewModel.AllCollegesTable.Where(c => c.Male <= 5 || c.Female <= 5);       

        viewModel.AuthRequired = AllCollegesTableFerpa.Count() > 0 ? true: false;


        if(viewModel.RaceEthnicityTable.Count() >0)
        {
          var RaceEthnicityTableFerpa = viewModel.RaceEthnicityTable.Where(c => c.Male <= 5 || c.Female <= 5);

          viewModel.AuthRequired = RaceEthnicityTableFerpa.Count() > 0 ? true : false;
        }





      }




      


      return viewModel;
    }

  }
}