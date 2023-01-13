import {UpdateUserForm , AddUserForm} from '../components'
import { useSelector } from 'react-redux';

const Form = () => {
	const formId = useSelector((state) => state.app.client.formId )
	// const flag = true;

	return (
		<div className="container mx-auto py-5">
			{formId ? <UpdateUserForm /> : <AddUserForm />}
		</div>
	);
}

export default Form
