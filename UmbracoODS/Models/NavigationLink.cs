using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models
{
    public class NavigationLink
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }        
        public bool NewWindow { get; set; }
        public string Target { get { return NewWindow ? "_blank" : null; } }
        public string Title { get; set; }

        public NavigationLink()
        { }

        public NavigationLink(int id, string url, string text = null, bool newWindow = false, string title = null)
        {
            Id = id;
            Text = text;
            Url = url;
            NewWindow = newWindow;
            Title = title;
        }
    }
}