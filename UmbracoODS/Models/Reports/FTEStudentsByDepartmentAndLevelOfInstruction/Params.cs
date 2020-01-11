namespace UmbracoODS.Models.Reports.FTEStudentsByDepartmentAndLevelOfInstruction
{
  public class Params
  {
    public string CensusKey { get; set; }
    public bool? IsMeasureSCH { get; set; }
    public bool? StateSupportedOnly { get; set; }
    public string AnnualYear { get; set; }
    public bool? IsAnnualFTE { get; set; }
  }
}