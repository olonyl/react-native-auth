import React, { Component } from 'react';
import { View } from 'react-native';
import * as firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
	state = { loggedIn: null };

	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyD-12jH_sNJg7xYoUfARSCdHvl471gOXE8',
			authDomain: 'authentication-452af.firebaseapp.com',
			databaseURL: 'https://authentication-452af.firebaseio.com',
			projectId: 'authentication-452af',
			storageBucket: 'authentication-452af.appspot.com',
			messagingSenderId: '814442169468'
		});
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}
	renderContent = () => {
		switch (this.state.loggedIn) {
			case true:
				return (
					<CardSection>
						<Button
							onPress={() => {
								firebase.auth().signOut();
							}}
						>
							Log Out
						</Button>
					</CardSection>
				);
			case false:
				return <LoginForm />;
			default:
				return (
					<CardSection>
						<Spinner size="large" />
					</CardSection>
				);
		}
	};
	render() {
		return (
			<View>
				<Header headerText="Authentication" />
				{this.renderContent()}
			</View>
		);
	}
}
export default App;
