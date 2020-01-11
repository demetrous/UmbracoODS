using System.Web.Mvc;
using System.Web.Security;
using Umbraco.Web.Mvc;
using UmbracoODS.Models;

namespace UmbracoODS.Controllers
{
  public class MemberController : SurfaceController
  {

    private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/Home/";


    public ActionResult RenderLogin()
    {
      return PartialView(PARTIAL_VIEW_FOLDER + "_Login.cshtml", new LoginModel());
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult SubmitLogin(LoginModel model, string returnUrl)
    {
      if (ModelState.IsValid)
      {
        //if (Membership.ValidateUser(model.Username, model.Password))


        var ADMembershipProvider = Membership.Providers["ADMembershipProvider"];





        if (ADMembershipProvider.ValidateUser(model.Username, model.Password))
        {

          //ADD CHECK AD SEARCH METHOD HERE 

          FormsAuthentication.SetAuthCookie(model.Username, false);
          UrlHelper myHelper = new UrlHelper(HttpContext.Request.RequestContext);

          //if (myHelper.IsLocalUrl(returnUrl))
          //{
          //  return Redirect(returnUrl);
          //}
          //else
          //{
          //return Redirect(Request.ApplicationPath + "/login/");
          return Redirect(Request.UrlReferrer.AbsolutePath);
          //}
        }
        else
        {
          ModelState.AddModelError("", "The username or password provided is incorrect.");
        }
      }
      return CurrentUmbracoPage();
    }

    public ActionResult RenderLogout()
    {
      return PartialView(PARTIAL_VIEW_FOLDER + "_Logout.cshtml", null);
    }

    public ActionResult SubmitLogout()
    {
      TempData.Clear();
      Session.Clear();
      FormsAuthentication.SignOut();
      return RedirectToCurrentUmbracoPage();
    }
  }
}
