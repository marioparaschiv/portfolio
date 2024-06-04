import { type ComponentProps } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '~/components/header';
import { cn } from '~/utils';

interface PageProps {
	headerProps?: ComponentProps<typeof Header>;
	bodyProps?: React.HTMLProps<HTMLDivElement>;
	before?: JSX.Element;
	after?: JSX.Element;
	className?: string;
	section?: string;
}

function Page({ section, before, after, children, className, headerProps, bodyProps, ...props }: React.PropsWithChildren<PageProps>) {
	return <div {...bodyProps}>
		<Helmet>
			<title>{[
				section && `${section} »`,
				'Mario Paraschiv'
			].filter(Boolean).join(' ')}</title>
		</Helmet>
		<Header {...(headerProps ?? {})} />
		{before ? before : ''}
		<div {...props} className={cn('overflow-hidden flex flex-col gap-[10px] flex-1 px-0 py-5 before:pointer-events-none before:fixed before:inset-0 before:-top-64 before:bg-grid before:bg-top before:bg-no-repeat before:opacity-70', className)}>
			{children}
		</div>
		{after ? after : ''}
	</div>;
}

export default Page;
