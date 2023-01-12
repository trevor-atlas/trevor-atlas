import React, { Component } from 'react';
let mounted = false;
export default class Comments extends Component {
  private commentBox: React.RefObject<HTMLDivElement>;
  constructor(props: any) {
    super(props);
    this.commentBox = React.createRef();
  }

  componentDidMount() {
    if (mounted) {
      return;
    }
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', 'https://utteranc.es/client.js');
    scriptEl.setAttribute('crossorigin', 'anonymous');
    scriptEl.setAttribute('async', 'true');
    scriptEl.setAttribute('repo', 'trevor-atlas/trevor-atlas');
    scriptEl.setAttribute('issue-term', 'url');
    scriptEl.setAttribute('label', 'blog-comment');
    scriptEl.setAttribute('theme', 'dark-blue');
    this.commentBox.current!.appendChild(scriptEl);
    mounted = true;
  }

  render() {
    return (
      <div style={{ width: '100%' }} id="comments">
        <div ref={this.commentBox}></div>
      </div>
    );
  }
}
