import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Information from '~/../information/contact.json';
import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Link } from 'react-router-dom';
import Card from '~/components/card';
import { cn } from '~/utils';

export const path = '/contact';
export const element = Contact;
export const order = 4;

function Contact() {
	return <Page section='Contact' className='p-0 flex min-h-screen w-screen items-center justify-center'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 w-full md:w-auto pt-20 md:pt-0'>
			<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
				Contact me.
			</Typography>
			<div className='m-4 grid grid-cols-1 gap-2 sm:m-0 md:grid-cols-2 p-4 md:gap-6 w-full md:w-auto'>
				<ContactCard
					name='LinkedIn'
					body={Information.LinkedIn.text}
					href={Information.LinkedIn.href}
					icon={<Linkedin size={24} />}
					color='green'
				/>
				<ContactCard
					name='GitHub'
					body={Information.GitHub.text}
					href={Information.GitHub.href}
					icon={<Github size={24} />}
					color='blue'
				/>
				<ContactCard
					name='Email'
					body={Information.Email.text}
					href={Information.Email.href}
					icon={<Mail size={24} />}
					color='red'
				/>
				<ContactCard
					name='Twitter / X'
					body={Information.Twitter.text}
					href={Information.Twitter.href}
					icon={<Twitter size={24} />}
					color='purple'
				/>
			</div>
		</div>
	</Page>;
}

interface ContactCardProps {
	name: string;
	href: string;
	body: string;
	icon: React.ReactNode;
	color: React.ComponentProps<typeof Card>['highlights'];
	className?: string;
}

function ContactCard({ name, href, body, icon, color, className }: ContactCardProps) {
	return <Link to={href} target='_blank'>
		<Card className={cn(className, 'min-w-[325px] cursor-pointer')} radius='sm' highlights={color}>
			<div className='flex gap-4 items-center'>
				{icon}
				<div className='flex flex-col justify-center'>
					<Typography tag='h6'>
						{name}
					</Typography>
					{body}
				</div>
				<ExternalLink className='ml-auto' size={18} />
			</div>
		</Card>
	</Link>;
}