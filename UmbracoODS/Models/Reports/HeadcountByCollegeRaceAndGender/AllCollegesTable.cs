namespace UmbracoODS.Models.Reports.HeadcountByCollegeRaceAndGender
{
    public class AllCollegesTable
    {
        public string College { get; set; }
        public string RaceEthnicity { get; set; }
        public int Female { get; set; }
        public int Male { get; set; }
        public int Total { get; set; }
    }
}