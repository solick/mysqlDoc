/**
 * Created by lynmatten on 16.06.14.
 */


$(document).ready(function() {

    /* substitutes \r and \n with <br /> for using new line feature in comment div */
    $(".procComment, .tblComment").each(function(obj) {

        var tmpObj = $(this).find("p");

        var tmpStr = tmpObj.html();

        tmpStr = tmpStr.replace(new RegExp('\r?\n','g'), '<br />');
        //console.log(tmpStr);

        tmpObj.html(tmpStr);

    });

    /* substitutes \r and \n with <br /> for using new line feature in procedure body div */
    $(".procBody, .tblBody").each(function(obj) {

        var tmpObj = $(this).find("p");

        var tmpStr = tmpObj.html();

        tmpStr = tmpStr.replace(new RegExp('\r?\n','g'), '<br />');
        //console.log(tmpStr);

        tmpObj.html(tmpStr);

    });



});
