declare const __PATH_PREFIX__: string;
import { Button, ButtonGroup, Intent, NumericInput } from '@blueprintjs/core'
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { Location } from 'history';
import Layout from '../../components/layout'
import SEO from '../../components/seo'
import { Container } from '../../components/Container';
import {Grid} from '../../components/pathfinder/Grid';

interface Props {
	data: {
		site: {
			siteMetadata: {
				title: string;
			}
		}
	};
	location: Location
}
const PathfindingVisualizer: React.FunctionComponent<Props> = (props) =>{
		const { data } = props;
		const siteTitle = data.site.siteMetadata.title;
		const [count, setCount] = useState(0);

		return (
			<>
				<Layout title={siteTitle}>
					<SEO title="Experiments: Binary Counter" />
					<Grid />
				</Layout>
			</>
		)
}

export default PathfindingVisualizer;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
