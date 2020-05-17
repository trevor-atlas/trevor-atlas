import React from 'react'
import { Button, Intent } from '@blueprintjs/core'

const onProjectClick = ({ url }: { url: string }) => (event: React.MouseEvent) => {
	if (event.metaKey || event.ctrlKey) {
		const tab = window.open(url, '_blank')
		if (tab) tab.blur()
		window.focus()
	} else {
		window.open(url, '_blank')
	}
}

interface Project {
	title: string;
	url: string;
	description: string;
}

interface Props { projects: Array<Project> }

export const Projects: React.FunctionComponent<Props> = (props) => (
	<>
		{props.projects.map(project => {
			return <div className="row center-xs mb4">
				<div className="col-xs-12">
					<h3 style={{ color: 'white' }}>{project.title}</h3>
					<p className="bp3-running-text bp3-text-large">{project.description}</p>
					<Button
						icon="code"
						text="View on Github"
						type="button"
						intent={Intent.PRIMARY}
						onClick={onProjectClick(project)}
					/>
				</div>
			</div>
		})}
	</>
)
