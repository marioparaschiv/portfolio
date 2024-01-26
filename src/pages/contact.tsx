import Typography from '~/components/typography';
import { ContactIcon } from 'lucide-react';
import { Page } from '~/components/layout';

export const path = '/contact';
export const element = Contact;

function Contact() {
	return <Page section='Contact' className='p-5 md:p-10'>
		<div className='flex items-center gap-8 flex-col w-full h-full m-auto'>
			<ContactIcon className='text-foreground-secondary' size={256} />
			<Typography tag='h1' className='font-semibold text-foreground-secondary'>
				Under construction.
			</Typography>
		</div>
	</Page>;
};