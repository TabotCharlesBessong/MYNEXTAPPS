
export const validateLogin = (values) => {
  const errors = {}

  if(!values.email){
    errors.email = 'Required'
  }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
    errors.email = 'Invalid Email Format'
  }

  // validation for password
  if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length < 8) {
		errors.password = "Password to short";
	} else if (values.password.length > 20) {
		errors.password = "Password to long";
	} else if(values.password.includes(' ')){
    errors.password = "Invalid Password"
  }

  return errors
}

export const validateRegister = (values) => {
	const errors = {};

	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid Email Format";
	}

	// validation for password
	if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length < 8) {
		errors.password = "Password to short";
	} else if (values.password.length > 20) {
		errors.password = "Password to long";
	} else if (values.password.includes(" ")) {
		errors.password = "Invalid Password";
	}

  if(!values.username){
    errors.username = "Required"
  }else if(values.username.includes(' ')){
    errors.username = 'Invalid Username'
  }

  if(values.password !== values.cpassword){
    errors.cpassword = "passwords must match"
  }

	return errors;
};