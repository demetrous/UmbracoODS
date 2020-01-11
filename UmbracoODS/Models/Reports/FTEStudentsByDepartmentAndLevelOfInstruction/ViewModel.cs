using System.Collections.Generic;
using UmbracoODS.Models.Reports.SharedModels;


namespace UmbracoODS.Models.Reports.FTEStudentsByDepartmentAndLevelOfInstruction
{
  public class ViewModel
  {
    public IEnumerable<FteTable> FteTable { get; set; }

    public IEnumerable<CensusKeyTable> CensusKeySingle { get; set; }
    public IEnumerable<CensusKeyTable> CensusKeyList { get; set; }

    public IEnumerable<AcadYear> AnnualYearSingle { get; set; }
    public IEnumerable<AcadYear> AnnualYearList { get; set; }
  }
}