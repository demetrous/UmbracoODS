using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Umbraco.Core.Models;
using Umbraco.Web.WebApi;
using System.Web.Script.Serialization;
using Umbraco.Core;
using UmbracoODS.Models;
using System.Text.RegularExpressions;


namespace UmbracoODS.Controllers
{

    [Route("api/[controller]")]
    public class DataDictionaryApiController : UmbracoApiController
    {
        public JsonResult<string> GetJson(string id) //parameter name should be "id" to be in compliance with MVC conceptions???
        {



            var umbracoPageId = 1106;
            IPublishedContent thisPage = Umbraco.TypedContent(umbracoPageId);
            var iContentOld = ApplicationContext.Current.Services.ContentService.GetById(umbracoPageId);
            List<ddPopupContentModel> ddFromIContent = new List<ddPopupContentModel>();
            List<ddPopupContentModel> ddPopubContentList = new List<ddPopupContentModel>();
            List<ddPopupContentModel> SortedList = new List<ddPopupContentModel>();
            Dictionary<string, int> sortOrder = new Dictionary<string, int>();
            Dictionary<string, string> propNameValue = new Dictionary<string, string>();

            string[] parsedParams = Regex.Split(id, "_-_");

            //Data Dictionary has a structure like: Subject Area - Group of Terms - TermSingle, each element is taken from parsedParams array of strings.
            string subjectAreaParam = parsedParams[0];
            string itemGroupParam = parsedParams[1];
            string itemParam = parsedParams[2];


            IPublishedContent homePage = Umbraco.TypedContentAtRoot().FirstOrDefault(x => x.DocumentTypeAlias == "home"); 

            IPublishedContent dataDictionary = homePage.Children.Where(x => x.DocumentTypeAlias == "dataDictionary").FirstOrDefault();
            IPublishedContent subjectArea = dataDictionary.Children.Where(x => x.Name == subjectAreaParam).FirstOrDefault();//"Enrollment Census - Official"
            IPublishedContent itemGroup = subjectArea.Children.Where(x => x.Name == itemGroupParam).FirstOrDefault();
            IPublishedContent item = itemGroup.Children.Where(x => x.Name == itemParam).FirstOrDefault();

            var iContent = ApplicationContext.Current.Services.ContentService.GetById(item.Id);

            foreach (var pageProp in iContent.Properties)
            {
                sortOrder.Add(pageProp.PropertyType.Alias, pageProp.PropertyType.SortOrder);
                ddFromIContent.Add(new ddPopupContentModel(pageProp.PropertyType.Alias, pageProp.PropertyType.Name, pageProp.PropertyType.SortOrder));
            }


            foreach (var pageProp in thisPage.Properties)
            {
                if (pageProp != null && pageProp.Value != null && pageProp.Value.ToString().Length > 0)
                {
                    int sOrder = sortOrder.FirstOrDefault(t => t.Key == pageProp.PropertyTypeAlias).Value;

                    var fromIContent = ddFromIContent.FirstOrDefault(x => x.aliasName == pageProp.PropertyTypeAlias);

                    ddPopubContentList.Add(new ddPopupContentModel(fromIContent.propContent, pageProp.Value.ToString(), fromIContent.sortOrder));
                }
            }




            //SortedList = ddPopubContentList.OrderBy(o => o.sortOrder).ToList();

            //propNameValue = SortedList.ToDictionary(x => x.aliasName, y => y.propContent);

            ddPopubContentList.Add(new ddPopupContentModel ( "Name", item.Name, -10000 ));

            propNameValue = ddPopubContentList
                                .OrderBy(x=>x.sortOrder)
                                .ToDictionary(x => x.aliasName, y => y.propContent);

            int i = 0;
            foreach (string parsedString in parsedParams)
            {
                propNameValue.Add("Received param " + (i + 1), parsedString);
                i++;
            }



            var json = new JavaScriptSerializer().Serialize(propNameValue);
            return Json(json);

        }
    }
}