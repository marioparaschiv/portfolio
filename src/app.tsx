import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '~/components/providers';
import { HelmetProvider } from 'react-helmet-async';
import Cursor from '~/components/cursor';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createHashRouter(routes);

function App() {
	return (
		<HelmetProvider>
			<ThemeProvider defaultTheme='system'>
				<Cursor />
				<RouterProvider router={router} />
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
