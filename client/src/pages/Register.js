import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';

const initialState = {
	name: '',
	email: '',
	password: '',
	isMemeber: false,
};

const Register = () => {
	const [values, setValues] = useState(initialState);
	//  global state and useNavigate
	const { user, isLoading, showAlert, displayAlert, clearAlert, setUpUser } =
		useAppContext();

	const navigate = useNavigate();

	const toggleMember = () => {
		setValues({ ...values, isMemeber: !values.isMemeber });
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const { name, password, isMemeber, email } = values;
		if (!email || !password || (!isMemeber && !name)) {
			displayAlert();
			return;
		}
		clearAlert();
		const currentUser = { name, password, email };
		if (isMemeber) {
			setUpUser({
				currentUser,
				endpoint: 'login',
				alertText: 'User logged in! Redirecting...',
			});
		} else {
			setUpUser({
				currentUser,
				endpoint: 'register',
				alertText: 'User created! Redirecting...',
			});
		}
		// setUpUser(currentUser, endpoint, alertText)
	};

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 1000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMemeber ? 'Login' : 'Register'}</h3>
				{showAlert && <Alert />}
				{!values.isMemeber && (
					<FormRow
						type='text'
						name='name'
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>
				<button
					type='submit'
					className='btn btn-block'
					disabled={isLoading}
				>
					submit
				</button>

				<p>
					{values.isMemeber
						? 'Not a member yet?'
						: 'Already a member?'}
					<button
						type='button'
						onClick={toggleMember}
						className='member-btn'
					>
						{values.isMemeber ? 'Register' : 'Login'}
					</button>
				</p>
			</form>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	display: grid;
	align-items: center;
	.logo {
		display: block;
		margin: 0 auto;
		margin-bottom: 1.38rem;
	}
	.form {
		max-width: 400px;
		border-top: 5px solid var(--primary-500);
	}

	h3 {
		text-align: center;
	}
	p {
		margin: 0;
		margin-top: 1rem;
		text-align: center;
	}
	.btn {
		margin-top: 1rem;
	}
	.member-btn {
		background: transparent;
		border: transparent;
		color: var(--primary-500);
		cursor: pointer;
		letter-spacing: var(--letterSpacing);
	}
`;

export default Register;
