using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.ClassSizeSummary
{
  public class ClassSizeTable
  {
    public string College { get; set; }
    public string CollegeName { get; set; }
    public string Dept { get; set; }
    public string DeptName { get; set; }

    public double U_Enrollment { get; set; }
    public int U_SectionCount { get; set; }

    public double G_Enrollment { get; set; }
    public int G_SectionCount { get; set; }

    public double Dual_Enrollment { get; set; }
    public int Dual_SectionCount { get; set; }

    public double Total_Enrollment { get; set; }
    public int Total_SectionCount { get; set; }
  }
}