namespace UmbracoODS.Models.Reports.DegreesAndCertificatesConferredByCollege
{
  public class AllCollegesDegreeCertTable
  {
    public string College { get; set; }
    public string DegreeType { get; set; }
    public string Major { get; set; }
    public int Summer { get; set; }
    public int Fall { get; set; }
    public int Spring { get; set; }
    public int Total { get; set; }
  }

}