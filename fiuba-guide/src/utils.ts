export function insertWrappedTextInSvg(
    svgElement: SVGGraphicsElement,
    text: string,
    classes: string[] = []
): void {
    const bbox = svgElement.getBBox();

    const foreignObject = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreignObject.setAttribute('x', bbox.x.toString());
    foreignObject.setAttribute('y', bbox.y.toString());
    foreignObject.setAttribute('width', bbox.width.toString());
    foreignObject.setAttribute('height', bbox.height.toString());

    const div = document.createElement('div');
    div.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');

    div.textContent = text;
    div.classList.add(...classes, "room-text-container");

    foreignObject.appendChild(div);

    svgElement.insertAdjacentElement("afterend", foreignObject);
}
