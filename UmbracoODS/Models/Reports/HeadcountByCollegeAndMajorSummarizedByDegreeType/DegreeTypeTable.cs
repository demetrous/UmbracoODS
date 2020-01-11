using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType
{
  public class DegreeTypeTable
  {
    public string CareerLevel { get; set; }
    public string DegreeType { get; set; }
    public int Headcount { get; set; }
    public int CareerLevelSort { get; set; }
    public int DegreeTypeSort { get; set; }
  }
}