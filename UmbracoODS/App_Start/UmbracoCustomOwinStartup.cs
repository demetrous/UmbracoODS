using Microsoft.Owin;
using Owin;
using Umbraco.Core;
using Umbraco.Core.Security;
using Umbraco.Web.Security.Identity;
using Umbraco.IdentityExtensions;
using UmbracoODS;

using Umbraco.Core.Models.Identity;
using System.Threading.Tasks;

using System.Web.Security;
using System.DirectoryServices.AccountManagement;

using System.Collections.Generic;
using Umbraco.Core.Models.Membership;

//To use this startup class, change the appSetting value in the web.config called 
// "owin:appStartup" to be "UmbracoCustomOwinStartup"

[assembly: OwinStartup("UmbracoCustomOwinStartup", typeof(UmbracoCustomOwinStartup))]

namespace UmbracoODS
{
    /// <summary>
    /// A custom way to configure OWIN for Umbraco
    /// </summary>
    /// <remarks>
    /// The startup type is specified in appSettings under owin:appStartup - change it to "UmbracoCustomOwinStartup" to use this class
    /// 
    /// This startup class would allow you to customize the Identity IUserStore and/or IUserManager for the Umbraco Backoffice
    /// </remarks>
    /// 


    public class MyPasswordChecker : IBackOfficeUserPasswordChecker
    {
        public Task<BackOfficeUserPasswordCheckerResult> CheckPasswordAsync(BackOfficeIdentityUser user, string password)
        {

            PrincipalContext ctx = new PrincipalContext(ContextType.Domain, "ad.unlv.edu", "OU=Users,OU=UNLV,DC=ad,DC=unlv,DC=edu");

            bool isValidACE = ctx.ValidateCredentials(user.UserName, password);



            //var result = (password == "test")
            var result = (isValidACE)
                ? Task.FromResult(BackOfficeUserPasswordCheckerResult.ValidCredentials)
                //: Task.FromResult(BackOfficeUserPasswordCheckerResult.InvalidCredentials);
                : Task.FromResult(BackOfficeUserPasswordCheckerResult.FallbackToDefaultChecker);

            return result;
        }
    }

    public class UmbracoCustomOwinStartup
    {
        public void Configuration(IAppBuilder app)
        {
            //Configure the Identity user manager for use with Umbraco Back office

            // *** EXPERT: There are several overloads of this method that allow you to specify a custom UserStore or even a custom UserManager!            

            var applicationContext = ApplicationContext.Current;

            app.ConfigureUserManagerForUmbracoBackOffice<BackOfficeUserManager, BackOfficeIdentityUser>(
                applicationContext,
                (options, context) =>
                {
                    var membershipProvider = Umbraco.Core.Security.MembershipProviderExtensions.GetUsersMembershipProvider().AsUmbracoMembershipProvider();
                    var settingContent = Umbraco.Core.Configuration.UmbracoConfig.For.UmbracoSettings().Content;
                    var userManager = BackOfficeUserManager.Create(options,
                        applicationContext.Services.UserService,
                        applicationContext.Services.EntityService,
                        applicationContext.Services.ExternalLoginService,
                        membershipProvider,
            settingContent);

                    // Set your own custom IBackOfficeUserPasswordChecker
                    userManager.BackOfficeUserPasswordChecker = new MyPasswordChecker();
                    //userManager.AddClaimAsync()
                    return userManager;
                });

            //Ensure owin is configured for Umbraco back office authentication
            app
                .UseUmbracoBackOfficeCookieAuthentication(ApplicationContext.Current)
                .UseUmbracoBackOfficeExternalCookieAuthentication(ApplicationContext.Current);

            /* 
             * Configure external logins for the back office:
             * 
             * Depending on the authentication sources you would like to enable, you will need to install 
             * certain Nuget packages. 
             * 
             * For Google auth:					Install-Package UmbracoCms.IdentityExtensions.Google
             * For Facebook auth:					Install-Package UmbracoCms.IdentityExtensions.Facebook
             * For Microsoft auth:					Install-Package UmbracoCms.IdentityExtensions.Microsoft
             * For Azure ActiveDirectory auth:		Install-Package UmbracoCms.IdentityExtensions.AzureActiveDirectory
             * 
             * There are many more providers such as Twitter, Yahoo, ActiveDirectory, etc... most information can
             * be found here: http://www.asp.net/web-api/overview/security/external-authentication-services
             * 
             * For sample code on using external providers with the Umbraco back office, install one of the 
             * packages listed above to review it's code samples 
             *  
             */

            /*
             * To configure a simple auth token server for the back office:
             *             
             * By default the CORS policy is to allow all requests
             * 
             *      app.UseUmbracoBackOfficeTokenAuth(new BackOfficeAuthServerProviderOptions());
             *      
             * If you want to have a custom CORS policy for the token server you can provide
             * a custom CORS policy, example: 
             * 
             *      app.UseUmbracoBackOfficeTokenAuth(
             *          new BackOfficeAuthServerProviderOptions()
             *              {
             *             		//Modify the CorsPolicy as required
             *                  CorsPolicy = new CorsPolicy()
             *                  {
             *                      AllowAnyHeader = true,
             *                      AllowAnyMethod = true,
             *                      Origins = { "http://mywebsite.com" }                
             *                  }
             *              });
             */
        }
    }
}
