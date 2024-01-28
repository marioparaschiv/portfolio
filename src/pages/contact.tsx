import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Contact2 } from 'lucide-react';

export const path = '/contact';
export const element = Contact;
export const order = 4;

function Contact() {
	return <Page section='Contact' className='p-0 flex min-h-screen w-screen items-center justify-center'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent'>
			<Contact2 className='text-neutral-400' size={256} strokeWidth={1.5} />
			<Typography tag='h1' className='font-semibold'>
				Under construction.
			</Typography>
		</div>
	</Page>;
};