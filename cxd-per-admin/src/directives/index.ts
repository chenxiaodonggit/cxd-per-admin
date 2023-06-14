import { App, Directive } from 'vue';

import auth from './modules/auth';
import copy from './modules/copy';
import waterMarker from './modules/waterMarker';

const directivesList: { [key: string]: Directive } = {
	auth,
	copy,
	waterMarker,
};

const directives = {
	install(app: App<Element>) {
		Object.keys(directivesList).forEach((key) => {
			app.directive(key, directivesList[key]);
		});
	},
};

export default directives;
