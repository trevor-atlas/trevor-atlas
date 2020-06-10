export const setClass = (selector: string, classes: string): void => {
    const domNode = document.querySelector(selector);
    if (domNode) domNode.className = classes;
}