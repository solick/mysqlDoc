/**
 * Created by lynmatten on 14.06.14.
 */

var _selected = "";


$(document).ready(function() {


    console.log("ready");



    $(document).on({
        mouseenter: function() {
            //console.log("mouseenter: " + $(this).html() + " --- selected: " + _selected);



            if($(this).html() == "All Procedures")
            {
                $("#mainDiv").hide();
                $("#mainDiv2").show();
            }
            else
            {
                $("#mainDiv").show();
                $("#mainDiv2").hide();

                if(_selected != "" && _selected != "All Procedures")
                {
                    $("." + _selected).hide();
                }
                //var tmpObj = $(this).html();
                //console.log("changing to " + tmpObj);

                $("." + $(this).html()).show();
            }

        },
        mouseleave: function() {
            //console.log("mouseleave: " + $(this).html() + " --- selected: " + _selected);



            if($(this).html() == _selected)
            {
                return;
            }

            if($(this).html() == "All Procedures")
            {
                if(_selected != "All Procedures")
                {
                    $("#mainDiv").show();
                    $("#mainDiv2").hide();
                }

            }
            else
            {
                if(_selected == "All Procedures")
                {
                    $("#mainDiv").hide();
                    $("#mainDiv2").show();

                }
                else
                {

                    if(_selected != "")
                    {
                        $("." + _selected).show();
                    }

                }
                $("." + $(this).html()).hide();

            }

        },
        click: function() {

            var clickVar = $(this).html();
            //console.log("clickVar: " +clickVar + " --- _selected: " + _selected);

            if(_selected != "")
            {
                $(this).removeClass('selectedLi');
            }



            if(clickVar == "All Procedures")
            {
                if(_selected == clickVar)
                {
                    $("#mainDiv").show();
                    $("#mainDiv2").hide();
                    _selected = "";
                    //$(this).removeClass("selectedLi");
                }
                else
                {
                    $("#mainDiv").hide();
                    $("#mainDiv2").show();
                    _selected = clickVar;
                    //$(this).removeClass("selectedLi");
                    $(this).addClass("selectedLi");
                }

            }
            else
            {
                $("#mainDiv").show();
                $("#mainDiv2").hide();


                if(_selected == "")
                {

                    _selected = $(this).html();
                    //console.log("selected " + _selected);

                    $("." + _selected).show();
                    $(this).addClass("selectedLi");

                }
                else if((_selected != $(this).html()) && _selected != "")
                {

                    $("." + _selected).hide();


                    $(".selectedLi").removeClass("selectedLi");
                    _selected = $(this).html();
                    //console.log("selected " + _selected);
                    $("." + _selected).show();
                    $(this).addClass("selectedLi");

                }
                else
                {
                    $("." + _selected).hide();
                    _selected = "";
                    //console.log("un-selected " + $(this).html());
                    //$(this).removeClass("selectedLi");

                }
            }


        }
    }, ".listRow");




});

