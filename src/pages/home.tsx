import { Page } from '~/components/layout';

export const path = '/';
export const element = Home;

function Home() {
	return <Page className='p-5 md:p-10'>
		hi!
	</Page>;
};