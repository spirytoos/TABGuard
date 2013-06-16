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
			var options = $.extend( {}, defaults, options );
			
			return this.each(function()
			{

				var $this = $(this);

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

						// Check tab+shift
						var tabbingForward = !e.shiftKey;

						// Special case: radio buttons
						// input[type=radio] are always, according to jQuery ui, :tabbable.
						// If you've selected a radio input and press tab,
						// you will be tabbed to the next input and *not* to the next radio button
						//
						// Here we check if the active element is a radio and if the first/last is
						if (!isFirstInFocus && !isLastInFocus && focusedElement.is(':radio'))
						{
							var radioGroupName = focusedElement.attr('name');
							// If the focused element is a radio button
							if (tabbingForward)
							{
								if (last.is(':radio') && last.attr('name') === radioGroupName)
								{
									// the last one belongs to the same radio group as the focused one
									isLastInFocus = true;
								}
							} else
							{
								if (first.is(':radio') && first.attr('name') === radioGroupName)
								{
									// the first one belongs to the same radio group as the focused one
									isFirstInFocus = true;
								}
							}
						}

						if(tabbingForward)
						{
							if(isLastInFocus)
							{
								first.focus();
								e.preventDefault();
							}
						}
						else
						{
							if(isFirstInFocus)
							{
								last.focus();
								e.preventDefault();
							}
						}
					}
				});
			});
		};

	})(jQuery);

