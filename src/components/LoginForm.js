import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import * as firebase from 'firebase';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };
	onButtonPress = () => {
		const { email, password } = this.state;
		this.setState({ error: '', loading: true });
		firebase.auth().signInWithEmailAndPassword(email, password).then(this.onLoginSuccess).catch((error) => {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(this.onLoginSuccess)
				.catch(this.onLoginFail);
		});
	};
	onLoginFail = () => {
		this.setState({
			loading: false,
			error: 'Authentication Failed'
		});
	};
	onLoginSuccess = () => {
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});
	};
	renderButton = () => {
		if (this.state.loading) {
			return <Spinner size="small" />;
		} else {
			return <Button onPress={this.onButtonPress}>Log in</Button>;
		}
	};
	render() {
		return (
			<Card>
				<CardSection>
					<Input
						label="Email"
						onChangeText={(email) => {
							this.setState({ email });
						}}
						value={this.state.email}
						placeholder="user@gmail.com"
					/>
				</CardSection>
				<CardSection>
					<Input
						label="Password"
						onChangeText={(password) => {
							this.setState({ password });
						}}
						value={this.state.password}
						placeholder="password"
						secureTextEntry
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>{this.state.error}</Text>

				<CardSection>{this.renderButton()}</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;
