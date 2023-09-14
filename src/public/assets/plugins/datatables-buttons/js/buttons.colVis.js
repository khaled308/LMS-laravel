/*!
 * Column visibility buttons for Buttons and DataTables.
 * 2016 SpryMedia Ltd - datatables.net/license
 */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net','datatables.net-buttons'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}
if(!$.fn.dataTable.Buttons){require('datatables.net-buttons')(root,$);}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;$.extend(DataTable.ext.buttons,{colvis:function(dt,conf){var node=null;var buttonConf={extend:'collection',init:function(dt,n){node=n;},text:function(dt){return dt.i18n('buttons.colvis','Column visibility');},className:'buttons-colvis',closeButton:false,buttons:[{extend:'columnsToggle',columns:conf.columns,columnText:conf.columnText}]};dt.on('column-reorder.dt'+conf.namespace,function(e,settings,details){dt.button(null,dt.button(null,node).node()).collectionRebuild([{extend:'columnsToggle',columns:conf.columns,columnText:conf.columnText}]);});return buttonConf;},columnsToggle:function(dt,conf){var columns=dt.columns(conf.columns).indexes().map(function(idx){return{extend:'columnToggle',columns:idx,columnText:conf.columnText};}).toArray();return columns;},columnToggle:function(dt,conf){return{extend:'columnVisibility',columns:conf.columns,columnText:conf.columnText};},columnsVisibility:function(dt,conf){var columns=dt.columns(conf.columns).indexes().map(function(idx){return{extend:'columnVisibility',columns:idx,visibility:conf.visibility,columnText:conf.columnText};}).toArray();return columns;},columnVisibility:{columns:undefined,text:function(dt,button,conf){return conf._columnText(dt,conf);},className:'buttons-columnVisibility',action:function(e,dt,button,conf){var col=dt.columns(conf.columns);var curr=col.visible();col.visible(conf.visibility!==undefined?conf.visibility:!(curr.length?curr[0]:false));},init:function(dt,button,conf){var that=this;button.attr('data-cv-idx',conf.columns);dt.on('column-visibility.dt'+conf.namespace,function(e,settings){if(!settings.bDestroying&&settings.nTable==dt.settings()[0].nTable){that.active(dt.column(conf.columns).visible());}}).on('column-reorder.dt'+conf.namespace,function(e,settings,details){if(conf.destroying){return;}
if(dt.columns(conf.columns).count()!==1){return;}
that.text(conf._columnText(dt,conf));that.active(dt.column(conf.columns).visible());});this.active(dt.column(conf.columns).visible());},destroy:function(dt,button,conf){dt.off('column-visibility.dt'+conf.namespace).off('column-reorder.dt'+conf.namespace);},_columnText:function(dt,conf){var idx=dt.column(conf.columns).index();var title=dt.settings()[0].aoColumns[idx].sTitle;if(!title){title=dt.column(idx).header().innerHTML;}
title=title.replace(/\n/g," ").replace(/<br\s*\/?>/gi," ").replace(/<select(.*?)<\/select>/g,"").replace(/<!\-\-.*?\-\->/g,"").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,"");return conf.columnText?conf.columnText(dt,idx,title):title;}},colvisRestore:{className:'buttons-colvisRestore',text:function(dt){return dt.i18n('buttons.colvisRestore','Restore visibility');},init:function(dt,button,conf){conf._visOriginal=dt.columns().indexes().map(function(idx){return dt.column(idx).visible();}).toArray();},action:function(e,dt,button,conf){dt.columns().every(function(i){var idx=dt.colReorder&&dt.colReorder.transpose?dt.colReorder.transpose(i,'toOriginal'):i;this.visible(conf._visOriginal[idx]);});}},colvisGroup:{className:'buttons-colvisGroup',action:function(e,dt,button,conf){dt.columns(conf.show).visible(true,false);dt.columns(conf.hide).visible(false,false);dt.columns.adjust();},show:[],hide:[]}});return DataTable.Buttons;}));