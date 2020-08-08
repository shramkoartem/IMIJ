$(document).ready(function() {

         // Enables DataTable framework support
          let dt_table = $('#item_table').DataTable();

         /***
          * EDIT   ROW   VALUES
          * 
          * - Enable html5 <td> editing on click via button
          * - Read edited data from html element <tr> with ".selected" class
          * - Update internal datatable values with obtained data
          */
          $('#item_table tbody').on('click', 'tr', function(){
                    if ( $(this).hasClass('selected'))
                        {
                        //$(this).removeClass('selected');

                    }
                    else {
                        dt_table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                        
                        // values stored in datatables instance (t0 be updated)
                        let datatables_row_data = dt_table.row('.selected').data();
                        console.log("Old: " + dt_table.row('.selected').data());
                        
                        // array of <td> innerHTML data
                        let dt = $('tr.selected').get()[0].children;

                        // array containing new values
                        let new_data_array = [];

                        // access each child from dt and extract text of <td>
                        // update datatable values & store new data in array
                        for(i = 0; i < dt.length; i++){
                            new_data_array.push(dt[i].textContent);
                            datatables_row_data[i] = dt[i].textContent;
                        }

                        // test
                        console.log(new_data_array);
                        console.log("New: " + dt_table.row('.selected').data());

                    }
                } );

} );