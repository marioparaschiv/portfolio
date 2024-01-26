import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import * as Constants from '~/constants';

export const path = '/';
export const element = Home;

function Home() {
	return <Page className='py-5'>
		<main className="grid lg:grid-cols-2 mt-12 lg:mt-16 lg:pt-32 xl:pt-0 3xl:pt-32">
			<div className='container justify-between items-center mx-auto px-8 md:px-14 lg:px-24 w-full my-auto'>
				<div className='lg:ml-20 justify-center md:justify-start max-w-xl mt-0 md:my-36'>
					<Typography className='text-center md:text-left font-semibold text-8xl md:text-9xl'>
						Mario
					</Typography>
					<Typography colour='muted' className='text-center md:text-left font-semibold text-3xl'>
						{Constants.Role}
					</Typography>
				</div>
			</div>
			<div className='md:ml-auto mt-20 md:mt-0'>
				<img
					className='rounded-tr-[115px] lg:rounded-tl-[115px] lg:rounded-tr-[0px] pr-10 lg:pr-0'
					src='/img/sunset.webp'
					alt=''
					loading='eager'
					decoding='async'
				/>
			</div>
		</main>
	</Page>;
};