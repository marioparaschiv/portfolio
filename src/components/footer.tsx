import { Linkedin, Twitter } from 'lucide-react';

function Footer() {
	return null;
	return <footer className='flex items-center gap-10 justify-center w-full min-h-1/2 border-t p-10'>
		<div className='flex flex-col gap-0'>
			<div className='flex items-center gap-3'>
				<Linkedin size={18} />
				LinkedIn
			</div>
			<div className='flex items-center gap-3'>
				<Twitter size={18} />
				Twitter
			</div>
		</div>
		<div>
			123
		</div>
	</footer>;
}

export default Footer;