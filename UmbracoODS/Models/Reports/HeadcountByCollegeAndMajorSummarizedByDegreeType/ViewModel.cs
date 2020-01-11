using System.Collections.Generic;
using UmbracoODS.Models.Reports.SharedModels;

namespace UmbracoODS.Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType
{
	public class ViewModel
	{
		
		public IEnumerable<Term> Term { get; set; }
		public IEnumerable<Headcount> Headcount { get; set; }
		public IEnumerable<CareerLevelTable> CareerLevelTable { get; set; }
		public IEnumerable<DegreeTypeTable> DegreeTypeTable { get; set; }
		public IEnumerable<CollegeTable> CollegeTable { get; set; }

		public IEnumerable<CensusKeyTable> CensusKey { get; set; }
		public IEnumerable<PlanCollege> PlanCollege { get; set; }

	}
}