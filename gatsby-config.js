module.exports = {
	siteMetadata: {
		title: `Trevor Atlas`,
		author: `Trevor Atlas`,
		description: `👋 Hello,

	My name is Trevor Atlas – I'm a Developer and Designer based in Washington, DC`,
		about: {
			section2: `I've been working for the last ${new Date().getFullYear - 2014} years for agencies and startups. My experience is primarily with:

      Angular
      React
      Typescript
      Node
      Java
      I've also dabbled in Go, PHP and Python`,
			section1: `I have a passion for solving problems, perfecting my craft, and producing work that I am proud of. I enjoy turning ambitious ideas into reality and I hold myself to a high standard of excellence.`,
			section: `As a dedicated lifelong learner I spend a lot of my free time teaching myself new skills and concepts. When I'm not building websites or studying I ride my bike around the beautiful DMV area, practice calligraphy and write.

      Biking is a great way to commute and keeps me in shape since I spend so much time at the computer. Calligraphy and hand lettering are how I like to express myself visually, and writing is a cathartic exercise.`,
		},
		siteUrl: `https://trevoratlas.com`,
		social: {
			twitter: `trevoratlas`,
			github: `https://github.com/trevor-atlas`,
		},
	},
	plugins: [
		`gatsby-plugin-typescript`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 800,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							// Class prefix for <pre> tags containing syntax highlighting;
							// defaults to 'language-' (eg <pre class="language-js">).
							// If your site loads Prism into the browser at runtime,
							// (eg for use with libraries like react-live),
							// you may use this to prevent Prism from re-processing syntax.
							// This is an uncommon use-case though;
							// If you're unsure, it's best to use the default value.
							classPrefix: 'language-',
							// This is used to allow setting a language for inline code
							// (i.e. single backticks) by creating a separator.
							// This separator is a string and will do no white-space
							// stripping.
							// A suggested value for English speakers is the non-ascii
							// character '›'.
							inlineCodeMarker: null,
							// This lets you set up language aliases.  For example,
							// setting this to '{ sh: "bash" }' will let you use
							// the language "sh" which will highlight using the
							// bash highlighter.
							aliases: {},
							// This toggles the display of line numbers globally alongside the code.
							// To use it, add the following line in src/layouts/index.js
							// right after importing the prism color scheme:
							//  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
							// Defaults to false.
							// If you wish to only show line numbers on certain code blocks,
							// leave false and use the {numberLines: true} syntax below
							showLineNumbers: true,
							// If setting this to true, the parser won't handle and highlight inline
							// code used in markdown i.e. single backtick code like `this`.
							noInlineHighlight: false,
							// This adds a new language definition to Prism or extend an already
							// existing language definition. More details on this option can be
							// found under the header "Add new language definition or extend an
							// existing language" below.
							languageExtensions: [
								{
									language: 'superscript',
									extend: 'javascript',
									definition: {
										superscript_types: /(SuperType)/,
									},
									insertBefore: {
										function: {
											superscript_keywords: /(superif|superelse)/,
										},
									},
								},
							],
						},
					},
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				//trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby Starter Blog`,
				short_name: `GatsbyJS`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/gatsby-icon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		// {
		//   resolve: `gatsby-plugin-typography`,
		//   options: {
		//     pathToConfigModule: `src/utils/typography`,
		//   },
		// },
	],
}
