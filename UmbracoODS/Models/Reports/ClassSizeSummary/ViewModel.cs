using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UmbracoODS.Models.Reports.ClassSizeSummary
{
  public class ViewModel
  {
    public IEnumerable<ClassSizeTable> ClassSizeTable { get; set; }
    public IEnumerable<TermSingle> TermSingle { get; set; }

    public IEnumerable<TermChoice> TermChoice { get; set; }
  }
}