import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '~/components/providers';
import * as Pages from '~/pages';

const routes = Object.values(Pages).map(({ path, element: Component }: Pages.Page) => ({ path, element: <Component /> }));
const router = createHashRouter(routes);

function App() {
	return (
		<ThemeProvider defaultTheme='system'>
			<RouterProvider router={router} />
		</ThemeProvider>
	);
}

export default App;
