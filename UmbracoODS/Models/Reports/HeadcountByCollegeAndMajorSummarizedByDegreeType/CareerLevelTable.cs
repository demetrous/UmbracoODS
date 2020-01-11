using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType
{
  public class CareerLevelTable
  {
    public string CareerLevel { get; set; }
    public int Headcount { get; set; }
    public int CareerLevelSort { get; set; }
  }
}