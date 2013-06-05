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
				/* these are flags used to track which field in specified container is in focus. We need to make sure that pressing TAB or SHIFT+TAB dosent focus on fieds outside of container so we need to check on keydown (NOT UP YET!) if the tab or shift+tab is ressed. If so then check if the field currently being in focus is the first or last in container. If so then we need to move the focus to first or last field in a form accordingly. This has to be done in keydown as otherwise browsers will focus url field or development panel or anything else in its chrome. Now, this is done in keydown, however we need keyup as in keydown the field being currently in focus (the one we navigating away from) is returned. We need to hook event in keyup now to put focus on to the field we want to navigate to. See the code for all logic but thats in a nutshell working of tabbing in between fields. */

				// flags used to track focus on first and last fields

				var isFirstInFocus=false;
				var isLastInFocus=false;
				var $this = $(this);
				var options = $.extend( {}, defaults, options );

				if (options.deactivate) {
					// Remove the events added by this plugin
					$this.off('.' + pluginName);
					return;
				}

				$this.on('keyup.' + pluginName, function(e) {
					// make sure these are only working when dialog is actually open

					if($this.find(":focus").length > 0)
					{
						if (e.keyCode == 9)
						{
							// now one of the fields is in focus so in here we simply set flags for later use

							if($this.find(':tabbable:first:focus').length)
							{
								isFirstInFocus=true;
							}
							else if($this.find(':tabbable:last:focus').length)
							{
								isLastInFocus=true;
							}

						}
					}
				});

				$this.on('keydown.' + pluginName, function(e) {

					// make sure these are only working when dialog is actually open

					if($this.find(":focus").length > 0)
					{
						// now check tab and tab+shift

						if (e.keyCode == 9)
						{
							var tabbables = $this.find(':tabbable'),
								first = tabbables.filter(':first'),
								last  = tabbables.filter(':last');

							if(e.shiftKey)
							{
								if(isFirstInFocus)
								{
									last.focus();
									isFirstInFocus=false;
									isLastInFocus=true;
									return false;
								}
								else if (e.target === first[0])
								{
									isFirstInFocus=true;
									isLastInFocus=false;
									return false;
								}
								else
								{
									isFirstInFocus=false;
									isLastInFocus=false;
								}
							}
							else
							{
								if(isLastInFocus)
								{
									first.focus();
									isFirstInFocus=true;
									isLastInFocus=false;
									return false;
								}
								else if (e.target === last[0])
								{
									isLastInFocus=true;
									isFirstInFocus=false;
									return false;
								}
								else
								{
									isFirstInFocus=false;
									isLastInFocus=false;
								}

							}

						}

					}
				});
			});
		};

	})(jQuery);

