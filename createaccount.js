$(function() {
  $('.btn-6')
    .on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
      		relX = e.pageX - parentOffset.left,
      		relY = e.pageY - parentOffset.top;
    	$(this).find('span').css({top:relY, left:relX})
    });
  $('[href=#]').click(function(){return false});
});

import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from 'aws-amplify';

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmpassword: "",
	email: "",
	fname: "",
	lname: "",
	phone_number: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

Auth.signUp({
    username,
    password,
    attributes: {
        email: email,          // optional
        phone_number: phone_number,   // optional - E.164 number convention
        // other custom attributes 
    },
    validationData: []  //optional
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));

// After retrieving the confirmation code from the user
Auth.confirmSignUp(username, code, {
    // Optional. Force user confirmation irrespective of existing alias. By default set to True.
    forceAliasCreation: true    
}).then(data => console.log(data))
  .catch(err => console.log(err));

Auth.resendSignUp(username).then(() => {
    console.log('code resent successfully');
}).catch(e => {
    console.log(e);
});
