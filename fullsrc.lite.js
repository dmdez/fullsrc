(function($) {

    $.fn.fullsrc = function(options) {

        $(this).each(onImageLoad);

        function onImageLoad() {
            var $img = $(this);
            var src = $img.data('fullsrc');
            var fullImg = new Image();
            var $wrapper = $('<span />');

            fullImg.src = src;

            fullImg.onload = function() {
                $img.after(fullImg).remove();
            };
        }
    }

})(jQuery);