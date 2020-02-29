declare const __PATH_PREFIX__: string;
import { Button, ButtonGroup, Intent, NumericInput } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { Link, graphql } from 'gatsby'
import { Location } from 'history';
import Layout from '../../components/layout'
import SEO from "../../components/seo"
import { AnimatedHeader } from '../../components/AnimatedHeader';
import { Container } from '../../components/Container';

const NumericBaseConverter: React.FunctionComponent<{data: any; location: Location}> = (props) =>{
		const { data, location } = props;
		const siteTitle = data.site.siteMetadata.title;
		const rootPath = `${__PATH_PREFIX__}/`
		const [count, setCount] = useState(0);
		const copyToClipboard = (base: number) => () => navigator.clipboard.writeText(count.toString(base))

		// Similar to componentDidMount and componentDidUpdate:
		// 	useEffect(() => {
				// Update the document title using the browser API
				// document.title = `You clicked ${count} times`;
			// });

		const values: {label: string; base: number}[] = [
			{ label: '2 (Binary)', base: 2 },
			{ label: '8 (Octal)', base: 8 },
			{ label: '16 (Hex)', base: 16 },
		];

		const getCount = (base: number) => {
			return count.toString(base);
		}

		return (
			<>
				<Layout location={props.location} title={siteTitle}>
					<SEO title="Experiments: Binary Counter" />
					<Container >
						<div style={{ padding: '5em' }}>
							<table className="bp3-html-table bp3-html-table-bordered" style={{ fontFamily: 'monospace', paddingBottom: '2em' }}>
								<thead>
								<tr>
									<th>Base</th>
									<th>Value</th>
									<th>Copy</th>
								</tr>
								</thead>
								<tbody>
								{values.map(row => (
									<tr >
										<td>{row.label}</td>
										<td>{getCount(row.base)}</td>
										<td>
											<Button
												icon="duplicate"
												minimal
												type="button"
												onClick={copyToClipboard(row.base)}
											/>
										</td>
									</tr>
								))}
								</tbody>
							</table>
							<NumericInput
								allowNumericCharactersOnly
								intent={Intent.PRIMARY}
								min={0}
								value={count}
								buttonPosition="none"
								onChangeCapture={(event) => setCount(+event.currentTarget.value)}
							/>
							<ButtonGroup >
							<Button
								icon="add"
								type="button"
								intent={Intent.PRIMARY}
								onClick={() => setCount(count + 1)}
							/>
							<Button
								icon="remove"
								type="button"
								intent={Intent.PRIMARY}
								onClick={() => setCount(count - 1)}
							/>
							<Button
								icon="refresh"
								onClick={() => setCount(0)}
								type="button"
								text="reset"
							/>
							</ButtonGroup>
						</div>
					</Container>
				</Layout>
			</>
		)
}

export default NumericBaseConverter;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
