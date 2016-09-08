//------------------------------------------
(function ($) {
    "use strict";

    //----------------------------------------
    var records = {
        filters: {},
        template: "<li>tests</li>",
        init: function () {
            this.filters.base_url = $("#base_url").val();
            this.filters.current_url = $("#current_url").val();
            this.filters.token = $("#token").val();
            this.create_form = $("#formCreate");
            this.bindEvents();
            this.fetchList();
        },
        bindEvents: function () {
            $("#formCreate").on("submit", this.createItem.bind(this));
        },
        fetchList: function () {
            var url = this.filters.base_url+"/list";

            $.ajax({
                dataType: "json",
                url: url,
                data: this.filters,
                headers: {
                    'X-CSRF-TOKEN' : this.filters.token
                },
                type: "POST",
                success: function (data) {
                    console.log("response", data);
                    $("#data-content").html(data.html);
                },
                error: function (xhr, ajaxOptions, thrownError)
                {
                    var log_message = "status = " + xhr.status + " | Message = " + xhr.responseText + " |  Error=" + thrownError;
                    console.log("Ajax Error=", log_message);
                    var message = "status = " + xhr.status + " |  Error=" + thrownError + " | Check console for more details";
                    $.simplyToast(message, 'error');
                }
            });
        },
        createItem: function (e) {
            e.preventDefault();
            console.log("response");
            var element = this.create_form;
            var url = element.attr("action");
            var data = {};
            data.form = element.serialize();
            data.filters = this.filters;

            console.log("response", data);

            /*Common.ajaxHandler(element, url, data, true);
            this.fetchList();*/
        }

    };
    //----------------------------------------
    records.init();
    //----------------------------------------
/*    $("#formCreate").submit(function (e) {
        e.preventDefault();
        var element = $(this);
        var url = $(this).attr("action");
        var data = $(this).serialize();
        Common.ajaxHandler(element, url, data);
    });*/
    //----------------------------------------
    //----------------------------------------
    //----------------------------------------


})(jQuery);// end of jquery

