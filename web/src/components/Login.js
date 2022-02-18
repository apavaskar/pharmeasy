import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {authStartAction} from "../redux/actions/auth/authAction";
import {connect} from "react-redux";
import { selectAuth } from '../redux/selectors/authSelector';
import { Redirect } from 'react-router';

const Login = (props) => {

	const [values, setValues] = useState({
		username: '',
		password: ''
	  });

	  const set = name => {
		return ({ target: { value } }) => {
		  setValues(oldValues => ({...oldValues, [name]: value }));
		}
	  };

	const submitLogin = () => {
		props.handleLogin(values);
	}

	return (
		props.auth.loggedIn
      ?
      <Redirect push to="/home"/>
      :
		<div className="login-body">
			<div className="login-panel ui-fluid">
				<div className="login-panel-header">
					<img src="assets/layout/images/login/logo.png" alt="INFINITY" />
				</div>
				<div className="login-panel-content">
					<div className="p-grid">
						<div className="p-col-12">
							<h1>SIGNIN</h1>
						</div>
						<div className="p-col-12">
							<span className="p-float-label">
								<InputText id="username" type="text" style={{ width: '100%' }}
                                           v-model="username" onChange={set('username')}/>
							</span>
						</div>
						<div className="p-col-12">
							<span className="p-float-label">
								<InputText id="password" type="text" style={{width: '100%'}} v-model="password"
                                           onChange={set('password')} type='password'/>
							</span>
						</div>
						<div className="p-col-12" style={{ textAlign: 'right' }}>
							<Button label="LOGIN" onClick={submitLogin} style={{ width: '100%' }} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapState = (state) => {
    const auth = selectAuth(state);
    return {auth};
};

const actions = {
    handleLogin: authStartAction,
};

export default connect(mapState, actions)(Login);
