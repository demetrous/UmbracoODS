namespace UmbracoODS.Models.Reports.FTEStudentsByDepartmentAndLevelOfInstruction
{
  public class FteTable
  {
    public string College { get; set; }
    public string Department { get; set; }

    public decimal Lower { get; set; }
    public decimal Upper { get; set; }
    public decimal Master { get; set; }
    public decimal Doctoral { get; set; }
    public decimal Professional { get; set; }
    public decimal Total { get; set; }

  }
}