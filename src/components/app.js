import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { get } from 'idb-keyval/dist/idb-keyval-amd.js';

import { createCalendar } from '../utils';

import Header from './header';

// Code-splitting is automated for routes
import Habits from '../routes/habits';
import Settings from '../routes/settings';

import actionsCreator from '../actions';

export default class App extends Component {

	state = {
		habits: [],
		days: {}
	};

	constructor(props){
		super(props);
		this.actions = actionsCreator(this);

	}

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	hydrateStateWithLocalStorage = () => {
		get('state').then( data => {
			if(data){
				this.setState(data);
			 }
			 this.cal = createCalendar(data && data.days);
		});
	}

	componentDidMount() {
		this.hydrateStateWithLocalStorage();
	}

	render(props, {habits,days} ) {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Habits path="/" {...this.state} {...this.actions.tracking} calendar={this.cal}/>
					<Settings path="/settings" {...this.state} {...this.actions.habits} clear={this.actions.tracking.clearTracking}/>
				</Router>
			</div>
		);
	}
}
