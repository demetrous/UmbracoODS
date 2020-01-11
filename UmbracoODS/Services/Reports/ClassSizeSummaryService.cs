using System.Collections.Generic;
using System.Collections;
using System.Linq;
using UmbracoODS.Models.Reports.ClassSizeSummary;
using UmbracoODS.Models.Reports.SharedModels;
using UmbracoODS.Controllers.Api;

namespace UmbracoODS.Services.Reports
{
  public class ClassSizeSummaryService
  {
    public ViewModel GetReportData(Params clientParams)
    {

      var _contextIAP = new IAPWebReportsEntities();


      var viewModel = new ViewModel();


      var termChoiceKey = "20183"; // WIP: get latest from DB     


      if (clientParams != null)
      {
        if (clientParams.TermChoiceKey != null)
        {
          termChoiceKey = clientParams.TermChoiceKey;
        }
      }
      else
      {
        viewModel.TermChoice = _contextIAP
          .Rpt_ClassSizeSummary_TermChoices()
          .Select(x => new TermChoice
          {
            TermChoiceKey = x.TermChoiceKey,
            TermChoiceName = x.TermChoiceName
          })
          .Take(5)
          .ToList();

      }



      IList results;

      results = new IAPWebReportsEntities()
          .MultipleResults($"[dbo].[Rpt_ClassSizeSummary] " +
          $"'','','{termChoiceKey}'")
          .With<ClassSizeTable>()
          .With<TermSingle>()
          .Execute();




      viewModel.ClassSizeTable = (IEnumerable<ClassSizeTable>)results[0];
      viewModel.TermSingle = (IEnumerable<TermSingle>)results[1];







      return viewModel;
    }
  }
}