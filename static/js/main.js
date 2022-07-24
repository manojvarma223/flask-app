$(function() {

	'use strict';

	// Form

	var inputForm = function() {

		if ($('#inputForm').length > 0 ) {
			$("#inputForm").validate( {
				rules: {
					weight: {
						required: true,
						number: true
					},
					length1: {
						required: true,
						number: true
					},
					length2: {
						required: true,
						number: true
					},
					length3: {
						required: true,
						number: true
					},
					height: {
						required: true,
						number: true
					},
					width: {
						required: true,
						number: true
					}
				},
				messages: {
					weight: "The value of Weight should be a float integer",
					length1: "The value of Length 1 should be a floating integer",
					length2: "The value of Length 2 should be a floating integer",
					length3: "The value of Length 3 should be a floating integer",
					height: "The value of Height should be a floating integer",
					width: "The value of Width should be a floating integer"
				},
				/* submit via ajax */
				submitHandler: function(form) {
					$.ajax({   	
				      type: "POST",
				      url: "/predict",
				      data: $(form).serialize(),
				      success: function(msg) {
						$('#dialog').html(msg);
						$('#dialog').dialog('open');
				       }
			      });    		
		  		}
				
				
			} );
		}
	};
	$(document).ready( function() {
		$('#dialog').dialog( {
			autoOpen: false,
			title: "Prediction Results",
			resizable: false,
			height: "auto",
			width: 400,
			modal: true,
			buttons: {
			  "Predict Another": function() {
				$( this ).dialog( "close" );
				$('#inputForm').trigger("reset");
			  }
			}
		 } );
	});
	inputForm();

});