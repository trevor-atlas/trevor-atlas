import React, { Component } from 'react'

export default class Comments extends Component {
  private commentBox
    constructor(props) {
        super(props);
        this.commentBox = React.createRef();
    }

    componentDidMount() {
        const scriptEl = document.createElement("script");
        scriptEl.setAttribute("src", "https://utteranc.es/client.js")
        scriptEl.setAttribute("crossorigin", "anonymous")
        scriptEl.setAttribute("async", "true")
        scriptEl.setAttribute("repo", "trevor-atlas/trevor-atlas")
        scriptEl.setAttribute("issue-term", "url")
        scriptEl.setAttribute("label", "blog-comment")
        scriptEl.setAttribute("theme", "dark-blue")
        this.commentBox.current.appendChild(scriptEl)
    }

    render() {
        return (
            <div style={{ width: '100%' }} id="comments">
                <div ref={this.commentBox}></div>
            </div>
        )
    }
}
