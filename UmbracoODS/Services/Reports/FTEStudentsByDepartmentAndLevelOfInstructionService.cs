using System.Collections.Generic;
using System.Collections;
using System.Linq;
using UmbracoODS.Models.Reports.FTEStudentsByDepartmentAndLevelOfInstruction;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Controllers.Api;
using System.Text.RegularExpressions;
using System;

namespace UmbracoODS.Services.Reports
{

  public class FTEStudentsByDepartmentAndLevelOfInstructionService
  {
    public ViewModel GetReportData(Params clientParams)
    {

      var _contextIAP = new IAPWebReportsEntities();


      var viewModel = new ViewModel();


      var censusKey = ""; // WIP: get latest from DB   EF2188
      var annualYear = "";
      bool? isMeasureSCH = false;
      bool? stateSupportedOnly = true;
      bool? isAnnualFTE = false;


      if (clientParams != null && clientParams.CensusKey != null)
      {
        censusKey = clientParams.CensusKey;
      }
      
      else if(clientParams != null && clientParams.AnnualYear != null)
      {
        annualYear = clientParams.AnnualYear;
      }

      else
      {

        if (clientParams != null && clientParams.AnnualYear == null && clientParams.IsAnnualFTE == true)
        {
          var annualYearList = _contextIAP
          .GetRecentAnnualFTEYears_EPM()
          .Select(x => new AcadYear { acadYear = x })
          .Take(5)
          .ToList();          

          viewModel.AnnualYearList = annualYearList;

          annualYear = annualYearList[0].acadYear; //Pick initial value
        }
        else
        {
          var censusKeyList = _contextIAP
          .GetRecentFallAndSpringTerms_EPM()
          .Where(s => IsWithinFiveYears(s.TermName))
          .Select(x => new CensusKeyTable
          {
            CensusKey = x.CensusKey,
            TermName = x.TermName
          })
          .ToList();

          viewModel.CensusKeyList = censusKeyList;

          censusKey = censusKeyList[0].CensusKey; //Pick initial value
        }

      }

      if (clientParams != null && clientParams.IsMeasureSCH != null)
      {
        isMeasureSCH = clientParams.IsMeasureSCH;
      }

      if (clientParams != null && clientParams.StateSupportedOnly != null)
      {
        stateSupportedOnly = clientParams.StateSupportedOnly;
      }





      IList results;

      if (clientParams != null && clientParams.IsAnnualFTE == true)
      {
        results = new IAPWebReportsEntities()
            .MultipleResults($"[dbo].[Rpt_AnnualFTEByCollegeAndDept_EPM] " +
            $"'{annualYear}'")
            .With<FteTable>()
            .With<AcadYear>()
            .Execute();

        viewModel.FteTable = (IEnumerable<FteTable>)results[0];
        viewModel.AnnualYearSingle = (IEnumerable<AcadYear>)results[1];

      }
      else
      {
        results = new IAPWebReportsEntities()
            .MultipleResults($"[dbo].[Rpt_FTEOrSCHByCollegeAndDept_EPM] " +
            $"'{censusKey}','{isMeasureSCH}','{stateSupportedOnly}'")
            .With<FteTable>()
            .With<CensusKeyTable>()
            .Execute();

        viewModel.FteTable = (IEnumerable<FteTable>)results[0];
        viewModel.CensusKeySingle = (IEnumerable<CensusKeyTable>)results[1];

      }

      return viewModel;
    }


    public bool IsWithinFiveYears(string termName)
    {

      var year = Int32.Parse(Regex.Match(termName, @"\d+").Value);

      if (year >= DateTime.Now.Year - 5)
      {
        return true;
      }

      return false;
    }
  }
}