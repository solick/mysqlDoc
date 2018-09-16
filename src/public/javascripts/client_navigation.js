/***
 *
 */

$(document).ready(function() {





    var removeActiveFromNavigation = function() {

        $('#navbarContent .active').each(function() {

            console.log($(this));
            $(this).removeClass('active');

        })

    };

    var controlActiveElements = function(state) {

        switch(state) {

            case "home":
                $("#welcome-card").show();
                $('#containerListContent').hide();


                break;


            case "procedures":
                $('#welcome-card').hide();
                $('#containerListContent').show().html("");


                break;

            case "tables":
                $('#welcome-card').hide();
                $('#containerListContent').show().html("");

                break;

            case "allProcedures":
                $('#welcome-card').hide();
                $('#containerListContent').show().html("");

                break;



            case "allTables":
                $('#welcome-card').hide();
                $('#containerListContent').show().html("");

                break;



            case "printProcedures":
                $('#welcome-card').hide();
                $('#containerListContent').show().html("");


                break;



            case "printTables":
                $('#welcome-card').hide();
                $('#containerListContent').hide().html("");

                break;


            default:
                $('#welcome-card').show();
                $('#containerListContent').hide().html("");



                break;


        }



    };

    var openPrintWindow = function(href) {

        var w = screen.width - (screen.width/2);
        var h = screen.height - (screen.height/8);

        var left = (screen.width - w) / 2;

        var top = (screen.height - h) / 4;

        console.log("screen: ", screen);
        console.log("top: " + top);
        console.log("left: " + left);

        window.open(href, "newWindow", 'top='+ top +', left='+ left +', width='+ w +', height=' + h);

    };

    $("#navHome").click(function () {

        console.log("click on Home");

        removeActiveFromNavigation();
        controlActiveElements("home");
        $(this).addClass('active');

    });

    $("#navProcedures").click(function () {

        console.log("click on navProcedures");

        removeActiveFromNavigation();
        controlActiveElements("procedures");
        $(this).addClass('active');

        $('#containerListContent').load("./menu/procedures", function(response, status, xhr) {

            if(status === "error") {
                console.log("Error: ", response);
            }

        });



    });

    $("#navTables").click(function () {

        console.log("click on navTables");

        removeActiveFromNavigation();
        controlActiveElements("tables");
        $(this).addClass('active');

    });

    $("#navAllProcedures").click(function () {

        console.log("click on navAllProcedures");

        removeActiveFromNavigation();
        controlActiveElements("allProcedures");
        $(this).addClass('active');

        $('#containerListContent').load("./list/procedures", function(response, status, xhr) {

            if(status === "error") {
                console.log("Error: ", response);
            }

        });

    });

    $("#navAllTables").click(function () {

        console.log("click on navAllTables");

        removeActiveFromNavigation();
        controlActiveElements("allTables");
        $(this).addClass('active');

        $('#containerListContent').load("./list/tables", function(response, status, xhr) {

            if(status === "error") {
                console.log("Error: ", response);
            }

        });

    });

    $("#navPrintProcedures").click(function () {

        console.log("click on navPrintProcedures");

        removeActiveFromNavigation();
        controlActiveElements("printProcedures");
        $(this).addClass('active');

        openPrintWindow("./print/procedures");

    });

    $("#navPrintTables").click(function () {

        console.log("click on navPrintTables");

        removeActiveFromNavigation();
        controlActiveElements("printTables");
        $(this).addClass('active');

        openPrintWindow("./print/tables");

    })


    /* start after complete loading */
    controlActiveElements();


});
