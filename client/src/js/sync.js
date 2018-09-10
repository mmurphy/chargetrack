// Standard sync setup for simple dataset

require('fh-sync-js');

var datasetId = "chargetrack";
var template;
var cloudUrl = "http://192.168.99.100:31062"; //window.location.protocol + "//" + window.location.hostname + ":3000"


$(document).ready(function () {
    cloudUrl = "http://192.168.99.100:31062"; //window.location.protocol + "//" + window.location.hostname + ":3000"
    console.log('document ready - cloudUrl:', cloudUrl)
    console.log('document ready - compiling template')
    var source = $("#history-template").html();
    template = Handlebars.compile(source);
    
    //provide sync init options
    $fh.sync.init({
        "cloudUrl": cloudUrl,
        "sync_frequency": 10,
        "do_console_log": true,
        "storage_strategy": "indexed-db"
    });

    //provide listeners for notifications.
    $fh.sync.notify(function (notification) {
        var code = notification.code
        if ('sync_complete' === code) {
            //a sync loop completed successfully, list the update data
            $fh.sync.doList(datasetId,
                function (res) {
                    var results=_.map(res,function(v, k){return {id:k,
                        createdDate: v.data.createdDate,
                        battery: v.data.battery,
                        odometer: v.data.odometer,
                        comment: v.data.comment}
                    });
                    console.log(new Date().toISOString() + ' NOTIFY: sync_complete - list contains ' + results.length + ' records');
                    var html = template({
                        items: results
                    });
                    $('#history').html(html);
                    $( ".deleteid" ).click(function() {
                        var id = $( this ).data("id");
                        console.log('will delete id: ' + id);
                        $(this).attr("disabled");
                        $fh.sync.doDelete(datasetId, id,
                            function (res) {
                                console.log('Successful result from delete:', JSON.stringify(res));
                            },
                            function (err) {
                                console.log('Error result from delete:', JSON.stringify(err));
                            });
                    });
                    
                },
                function (err) {
                    console.log('Error result from list:', JSON.stringify(err));
                });
        } else {
            //choose other notifications the app is interested in and provide callbacks
        }
    });

    //manage the data set, repeat this if the app needs to manage multiple datasets
    var query_params = {}; //or something like this: {"eq": {"field1": "value"}}
    var meta_data = {};
    $fh.sync.manage(datasetId, {}, query_params, meta_data, function () {
        // Save data
        var data = { createdDate: new Date(), battery: 1, odometer: 2, comment: "dummy data" };
        $fh.sync.doCreate(datasetId, data,
            function (res) {
                console.log('Successful result from list:', JSON.stringify(res));
            },
            function (err) {
                console.log('Error result from list:', JSON.stringify(err));
            });
    });

    $('#btnAdd').click(function() {
        // Save data
        var data = {
            createdDate: new Date(),
            battery: $('#battery').val(),
            odometer: $('#odometer').val(),
            comment: $('#comment').val(),
        };
        $fh.sync.doCreate(datasetId, data,
            function (res) {
                console.log('Successful result from ADD:', JSON.stringify(res));
            },
            function (err) {
                console.log('Error result from ADD:', JSON.stringify(err));
            }
        );

    });

});
  
