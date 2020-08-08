
/*
Enables row (cell) content editing
by changing the "contenteditable" attr
of element <td>
*/

$(document).ready(function(){
    $('#editable_rows_button').click(function(){
        if ($('td').attr('contenteditable') == "false"){
            alert("Editing is enabled.");
            $('td').attr("contenteditable", "true");
            $('#editable_rows_button').text("Disable editing");
        } else {
            alert("Editing is disabled.");
            $('td').attr("contenteditable", "false");
            $('#editable_rows_button').text("Enable editing");
        }
    });
 });