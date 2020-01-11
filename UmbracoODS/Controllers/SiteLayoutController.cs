using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Umbraco.Web.Mvc;
using UmbracoODS.Models;
using Umbraco.Core.Models;
using System.Runtime.Caching;
using Umbraco.Web;
using System.Linq;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using Newtonsoft.Json;
using Umbraco.Core;
using Umbraco.Web.Models;

namespace UmbracoODS.Controllers
{
    public class SiteLayoutController : SurfaceController
    {
        private const string PARTIAL_VIEW_FOLDER = "~/Views/Partials/SiteLayout/";



        public ActionResult RenderBreadcrumb()
        {

            return PartialView(PARTIAL_VIEW_FOLDER + "_Breadcrumb.cshtml");
        }

        public ActionResult RenderTitleControls()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_TitleControls.cshtml");
        }

        public ActionResult RenderFooter()
        {
            return PartialView(PARTIAL_VIEW_FOLDER + "_Footer.cshtml");
        }

        /// <summary>
        /// Renders the top navigation in the header partial
        /// </summary>
        /// <returns>Partial view with a model</returns>        
        public ActionResult RenderHeader()
        {
            List<NavigationListItem> nav = GetNavigationModelFromDatabase(); //GetObjectFromCache<List<NavigationListItem>>("mainNav", 5, GetNavigationModelFromDatabase);
            return PartialView(PARTIAL_VIEW_FOLDER + "_Header.cshtml", nav);
        }

        public ActionResult RenderChapterStructure()
        {
            List<NavigationListItem> chapterItems = GetChapterItems();

            return PartialView(PARTIAL_VIEW_FOLDER + "_ChapterStructure.cshtml", chapterItems);
        }



        /// <summary>
        /// Finds the home page and gets the navigation structure vased on it and it's children
        /// </summary>
        /// <returns>A List of NavigationListItems, representing the structure of the site</returns>
        private List<NavigationListItem> GetNavigationModelFromDatabase()
        {
            IPublishedContent homePage = CurrentPage.AncestorOrSelf("home");
            List<NavigationListItem> nav = new List<NavigationListItem>();
            //nav.Add(new NavigationListItem(new NavigationLink(homePage.Url, homePage.Name)));
            nav.AddRange(GetChildNavigationList(homePage));

            return nav;
        }


        private List<NavigationListItem> GetChapterItems()
        {


            NavigationListItem chapterRootPage;

            List<NavigationListItem> chapItems = new List<NavigationListItem>();

            chapterRootPage = new NavigationListItem(new NavigationLink(CurrentPage.Id, CurrentPage.Url, CurrentPage.Name));//If this is current chapter's root or even home page

            //if (CurrentPage.Children.Count() > 0)
            //{
            if (CurrentPage.Name.ToLower() == "home" || CurrentPage.Parent.Name.ToLower() == "home")
            {

                chapItems.Add(chapterRootPage);
                if (CurrentPage.Children.Count() > 0)
                {
                    chapItems.AddRange(GetChildPages(CurrentPage));
                }
            }
            else
            {
                IPublishedContent IPubRootPage = CurrentPage.Ancestors().Reverse().ToList()[1];

                chapterRootPage = new NavigationListItem(new NavigationLink(IPubRootPage.Id, IPubRootPage.Url, IPubRootPage.Name)); ;

                chapItems.Add(chapterRootPage);
                chapItems.AddRange(GetChildPages(IPubRootPage));
            }
            //}
            //else
            //{
            //    chapItems.Add(chapterRootPage);
            //}

            return chapItems;
        }


        /// <summary>
        /// Loops through the child pages of a given page and their children to get the structure for the site
        /// </summary>
        /// <param name="page">The paren page which you want the child dstructure for</param>
        /// <returns>A List of NavigationListItems, representing the structure fo the pages below a page</returns>
        private List<NavigationListItem> GetChildNavigationList(IPublishedContent page)
        {
            List<NavigationListItem> listItems = null;
            var childPages = page.Children.Where(x => x.IsVisible()).Where(x => x.HasValue("topMenuItem") && x.GetPropertyValue<bool>("topMenuItem"));

            if (childPages != null && childPages.Any() && childPages.Count() > 0)
            {
                listItems = new List<NavigationListItem>();
                foreach (var childPage in childPages)
                {
                    NavigationListItem listItem = new NavigationListItem(new NavigationLink(childPage.Id, childPage.Url, childPage.Name));
                    listItem.Items = GetChildNavigationList(childPage);
                    listItems.Add(listItem);
                }
            }



            return listItems;
        }


        private List<NavigationListItem> GetChildPages(IPublishedContent page)
        {
            List<NavigationListItem> listItems = null;
            var childPages = page.Children.Where(x => x.IsVisible());

            if (childPages != null && childPages.Any() && childPages.Count() > 0)
            {
                listItems = new List<NavigationListItem>();
                foreach (var childPage in childPages)
                {
                    bool newWindow = false;
                    string childPageUrl = childPage.Url;

                    if (childPage.DocumentTypeAlias == "prettyLink")
                    {
                        RelatedLinks relatedLinks = childPage.GetPropertyValue<RelatedLinks>("linkTarget");
                        RelatedLink prettyLink = null;

                        if (relatedLinks != null && relatedLinks.Count() > 0)
                        {
                            prettyLink = relatedLinks.FirstOrDefault();
                            newWindow = prettyLink.NewWindow;
                            childPageUrl = prettyLink.Link;
                        }

                    }

                    

                    NavigationListItem listItem = new NavigationListItem(new NavigationLink(childPage.Id, childPageUrl, childPage.Name, newWindow));
                    listItem.Items = GetChildPages(childPage);
                    listItems.Add(listItem);
                }
            }

            return listItems;
        }

        /// <summary>
        /// A generic function for getting and setting objects to the memory cache.
        /// </summary>
        /// <typeparam name="T">The type of the object to be returned.</typeparam>
        /// <param name="cacheItemName">The name to be used when storing this object in the cache.</param>
        /// <param name="cacheTimeInMinutes">How long to cache this object for.</param>
        /// <param name="objectSettingFunction">A parameterless function to call if the object isn't in the cache and you need to set it.</param>
        /// <returns>An object of the type you asked for</returns>
        private static T GetObjectFromCache<T>(string cacheItemName, int cacheTimeInMinutes, Func<T> objectSettingFunction)
        {
            ObjectCache cache = MemoryCache.Default;
            var cachedObject = (T)cache[cacheItemName];
            if (cachedObject == null)
            {
                CacheItemPolicy policy = new CacheItemPolicy();
                policy.AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(cacheTimeInMinutes);
                cachedObject = objectSettingFunction();
                cache.Set(cacheItemName, cachedObject, policy);
            }
            return cachedObject;
        }


    }
}