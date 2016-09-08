(function ($) {
    "use strict";


    $("#createAdmin").submit(function (e) {
        e.preventDefault();
        var element = $(this);
        var url = $(this).attr("action");
        var data = $(this).serialize();
        Common.ajaxHandler(element, url, data, "test");
    });



})(jQuery);// end of jquery

