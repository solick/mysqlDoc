/**
 * Created by lynmatten on 02.07.14.
 */


$(document).ready(function() {

    $(document).on({

        mouseenter: function() {

            //console.log("mouseenter");

        },
        mouseleave: function() {

            //console.log("mouseleave");

        },
        click: function() {

            //console.log("click");
            window.location = "http://localhost:9000/";

        }


    }, "#btn_back");



    console.log("ready2");

});