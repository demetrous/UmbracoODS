
using System.Collections.Generic;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Models.Reports.AppliedAdmittedEnrolled
{
  public class ViewModel
  {
    public IEnumerable<AdmittedTable> AdmittedTable { get; set; }
    public IEnumerable<AverageHsgpa> AverageHsgpa { get; set; }
    public IEnumerable<ShortTerm> ShortTerm { get; set; }
    public IEnumerable<FiveYearTrend> FiveYearTrend { get; set; }


    public IEnumerable<ShortTerm> ShortTermList { get; set; }
  }
}