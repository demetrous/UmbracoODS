using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Umbraco.Web.WebApi;
using UmbracoODS.Services.Reports;

namespace UmbracoODS.Controllers.Api
{

  [CustomJson]
  public class ReportsApiController : UmbracoApiController
  {

    private HeadcountByCollegeRaceAndGenderService _headcountByCollegeRaceAndGenderService = new HeadcountByCollegeRaceAndGenderService();
    private DegreesAndCertificatesConferredByCollegeService _degreesAndCertificatesConferredByCollegeService = new DegreesAndCertificatesConferredByCollegeService();
    private DegreesConferredByRaceAndGenderService _degreesConferredByRaceAndGenderService = new DegreesConferredByRaceAndGenderService();
    private HeadcountByCollegeAndMajorSummarizedByDegreeTypeService _headcountByCollegeAndMajorSummarizedByDegreeTypeService = new HeadcountByCollegeAndMajorSummarizedByDegreeTypeService();
    private AppliedAdmittedEnrolledService _appliedAdmittedEnrolledService = new AppliedAdmittedEnrolledService();
    private ClassSizeSummaryService _classSizeSummary = new ClassSizeSummaryService();
    private FTEStudentsByDepartmentAndLevelOfInstructionService _FTEStudentsByDepartmentAndLevelOfInstructionService = new FTEStudentsByDepartmentAndLevelOfInstructionService();
    


    //*** HeadcountByCollegeRaceAndGender **********************************************************************************
    //[System.Web.Http.Authorize]
    [HttpPost]
    public IHttpActionResult HeadcountByCollegeRaceAndGender(Models.Reports.HeadcountByCollegeRaceAndGender.Params fromClientParams)
    {
      return Ok(_headcountByCollegeRaceAndGenderService.GetReportData(fromClientParams));
    }


    //*** DegreesAndCertificatesConferredByCollege **********************************************************************************
    [HttpPost]
    public IHttpActionResult DegreesAndCertificatesConferredByCollege(Models.Reports.DegreesAndCertificatesConferredByCollege.Params fromClientParams)
    {
      return Ok(_degreesAndCertificatesConferredByCollegeService.GetReportData(fromClientParams));
    }


    //*** DegreesConferredByRaceAndGender **********************************************************************************
    [HttpPost]
    public IHttpActionResult DegreesConferredByRaceAndGender(Models.Reports.DegreesConferredByRaceAndGender.Params fromClientParams)
    {
      return Ok(_degreesConferredByRaceAndGenderService.GetReportData(fromClientParams));
    }


    //*** HeadcountByCollegeAndMajorSummarizedByDegreeType **********************************************************************************
    [HttpPost]
    public IHttpActionResult HeadcountByCollegeAndMajorSummarizedByDegreeType(Models.Reports.HeadcountByCollegeAndMajorSummarizedByDegreeType.Params fromClientParams)
    {
      return Ok(_headcountByCollegeAndMajorSummarizedByDegreeTypeService.GetReportData(fromClientParams));
    }


    //*** AppliedAdmittedEnrolled **********************************************************************************
    [HttpPost]
    public IHttpActionResult AppliedAdmittedEnrolled(Models.Reports.AppliedAdmittedEnrolled.Params fromClientParams)
    {
      return Ok(_appliedAdmittedEnrolledService.GetReportData(fromClientParams));
    }


    //*** ClassSizeSummary **********************************************************************************
    [HttpPost]
    public IHttpActionResult ClassSizeSummary(Models.Reports.ClassSizeSummary.Params fromClientParams)
    {
      return Ok(_classSizeSummary.GetReportData(fromClientParams));
    }


    //*** FTEStudentsByDepartmentAndLevelOfInstruction **********************************************************************************
    [HttpPost]
    public IHttpActionResult FTEStudentsByDepartmentAndLevelOfInstruction(Models.Reports.FTEStudentsByDepartmentAndLevelOfInstruction.Params fromClientParams)
    {
      return Ok(_FTEStudentsByDepartmentAndLevelOfInstructionService.GetReportData(fromClientParams));
    }

  }
}
