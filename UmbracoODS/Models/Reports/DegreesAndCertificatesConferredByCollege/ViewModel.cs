using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Models.Reports.DegreesAndCertificatesConferredByCollege
{
  public class ViewModel
  {
    public IEnumerable<AllCollegesDegreeCertTable> AllCollegesDegreeCertTable { get; set; }
    public IEnumerable<AcadYear> AcadYearSingle { get; set; }
    public IEnumerable<DegreeCertTable> DegreeCertTable { get; set; }

    public IEnumerable<AcadYear> AcadYearList { get; set; }
    public IEnumerable<PlanCollege> PlanCollege { get; set; }
  }
}