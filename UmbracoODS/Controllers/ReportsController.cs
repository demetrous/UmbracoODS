using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Mvc;
using UmbracoODS.Models;
using System.Collections.Specialized;

namespace UmbracoODS.Controllers
{

  public class ReportsController : SurfaceController
  {
    public string GetViewPath(string name)
    {
      return $"~/Views/Reports/{name}.cshtml";
    }

    public string GetTableDefaultValue(DataTable defTable, string columnName)
    {

      DataRow row = defTable.Rows[0];

      string defValue = row[columnName].ToString();

      return defValue;
    }




    #region HeadcountByCollegeRaceAndGender   

    //Census Key methods
    public DataTable GetPrelimFallTerms(bool recentTerms = true)
    {

      DataSet ds = new DataSet();

      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;

      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.CommandText = "GetRecentPrelimFallTerms" + (recentTerms ? "_EPM" : "");

          DbDataAdapter da = new SqlDataAdapter(cmd);

          da.Fill(ds);

          con.Close();

        }
      }

      if (!recentTerms)
      {
        ds.Tables[0].Columns["TermSingle"].ColumnName = "CensusKey";
      }

      return ds.Tables[0];
    }

    public DataTable GetCensusKey()
    {
      DataTable fallTerms = GetPrelimFallTerms();

      DataTable previousFallTerms = GetPrelimFallTerms(false); // false = not recent terms

      fallTerms.Merge(previousFallTerms);

      return fallTerms;
    }



    //Academic Career methods
    public DataTable AcadCareerHardcoded(string censusKey)
    {
      DataTable acadCareer = new DataTable();

      bool recentTerms = censusKey.Contains("EP") ? true : false;

      acadCareer.Columns.Add("Value");
      acadCareer.Columns.Add("Name");

      if (recentTerms)
      {
        acadCareer.Rows.Add(new object[] { "All", "All Careers" });
        acadCareer.Rows.Add(new object[] { "UGRD", "Undergraduate" });
        acadCareer.Rows.Add(new object[] { "GRAD", "Graduate" });
        acadCareer.Rows.Add(new object[] { "LAWS", "Law" });
        acadCareer.Rows.Add(new object[] { "DENT", "Dental Medicine" });
      }
      else
      {
        acadCareer.Rows.Add(new object[] { "All", "All Levels" });
        acadCareer.Rows.Add(new object[] { "U", "Undergraduate" });
        acadCareer.Rows.Add(new object[] { "G", "Graduate" });
        acadCareer.Rows.Add(new object[] { "P", "Professional" });
        acadCareer.Rows.Add(new object[] { "D", "Dual Grad/Prof" });
      }



      return acadCareer;
    }

    public DataTable GetAcademicCareer(string censusKey)
    {
      DataTable acadCareer = AcadCareerHardcoded(censusKey);

      return acadCareer;
    }




    //Colleges methods
    public DataTable GetCollegesFromDB(string censusKey, string acadCareer)
    {
      DataSet ds = new DataSet();


      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;


      bool recentTerms = censusKey.Contains("EP") ? true : false;


      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (!recentTerms)
          {
            cmd.CommandText = "GetPMDCollegeListingByTermAndLevel";
            cmd.Parameters.Add(new SqlParameter("@term", censusKey));
            cmd.Parameters.Add(new SqlParameter("@PMDLevel", acadCareer));

          }
          else
          {
            cmd.CommandText = "GetCPCollegeListingByCensusKeyAndCareer_EPM";
            cmd.Parameters.Add(new SqlParameter("@censusKey", censusKey));
            cmd.Parameters.Add(new SqlParameter("@acadCareer", acadCareer));
          }



          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();

        }
      }


      if (!recentTerms)
      {
        ds.Tables[0].Columns["College"].ColumnName = "CollegeCode";
      }

      return ds.Tables[0];
    }

    public DataTable GetColleges(string censusKey, string acadCareer)
    {
      DataTable collegeTable = GetCollegesFromDB(censusKey, acadCareer);

      bool recentTerms = censusKey.Contains("EP") ? true : false;

      if (recentTerms)
      {
        collegeTable.Rows.Add(new object[] { "GRAD", "Graduate College" });

        collegeTable.DefaultView.Sort = "CollegeName ASC";

        collegeTable = collegeTable.DefaultView.ToTable();
      }



      DataRow allColleges = collegeTable.NewRow();
      allColleges["CollegeCode"] = "All";
      allColleges["CollegeName"] = "All Colleges";

      collegeTable.Rows.InsertAt(allColleges, 0);

      return collegeTable;
    }




    //Main Headcount table data from DB 
    public DataTable GetHeadcountByCollegeRaceAndGender(string censusKey, string acadCareer, string planCollege)
    {
      bool recentTerms = censusKey.Contains("EP") ? true : false;

      DataSet ds = new DataSet();

      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;

      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (recentTerms)
          {
            cmd.CommandText = "Rpt_HeadcountByCollegeRaceAndGender_EPM";

            cmd.Parameters.Add(new SqlParameter("@censusKey", censusKey));
            cmd.Parameters.Add(new SqlParameter("@acadCareer", acadCareer));
            cmd.Parameters.Add(new SqlParameter("@planCollege", planCollege));
          }
          else
          {
            cmd.CommandText = "Rpt_HeadcountByCollegeRaceAndGender";

            cmd.Parameters.Add(new SqlParameter("@term", censusKey));
            cmd.Parameters.Add(new SqlParameter("@PMDLevel", acadCareer));
            cmd.Parameters.Add(new SqlParameter("@programCollege", planCollege));
          }

          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();

          //das = ds.Tables[2].AsEnumerable();



        }
      }

      ds.Tables[0].Columns.Remove("College");

      return planCollege == "All" ? ds.Tables[2] : ds.Tables[0];
    }



    //Action Result with getting all data together
    public ActionResult HeadcountByCollegeRaceAndGender_data(string censusKey = null, string acadCareer = null, string planCollege = null)
    {

      DataTable censusKeyData = new DataTable();
      DataTable acadCareerData = new DataTable();
      DataTable planCollegeData = new DataTable();
      DataTable tableData = new DataTable();

      censusKeyData = GetCensusKey();


      //Checking if received censusKey in null or empty -> assigning default value
      if (string.IsNullOrEmpty(censusKey))
      {
        censusKey = GetTableDefaultValue(censusKeyData, "censusKey");
      }

      acadCareerData = GetAcademicCareer(censusKey);

      //Checking if received acadCareer in null or empty -> assigning default value
      if (string.IsNullOrEmpty(acadCareer))
      {
        acadCareer = GetTableDefaultValue(acadCareerData, "Value");
      }

      //get college data and main table data based on censusKey and acadCareer parameters

      planCollegeData = GetColleges(censusKey, acadCareer);

      //Checking if received planCollege in null or empty -> assigning default value
      if (string.IsNullOrEmpty(planCollege))
      {
        planCollege = GetTableDefaultValue(planCollegeData, "CollegeCode");
      }

      tableData = GetHeadcountByCollegeRaceAndGender(censusKey, acadCareer, planCollege);

      //DataTable tableDataOldTimes = GetHeadcountByCollegeRaceAndGender("20053", "All", "All");

      var data = new
      {
        censusKeyData,
        acadCareerData,
        planCollegeData,
        tableData
      };

      return Json(JsonConvert.SerializeObject(data), JsonRequestBehavior.AllowGet);
    }
    #endregion





    //============================================================




    #region DegreesConferredByRaceAndGender

    //acadYear - Academic years methods
    public DataTable GetAcademicYearsFromDB(bool recentYears = true)
    {

      DataSet ds = new DataSet();

      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;

      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;
          cmd.CommandText = "GetRecentAcademicYears" + (recentYears ? "_EPM" : "");

          DbDataAdapter da = new SqlDataAdapter(cmd);

          da.Fill(ds);

          con.Close();

        }
      }

      //if (!recentYears)
      //{
      //    ds.Tables[0].Columns["TermSingle"].ColumnName = "CensusKey";
      //}

      return ds.Tables[0];
    }

    public DataTable GetAcademicYears()
    {
      DataTable acadYears = GetAcademicYearsFromDB();

      DataTable previousAcadYears = GetAcademicYearsFromDB(false); // false = not recent terms

      acadYears.Merge(previousAcadYears);

      return acadYears;
    }




    //acadCareer - Academic Career methods        
    public DataTable AcadCareerHardcodedDegrees(string acadYear)
    {
      DataTable acadCareer = new DataTable();

      bool recentTerms = acadYear.Contains("200") ? false : true;

      acadCareer.Columns.Add("Value");
      acadCareer.Columns.Add("Name");

      if (recentTerms)
      {
        acadCareer.Rows.Add(new object[] { "All", "All Careers" });
        acadCareer.Rows.Add(new object[] { "UGRD", "Undergraduate" });
        acadCareer.Rows.Add(new object[] { "GRAD", "Graduate" });
        acadCareer.Rows.Add(new object[] { "LAWS", "Law" });
        acadCareer.Rows.Add(new object[] { "DENT", "Dental Medicine" });
      }
      else
      {
        acadCareer.Rows.Add(new object[] { "All", "All Levels" });
        acadCareer.Rows.Add(new object[] { "U", "Undergraduate" });
        acadCareer.Rows.Add(new object[] { "G", "Graduate" });
        acadCareer.Rows.Add(new object[] { "P", "Professional" });
        //acadCareer.Rows.Add(new object[] { "D", "Dual Grad/Prof" });
      }



      return acadCareer;
    }

    public DataTable GetAcademicCareerDegrees(string acadYear)
    {
      DataTable acadCareer = AcadCareerHardcodedDegrees(acadYear);

      return acadCareer;
    }




    //planCollege - Colleges methods
    public DataTable GetCollegesFromDBDegrees(string acadYear, string acadCareer)
    {
      DataSet ds = new DataSet();


      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;


      bool recentTerms = acadYear.Contains("200") ? false : true;


      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (recentTerms)
          {
            cmd.CommandText = "GetDCollegeListingByAcadYearAndCareer_EPM";
            cmd.Parameters.Add(new SqlParameter("@acadyear", acadYear));
            cmd.Parameters.Add(new SqlParameter("@acadCareer", acadCareer));
          }
          else
          {
            cmd.CommandText = "GetPMDCollegeListingByAcadYearAndLevel";
            cmd.Parameters.Add(new SqlParameter("@acadyear", acadYear));
            cmd.Parameters.Add(new SqlParameter("@degreeLevel", acadCareer));
          }



          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();

        }
      }


      //if (!recentTerms)
      //{
      //    ds.Tables[0].Columns["College"].ColumnName = "CollegeCode";
      //}

      return ds.Tables[0];
    }

    public DataTable GetCollegesDegrees(string acadYear, string acadCareer)
    {
      DataTable collegeTable = GetCollegesFromDBDegrees(acadYear, acadCareer);

      bool recentTerms = acadYear.Contains("EP") ? true : false;

      if (recentTerms)
      {
        collegeTable.Rows.Add(new object[] { "GRAD", "Graduate College" });

        collegeTable.DefaultView.Sort = "CollegeName ASC";

        collegeTable = collegeTable.DefaultView.ToTable();
      }



      DataRow allColleges = collegeTable.NewRow();
      allColleges["CollegeCode"] = "All";
      allColleges["CollegeName"] = "All Colleges";

      collegeTable.Rows.InsertAt(allColleges, 0);

      return collegeTable;
    }




    //certificates
    public DataTable CertificatesHardcodedDegrees()
    {
      DataTable certTable = new DataTable();

      certTable.Columns.Add("Value");
      certTable.Columns.Add("Name");

      certTable.Rows.Add(new object[] { "true", "Yes" });
      certTable.Rows.Add(new object[] { "false", "No" });

      return certTable;
    }

    public DataTable GetCertificates()
    {
      DataTable certTable = CertificatesHardcodedDegrees();

      return certTable;
    }



    //Main Degree table data from DB 
    public DataSet GetDegreesConferredByRaceAndGender(string acadYear, string acadCareer, string planCollege, bool includeCerts, bool deptLevel = false)
    {

      bool recentTerms = acadYear.Contains("200") ? false : true;


      DataSet ds = new DataSet();
      DataSet resultDs = new DataSet();

      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;

      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (recentTerms)
          {
            cmd.CommandText = "Rpt_DegreesConferredByRaceAndGender_EPM";

            cmd.Parameters.Add(new SqlParameter("@acadYear", acadYear));
            cmd.Parameters.Add(new SqlParameter("@acadCareer", acadCareer));
            cmd.Parameters.Add(new SqlParameter("@planCollege", planCollege));
            cmd.Parameters.Add(new SqlParameter("@includeCerts", includeCerts));
          }
          else
          {
            cmd.CommandText = "Rpt_DegreesConferredByRaceAndGender";

            cmd.Parameters.Add(new SqlParameter("@acadYear", acadYear));
            cmd.Parameters.Add(new SqlParameter("@degreeLevel", acadCareer));
            cmd.Parameters.Add(new SqlParameter("@programCollege", planCollege));
            cmd.Parameters.Add(new SqlParameter("@includeCerts", includeCerts));
          }

          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();





        }
      }

      DataTable copyOfZeroTable = ds.Tables[2].Copy();

      copyOfZeroTable.TableName = "MainDataTable";

      resultDs.Tables.Add(copyOfZeroTable);

      //ds.Tables[0].Columns.Remove("College");

      if (deptLevel)
      {

        var depts = (from tableZero in ds.Tables[0].AsEnumerable()
                       //where customer.Field<string>("Country") == country
                     orderby tableZero.Field<string>("Department")
                     select new
                     {
                       //CustomerId = customer.Field<int>("CustomerId"),
                       //Name = customer.Field<string>("Department"),
                       Department = tableZero.Field<string>("Department")
                     }).Distinct();

        foreach (var item in depts)
        {
          DataView dv = new DataView(ds.Tables[0])
          {
            RowFilter = "Department = '" + item.Department.Replace("'", "''") + "'" // Replace("'", "''") - Fix of single quotes issue
          };


          DataTable dataTableDept = dv.ToTable();

          dataTableDept.TableName = item.Department;

          dataTableDept.Columns.Remove("College");
          dataTableDept.Columns.Remove("Department");


          resultDs.Tables.Add(dataTableDept);

        }

      }

      //return planCollege == "All" ? ds.Tables[2] : ds.Tables[0];
      //return ds.Tables[2];

      return resultDs;
    }


    //Action Result with getting all data together
    public ActionResult DegreesConferredByRaceAndGender_data(string acadYear = null, string acadCareer = null, string planCollege = null, string includeCerts = null)
    {
      DataTable acadYearData = new DataTable();
      DataTable acadCareerData = new DataTable();
      DataTable planCollegeData = new DataTable();
      DataTable certData = new DataTable();

      DataSet tableData = new DataSet();

      bool sendDepts = (!string.IsNullOrEmpty(planCollege) && planCollege.ToLower() != "all") ? true : false;


      acadYearData = GetAcademicYears();

      //Checking if received censusKey in null or empty -> assigning default value
      if (string.IsNullOrEmpty(acadYear))
      {
        acadYear = GetTableDefaultValue(acadYearData, "AcademicYear");
      }


      acadCareerData = GetAcademicCareerDegrees(acadYear);

      //Checking if received acadCareer in null or empty -> assigning default value
      if (string.IsNullOrEmpty(acadCareer))
      {
        acadCareer = GetTableDefaultValue(acadCareerData, "Value");
      }


      //get college data and main table data based on censusKey and acadCareer parameters

      planCollegeData = GetCollegesDegrees(acadYear, acadCareer);

      //Checking if received planCollege in null or empty -> assigning default value
      if (string.IsNullOrEmpty(planCollege))
      {
        planCollege = GetTableDefaultValue(planCollegeData, "CollegeCode");
      }


      certData = GetCertificates();

      //Checking if received certificates in null or empty -> assigning default value
      if (includeCerts == null)
      {
        includeCerts = "true";
      }

      /**/

      //tableData = GetDegreesConferredByRaceAndGender(censusKey, acadCareer, planCollege);
      tableData = GetDegreesConferredByRaceAndGender(acadYear, acadCareer, planCollege, bool.Parse(includeCerts), sendDepts);
      //tableData = tableDataAndDepts.Tables[0];

      //DataTable tableDataOldTimes = GetHeadcountByCollegeRaceAndGender("20053", "All", "All");

      var data = new
      {
        acadYearData,
        acadCareerData,
        planCollegeData,
        certData,
        tableData,

        acadYear,
        acadCareer,
        planCollege,
        includeCerts

      };

      return Json(JsonConvert.SerializeObject(data), JsonRequestBehavior.AllowGet);
    }
    #endregion





    //============================================================






    #region HeadcountEnrollmentByCollegeAndMajorSummarizedByDegreeType


    //planCollege - Colleges methods
    public DataTable GetCollegesFromDBByDegreeType(string censusKey)
    {
      DataSet ds = new DataSet();


      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;


      bool recentTerms = censusKey.Contains("200") ? false : true;


      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (recentTerms)
          {
            cmd.CommandText = "GetCPCollegeListingByCensusKey_EPM";
            cmd.Parameters.Add(new SqlParameter("@censusKey", censusKey));
          }
          else
          {
            cmd.CommandText = "GetPMDCollegeListingByTerm";
            cmd.Parameters.Add(new SqlParameter("@term", censusKey));
          }



          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();

        }
      }


      //if (!recentTerms)
      //{
      //    ds.Tables[0].Columns["College"].ColumnName = "CollegeCode";
      //}

      return ds.Tables[0];
    }

    public DataTable GetCollegesByDegreeType(string censusKey)
    {
      DataTable collegeTable = GetCollegesFromDBByDegreeType(censusKey);

      bool recentTerms = censusKey.Contains("EP") ? true : false;

      if (recentTerms)
      {
        collegeTable.Rows.Add(new object[] { "GRAD", "Graduate College" });

        collegeTable.DefaultView.Sort = "CollegeName ASC";

        collegeTable = collegeTable.DefaultView.ToTable();
      }



      DataRow allColleges = collegeTable.NewRow();
      allColleges["CollegeCode"] = "All";
      allColleges["CollegeName"] = "All Colleges";

      collegeTable.Rows.InsertAt(allColleges, 0);

      return collegeTable;
    }



    //Main Degree table data from DB 
    public DataSet GetHeadcountByCollegeAndMajorSummarizedByDegreeType(string censusKey, string planCollege)
    {

      bool recentTerms = censusKey.Contains("200") ? false : true;


      DataSet ds = new DataSet();
      DataSet resultDs = new DataSet();

      string cnnString = System.Configuration.ConfigurationManager.ConnectionStrings["IAPWebReports"].ConnectionString;

      using (SqlConnection con = new SqlConnection(cnnString))
      {
        if (con.State == ConnectionState.Closed)
          con.Open();

        using (SqlCommand cmd = new SqlCommand())
        {
          cmd.Connection = con;
          cmd.CommandType = CommandType.StoredProcedure;

          if (recentTerms)
          {
            cmd.CommandText = "Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType_EPM";

            cmd.Parameters.Add(new SqlParameter("@censusKey", censusKey));
            cmd.Parameters.Add(new SqlParameter("@planCollege", planCollege));
          }
          else
          {
            cmd.CommandText = "Rpt_HeadcountByCollegeAndMajorSummaryByDegreeType";

            cmd.Parameters.Add(new SqlParameter("@term", censusKey));
            cmd.Parameters.Add(new SqlParameter("@programCollege", planCollege));
          }

          DbDataAdapter da = new SqlDataAdapter(cmd)
          {
            SelectCommand = cmd
          };
          da.Fill(ds);

          con.Close();





        }
      }

      DataTable copyOfZeroTable = new DataTable();


      copyOfZeroTable = recentTerms ? ds.Tables[3].Copy() : ds.Tables[2].Copy(); //<============= DIFFERENT FOR "ALL" AND SPECIFIC COLLEGE, RESOLVE

      copyOfZeroTable.TableName = "MainDataTable";

      resultDs.Tables.Add(copyOfZeroTable);

      //ds.Tables[0].Columns.Remove("College");

      /*
      if (deptLevel)
      {

          var depts = (from tableZero in ds.Tables[0].AsEnumerable()
                           //where customer.Field<string>("Country") == country
                       orderby tableZero.Field<string>("Department")
                       select new
                       {
                           //CustomerId = customer.Field<int>("CustomerId"),
                           //Name = customer.Field<string>("Department"),
                           Department = tableZero.Field<string>("Department")
                       }).Distinct();

          foreach (var item in depts)
          {
              DataView dv = new DataView(ds.Tables[0])
              {
                  RowFilter = "Department = '" + item.Department.Replace("'", "''") + "'" // Replace("'", "''") - Fix of single quotes issue
              };


              DataTable dataTableDept = dv.ToTable();

              dataTableDept.TableName = item.Department;

              dataTableDept.Columns.Remove("College");
              dataTableDept.Columns.Remove("Department");


              resultDs.Tables.Add(dataTableDept);

          }

      }*/

      //return planCollege == "All" ? ds.Tables[2] : ds.Tables[0];
      //return ds.Tables[2];

      return resultDs;
    }



    public ActionResult HeadcountByCollegeAndMajorSummarizedByDegreeType_data(string censusKey = null, string planCollege = null)
    {

      DataTable acadYearData = new DataTable();
      DataTable acadCareerData = new DataTable();
      DataTable planCollegeData = new DataTable();
      DataTable certData = new DataTable();

      DataSet tableData = new DataSet();


      acadYearData = GetAcademicYears();

      //Checking if received censusKey in null or empty -> assigning default value
      if (string.IsNullOrEmpty(censusKey))
      {
        censusKey = GetTableDefaultValue(acadYearData, "AcademicYear");
      }


      acadCareerData = GetAcademicCareerDegrees(censusKey);



      //get college data and main table data based on censusKey and acadCareer parameters

      planCollegeData = GetCollegesByDegreeType(censusKey);

      //Checking if received planCollege in null or empty -> assigning default value
      if (string.IsNullOrEmpty(planCollege))
      {
        planCollege = GetTableDefaultValue(planCollegeData, "CollegeCode");
      }

      tableData = GetHeadcountByCollegeAndMajorSummarizedByDegreeType(censusKey, planCollege);


      var data = new
      {
        acadYearData,
        //acadCareerData,
        planCollegeData,
        tableData,

        censusKey,
        planCollege

      };

      return Json(JsonConvert.SerializeObject(data), JsonRequestBehavior.AllowGet);
    }

    #endregion





    //TEST============================================================

    public JsonResult GetAcademicYearsJson()
    {
      DataTable censusKeyData = new DataTable();   

      censusKeyData = GetAcademicYearsFromDB();

      var data = new
      {
        censusKeyData
      };

      //return Json(new { name = "World from server side" }, JsonRequestBehavior.AllowGet);
      return Json(JsonConvert.SerializeObject(data), JsonRequestBehavior.AllowGet);
    }
  }
}