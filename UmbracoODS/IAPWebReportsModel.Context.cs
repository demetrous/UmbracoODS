﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UmbracoODS
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class IAPWebReportsEntities : DbContext
    {
        public IAPWebReportsEntities()
            : base("name=IAPWebReportsEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
    
        public virtual int Rpt_HeadcountByCollegeRaceAndGender_EPM(string censusKey, string acadCareer, string planCollege)
        {
            var censusKeyParameter = censusKey != null ?
                new ObjectParameter("censusKey", censusKey) :
                new ObjectParameter("censusKey", typeof(string));
    
            var acadCareerParameter = acadCareer != null ?
                new ObjectParameter("acadCareer", acadCareer) :
                new ObjectParameter("acadCareer", typeof(string));
    
            var planCollegeParameter = planCollege != null ?
                new ObjectParameter("planCollege", planCollege) :
                new ObjectParameter("planCollege", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("Rpt_HeadcountByCollegeRaceAndGender_EPM", censusKeyParameter, acadCareerParameter, planCollegeParameter);
        }
    }
}
