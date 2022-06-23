import { StrictMode } from 'react';
import { render } from 'react-dom';
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import store  from './Redux/store';
import { Provider } from "react-redux";
import App from './App';

const rootElement = document.getElementById('root');
render(
	<StrictMode>
		 <Provider store={store}>
		<App />
		</Provider>
	</StrictMode>,
	rootElement
);
