$(".ddApplications").click(function () {
    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        $("<p>" + data + "</p>").appendTo("body");

        $('.ddApplications').popover({
            title: 'Popover Info',
            content: data.toString(),
            html: true
        });


    });
});



$('.ddApplications').click(function () {
    var e = $(this);
    e.off('focus');
    $.getJSON('https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson', function (d) {
        e.popover({ content: d.toString() }).popover('show');
    });
});




$(".ddApplications").click(function () {

    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        //$("<p>" + data + "</p>").appendTo("body");

        $('.ddApplications').popover({
            title: 'Popover Info',
            content: data.toString(),
            html: true
        }).on('hidden.bs.popover', function () {
            $('.ddApplications').popover('dispose');
        });
    });
});


$('.ddApplications').popover({
    title: 'Popover Info',
    content: 'Sample content',
    html: true
}).click(function () {

    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        $('.ddApplications').popover({
            content: data.toString()
        });
    });
}).on('hidden.bs.popover', function () {
    $('.ddApplications').popover('dispose');
});


/*************************************/


$('.ddApplications').hover(function () {

    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        $('.ddApplications').popover({
            //trigger: 'focus',
            content: data.toString(),
            html: true
        }).on('hidden.bs.popover', function () {
            $('.ddApplications').popover('dispose');
        });
    });
});



/*************************************/


<a class="btn btn-lg btn-danger ddAdmission" role="button" data-toggle="popover" data-trigger="focus">Basis of Admission</a>




$('.ddAdmission').click(function () {

    var thisElem = $(this);

    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        thisElem.popover({
            //trigger: 'focus',
            content: data.toString(),
            html: true
        }).on('hidden.bs.popover', function () {
            thisElem.popover('dispose');
        });
    });
});





/*************************************/


$('.ddApplications').hover(function () {

    var thisElem = $(this);

    thisElem.blur();

    thisElem.popover({
        title: "init",
        content: ""
    });

    thisElem.on('show.bs.popover', function () {
        $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

            thisElem.popover({
                content: data.toString(),
                html: true
            });
        });
    });

    thisElem.on('shown.bs.popover', function () {
        thisElem.popover({
            title: "Popover title"
        });
    });

    thisElem.on('hidden.bs.popover', function () {
        thisElem.popover('dispose');
    });


});



/*************************************/


$('.ddApplications').hover(function () {

    var thisElem = $(this);

    thisElem.popover().on('show.bs.popover', function () {

        $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

            thisElem.popover({
                content: data.toString(),
                html: true
            }).popover('show');


            alert('hi after json');
        });
    });;
});



/*************************************/


$('.ddApplications').click(function () {

    var thisElem = $(this);

    $.getJSON("https://ir.unlv.edu/UmbracoPaulSealv2/umbraco/api/PostsApi/getjson", function (data) {

        thisElem.popover({
            content: data.toString(),
            trigger: 'hover',
            html: true
        }).popover('show')
        .on('hidden.bs.popover', function () {
            thisElem.popover().popover('dispose');
            thisElem.popover('dispose');
        });;

    });

});



/*****************************************************/


/****************** LATEST WORKING *******************/

$('.ddApplications').click(function () {

    var thisElem = $(this);

    $.getJSON("https://ir.unlv.edu/UmbracoODS/umbraco/api/DataDictionaryApi/GetJson", function (data) {

        thisElem.popover({
            content: data.toString(),
            //trigger: 'hover',
            html: true
        }).popover('show')
        .click(function(e) {
            e.preventDefault();
        })
        .on('hidden.bs.popover', function () {
            // thisElem.tooltip('dispose');
            // thisElem.popover('dispose');
        });;

    });

});


/****************** LATEST WORKING *******************/

