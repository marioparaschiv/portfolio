import * as Dialog from '@radix-ui/react-dialog';

interface Preview {
	title: string;
	description: string;
	image: string;
}

interface PreviewNavigationProps extends React.PropsWithChildren {
	name: string;
	previews: Preview[];
}

function PreviewNavigation({ children, ...props }: PreviewNavigationProps) {
	return <Dialog.Root>
		<Dialog.Trigger asChild>
			{children}
		</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Overlay className='fixed bg-black/50 inset-0 animate-in fade-in duration-200 backdrop-blur-sm' />
			<Dialog.Content className='fixed max-h-[85vh] top-1/2 left-1/2'>
				<div className='bg-red-500 p-5 rounded-lg'>
					Modal
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>;
}

export default PreviewNavigation;