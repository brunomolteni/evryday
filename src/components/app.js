import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { get, set } from 'idb-keyval';

import Header from './header';

// Code-splitting is automated for routes
import Habits from '../routes/habits';
import Settings from '../routes/settings';

export default class App extends Component {

	state = {
		habits: [],
		days: {}
	};

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	hydrateStateWithLocalStorage = () => {
		get('state').then( data => {
			if(data) this.setState(data);
		});
	}

	componentDidMount() {
		this.hydrateStateWithLocalStorage();
	}

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Habits path="/" />
					<Settings path="/settings"/>
				</Router>
			</div>
		);
	}
}
