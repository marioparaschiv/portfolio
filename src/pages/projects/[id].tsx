import { Link, useNavigate, useParams } from 'react-router-dom';
import Information from '~/../information/projects.json';
import { Page } from '~/components/layout';
import Button from '~/components/button';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

export const path = '/projects/:id';
export const element = Projects;

export const header = false;
export const order = 3;

function Projects() {
	const { id } = useParams();
	const navigate = useNavigate();

	const project = Information.find(p => p.id === id);

	useEffect(() => {
		if (!project) {
			navigate('/projects');
		}
	}, []);

	if (!project) {
		return null;
	}

	return <Page section='Projects' className='p-0 flex min-h-screen items-center justify-center overflow-hidden'>
		<div className='flex w-full items-center gap-16 flex-col m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500'>
			<div className='flex w-full max-w-7xl items-center justify-between px-8'>
				<Button className='gap-2' size='sm' onClick={() => navigate('/projects')}>
					<ArrowLeft size={16} />	Browse Projects
				</Button>
				<div className='ml-auto'>
					{project.url && <Link className='flex justify-end items-center gap-2' target='_blank' to={project.url}>
						Visit Website <ArrowTopRightIcon />
					</Link>}
				</div>
			</div>
		</div>;
		{/* <span className='whitespace-pre'>
			{JSON.stringify(project, null, 2)}
		</span> */}
	</Page >;
}