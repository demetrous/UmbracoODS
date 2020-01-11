using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.AppliedAdmittedEnrolled
{
  public class ShortTerm
  {
    public string Term { get; set; }
    public string TermName { get; set; }
    public Nullable<decimal> AvgHsgpaNewFreshmen { get; set; }
  }
}