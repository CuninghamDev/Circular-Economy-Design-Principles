console.log(CircularEconomyDiagram)

function getWidthHeight() {
    let width = window.innerWidth
    let height = window.innerHeight
    if (width > height) {
        return height - 6
    } else {
        return width - 6
    }
}
let data = CeDiagramData
let widthHeight = getWidthHeight()
let svgId = 'circular-economy-diagram-svg'
let divId = 'circular-economy-diagram-div'
let containerId = 'svg-container'
let diagram = new CircularEconomyDiagram(data, svgId, divId, containerId)

function resizeDiagram() {
    diagram.resizeDiagram()
}
window.onresize = resizeDiagram
