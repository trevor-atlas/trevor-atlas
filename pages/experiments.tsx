import { IPost } from 'lib/posts';
import Link from 'next/link';
import React, { FC } from 'react';
import { Container } from 'src/components/Container';
import SEO from 'src/components/Seo';

const experiments = [
	{ link: 'experiments/pathfinding-visualizer', title: 'Pathfinding Visualizer' },
	{ link: 'experiments/qr-code-api', title: 'QR code generator' },
	{ link: 'experiments/webgl-portal', title: 'WEBGL Portal' }
];

const Experiments: FC<{ posts: IPost[] }> = () => {
	return (
		<>
			<SEO
				title="All Posts"
				ogTitle="Experiments | Trevor Atlas"
				ogUrl="https://trevoratlas.com/experiments"
				ogDescription="Experiments in Algorithms, 3d graphics, encryption or whatever else strikes my fancy"
				ogImage="/images/blog.png"
			/>
			<Container>
				<div className="max-w-xl mx-auto mt-32">
					<h1 className="">Experiments</h1>
					<p className="text-lg font-semibold mb-8 text-opacity-25">Experiments in algorithms, 3d graphics, encryption or whatever else strikes my fancy</p>

					<div className="text-center grid grid-cols-2 gap-4 mx-auto">
						{experiments.map(e =>
							<div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
								<div className="overflow-x-hidden rounded-2xl relative">
									<img className="h-40 rounded-2xl w-full object-cover"
											 src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg" />
										<p
											className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
											<svg xmlns="http://www.w3.org/2000/svg"
													 className="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none"
													 viewBox="0 0 24 24" stroke="black">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
															d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
											</svg>
										</p>
								</div>
								<div className="mt-4 pl-2 mb-2 flex justify-between ">
									<div>
											<Link href={e.link}>
												<a className="text-lg font-semibold mb-0">{e.title}</a>
											</Link>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</Container>
		</>
	);
};

export default React.memo(Experiments);
