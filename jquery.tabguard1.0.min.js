/*

TABGuard v1.0

jQuery UI Tabbing plugin.
http://spirytoos.blogspot.com.au/

Copyright (c) 2013 Tomasz Egiert

https://github.com/spirytoos/TABGuard/blob/master/LICENSE.md

Project site: http://tomaszegiert.seowebsolutions.com.au/tabguard/index.htm
Github site: https://github.com/spirytoos

 */
 
(function($){var defaults={deactivate:false};var pluginName='tabGuard';$.fn[pluginName]=function(options){var options=$.extend({},defaults,options);return this.each(function(){var $this=$(this);if(options.deactivate){$this.off('.'+pluginName);return}$this.on('keydown.'+pluginName,function(e){if(e.keyCode===9){var tabbables=$this.find(':tabbable'),first=tabbables.filter(':first'),last=tabbables.filter(':last'),focusedElement=$(e.target),isFirstInFocus=(first.get(0)===focusedElement.get(0)),isLastInFocus=(last.get(0)===focusedElement.get(0));var tabbingForward=!e.shiftKey;if(!isFirstInFocus&&!isLastInFocus&&focusedElement.is(':radio')){var radioGroupName=focusedElement.attr('name');if(tabbingForward){if(last.is(':radio')&&last.attr('name')===radioGroupName){isLastInFocus=true}}else{if(first.is(':radio')&&first.attr('name')===radioGroupName){isFirstInFocus=true}}}if(tabbingForward){if(isLastInFocus){first.focus();e.preventDefault()}}else{if(isFirstInFocus){last.focus();e.preventDefault()}}}})})}})(jQuery);