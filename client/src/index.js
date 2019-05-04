import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./pages/App";
import Splash from "./pages/Splash";
import Context from "./store/context";

import * as serviceWorker from "./serviceWorker";
import { UserReducer } from "./store/reducer";
import ProtectedRoute from "./components/ProtectedRoute";

const Root = () => {
	const initialState = useContext(Context);
	const [state, dispatch] = useReducer(UserReducer, initialState);

	console.info("state ==> ", state);

	return (
		<Router>
			<Context.Provider value={{state, dispatch}}>
				<Switch>
					<ProtectedRoute exact path="/" component={App} />
					<Route path="/login" component={Splash} />
				</Switch>
			</Context.Provider>
		</Router>
	);
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
