import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import { ArrowLeft, LinkIcon } from 'lucide-react';
import Typography from '~/components/typography';
import { Page } from '~/components/layout';
import Button from '~/components/button';
import Card from '~/components/card';
import Tag from '~/components/tag';
import { useEffect } from 'react';
import config from '@config.json';

export const path = '/projects/:id';
export const element = Projects;

export const header = false;
export const order = 3;

function Projects() {
	const { id } = useParams();
	const navigate = useNavigate();

	const project = config.projects.find(p => p.id === id);

	useEffect(() => {
		if (!project) {
			navigate('/projects');
		}
	}, []);

	if (!project) {
		return null;
	}

	const precedessor = project.predecessor && config.projects.find(p => p.id === project.predecessor);
	const successor = project.successor && config.projects.find(p => p.id === project.successor);

	return <Page section={`${project.name} (Projects)`} className='p-0 flex min-h-screen items-center justify-center overflow-hidden'>
		<div className='flex flex-col max-w-7xl w-full items-center gap-16 m-auto animate-in fade-in-0 zoom-in-105 slide-in-from-bottom-8 duration-500'>
			<div className='flex w-full items-center justify-between px-8'>
				<Button className='gap-2' size='sm' onClick={() => navigate('/projects')}>
					<ArrowLeft size={12} />	Browse
				</Button>
				<div className='ml-auto'>
					{project.url && <Link className='flex justify-end items-center gap-2' target='_blank' to={project.url}>
						Visit Website <ArrowTopRightIcon />
					</Link>}
				</div>
			</div>
			<div className='grid grid-cols-5 w-full gap-5 px-8 pb-16 md:h-auto md:gap-9'>
				<div className='col-span-5 flex flex-col gap-5 md:col-span-2 lg:gap-8'>
					<div className='flex items-center gap-4'>
						<img
							loading='eager'
							decoding='async'
							className='h-24 rounded-2xl object-cover'
							src={project.icon.path}
						/>
						<div className='flex w-full items-start justify-between gap-1 md:w-auto md:flex-col md:justify-start'>
							<div className='flex flex-col'>
								<Typography tag='h1' className='text-sm font-bold text-white sm:text-base md:text-lg lg:text-2xl'>
									{project.name}
								</Typography>
								<Typography tag='p' className='text-xs font-medium text-neutral-400 sm:text-sm md:text-base lg:text-xl'>
									{project.type}
								</Typography>
							</div>
							<Tag className={project.badge.styles}>
								{project.badge.text}
							</Tag>
						</div>
					</div>
					<div className='flex flex-col gap-3 md:gap-5 lg:gap-8'>
						<div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
								Overview
							</Typography>
							<Typography tag='p' className='text-xs lg:text-base font-medium text-neutral-400 truncate whitespace-pre-wrap'>
								{project.overview.join('\n') || 'None.'}
							</Typography>
						</div>
						<div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							{project.solutions?.length && <>
								<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
									Solutions
								</Typography>
								<Typography tag='p' className='text-xs lg:text-base font-medium text-neutral-400 truncate whitespace-pre-wrap'>
									{project.solutions.map(solution => <Link to={solution.url} className='text-blue-500 hover:underline'>
										{solution.name}
									</Link>) || 'None.'}
								</Typography>
							</>}
						</div>
						{precedessor && <div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
								Predecessor
							</Typography>
							<Card className='cursor-pointer min-w-fit' onClick={() => navigate('/projects/' + precedessor.id)}>
								<div className='flex items-center gap-4'>
									<img
										loading='eager'
										decoding='async'
										className='h-12 rounded-lg object-cover'
										src={precedessor.icon.path}
									/>
									<div className='flex w-full items-start justify-between gap-1 md:w-auto md:flex-col md:justify-start'>
										<div className='flex flex-col'>
											<Typography tag='h1' className='text-sm font-bold text-white sm:text-base md:text-lg lg:text-lg'>
												{precedessor.name}
											</Typography>
											<Typography tag='p' className='text-xs lg:text-sm font-medium text-neutral-400'>
												{precedessor.type}
											</Typography>
										</div>
									</div>
									<div className='ml-auto'>
										<LinkIcon size={18} />
									</div>
								</div>
							</Card>
						</div>}
						{successor && <div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
								Successor
							</Typography>
							<Card className='cursor-pointer min-w-fit' onClick={() => navigate('/projects/' + successor.id)}>
								<div className='flex items-center gap-4'>
									<img
										loading='eager'
										decoding='async'
										className='h-12 rounded-lg object-cover'
										src={successor.icon.path}
									/>
									<div className='flex w-full items-start justify-between gap-1 md:w-auto md:flex-col md:justify-start'>
										<div className='flex flex-col'>
											<Typography tag='h1' className='text-sm font-bold text-white sm:text-base md:text-lg lg:text-lg'>
												{successor.name}
											</Typography>
											<Typography tag='p' className='text-xs lg:text-sm font-medium text-neutral-400'>
												{successor.type}
											</Typography>
										</div>
									</div>
									<div className='ml-auto'>
										<LinkIcon size={18} />
									</div>
								</div>
							</Card>
						</div>}
						<div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
								Responsibilities
							</Typography>
							<Typography tag='p' className='text-xs font-medium text-neutral-400 lg:text-base truncate whitespace-pre-line'>
								{project.responsibilities.join('\n') || 'None.'}
							</Typography>
						</div>
						{project.technologies?.length !== 0 && <div className='flex flex-col gap-1.5 md:gap-3 lg:gap-5'>
							<Typography tag='h1' className='text-base font-bold text-white md:text-lg lg:text-2xl'>
								Technologies
							</Typography>
							<Typography tag='p' className='text-xs font-medium text-neutral-400 lg:text-base'>
								<span className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-y-1 gap-x-4'>
									{/* {project.technologies.sort((a, b) => TechnologiesOrder.indexOf(a.type) - TechnologiesOrder.indexOf(b.type)).map(technology => {
										const Icon = Icons[technology.icon as keyof typeof Icons] as React.ComponentType<SVGProps<SVGSVGElement>>;

										return <div className='flex items-center gap-3' key={technology.name}>
											{Icon && <Icon className='text-neutral-200 shrink-0' width={isMedium ? 18 : 14} height={isMedium ? 18 : 14} />}
											<span className='truncate text-xs md:text-sm'>
												{technology.name}
											</span>
										</div>;
									})} */}
								</span>
							</Typography>
						</div>}
					</div>
				</div>
				<div className='col-span-5 flex cursor-pointer flex-col gap-3 md:col-span-3'>
					<div className='relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 lg:rounded-3xl'>
						<img
							loading='lazy'
							decoding='async'
							alt={project.name}
							src={project.thumbnail}
							onError={(event) => (event.target as HTMLImageElement).src = '/img/projects/fallback.png'}
							sizes='100vw'
							className='max-w-none w-full h-full inset-0 text-transparent absolute scale-[1.02] border-none shadow-none outline-none object-cover'
						/>
					</div>
				</div>
			</div>
		</div>
	</Page >;
}