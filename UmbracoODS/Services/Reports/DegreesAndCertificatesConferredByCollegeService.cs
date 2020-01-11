using System.Collections.Generic;
using System.Linq;
using UmbracoODS.Models.Reports.DegreesAndCertificatesConferredByCollege;
using UmbracoODS.Controllers.Api;
using System;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Services.Reports
{
  public class DegreesAndCertificatesConferredByCollegeService
  {
    public ViewModel GetReportData(Params degCertParams)
    {
      var _contextIAP = new IAPWebReportsEntities();

      var viewModel = new ViewModel();

      var acadYear = "2017-18"; //WIP: get the most recent acad year
      var planCollege = "All";



      if (degCertParams != null)
      {
        if (degCertParams.AcadYear != null)
        {
          acadYear = degCertParams.AcadYear;
        }


        if (degCertParams.PlanCollege != null)
        {
          planCollege = degCertParams.PlanCollege;
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
      }


      var results = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[Rpt_DegreesConferredByCollege_EPM_EF] " +
               $"'{acadYear}', '{planCollege}'")
               .With<AllCollegesDegreeCertTable>()
               .With<AcadYear>()
               .With<DegreeCertTable>()
               .Execute();



      var storedProcCollegeList = new IAPWebReportsEntities()
               .MultipleResults($"[dbo].[GetDCollegeListingByAcadYear_EPM] " +
               $"'{acadYear}'")
               .With<PlanCollege>()
               .Execute();




      IList<PlanCollege> returnedColleges = (IList<PlanCollege>)storedProcCollegeList[0];
      returnedColleges.Insert(0, new PlanCollege() { CollegeCode = "All", CollegeName = "All Colleges" });

      

      var foundCollegeCode = returnedColleges.SingleOrDefault(x => x.CollegeCode == planCollege);

      viewModel.PlanCollege = returnedColleges;

      //To prevent sending data for college that not in the list if different year was selected
      if (foundCollegeCode != null)
      {
        viewModel.AllCollegesDegreeCertTable = (IEnumerable<AllCollegesDegreeCertTable>)results[0];
        viewModel.AcadYearSingle = (IEnumerable<AcadYear>)results[1];
        viewModel.DegreeCertTable = (IEnumerable<DegreeCertTable>)results[2];
      }


      return viewModel;
    }
  }
}