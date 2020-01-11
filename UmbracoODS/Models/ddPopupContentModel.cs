using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models
{
    public class ddPopupContentModel
    {
        public string aliasName { get; set; }
        public string propContent { get; set; }
        public int sortOrder { get; set; }

        public ddPopupContentModel()
        {}

        public ddPopupContentModel(string AliasName, string PropContent, int SortOrder)
        {
            aliasName = AliasName;
            propContent = PropContent;
            sortOrder = SortOrder;
        }
    }
}