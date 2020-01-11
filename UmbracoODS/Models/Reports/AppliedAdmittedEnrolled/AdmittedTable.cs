using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.AppliedAdmittedEnrolled
{
  public class AdmittedTable
  {
    public string Career { get; set; }
    public string Category { get; set; }
    public int Applied { get; set; }
    public int Admitted { get; set; }
    public int Enrolled { get; set; }
  }
}