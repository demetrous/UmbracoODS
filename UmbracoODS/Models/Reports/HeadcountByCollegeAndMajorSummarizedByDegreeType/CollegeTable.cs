using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType
{
  public class CollegeTable
  {
    public string College { get; set; }
    public string DegreeType { get; set; }
    public string Major { get; set; }
    public int Headcount { get; set; }
    public int DegreeTypeSort { get; set; }

  }
}