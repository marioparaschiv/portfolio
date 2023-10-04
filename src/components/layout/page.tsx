import type { ComponentProps } from 'react';
import Footer from '~/components/footer';
import Header from '~/components/header';
import { Helmet } from 'react-helmet';
import { cn } from '~/utils';

interface PageProps {
	headerProps?: ComponentProps<typeof Header>;
	bodyProps?: React.HTMLProps<HTMLDivElement>;
	footerProps?: ComponentProps<typeof Footer>;
	before?: JSX.Element;
	after?: JSX.Element;
	className?: string;
	section?: string;
}

function Page({ section, before, after, children, className, headerProps, footerProps, bodyProps, ...props }: React.PropsWithChildren<PageProps>) {
	return <div {...bodyProps}>
		{section && <Helmet>
			<title>{section ? `${section} | Valentin-Mario Paraschiv` : 'Valentin-Mario Paraschiv | Full-Stack Developer'}</title>
		</Helmet>}
		<Header {...(headerProps ?? {})} />
		{before ? before : ''}
		<div className='px-[20px] py-[10px]'>
			<div {...props} className={cn('container flex flex-col gap-[10px] min-h-[100vh] px-0 py-5', className)}>
				{children}
			</div>
		</div>
		{after ? after : ''}
		<Footer {...(footerProps ?? {})} />
	</div>;
}

export default Page;
