using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Models.Reports.DegreesConferredByRaceAndGender
{
  public class ViewModel
  {

    public IEnumerable<AllCollegesTable> AllCollegesRaceEthnGenTable { get; set; }
    public IEnumerable<AcadYear> AcadYearSingle { get; set; }
    public IEnumerable<RaceEthnicityTable> RaceEthnGenTable { get; set; }

    public IEnumerable<AcadYear> AcadYearList { get; set; }
    public IEnumerable<AcadCareer> AcadCareer { get; set; }
    public IEnumerable<PlanCollege> PlanCollege { get; set; }
    public bool? IncludeCerts { get; set; }

  }
}