using System.Web.Mvc;
using Umbraco.Web.Mvc;

namespace UmbracoODS.Controllers
{
    public class HomeController : SurfaceController
    {
        private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/Home/";

        public ActionResult RenderHome()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_Home.cshtml");
        }

        public ActionResult RenderStudentProfile()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_StudentProfile.cshtml");
        }
    }
}