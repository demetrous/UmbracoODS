using System.Collections.Generic;
using System.Linq;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Services.Helpers
{
  public static class StaticHelpers
  {
    //Returns a whole list of Academic Careers
    public static IEnumerable<AcadCareer> AcadCareer()
    {

      List<AcadCareer> acadCareer = new List<AcadCareer>
      {
        new AcadCareer { Value = "All", Name = "All Careers" },
        new AcadCareer { Value = "UGRD", Name = "Undergraduate" },
        new AcadCareer { Value = "GRAD", Name = "Graduate" },
        new AcadCareer { Value = "LAWS", Name = "Law" },
        new AcadCareer { Value = "DENT", Name = "Dental Medicine" },
        new AcadCareer { Value = "MEDI", Name = "School of Medicine" }
      };

      return acadCareer;
    }

    //Returns a list of Academic Careers without School of Medicine
    public static IEnumerable<AcadCareer> AcadCareerNoMedi()
    {

      List<AcadCareer> acadCareer = new List<AcadCareer>
      {
        new AcadCareer { Value = "All", Name = "All Careers" },
        new AcadCareer { Value = "UGRD", Name = "Undergraduate" },
        new AcadCareer { Value = "GRAD", Name = "Graduate" },
        new AcadCareer { Value = "LAWS", Name = "Law" },
        new AcadCareer { Value = "DENT", Name = "Dental Medicine" }
      };

      return acadCareer;
    }

    public static string GetLatestPrelimTerm()
    {
      var _contextIAP = new IAPWebReportsEntities();
      var result = _contextIAP.GetRecentPrelimFallTerms_EPM().Select(x => x.CensusKey).FirstOrDefault();

      return result;

    }
  }
}