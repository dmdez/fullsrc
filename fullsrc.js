(function($) {

    $.fn.fullsrc = function(options) {

        var defaults = {
            'graceful' : false
        };

        var settings = $.extend({}, defaults, options);

        $(this).each(onImageLoad);

        function onImageLoad() {
            var $img = $(this);
            var src = $img.data('fullsrc');
            var fullImg = new Image();
            var $wrapper = $('<span />');

            if ( settings.graceful ) {
                $wrapper.css({
                    'position': 'relative',
                    'display' : 'inline-block',
                }).width($img.width());

                $img
                    .css({ 'z-index': '1' })
                    .wrap($wrapper);
            }

            fullImg.src = src;

            fullImg.onload = function() {
                if ( settings.graceful ) {                    
                    var cssAttr = {
                        'position' : 'absolute',
                        'top'      : '0',
                        'left'     : '0',
                        'z-index'  : '2',
                        'display'  : 'none'
                    };

                    var afterFade = function() {
                        $img
                            .removeAttr('data-fullsrc')
                            .attr('src', src)
                            .css({ 'z-index': '' })
                            .unwrap();

                        $(fullImg).remove();
                    };

                    $(fullImg)
                        .width($img.width())
                        .height($img.height())
                        .css(cssAttr)
                        .fadeIn(200, afterFade);
                    
                    $img.after(fullImg);
                } else {
                    $img.after(fullImg).remove();
                }
            };
        }
    }

})(jQuery);