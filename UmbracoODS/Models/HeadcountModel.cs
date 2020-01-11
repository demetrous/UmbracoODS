using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models
{
    public class HeadcountModel
    {
        public DataTable TableFromDb { get; set; }

        public DataTable CensusKeyFromDb { get; set; }

        public DataTable PlanCollegeFromDb { get; set; }

        public string JsonHeadcount { get; set; }

        public string CensusKey { get; set; }
    }
}