/*

TABGuard v1.0

jQuery UI Tabbing plugin.
http://spirytoos.blogspot.com.au/

Copyright (c) 2013 Tomasz Egiert

https://github.com/spirytoos/TABGuard/blob/master/LICENSE.md

Project site: http://tomaszegiert.seowebsolutions.com.au/tabguard/index.htm
Github site: https://github.com/spirytoos

 */

	(function($)
	{
		var defaults = {
			deactivate: false
		};

		var pluginName = 'tabGuard';

		$.fn[pluginName] = function(options)
		{
			return this.each(function()
			{

				var $this = $(this);
				var options = $.extend( {}, defaults, options );

				if (options.deactivate) {
					// Remove the events added by this plugin
					$this.off('.' + pluginName);
					return;
				}

				$this.on('keydown.' + pluginName, function(e) {

					// Make sure we're tabbing and hat our focused element is still focused
					if (e.keyCode === 9)
					{
						var tabbables = $this.find(':tabbable'),
							first = tabbables.filter(':first'),
							last  = tabbables.filter(':last'),
							focusedElement = $(e.target),

							isFirstInFocus = (first.get(0) === focusedElement.get(0)),
							isLastInFocus = (last.get(0) === focusedElement.get(0));

						// now check tab+shift
						if(e.shiftKey)
						{
							if(isFirstInFocus)
							{
								last.focus();
								e.preventDefault();
							}
						}
						else
						{
							if(isLastInFocus)
							{
								first.focus();
								e.preventDefault();
							}
						}
					}
				});
			});
		};

	})(jQuery);

