import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();

		const body = { user_email: email, user_password: password };

		try {
			const response = await fetch(
				`http://localhost:${process.env.REACT_APP_SERVER_PORT}/auth/login`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body),
				}
			);

			const parseResponse = await response.json();

			localStorage.setItem('token', parseResponse.token);

			setAuth(true);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			<h1 className="text-center my-5">Login</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					name="email"
					placeholder="email"
					className="form-control my-3"
					value={email}
					onChange={(e) => onChange(e)}
				/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className="form-control my-3"
					value={password}
					onChange={(e) => onChange(e)}
				/>
				<button className="btn btn-success btn-block">Submit</button>
			</form>
			<Link to="/register">Register</Link>
		</Fragment>
	);
};

export default Login;