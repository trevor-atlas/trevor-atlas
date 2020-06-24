import React from 'react';
import axios from 'axios';
import { Card } from './Card';

export class GithubCard extends React.Component<
	{ user: string; repo: string },
	{ repo: any }
> {
	constructor(props: Readonly<{ user: string; repo: string }>) {
		super(props);

		this.state = {
			repo: {}
		};

		this.getRepo(this.props.user);
	}

	private getRepo(username: string) {
		axios
			.get(`https://api.github.com/repos/${username}/${this.props.repo}`)
			.then((response: any) => {
				this.setState({ repo: response.data });
				console.log(response.data);
			});
	}

	render() {
		const { name, stargazers_count: stars, description } = this.state.repo;
		return (
			<Card>
				<div style={{ padding: '.5em' }}>
					<div className='row between-xs'>
						<div className='col-xs-12'>
							<h3>{name}</h3> <small>{stars} stars</small>
						</div>
					</div>
					<p style={{ margin: 0 }}>{description}</p>
				</div>
			</Card>
		);
	}
}
