declare const __PATH_PREFIX__: string;
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

		return (
			<>
				<Layout title={siteTitle}>
					<SEO title="Experiments: Binary Counter" />
					<div className="v6">

						<Grid />
					</div>
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
