/*! AutoFill 2.3.9
 * ©2008-2021 SpryMedia Ltd - datatables.net/license
 */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;var _instance=0;var AutoFill=function(dt,opts)
{if(!DataTable.versionCheck||!DataTable.versionCheck('1.10.8')){throw("Warning: AutoFill requires DataTables 1.10.8 or greater");}
this.c=$.extend(true,{},DataTable.defaults.autoFill,AutoFill.defaults,opts);this.s={dt:new DataTable.Api(dt),namespace:'.autoFill'+(_instance++),scroll:{},scrollInterval:null,handle:{height:0,width:0},enabled:false};this.dom={handle:$('<div class="dt-autofill-handle"/>'),select:{top:$('<div class="dt-autofill-select top"/>'),right:$('<div class="dt-autofill-select right"/>'),bottom:$('<div class="dt-autofill-select bottom"/>'),left:$('<div class="dt-autofill-select left"/>')},background:$('<div class="dt-autofill-background"/>'),list:$('<div class="dt-autofill-list">'+this.s.dt.i18n('autoFill.info','')+'<ul/></div>'),dtScroll:null,offsetParent:null};this._constructor();};$.extend(AutoFill.prototype,{enabled:function()
{return this.s.enabled;},enable:function(flag)
{var that=this;if(flag===false){return this.disable();}
this.s.enabled=true;this._focusListener();this.dom.handle.on('mousedown',function(e){that._mousedown(e);return false;});return this;},disable:function()
{this.s.enabled=false;this._focusListenerRemove();return this;},_constructor:function()
{var that=this;var dt=this.s.dt;var dtScroll=$('div.dataTables_scrollBody',this.s.dt.table().container());dt.settings()[0].autoFill=this;if(dtScroll.length){this.dom.dtScroll=dtScroll;if(dtScroll.css('position')==='static'){dtScroll.css('position','relative');}}
if(this.c.enable!==false){this.enable();}
dt.on('destroy.autoFill',function(){that._focusListenerRemove();});},_attach:function(node)
{var dt=this.s.dt;var idx=dt.cell(node).index();var handle=this.dom.handle;var handleDim=this.s.handle;if(!idx||dt.columns(this.c.columns).indexes().indexOf(idx.column)===-1){this._detach();return;}
if(!this.dom.offsetParent){this.dom.offsetParent=$(dt.table().node()).offsetParent();}
if(!handleDim.height||!handleDim.width){handle.appendTo('body');handleDim.height=handle.outerHeight();handleDim.width=handle.outerWidth();}
var offset=this._getPosition(node,this.dom.offsetParent);this.dom.attachedTo=node;handle.css({top:offset.top+node.offsetHeight-handleDim.height,left:offset.left+node.offsetWidth-handleDim.width}).appendTo(this.dom.offsetParent);},_actionSelector:function(cells)
{var that=this;var dt=this.s.dt;var actions=AutoFill.actions;var available=[];$.each(actions,function(key,action){if(action.available(dt,cells)){available.push(key);}});if(available.length===1&&this.c.alwaysAsk===false){var result=actions[available[0]].execute(dt,cells);this._update(result,cells);}
else if(available.length>1){var list=this.dom.list.children('ul').empty();available.push('cancel');$.each(available,function(i,name){list.append($('<li/>').append('<div class="dt-autofill-question">'+
actions[name].option(dt,cells)+
'<div>').append($('<div class="dt-autofill-button">').append($('<button class="'+AutoFill.classes.btn+'">'+dt.i18n('autoFill.button','&gt;')+'</button>').on('click',function(){var result=actions[name].execute(dt,cells,$(this).closest('li'));that._update(result,cells);that.dom.background.remove();that.dom.list.remove();}))));});this.dom.background.appendTo('body');this.dom.list.appendTo('body');this.dom.list.css('margin-top',this.dom.list.outerHeight()/2*-1);}},_detach:function()
{this.dom.attachedTo=null;this.dom.handle.detach();},_drawSelection:function(target,e)
{var dt=this.s.dt;var start=this.s.start;var startCell=$(this.dom.start);var end={row:this.c.vertical?dt.rows({page:'current'}).nodes().indexOf(target.parentNode):start.row,column:this.c.horizontal?$(target).index():start.column};var colIndx=dt.column.index('toData',end.column);var endRow=dt.row(':eq('+end.row+')',{page:'current'});var endCell=$(dt.cell(endRow.index(),colIndx).node());if(!dt.cell(endCell).any()){return;}
if(dt.columns(this.c.columns).indexes().indexOf(colIndx)===-1){return;}
this.s.end=end;var top,bottom,left,right,height,width;top=start.row<end.row?startCell:endCell;bottom=start.row<end.row?endCell:startCell;left=start.column<end.column?startCell:endCell;right=start.column<end.column?endCell:startCell;top=this._getPosition(top.get(0)).top;left=this._getPosition(left.get(0)).left;height=this._getPosition(bottom.get(0)).top+bottom.outerHeight()-top;width=this._getPosition(right.get(0)).left+right.outerWidth()-left;var select=this.dom.select;select.top.css({top:top,left:left,width:width});select.left.css({top:top,left:left,height:height});select.bottom.css({top:top+height,left:left,width:width});select.right.css({top:top,left:left+width,height:height});},_editor:function(cells)
{var dt=this.s.dt;var editor=this.c.editor;if(!editor){return;}
var idValues={};var nodes=[];var fields=editor.fields();for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){var cell=cells[i][j];var col=dt.settings()[0].aoColumns[cell.index.column];var fieldName=col.editField;if(fieldName===undefined){var dataSrc=col.mData;for(var k=0,ken=fields.length;k<ken;k++){var field=editor.field(fields[k]);if(field.dataSrc()===dataSrc){fieldName=field.name();break;}}}
if(!fieldName){throw'Could not automatically determine field data. '+
'Please see https://datatables.net/tn/11';}
if(!idValues[fieldName]){idValues[fieldName]={};}
var id=dt.row(cell.index.row).id();idValues[fieldName][id]=cell.set;nodes.push(cell.index);}}
editor.bubble(nodes,false).multiSet(idValues).submit();},_emitEvent:function(name,args)
{this.s.dt.iterator('table',function(ctx,i){$(ctx.nTable).triggerHandler(name+'.dt',args);});},_focusListener:function()
{var that=this;var dt=this.s.dt;var namespace=this.s.namespace;var focus=this.c.focus!==null?this.c.focus:dt.init().keys||dt.settings()[0].keytable?'focus':'hover';if(focus==='focus'){dt.on('key-focus.autoFill',function(e,dt,cell){that._attach(cell.node());}).on('key-blur.autoFill',function(e,dt,cell){that._detach();});}
else if(focus==='click'){$(dt.table().body()).on('click'+namespace,'td, th',function(e){that._attach(this);});$(document.body).on('click'+namespace,function(e){if(!$(e.target).parents().filter(dt.table().body()).length){that._detach();}});}
else{$(dt.table().body()).on('mouseenter'+namespace,'td, th',function(e){that._attach(this);}).on('mouseleave'+namespace,function(e){if($(e.relatedTarget).hasClass('dt-autofill-handle')){return;}
that._detach();});}},_focusListenerRemove:function()
{var dt=this.s.dt;dt.off('.autoFill');$(dt.table().body()).off(this.s.namespace);$(document.body).off(this.s.namespace);},_getPosition:function(node,targetParent)
{var
currNode=node,currOffsetParent,top=0,left=0;if(!targetParent){targetParent=$($(this.s.dt.table().node())[0].offsetParent);}
do{var positionTop=currNode.offsetTop;var positionLeft=currNode.offsetLeft;currOffsetParent=$(currNode.offsetParent);top+=positionTop+parseInt(currOffsetParent.css('border-top-width')||0)*1;left+=positionLeft+parseInt(currOffsetParent.css('border-left-width')||0)*1;if(currNode.nodeName.toLowerCase()==='body'){break;}
currNode=currOffsetParent.get(0);}
while(currOffsetParent.get(0)!==targetParent.get(0))
return{top:top,left:left};},_mousedown:function(e)
{var that=this;var dt=this.s.dt;this.dom.start=this.dom.attachedTo;this.s.start={row:dt.rows({page:'current'}).nodes().indexOf($(this.dom.start).parent()[0]),column:$(this.dom.start).index()};$(document.body).on('mousemove.autoFill',function(e){that._mousemove(e);}).on('mouseup.autoFill',function(e){that._mouseup(e);});var select=this.dom.select;var offsetParent=$(dt.table().node()).offsetParent();select.top.appendTo(offsetParent);select.left.appendTo(offsetParent);select.right.appendTo(offsetParent);select.bottom.appendTo(offsetParent);this._drawSelection(this.dom.start,e);this.dom.handle.css('display','none');var scrollWrapper=this.dom.dtScroll;this.s.scroll={windowHeight:$(window).height(),windowWidth:$(window).width(),dtTop:scrollWrapper?scrollWrapper.offset().top:null,dtLeft:scrollWrapper?scrollWrapper.offset().left:null,dtHeight:scrollWrapper?scrollWrapper.outerHeight():null,dtWidth:scrollWrapper?scrollWrapper.outerWidth():null};},_mousemove:function(e)
{var that=this;var dt=this.s.dt;var name=e.target.nodeName.toLowerCase();if(name!=='td'&&name!=='th'){return;}
this._drawSelection(e.target,e);this._shiftScroll(e);},_mouseup:function(e)
{$(document.body).off('.autoFill');var that=this;var dt=this.s.dt;var select=this.dom.select;select.top.remove();select.left.remove();select.right.remove();select.bottom.remove();this.dom.handle.css('display','block');var start=this.s.start;var end=this.s.end;if(start.row===end.row&&start.column===end.column){return;}
var startDt=dt.cell(':eq('+start.row+')',start.column+':visible',{page:'current'});if($('div.DTE',startDt.node()).length){var editor=dt.editor();editor.on('submitSuccess.dtaf close.dtaf',function(){editor.off('.dtaf');setTimeout(function(){that._mouseup(e);},100);}).on('submitComplete.dtaf preSubmitCancelled.dtaf close.dtaf',function(){editor.off('.dtaf');});editor.submit();return;}
var rows=this._range(start.row,end.row);var columns=this._range(start.column,end.column);var selected=[];var dtSettings=dt.settings()[0];var dtColumns=dtSettings.aoColumns;var enabledColumns=dt.columns(this.c.columns).indexes();for(var rowIdx=0;rowIdx<rows.length;rowIdx++){selected.push($.map(columns,function(column){var row=dt.row(':eq('+rows[rowIdx]+')',{page:'current'});var cell=dt.cell(row.index(),column+':visible');var data=cell.data();var cellIndex=cell.index();var editField=dtColumns[cellIndex.column].editField;if(editField!==undefined){data=dtSettings.oApi._fnGetObjectDataFn(editField)(dt.row(cellIndex.row).data());}
if(enabledColumns.indexOf(cellIndex.column)===-1){return;}
return{cell:cell,data:data,label:cell.data(),index:cellIndex};}));}
this._actionSelector(selected);clearInterval(this.s.scrollInterval);this.s.scrollInterval=null;},_range:function(start,end)
{var out=[];var i;if(start<=end){for(i=start;i<=end;i++){out.push(i);}}
else{for(i=start;i>=end;i--){out.push(i);}}
return out;},_shiftScroll:function(e)
{var that=this;var dt=this.s.dt;var scroll=this.s.scroll;var runInterval=false;var scrollSpeed=5;var buffer=65;var
windowY=e.pageY-document.body.scrollTop,windowX=e.pageX-document.body.scrollLeft,windowVert,windowHoriz,dtVert,dtHoriz;if(windowY<buffer){windowVert=scrollSpeed*-1;}
else if(windowY>scroll.windowHeight-buffer){windowVert=scrollSpeed;}
if(windowX<buffer){windowHoriz=scrollSpeed*-1;}
else if(windowX>scroll.windowWidth-buffer){windowHoriz=scrollSpeed;}
if(scroll.dtTop!==null&&e.pageY<scroll.dtTop+buffer){dtVert=scrollSpeed*-1;}
else if(scroll.dtTop!==null&&e.pageY>scroll.dtTop+scroll.dtHeight-buffer){dtVert=scrollSpeed;}
if(scroll.dtLeft!==null&&e.pageX<scroll.dtLeft+buffer){dtHoriz=scrollSpeed*-1;}
else if(scroll.dtLeft!==null&&e.pageX>scroll.dtLeft+scroll.dtWidth-buffer){dtHoriz=scrollSpeed;}
if(windowVert||windowHoriz||dtVert||dtHoriz){scroll.windowVert=windowVert;scroll.windowHoriz=windowHoriz;scroll.dtVert=dtVert;scroll.dtHoriz=dtHoriz;runInterval=true;}
else if(this.s.scrollInterval){clearInterval(this.s.scrollInterval);this.s.scrollInterval=null;}
if(!this.s.scrollInterval&&runInterval){this.s.scrollInterval=setInterval(function(){if(scroll.windowVert){document.body.scrollTop+=scroll.windowVert;}
if(scroll.windowHoriz){document.body.scrollLeft+=scroll.windowHoriz;}
if(scroll.dtVert||scroll.dtHoriz){var scroller=that.dom.dtScroll[0];if(scroll.dtVert){scroller.scrollTop+=scroll.dtVert;}
if(scroll.dtHoriz){scroller.scrollLeft+=scroll.dtHoriz;}}},20);}},_update:function(result,cells)
{if(result===false){return;}
var dt=this.s.dt;var cell;var columns=dt.columns(this.c.columns).indexes();this._emitEvent('preAutoFill',[dt,cells]);this._editor(cells);var update=this.c.update!==null?this.c.update:this.c.editor?false:true;if(update){for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){cell=cells[i][j];if(columns.indexOf(cell.index.column)!==-1){cell.cell.data(cell.set);}}}
dt.draw(false);}
this._emitEvent('autoFill',[dt,cells]);}});AutoFill.actions={increment:{available:function(dt,cells){var d=cells[0][0].label;return!isNaN(d-parseFloat(d));},option:function(dt,cells){return dt.i18n('autoFill.increment','Increment / decrement each cell by: <input type="number" value="1">');},execute:function(dt,cells,node){var value=cells[0][0].data*1;var increment=$('input',node).val()*1;for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){cells[i][j].set=value;value+=increment;}}}},fill:{available:function(dt,cells){return true;},option:function(dt,cells){return dt.i18n('autoFill.fill','Fill all cells with <i>%d</i>',cells[0][0].label);},execute:function(dt,cells,node){var value=cells[0][0].data;for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){cells[i][j].set=value;}}}},fillHorizontal:{available:function(dt,cells){return cells.length>1&&cells[0].length>1;},option:function(dt,cells){return dt.i18n('autoFill.fillHorizontal','Fill cells horizontally');},execute:function(dt,cells,node){for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){cells[i][j].set=cells[i][0].data;}}}},fillVertical:{available:function(dt,cells){return cells.length>1;},option:function(dt,cells){return dt.i18n('autoFill.fillVertical','Fill cells vertically');},execute:function(dt,cells,node){for(var i=0,ien=cells.length;i<ien;i++){for(var j=0,jen=cells[i].length;j<jen;j++){cells[i][j].set=cells[0][j].data;}}}},cancel:{available:function(){return false;},option:function(dt){return dt.i18n('autoFill.cancel','Cancel');},execute:function(){return false;}}};AutoFill.version='2.3.9';AutoFill.defaults={alwaysAsk:false,focus:null,columns:'',enable:true,update:null,editor:null,vertical:true,horizontal:true};AutoFill.classes={btn:'btn'};var Api=$.fn.dataTable.Api;Api.register('autoFill()',function(){return this;});Api.register('autoFill().enabled()',function(){var ctx=this.context[0];return ctx.autoFill?ctx.autoFill.enabled():false;});Api.register('autoFill().enable()',function(flag){return this.iterator('table',function(ctx){if(ctx.autoFill){ctx.autoFill.enable(flag);}});});Api.register('autoFill().disable()',function(){return this.iterator('table',function(ctx){if(ctx.autoFill){ctx.autoFill.disable();}});});$(document).on('preInit.dt.autofill',function(e,settings,json){if(e.namespace!=='dt'){return;}
var init=settings.oInit.autoFill;var defaults=DataTable.defaults.autoFill;if(init||defaults){var opts=$.extend({},init,defaults);if(init!==false){new AutoFill(settings,opts);}}});DataTable.AutoFill=AutoFill;DataTable.AutoFill=AutoFill;return AutoFill;}));