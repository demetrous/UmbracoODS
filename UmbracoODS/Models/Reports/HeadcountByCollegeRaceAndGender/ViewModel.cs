using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Models.Reports.HeadcountByCollegeRaceAndGender
{
	public class ViewModel
	{
		public IEnumerable<AllCollegesTable> AllCollegesTable { get; set; }
		public IEnumerable<Term> Term { get; set; }
		public IEnumerable<RaceEthnicityTable> RaceEthnicityTable { get; set; }

		public IEnumerable<CensusKeyTable> CensusKey { get; set; }
		public IEnumerable<AcadCareer> AcadCareer { get; set; }
		public IEnumerable<PlanCollege> PlanCollege { get; set; }

    public bool AuthRequired { get; set; } = false;


  }
}