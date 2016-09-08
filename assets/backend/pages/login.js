(function ($) {
    "use strict";

        $("#login").submit(function (e) {
            e.preventDefault();
            var element = $(this);
            var url = $(this).attr("action");
            var data = $(this).serialize();
            Common.ajaxHandler(element, url, data);
        });

})(jQuery);// end of jquery

