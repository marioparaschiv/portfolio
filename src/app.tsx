import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createHashRouter(routes);

function App() {
	return (
		<HelmetProvider>
			<RouterProvider router={router} />
		</HelmetProvider>
	);
}

export default App;
