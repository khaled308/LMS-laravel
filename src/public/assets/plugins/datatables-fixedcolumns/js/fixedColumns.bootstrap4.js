/*! FixedColumns 4.0.1
 * 2019-2021 SpryMedia Ltd - datatables.net/license
 */
(function(){'use strict';/*! Bootstrap 4 integration for DataTables' FixedColumns
     * ©2016 SpryMedia Ltd - datatables.net/license
     */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net-bs4','datatables.net-fixedcolumns'],function($){return factory($);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net-bs4')(root,$).$;}
if(!$.fn.dataTable.SearchPanes){require('datatables.net-fixedcolumns')(root,$);}
return factory($);};}
else{factory(jQuery);}}(function($){var dataTable=$.fn.dataTable;return dataTable.fixedColumns;}));}());