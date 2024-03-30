import { ExternalLink, Github, Linkedin, Mail, SquareArrowOutUpRight, Twitter } from 'lucide-react';
import Information from '~/../information/contact.json';
import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import { Link } from 'react-router-dom';
import Card from '~/components/card';
import Tag from '~/components/tag';
import { cn } from '~/utils';
import { cva } from 'cva';

export const path = '/contact';
export const element = Contact;

export const header = true;
export const order = 4;

function Contact() {
	return <Page section='Contact' className='p-0 flex min-h-screen w-screen items-center justify-center overflow-clip'>
		<div className='flex items-center gap-8 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500 w-full md:w-auto pt-20 md:pt-0'>
			<div className='flex flex-col items-center gap-4'>
				<Typography tag='h1' className='bg-gradient-to-br from-white to-neutral-500 bg-clip-text text-transparent font-semibold'>
					Contact me.
				</Typography>
				<a target='_blank' href={Information.CV}>
					<Tag className='cursor-pointer gap-2 hover:border-brand/50 hover:bg-brand/20'>
						Resume <SquareArrowOutUpRight size={12} />
					</Tag>
				</a>
			</div>
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

const styles = {
	icon: cva({
		base: 'flex items-center justify-center p-1.5 bg-neutral-500/20 border border-neutral-300/50 rounded-full transition-all w-8 h-8',
		variants: {
			highlights: {
				red: 'group-hover:border-rose-500/50 group-hover:bg-rose-400/20 group-hover:text-rose-500',
				green: 'group-hover:border-green-500/50 group-hover:bg-green-400/20 group-hover:text-green-500',
				blue: 'group-hover:border-blue-500/50 group-hover:bg-blue-400/20 group-hover:text-blue-500',
				purple: 'group-hover:border-purple-500/50 group-hover:bg-purple-400/20 group-hover:text-purple-500',
				white: 'group-hover:border-neutral-500/50 group-hover:bg-neutral-400/20 group-hover:text-neutral-500'
			}
		},
		defaultVariants: {
			highlights: 'purple'
		}
	})
};

function ContactCard({ name, href, body, icon, color, className }: ContactCardProps) {
	return <Link to={href} target='_blank'>
		<Card className={cn(className, 'min-w-[325px] cursor-pointer')} radius='md' highlights={color}>
			<div className='flex gap-4 items-center'>
				<div className={styles.icon({ highlights: color })}>
					{icon}
				</div>
				<div className='flex flex-col justify-center'>
					<Typography tag='h6'>
						{name}
					</Typography>
					<Typography tag='p' colour='muted'>
						{body}
					</Typography>
				</div>
				<ExternalLink className='ml-auto' size={18} />
			</div>
		</Card>
	</Link>;
}