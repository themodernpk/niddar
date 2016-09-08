//------------------------------------------------------
(function ($) {

    // Show the progress bar
    NProgress.start();

    //----------------------------------------------------
    // Trigger finish when page fully loaded
    $(document).ready(function () {
        NProgress.done();
    });
    //----------------------------------------------------
    //----------------------------------------------------

    //----------------------------------------------------
    Common =
    {
        //----------------------------------------------------------
        //----------------------------------------------------------
        ajaxHandler: function (element, url, formData, reset, callback) {
            NProgress.start();
            $.ajax({
                context: element,
                data: formData,
                dataType: 'json',
                url: url,
                async:false,
                type: "POST",
                complete: function () {
                    NProgress.done();
                },
                success: function (data) {
                    console.log("response", data);

                    if (data.status == "failed") {
                        data.errors.forEach(function (item) {
                            $.simplyToast(item.message, 'danger');
                        });
                    } else
                    {
                        if(data.hasOwnProperty("messages"))
                        {
                            data.messages.forEach(function (item)
                            {
                                if (item.type == "success") {
                                    $.simplyToast(item.message, 'success');
                                } else
                                {
                                    $.simplyToast(item.message, 'warning');
                                }
                            });
                        }

                        if(data.status == "success")
                        {
                            if(reset == true)
                            {
                                $(element).find('input[type=text]').val("");
                                $(element).find('textarea').val("");
                            }

                        }

                        if(data.hasOwnProperty("action"))
                        {
                            if(data.action.hasOwnProperty("redirect"))
                            {
                                window.location.replace(data.action.url);
                            }
                        }
                    }
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
        //----------------------------------------------------------
        count: function (object) {
            var count = 0;
            for (var item in object) {
                if (item.hasOwnProperty(item)) {
                    count++;
                }
            }
            return count;
        },
        //---------------------------------------------------
        test: function () {
            alert("ok");
        }
    };// end of class

    //----------------------------------------------------

})(jQuery);// end of jquery



