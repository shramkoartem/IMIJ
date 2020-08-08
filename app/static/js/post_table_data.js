var $BTN = $('#export-btn');
var $TABLE = $('#item_table');
var $EXPORT = $('#export');


// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

$BTN.click(function () {
  var $rows = $TABLE.find('tr:not(:hidden)');
  var headers = [];
  var data = [];

  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(:empty)').each(function () {
    headers.push($(this).text().toLowerCase());
  });

  // Turn all existing rows into a loopable array
  $rows.each(function () {
    var $td = $(this).find('td');
    var h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });

    data.push(h);

  });

  // Output the result
  $EXPORT.text(JSON.stringify(data));

    $.ajax({
        type: 'POST',
        url: '/items/postmethod',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (response_data) {
        alert("success");
        }
    });
});