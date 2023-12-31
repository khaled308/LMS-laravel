/*! Buttons for DataTables 2.2.2
 * ©2016-2022 SpryMedia Ltd - datatables.net/license
 */
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery','datatables.net'],function($){return factory($,window,document);});}
else if(typeof exports==='object'){module.exports=function(root,$){if(!root){root=window;}
if(!$||!$.fn.dataTable){$=require('datatables.net')(root,$).$;}
return factory($,root,root.document);};}
else{factory(jQuery,window,document);}}(function($,window,document,undefined){'use strict';var DataTable=$.fn.dataTable;var _instCounter=0;var _buttonCounter=0;var _dtButtons=DataTable.ext.buttons;function _fadeIn(el,duration,fn){if($.fn.animate){el.stop().fadeIn(duration,fn);}
else{el.css('display','block');if(fn){fn.call(el);}}}
function _fadeOut(el,duration,fn){if($.fn.animate){el.stop().fadeOut(duration,fn);}
else{el.css('display','none');if(fn){fn.call(el);}}}
var Buttons=function(dt,config)
{if(!(this instanceof Buttons)){return function(settings){return new Buttons(settings,dt).container();};}
if(typeof(config)==='undefined'){config={};}
if(config===true){config={};}
if(Array.isArray(config)){config={buttons:config};}
this.c=$.extend(true,{},Buttons.defaults,config);if(config.buttons){this.c.buttons=config.buttons;}
this.s={dt:new DataTable.Api(dt),buttons:[],listenKeys:'',namespace:'dtb'+(_instCounter++)};this.dom={container:$('<'+this.c.dom.container.tag+'/>').addClass(this.c.dom.container.className)};this._constructor();};$.extend(Buttons.prototype,{action:function(node,action)
{var button=this._nodeToButton(node);if(action===undefined){return button.conf.action;}
button.conf.action=action;return this;},active:function(node,flag){var button=this._nodeToButton(node);var klass=this.c.dom.button.active;var jqNode=$(button.node);if(flag===undefined){return jqNode.hasClass(klass);}
jqNode.toggleClass(klass,flag===undefined?true:flag);return this;},add:function(config,idx,draw)
{var buttons=this.s.buttons;if(typeof idx==='string'){var split=idx.split('-');var base=this.s;for(var i=0,ien=split.length-1;i<ien;i++){base=base.buttons[split[i]*1];}
buttons=base.buttons;idx=split[split.length-1]*1;}
this._expandButton(buttons,config,config!==undefined?config.split:undefined,(config===undefined||config.split===undefined||config.split.length===0)&&base!==undefined,false,idx);if(draw===undefined||draw===true){this._draw();}
return this;},collectionRebuild:function(node,newButtons)
{var button=this._nodeToButton(node);if(newButtons!==undefined){var i;for(i=button.buttons.length-1;i>=0;i--){this.remove(button.buttons[i].node);}
for(i=0;i<newButtons.length;i++){var newBtn=newButtons[i];this._expandButton(button.buttons,newBtn,newBtn!==undefined&&newBtn.config!==undefined&&newBtn.config.split!==undefined,true,newBtn.parentConf!==undefined&&newBtn.parentConf.split!==undefined,i,newBtn.parentConf);}}
this._draw(button.collection,button.buttons);},container:function()
{return this.dom.container;},disable:function(node){var button=this._nodeToButton(node);$(button.node).addClass(this.c.dom.button.disabled).attr('disabled',true);return this;},destroy:function()
{$('body').off('keyup.'+this.s.namespace);var buttons=this.s.buttons.slice();var i,ien;for(i=0,ien=buttons.length;i<ien;i++){this.remove(buttons[i].node);}
this.dom.container.remove();var buttonInsts=this.s.dt.settings()[0];for(i=0,ien=buttonInsts.length;i<ien;i++){if(buttonInsts.inst===this){buttonInsts.splice(i,1);break;}}
return this;},enable:function(node,flag)
{if(flag===false){return this.disable(node);}
var button=this._nodeToButton(node);$(button.node).removeClass(this.c.dom.button.disabled).removeAttr('disabled');return this;},index:function(node,nested,buttons)
{if(!nested){nested='';buttons=this.s.buttons;}
for(var i=0,ien=buttons.length;i<ien;i++){var inner=buttons[i].buttons;if(buttons[i].node===node){return nested+i;}
if(inner&&inner.length){var match=this.index(node,i+'-',inner);if(match!==null){return match;}}}
return null;},name:function()
{return this.c.name;},node:function(node)
{if(!node){return this.dom.container;}
var button=this._nodeToButton(node);return $(button.node);},processing:function(node,flag)
{var dt=this.s.dt;var button=this._nodeToButton(node);if(flag===undefined){return $(button.node).hasClass('processing');}
$(button.node).toggleClass('processing',flag);$(dt.table().node()).triggerHandler('buttons-processing.dt',[flag,dt.button(node),dt,$(node),button.conf]);return this;},remove:function(node)
{var button=this._nodeToButton(node);var host=this._nodeToHost(node);var dt=this.s.dt;if(button.buttons.length){for(var i=button.buttons.length-1;i>=0;i--){this.remove(button.buttons[i].node);}}
button.conf.destroying=true;if(button.conf.destroy){button.conf.destroy.call(dt.button(node),dt,$(node),button.conf);}
this._removeKey(button.conf);$(button.node).remove();var idx=$.inArray(button,host);host.splice(idx,1);return this;},text:function(node,label)
{var button=this._nodeToButton(node);var buttonLiner=this.c.dom.collection.buttonLiner;var linerTag=button.inCollection&&buttonLiner&&buttonLiner.tag?buttonLiner.tag:this.c.dom.buttonLiner.tag;var dt=this.s.dt;var jqNode=$(button.node);var text=function(opt){return typeof opt==='function'?opt(dt,jqNode,button.conf):opt;};if(label===undefined){return text(button.conf.text);}
button.conf.text=label;if(linerTag){jqNode.children(linerTag).eq(0).filter(':not(.dt-down-arrow)').html(text(label));}
else{jqNode.html(text(label));}
return this;},_constructor:function()
{var that=this;var dt=this.s.dt;var dtSettings=dt.settings()[0];var buttons=this.c.buttons;if(!dtSettings._buttons){dtSettings._buttons=[];}
dtSettings._buttons.push({inst:this,name:this.c.name});for(var i=0,ien=buttons.length;i<ien;i++){this.add(buttons[i]);}
dt.on('destroy',function(e,settings){if(settings===dtSettings){that.destroy();}});$('body').on('keyup.'+this.s.namespace,function(e){if(!document.activeElement||document.activeElement===document.body){var character=String.fromCharCode(e.keyCode).toLowerCase();if(that.s.listenKeys.toLowerCase().indexOf(character)!==-1){that._keypress(character,e);}}});},_addKey:function(conf)
{if(conf.key){this.s.listenKeys+=$.isPlainObject(conf.key)?conf.key.key:conf.key;}},_draw:function(container,buttons)
{if(!container){container=this.dom.container;buttons=this.s.buttons;}
container.children().detach();for(var i=0,ien=buttons.length;i<ien;i++){container.append(buttons[i].inserter);container.append(' ');if(buttons[i].buttons&&buttons[i].buttons.length){this._draw(buttons[i].collection,buttons[i].buttons);}}},_expandButton:function(attachTo,button,split,inCollection,inSplit,attachPoint,parentConf)
{var dt=this.s.dt;var buttonCounter=0;var isSplit=false;var buttons=!Array.isArray(button)?[button]:button;if(button===undefined){buttons=!Array.isArray(split)?[split]:split;}
if(button!==undefined&&button.split!==undefined){isSplit=true;}
for(var i=0,ien=buttons.length;i<ien;i++){var conf=this._resolveExtends(buttons[i]);if(!conf){continue;}
if(conf.config!==undefined&&conf.config.split){isSplit=true;}
else{isSplit=false;}
if(Array.isArray(conf)){this._expandButton(attachTo,conf,built!==undefined&&built.conf!==undefined?built.conf.split:undefined,inCollection,parentConf!==undefined&&parentConf.split!==undefined,attachPoint,parentConf);continue;}
var built=this._buildButton(conf,inCollection,conf.split!==undefined||(conf.config!==undefined&&conf.config.split!==undefined),inSplit);if(!built){continue;}
if(attachPoint!==undefined&&attachPoint!==null){attachTo.splice(attachPoint,0,built);attachPoint++;}
else{attachTo.push(built);}
if(built.conf.buttons||built.conf.split){built.collection=$('<'+(isSplit?this.c.dom.splitCollection.tag:this.c.dom.collection.tag)+'/>');built.conf._collection=built.collection;if(built.conf.split){for(var j=0;j<built.conf.split.length;j++){if(typeof built.conf.split[j]==="object"){built.conf.split[j].parent=parentConf;if(built.conf.split[j].collectionLayout===undefined){built.conf.split[j].collectionLayout=built.conf.collectionLayout;}
if(built.conf.split[j].dropup===undefined){built.conf.split[j].dropup=built.conf.dropup;}
if(built.conf.split[j].fade===undefined){built.conf.split[j].fade=built.conf.fade;}}}}
else{$(built.node).append($('<span class="dt-down-arrow">'+this.c.dom.splitDropdown.text+'</span>'))}
this._expandButton(built.buttons,built.conf.buttons,built.conf.split,!isSplit,isSplit,attachPoint,built.conf);}
built.conf.parent=parentConf;if(conf.init){conf.init.call(dt.button(built.node),dt,$(built.node),conf);}
buttonCounter++;}},_buildButton:function(config,inCollection,isSplit,inSplit)
{var buttonDom=this.c.dom.button;var linerDom=this.c.dom.buttonLiner;var collectionDom=this.c.dom.collection;var splitDom=this.c.dom.split;var splitCollectionDom=this.c.dom.splitCollection;var splitDropdownButton=this.c.dom.splitDropdownButton;var dt=this.s.dt;var text=function(opt){return typeof opt==='function'?opt(dt,button,config):opt;};if(config.spacer){var spacer=$('<span></span>').addClass('dt-button-spacer '+config.style+' '+buttonDom.spacerClass).html(text(config.text));return{conf:config,node:spacer,inserter:spacer,buttons:[],inCollection:inCollection,isSplit:isSplit,inSplit:inSplit,collection:null};}
if(!isSplit&&inSplit&&splitCollectionDom){buttonDom=splitDropdownButton;}
else if(!isSplit&&inCollection&&collectionDom.button){buttonDom=collectionDom.button;}
if(!isSplit&&inSplit&&splitCollectionDom.buttonLiner){linerDom=splitCollectionDom.buttonLiner}
else if(!isSplit&&inCollection&&collectionDom.buttonLiner){linerDom=collectionDom.buttonLiner;}
if(config.available&&!config.available(dt,config)&&!config.hasOwnProperty('html')){return false;}
var button;if(!config.hasOwnProperty('html')){var action=function(e,dt,button,config){config.action.call(dt.button(button),e,dt,button,config);$(dt.table().node()).triggerHandler('buttons-action.dt',[dt.button(button),dt,button,config]);};var tag=config.tag||buttonDom.tag;var clickBlurs=config.clickBlurs===undefined?true:config.clickBlurs;button=$('<'+tag+'/>').addClass(buttonDom.className).addClass(inSplit?this.c.dom.splitDropdownButton.className:'').attr('tabindex',this.s.dt.settings()[0].iTabIndex).attr('aria-controls',this.s.dt.table().node().id).on('click.dtb',function(e){e.preventDefault();if(!button.hasClass(buttonDom.disabled)&&config.action){action(e,dt,button,config);}
if(clickBlurs){button.trigger('blur');}}).on('keypress.dtb',function(e){if(e.keyCode===13){e.preventDefault();if(!button.hasClass(buttonDom.disabled)&&config.action){action(e,dt,button,config);}}});if(tag.toLowerCase()==='a'){button.attr('href','#');}
if(tag.toLowerCase()==='button'){button.attr('type','button');}
if(linerDom.tag){var liner=$('<'+linerDom.tag+'/>').html(text(config.text)).addClass(linerDom.className);if(linerDom.tag.toLowerCase()==='a'){liner.attr('href','#');}
button.append(liner);}
else{button.html(text(config.text));}
if(config.enabled===false){button.addClass(buttonDom.disabled);}
if(config.className){button.addClass(config.className);}
if(config.titleAttr){button.attr('title',text(config.titleAttr));}
if(config.attr){button.attr(config.attr);}
if(!config.namespace){config.namespace='.dt-button-'+(_buttonCounter++);}
if(config.config!==undefined&&config.config.split){config.split=config.config.split;}}
else{button=$(config.html)}
var buttonContainer=this.c.dom.buttonContainer;var inserter;if(buttonContainer&&buttonContainer.tag){inserter=$('<'+buttonContainer.tag+'/>').addClass(buttonContainer.className).append(button);}
else{inserter=button;}
this._addKey(config);if(this.c.buttonCreated){inserter=this.c.buttonCreated(config,inserter);}
var splitDiv;if(isSplit){splitDiv=$('<div/>').addClass(this.c.dom.splitWrapper.className)
splitDiv.append(button);var dropButtonConfig=$.extend(config,{text:this.c.dom.splitDropdown.text,className:this.c.dom.splitDropdown.className,closeButton:false,attr:{'aria-haspopup':true,'aria-expanded':false},align:this.c.dom.splitDropdown.align,splitAlignClass:this.c.dom.splitDropdown.splitAlignClass})
this._addKey(dropButtonConfig);var splitAction=function(e,dt,button,config){_dtButtons.split.action.call(dt.button($('div.dt-btn-split-wrapper')[0]),e,dt,button,config);$(dt.table().node()).triggerHandler('buttons-action.dt',[dt.button(button),dt,button,config]);button.attr('aria-expanded',true)};var dropButton=$('<button class="'+this.c.dom.splitDropdown.className+' dt-button"><span class="dt-btn-split-drop-arrow">'+this.c.dom.splitDropdown.text+'</span></button>').on('click.dtb',function(e){e.preventDefault();e.stopPropagation();if(!dropButton.hasClass(buttonDom.disabled)){splitAction(e,dt,dropButton,dropButtonConfig);}
if(clickBlurs){dropButton.trigger('blur');}}).on('keypress.dtb',function(e){if(e.keyCode===13){e.preventDefault();if(!dropButton.hasClass(buttonDom.disabled)){splitAction(e,dt,dropButton,dropButtonConfig);}}});if(config.split.length===0){dropButton.addClass('dtb-hide-drop');}
splitDiv.append(dropButton).attr(dropButtonConfig.attr);}
return{conf:config,node:isSplit?splitDiv.get(0):button.get(0),inserter:isSplit?splitDiv:inserter,buttons:[],inCollection:inCollection,isSplit:isSplit,inSplit:inSplit,collection:null};},_nodeToButton:function(node,buttons)
{if(!buttons){buttons=this.s.buttons;}
for(var i=0,ien=buttons.length;i<ien;i++){if(buttons[i].node===node){return buttons[i];}
if(buttons[i].buttons.length){var ret=this._nodeToButton(node,buttons[i].buttons);if(ret){return ret;}}}},_nodeToHost:function(node,buttons)
{if(!buttons){buttons=this.s.buttons;}
for(var i=0,ien=buttons.length;i<ien;i++){if(buttons[i].node===node){return buttons;}
if(buttons[i].buttons.length){var ret=this._nodeToHost(node,buttons[i].buttons);if(ret){return ret;}}}},_keypress:function(character,e)
{if(e._buttonsHandled){return;}
var run=function(conf,node){if(!conf.key){return;}
if(conf.key===character){e._buttonsHandled=true;$(node).click();}
else if($.isPlainObject(conf.key)){if(conf.key.key!==character){return;}
if(conf.key.shiftKey&&!e.shiftKey){return;}
if(conf.key.altKey&&!e.altKey){return;}
if(conf.key.ctrlKey&&!e.ctrlKey){return;}
if(conf.key.metaKey&&!e.metaKey){return;}
e._buttonsHandled=true;$(node).click();}};var recurse=function(a){for(var i=0,ien=a.length;i<ien;i++){run(a[i].conf,a[i].node);if(a[i].buttons.length){recurse(a[i].buttons);}}};recurse(this.s.buttons);},_removeKey:function(conf)
{if(conf.key){var character=$.isPlainObject(conf.key)?conf.key.key:conf.key;var a=this.s.listenKeys.split('');var idx=$.inArray(character,a);a.splice(idx,1);this.s.listenKeys=a.join('');}},_resolveExtends:function(conf)
{var that=this;var dt=this.s.dt;var i,ien;var toConfObject=function(base){var loop=0;while(!$.isPlainObject(base)&&!Array.isArray(base)){if(base===undefined){return;}
if(typeof base==='function'){base=base.call(that,dt,conf);if(!base){return false;}}
else if(typeof base==='string'){if(!_dtButtons[base]){return{html:base}}
base=_dtButtons[base];}
loop++;if(loop>30){throw'Buttons: Too many iterations';}}
return Array.isArray(base)?base:$.extend({},base);};conf=toConfObject(conf);while(conf&&conf.extend){if(!_dtButtons[conf.extend]){throw'Cannot extend unknown button type: '+conf.extend;}
var objArray=toConfObject(_dtButtons[conf.extend]);if(Array.isArray(objArray)){return objArray;}
else if(!objArray){return false;}
var originalClassName=objArray.className;if(conf.config!==undefined&&objArray.config!==undefined){conf.config=$.extend({},objArray.config,conf.config)}
conf=$.extend({},objArray,conf);if(originalClassName&&conf.className!==originalClassName){conf.className=originalClassName+' '+conf.className;}
var postfixButtons=conf.postfixButtons;if(postfixButtons){if(!conf.buttons){conf.buttons=[];}
for(i=0,ien=postfixButtons.length;i<ien;i++){conf.buttons.push(postfixButtons[i]);}
conf.postfixButtons=null;}
var prefixButtons=conf.prefixButtons;if(prefixButtons){if(!conf.buttons){conf.buttons=[];}
for(i=0,ien=prefixButtons.length;i<ien;i++){conf.buttons.splice(i,0,prefixButtons[i]);}
conf.prefixButtons=null;}
conf.extend=objArray.extend;}
return conf;},_popover:function(content,hostButton,inOpts,e){var dt=hostButton;var buttonsSettings=this.c;var closed=false;var options=$.extend({align:'button-left',autoClose:false,background:true,backgroundClassName:'dt-button-background',closeButton:true,contentClassName:buttonsSettings.dom.collection.className,collectionLayout:'',collectionTitle:'',dropup:false,fade:400,popoverTitle:'',rightAlignClassName:'dt-button-right',tag:buttonsSettings.dom.collection.tag},inOpts);var hostNode=hostButton.node();var close=function(){closed=true;_fadeOut($('.dt-button-collection'),options.fade,function(){$(this).detach();});$(dt.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes()).attr('aria-expanded','false');$('div.dt-button-background').off('click.dtb-collection');Buttons.background(false,options.backgroundClassName,options.fade,hostNode);$(window).off('resize.resize.dtb-collection');$('body').off('.dtb-collection');dt.off('buttons-action.b-internal');dt.off('destroy');};if(content===false){close();return;}
var existingExpanded=$(dt.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());if(existingExpanded.length){if(hostNode.closest('div.dt-button-collection').length){hostNode=existingExpanded.eq(0);}
close();}
var cnt=$('.dt-button',content).length;var mod='';if(cnt===3){mod='dtb-b3';}
else if(cnt===2){mod='dtb-b2';}
else if(cnt===1){mod='dtb-b1';}
var display=$('<div/>').addClass('dt-button-collection').addClass(options.collectionLayout).addClass(options.splitAlignClass).addClass(mod).css('display','none');content=$(content).addClass(options.contentClassName).attr('role','menu').appendTo(display);hostNode.attr('aria-expanded','true');if(hostNode.parents('body')[0]!==document.body){hostNode=document.body.lastChild;}
if(options.popoverTitle){display.prepend('<div class="dt-button-collection-title">'+options.popoverTitle+'</div>');}
else if(options.collectionTitle){display.prepend('<div class="dt-button-collection-title">'+options.collectionTitle+'</div>');}
if(options.closeButton){display.prepend('<div class="dtb-popover-close">x</div>').addClass('dtb-collection-closeable')}
_fadeIn(display.insertAfter(hostNode),options.fade);var tableContainer=$(hostButton.table().container());var position=display.css('position');if(options.span==='container'||options.align==='dt-container'){hostNode=hostNode.parent();display.css('width',tableContainer.width());}
if(position==='absolute'){var offsetParent=$(hostNode[0].offsetParent);var buttonPosition=hostNode.position();var buttonOffset=hostNode.offset();var tableSizes=offsetParent.offset();var containerPosition=offsetParent.position();var computed=window.getComputedStyle(offsetParent[0]);tableSizes.height=offsetParent.outerHeight();tableSizes.width=offsetParent.width()+parseFloat(computed.paddingLeft);tableSizes.right=tableSizes.left+tableSizes.width;tableSizes.bottom=tableSizes.top+tableSizes.height;var top=buttonPosition.top+hostNode.outerHeight();var left=buttonPosition.left;display.css({top:top,left:left});computed=window.getComputedStyle(display[0]);var popoverSizes=display.offset();popoverSizes.height=display.outerHeight();popoverSizes.width=display.outerWidth();popoverSizes.right=popoverSizes.left+popoverSizes.width;popoverSizes.bottom=popoverSizes.top+popoverSizes.height;popoverSizes.marginTop=parseFloat(computed.marginTop);popoverSizes.marginBottom=parseFloat(computed.marginBottom);if(options.dropup){top=buttonPosition.top-popoverSizes.height-popoverSizes.marginTop-popoverSizes.marginBottom;}
if(options.align==='button-right'||display.hasClass(options.rightAlignClassName)){left=buttonPosition.left-popoverSizes.width+hostNode.outerWidth();}
if(options.align==='dt-container'||options.align==='container'){if(left<buttonPosition.left){left=-buttonPosition.left;}
if(left+popoverSizes.width>tableSizes.width){left=tableSizes.width-popoverSizes.width;}}
if(containerPosition.left+left+popoverSizes.width>$(window).width()){left=$(window).width()-popoverSizes.width-containerPosition.left;}
if(buttonOffset.left+left<0){left=-buttonOffset.left;}
if(containerPosition.top+top+popoverSizes.height>$(window).height()+$(window).scrollTop()){top=buttonPosition.top-popoverSizes.height-popoverSizes.marginTop-popoverSizes.marginBottom;}
if(containerPosition.top+top<$(window).scrollTop()){top=buttonPosition.top+hostNode.outerHeight();}
display.css({top:top,left:left});}
else{var position=function(){var half=$(window).height()/2;var top=display.height()/2;if(top>half){top=half;}
display.css('marginTop',top*-1);};position();$(window).on('resize.dtb-collection',function(){position();});}
if(options.background){Buttons.background(true,options.backgroundClassName,options.fade,options.backgroundHost||hostNode);}
$('div.dt-button-background').on('click.dtb-collection',function(){});if(options.autoClose){setTimeout(function(){dt.on('buttons-action.b-internal',function(e,btn,dt,node){if(node[0]===hostNode[0]){return;}
close();});},0);}
$(display).trigger('buttons-popover.dt');dt.on('destroy',close);setTimeout(function(){closed=false;$('body').on('click.dtb-collection',function(e){if(closed){return;}
var back=$.fn.addBack?'addBack':'andSelf';var parent=$(e.target).parent()[0];if((!$(e.target).parents()[back]().filter(content).length&&!$(parent).hasClass('dt-buttons'))||$(e.target).hasClass('dt-button-background')){close();}}).on('keyup.dtb-collection',function(e){if(e.keyCode===27){close();}});},0);}});Buttons.background=function(show,className,fade,insertPoint){if(fade===undefined){fade=400;}
if(!insertPoint){insertPoint=document.body;}
if(show){_fadeIn($('<div/>').addClass(className).css('display','none').insertAfter(insertPoint),fade);}
else{_fadeOut($('div.'+className),fade,function(){$(this).removeClass(className).remove();});}};Buttons.instanceSelector=function(group,buttons)
{if(group===undefined||group===null){return $.map(buttons,function(v){return v.inst;});}
var ret=[];var names=$.map(buttons,function(v){return v.name;});var process=function(input){if(Array.isArray(input)){for(var i=0,ien=input.length;i<ien;i++){process(input[i]);}
return;}
if(typeof input==='string'){if(input.indexOf(',')!==-1){process(input.split(','));}
else{var idx=$.inArray(input.trim(),names);if(idx!==-1){ret.push(buttons[idx].inst);}}}
else if(typeof input==='number'){ret.push(buttons[input].inst);}
else if(typeof input==='object'){ret.push(input);}};process(group);return ret;};Buttons.buttonSelector=function(insts,selector)
{var ret=[];var nodeBuilder=function(a,buttons,baseIdx){var button;var idx;for(var i=0,ien=buttons.length;i<ien;i++){button=buttons[i];if(button){idx=baseIdx!==undefined?baseIdx+i:i+'';a.push({node:button.node,name:button.conf.name,idx:idx});if(button.buttons){nodeBuilder(a,button.buttons,idx+'-');}}}};var run=function(selector,inst){var i,ien;var buttons=[];nodeBuilder(buttons,inst.s.buttons);var nodes=$.map(buttons,function(v){return v.node;});if(Array.isArray(selector)||selector instanceof $){for(i=0,ien=selector.length;i<ien;i++){run(selector[i],inst);}
return;}
if(selector===null||selector===undefined||selector==='*'){for(i=0,ien=buttons.length;i<ien;i++){ret.push({inst:inst,node:buttons[i].node});}}
else if(typeof selector==='number'){if(inst.s.buttons[selector]){ret.push({inst:inst,node:inst.s.buttons[selector].node});}}
else if(typeof selector==='string'){if(selector.indexOf(',')!==-1){var a=selector.split(',');for(i=0,ien=a.length;i<ien;i++){run(a[i].trim(),inst);}}
else if(selector.match(/^\d+(\-\d+)*$/)){var indexes=$.map(buttons,function(v){return v.idx;});ret.push({inst:inst,node:buttons[$.inArray(selector,indexes)].node});}
else if(selector.indexOf(':name')!==-1){var name=selector.replace(':name','');for(i=0,ien=buttons.length;i<ien;i++){if(buttons[i].name===name){ret.push({inst:inst,node:buttons[i].node});}}}
else{$(nodes).filter(selector).each(function(){ret.push({inst:inst,node:this});});}}
else if(typeof selector==='object'&&selector.nodeName){var idx=$.inArray(selector,nodes);if(idx!==-1){ret.push({inst:inst,node:nodes[idx]});}}};for(var i=0,ien=insts.length;i<ien;i++){var inst=insts[i];run(selector,inst);}
return ret;};Buttons.stripData=function(str,config){if(typeof str!=='string'){return str;}
str=str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'');str=str.replace(/<!\-\-.*?\-\->/g,'');if(!config||config.stripHtml){str=str.replace(/<[^>]*>/g,'');}
if(!config||config.trim){str=str.replace(/^\s+|\s+$/g,'');}
if(!config||config.stripNewlines){str=str.replace(/\n/g,' ');}
if(!config||config.decodeEntities){_exportTextarea.innerHTML=str;str=_exportTextarea.value;}
return str;};Buttons.defaults={buttons:['copy','excel','csv','pdf','print'],name:'main',tabIndex:0,dom:{container:{tag:'div',className:'dt-buttons'},collection:{tag:'div',className:''},button:{tag:'button',className:'dt-button',active:'active',disabled:'disabled',spacerClass:''},buttonLiner:{tag:'span',className:''},split:{tag:'div',className:'dt-button-split',},splitWrapper:{tag:'div',className:'dt-btn-split-wrapper',},splitDropdown:{tag:'button',text:'&#x25BC;',className:'dt-btn-split-drop',align:'split-right',splitAlignClass:'dt-button-split-left'},splitDropdownButton:{tag:'button',className:'dt-btn-split-drop-button dt-button',},splitCollection:{tag:'div',className:'dt-button-split-collection',}}};Buttons.version='2.2.2';$.extend(_dtButtons,{collection:{text:function(dt){return dt.i18n('buttons.collection','Collection');},className:'buttons-collection',closeButton:false,init:function(dt,button,config){button.attr('aria-expanded',false);},action:function(e,dt,button,config){if(config._collection.parents('body').length){this.popover(false,config);}
else{this.popover(config._collection,config);}},attr:{'aria-haspopup':true}
},split:{text:function(dt){return dt.i18n('buttons.split','Split');},className:'buttons-split',closeButton:false,init:function(dt,button,config){return button.attr('aria-expanded',false);},action:function(e,dt,button,config){this.popover(config._collection,config);},attr:{'aria-haspopup':true}
},copy:function(dt,conf){if(_dtButtons.copyHtml5){return'copyHtml5';}},csv:function(dt,conf){if(_dtButtons.csvHtml5&&_dtButtons.csvHtml5.available(dt,conf)){return'csvHtml5';}},excel:function(dt,conf){if(_dtButtons.excelHtml5&&_dtButtons.excelHtml5.available(dt,conf)){return'excelHtml5';}},pdf:function(dt,conf){if(_dtButtons.pdfHtml5&&_dtButtons.pdfHtml5.available(dt,conf)){return'pdfHtml5';}},pageLength:function(dt){var lengthMenu=dt.settings()[0].aLengthMenu;var vals=[];var lang=[];var text=function(dt){return dt.i18n('buttons.pageLength',{"-1":'Show all rows',_:'Show %d rows'},dt.page.len());};if(Array.isArray(lengthMenu[0])){vals=lengthMenu[0];lang=lengthMenu[1];}
else{for(var i=0;i<lengthMenu.length;i++){var option=lengthMenu[i];if($.isPlainObject(option)){vals.push(option.value);lang.push(option.label);}
else{vals.push(option);lang.push(option);}}}
return{extend:'collection',text:text,className:'buttons-page-length',autoClose:true,buttons:$.map(vals,function(val,i){return{text:lang[i],className:'button-page-length',action:function(e,dt){dt.page.len(val).draw();},init:function(dt,node,conf){var that=this;var fn=function(){that.active(dt.page.len()===val);};dt.on('length.dt'+conf.namespace,fn);fn();},destroy:function(dt,node,conf){dt.off('length.dt'+conf.namespace);}};}),init:function(dt,node,conf){var that=this;dt.on('length.dt'+conf.namespace,function(){that.text(conf.text);});},destroy:function(dt,node,conf){dt.off('length.dt'+conf.namespace);}};},spacer:{style:'empty',spacer:true,text:function(dt){return dt.i18n('buttons.spacer','');}}});DataTable.Api.register('buttons()',function(group,selector){if(selector===undefined){selector=group;group=undefined;}
this.selector.buttonGroup=group;var res=this.iterator(true,'table',function(ctx){if(ctx._buttons){return Buttons.buttonSelector(Buttons.instanceSelector(group,ctx._buttons),selector);}},true);res._groupSelector=group;return res;});DataTable.Api.register('button()',function(group,selector){var buttons=this.buttons(group,selector);if(buttons.length>1){buttons.splice(1,buttons.length);}
return buttons;});DataTable.Api.registerPlural('buttons().active()','button().active()',function(flag){if(flag===undefined){return this.map(function(set){return set.inst.active(set.node);});}
return this.each(function(set){set.inst.active(set.node,flag);});});DataTable.Api.registerPlural('buttons().action()','button().action()',function(action){if(action===undefined){return this.map(function(set){return set.inst.action(set.node);});}
return this.each(function(set){set.inst.action(set.node,action);});});DataTable.Api.registerPlural('buttons().collectionRebuild()','button().collectionRebuild()',function(buttons){return this.each(function(set){for(var i=0;i<buttons.length;i++){if(typeof buttons[i]==='object'){buttons[i].parentConf=set;}}
set.inst.collectionRebuild(set.node,buttons);});});DataTable.Api.register(['buttons().enable()','button().enable()'],function(flag){return this.each(function(set){set.inst.enable(set.node,flag);});});DataTable.Api.register(['buttons().disable()','button().disable()'],function(){return this.each(function(set){set.inst.disable(set.node);});});DataTable.Api.register('button().index()',function(){var idx=null;this.each(function(set){var res=set.inst.index(set.node);if(res!==null){idx=res;}});return idx;});DataTable.Api.registerPlural('buttons().nodes()','button().node()',function(){var jq=$();$(this.each(function(set){jq=jq.add(set.inst.node(set.node));}));return jq;});DataTable.Api.registerPlural('buttons().processing()','button().processing()',function(flag){if(flag===undefined){return this.map(function(set){return set.inst.processing(set.node);});}
return this.each(function(set){set.inst.processing(set.node,flag);});});DataTable.Api.registerPlural('buttons().text()','button().text()',function(label){if(label===undefined){return this.map(function(set){return set.inst.text(set.node);});}
return this.each(function(set){set.inst.text(set.node,label);});});DataTable.Api.registerPlural('buttons().trigger()','button().trigger()',function(){return this.each(function(set){set.inst.node(set.node).trigger('click');});});DataTable.Api.register('button().popover()',function(content,options){return this.map(function(set){return set.inst._popover(content,this.button(this[0].node),options);});});DataTable.Api.register('buttons().containers()',function(){var jq=$();var groupSelector=this._groupSelector;this.iterator(true,'table',function(ctx){if(ctx._buttons){var insts=Buttons.instanceSelector(groupSelector,ctx._buttons);for(var i=0,ien=insts.length;i<ien;i++){jq=jq.add(insts[i].container());}}});return jq;});DataTable.Api.register('buttons().container()',function(){return this.containers().eq(0);});DataTable.Api.register('button().add()',function(idx,conf,draw){var ctx=this.context;if(ctx.length){var inst=Buttons.instanceSelector(this._groupSelector,ctx[0]._buttons);if(inst.length){inst[0].add(conf,idx,draw);}}
return this.button(this._groupSelector,idx);});DataTable.Api.register('buttons().destroy()',function(){this.pluck('inst').unique().each(function(inst){inst.destroy();});return this;});DataTable.Api.registerPlural('buttons().remove()','buttons().remove()',function(){this.each(function(set){set.inst.remove(set.node);});return this;});var _infoTimer;DataTable.Api.register('buttons.info()',function(title,message,time){var that=this;if(title===false){this.off('destroy.btn-info');_fadeOut($('#datatables_buttons_info'),400,function(){$(this).remove();});clearTimeout(_infoTimer);_infoTimer=null;return this;}
if(_infoTimer){clearTimeout(_infoTimer);}
if($('#datatables_buttons_info').length){$('#datatables_buttons_info').remove();}
title=title?'<h2>'+title+'</h2>':'';_fadeIn($('<div id="datatables_buttons_info" class="dt-button-info"/>').html(title).append($('<div/>')[typeof message==='string'?'html':'append'](message)).css('display','none').appendTo('body'));if(time!==undefined&&time!==0){_infoTimer=setTimeout(function(){that.buttons.info(false);},time);}
this.on('destroy.btn-info',function(){that.buttons.info(false);});return this;});DataTable.Api.register('buttons.exportData()',function(options){if(this.context.length){return _exportData(new DataTable.Api(this.context[0]),options);}});DataTable.Api.register('buttons.exportInfo()',function(conf){if(!conf){conf={};}
return{filename:_filename(conf),title:_title(conf),messageTop:_message(this,conf.message||conf.messageTop,'top'),messageBottom:_message(this,conf.messageBottom,'bottom')};});var _filename=function(config)
{var filename=config.filename==='*'&&config.title!=='*'&&config.title!==undefined&&config.title!==null&&config.title!==''?config.title:config.filename;if(typeof filename==='function'){filename=filename();}
if(filename===undefined||filename===null){return null;}
if(filename.indexOf('*')!==-1){filename=filename.replace('*',$('head > title').text()).trim();}
filename=filename.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,"");var extension=_stringOrFunction(config.extension);if(!extension){extension='';}
return filename+extension;};var _stringOrFunction=function(option)
{if(option===null||option===undefined){return null;}
else if(typeof option==='function'){return option();}
return option;};var _title=function(config)
{var title=_stringOrFunction(config.title);return title===null?null:title.indexOf('*')!==-1?title.replace('*',$('head > title').text()||'Exported data'):title;};var _message=function(dt,option,position)
{var message=_stringOrFunction(option);if(message===null){return null;}
var caption=$('caption',dt.table().container()).eq(0);if(message==='*'){var side=caption.css('caption-side');if(side!==position){return null;}
return caption.length?caption.text():'';}
return message;};var _exportTextarea=$('<textarea/>')[0];var _exportData=function(dt,inOpts)
{var config=$.extend(true,{},{rows:null,columns:'',modifier:{search:'applied',order:'applied'},orthogonal:'display',stripHtml:true,stripNewlines:true,decodeEntities:true,trim:true,format:{header:function(d){return Buttons.stripData(d,config);},footer:function(d){return Buttons.stripData(d,config);},body:function(d){return Buttons.stripData(d,config);}},customizeData:null},inOpts);var header=dt.columns(config.columns).indexes().map(function(idx){var el=dt.column(idx).header();return config.format.header(el.innerHTML,idx,el);}).toArray();var footer=dt.table().footer()?dt.columns(config.columns).indexes().map(function(idx){var el=dt.column(idx).footer();return config.format.footer(el?el.innerHTML:'',idx,el);}).toArray():null;var modifier=$.extend({},config.modifier);if(dt.select&&typeof dt.select.info==='function'&&modifier.selected===undefined){if(dt.rows(config.rows,$.extend({selected:true},modifier)).any()){$.extend(modifier,{selected:true})}}
var rowIndexes=dt.rows(config.rows,modifier).indexes().toArray();var selectedCells=dt.cells(rowIndexes,config.columns);var cells=selectedCells.render(config.orthogonal).toArray();var cellNodes=selectedCells.nodes().toArray();var columns=header.length;var rows=columns>0?cells.length/columns:0;var body=[];var cellCounter=0;for(var i=0,ien=rows;i<ien;i++){var row=[columns];for(var j=0;j<columns;j++){row[j]=config.format.body(cells[cellCounter],i,j,cellNodes[cellCounter]);cellCounter++;}
body[i]=row;}
var data={header:header,footer:footer,body:body};if(config.customizeData){config.customizeData(data);}
return data;};$.fn.dataTable.Buttons=Buttons;$.fn.DataTable.Buttons=Buttons;$(document).on('init.dt plugin-init.dt',function(e,settings){if(e.namespace!=='dt'){return;}
var opts=settings.oInit.buttons||DataTable.defaults.buttons;if(opts&&!settings._buttons){new Buttons(settings,opts).container();}});function _init(settings,options){var api=new DataTable.Api(settings);var opts=options?options:api.init().buttons||DataTable.defaults.buttons;return new Buttons(api,opts).container();}
DataTable.ext.feature.push({fnInit:_init,cFeature:"B"});if(DataTable.ext.features){DataTable.ext.features.register('buttons',_init);}
return Buttons;}));