// Begin scoping function
(function () {
   

  //#region mainTable

  const mainTable = `
    <table id="mainTable" border="0" cellspacing="0" cellpadding="0" width="100%" height="1192" class="table table-hover table-sm" style="height: 1192px; width: 100%;">
<thead>
<tr height="18" style="height: 13.5pt;">
<td class="xl23" width="76" height="18" align="center" style="width: 7.64228%; height: 13px;">
<p>Years</p>
</td>
<td class="xl23" width="81" align="center" style="width: 6.66667%; height: 13px;">
<p>Certificate*</p>
</td>
<td class="xl23" width="44" align="center" style="width: 3.65854%; height: 13px;">
<p>Assoc.</p>
</td>
<td class="xl23" width="46" align="center" style="width: 3.82114%; height: 13px;">
<p>Bacc.</p>
</td>
<td class="xl23" width="46" align="center" style="width: 3.82114%; height: 13px;">
<p>P.D.D.</p>
</td>
<td class="xl23" width="56" align="center" style="width: 4.63415%; height: 13px;">
<p>Master's</p>
</td>
<td class="xl23" width="61" align="center" style="width: 5.04065%; height: 13px;">
<p>Ed.Spec.</p>
</td>
<td class="xl23" width="65" align="center" style="width: 5.36585%; height: 13px;">
<p>Doctorate</p>
</td>
<td class="xl23" width="95" align="center" style="width: 7.72358%; height: 13px;">
<p>J.D.</p>
</td>
<td class="xl23" width="39" align="center" style="width: 3.17073%; height: 13px;">
<p>DDM</p>
</td>
<td class="xl23" width="39" align="center" style="width: 4.22764%; height: 13px;">
<p><strong>TOTAL</strong></p>
</td>
</tr>
</thead>
<tbody>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1963-64</strong></td>
<td class="xl23" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl23" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">29</td>
<td class="xl23" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl23" align="center" style="height: 13px; width: 4.63415%;">-</td>
<td class="xl23" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">29</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1964-65</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">58</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">58</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1965-66</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">74</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">74</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1966-67</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">30</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">127</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">11</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">168</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1967-68</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">21</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">160</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">38</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">219</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1968-69</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">32</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">216</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">47</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">295</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1969-70</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">81</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">299</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">77</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">457</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1970-71</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">67</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">463</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">118</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">649</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1971-72</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">69</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">468</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">108</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">649</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1972-73</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">73</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">482</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">152</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">711</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1973-74</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">98</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">533</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">267</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">8</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">906</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1974-75</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">117</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">546</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">227</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">8</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">898</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1975-76</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">104</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">588</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">257</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">956</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1976-77</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">81</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">580</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">257</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">923</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1977-78</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">70</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">665</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">282</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,026</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1978-79</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">90</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">668</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">271</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,038</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1979-80</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">94</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">617</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">267</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">987</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1980-81</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">90</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">653</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">260</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,008</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1981-82</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">93</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">733</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">248</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">10</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,089</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1982-83</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">91</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">860</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">240</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,200</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1983-84</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">108</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">944</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">247</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,307</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1984-85</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">98</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">901</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">233</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,238</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1985-86</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">89</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">921</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">201</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,220</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1986-87</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">78</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">993</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">225</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,307</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1987-88</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">88</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">969</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">212</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">8</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,282</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1988-89</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">64</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,077</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">9</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">219</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,382</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1989-90</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">28</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,221</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">256</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">8</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,524</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1990-91</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">2</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,285</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">334</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,628</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1991-92</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,491</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">387</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">1,889</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1992-93</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,822</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">478</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">2,316</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1993-94</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">1,965</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">502</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">2,486</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1994-95</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,076</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">523</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">10</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">2,618</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1995-96</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,063</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">578</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">9</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">20</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">2,673</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1996-97</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,194</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">594</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">26</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">2,831</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1997-98</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">47</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,383</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">636</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">19</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,099</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1998-99</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,386</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">2</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">699</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">23</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,099</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>1999-00</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">34</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,612</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">725</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">11</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">31</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">-</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,425</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2000-01</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">18</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,658</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">9</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">743</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">32</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">81</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,548</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2001-02</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,737</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">784</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">9</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">35</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">113</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,685</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2002-03</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">18</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,891</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">3</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">805</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">13</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">39</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">135</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">3,904</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2003-04</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">27</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">2,952</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">1</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">898</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">15</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">48</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">119</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">4,060</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2004-05</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">34</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">3,121</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">7</td>
<td class="xl25" align="center" style="height: 13px; width: 4.63415%;">921</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">18</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">36</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">128</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">-</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">4,265</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2005-06</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">67</td>
<td class="xl25" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl26" align="center" style="height: 13px; width: 3.82114%;">3,327</td>
<td class="xl25" align="center" style="height: 13px; width: 3.82114%;">7</td>
<td class="xl27" align="center" style="height: 13px; width: 4.63415%;">1,113</td>
<td class="xl25" align="center" style="height: 13px; width: 5.04065%;">16</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">59</td>
<td class="xl25" align="center" style="height: 13px; width: 7.72358%;">141</td>
<td class="xl25" align="center" style="height: 13px; width: 3.17073%;">68</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">4,798</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl22" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2006-07</strong></td>
<td class="xl23" align="center" style="height: 13px; width: 6.66667%;">22</td>
<td class="xl23" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl28" align="center" style="height: 13px; width: 3.82114%;">3,472</td>
<td class="xl23" align="center" style="height: 13px; width: 3.82114%;">10</td>
<td class="xl28" align="center" style="height: 13px; width: 4.63415%;">1,038</td>
<td class="xl23" align="center" style="height: 13px; width: 5.04065%;">22</td>
<td class="xl23" align="center" style="height: 13px; width: 5.36585%;">82</td>
<td class="xl23" align="center" style="height: 13px; width: 7.72358%;">149</td>
<td class="xl23" align="center" style="height: 13px; width: 3.17073%;">75</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">4,870</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl22" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2007-08</strong></td>
<td class="xl23" align="center" style="height: 13px; width: 6.66667%;">74</td>
<td class="xl23" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl28" align="center" style="height: 13px; width: 3.82114%;">3,720</td>
<td class="xl23" align="center" style="height: 13px; width: 3.82114%;">17</td>
<td class="xl28" align="center" style="height: 13px; width: 4.63415%;">1,374</td>
<td class="xl23" align="center" style="height: 13px; width: 5.04065%;">11</td>
<td class="xl23" align="center" style="height: 13px; width: 5.36585%;">91</td>
<td class="xl23" align="center" style="height: 13px; width: 7.72358%;">134</td>
<td class="xl23" align="center" style="height: 13px; width: 3.17073%;">64</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,485</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2008-09</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">69</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,755</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">21</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,226</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">15</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">134</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">143</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">72</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,435</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2009-10</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">81</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,603</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">35</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,274</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">16</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">140</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">145</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">77</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,371</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2010-11</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">51</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,788</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">33</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,278</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">151</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">130</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">76</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,519</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2011-12</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">33</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,720</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">2</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,218</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">14</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">153</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">162</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">82</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,384</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2012-13</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">31</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,882</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,011</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">156</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">130</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">74</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,296</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2013-14</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">37</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,759</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">928</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">12</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">124</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">143</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">73</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,076</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2014-15</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">39</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,838</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,046</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">4</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">129</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">133</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">76</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,285</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2015-16</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">33</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">3,896</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,039</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">6</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">166</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">113</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">75</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,328</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl24" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>2016-17</strong></td>
<td class="xl25" align="center" style="height: 13px; width: 6.66667%;">52</td>
<td class="xl24" align="center" style="height: 13px; width: 3.65854%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">4,053</td>
<td class="xl24" align="center" style="height: 13px; width: 3.82114%;">-</td>
<td class="xl24" align="center" style="height: 13px; width: 4.63415%;">1,068</td>
<td class="xl24" align="center" style="height: 13px; width: 5.04065%;">5</td>
<td class="xl25" align="center" style="height: 13px; width: 5.36585%;">155</td>
<td class="xl24" align="center" style="height: 13px; width: 7.72358%;">130</td>
<td class="xl24" align="center" style="height: 13px; width: 3.17073%;">75</td>
<td align="center" valign="top" style="height: 13px; width: 4.22764%;">5,538</td>
</tr>
<tr height="18" style="height: 13.5pt;">
<td class="xl22" height="18" align="center" style="height: 13px; width: 7.64228%;"><strong>TOTAL</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 6.66667%;"><strong> 790<br /></strong></td>
<td class="xl28" align="center" style="height: 13px; width: 3.65854%;"><strong>1,856</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 3.82114%;"><strong>95,294</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 3.82114%;"><strong>199</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 4.63415%;"><strong>27,910</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 5.04065%;"><strong>349</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 5.36585%;"><strong>1,995</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 7.72358%;"><strong>2,231</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 3.17073%;"><strong>887</strong></td>
<td class="xl28" align="center" style="height: 13px; width: 4.22764%;"><strong>131,511</strong></td>
</tr>
</tbody>
</table>
`;
  //#endregion

  $('#reportContentTable').append(mainTable);


})();
// End scoping function

