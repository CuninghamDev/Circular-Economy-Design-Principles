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
let svgId = '#circular-economy-diagram'
let diagram = new CircularEconomyDiagram(data, widthHeight, widthHeight, svgId)

function resizeDiagram() {
    let newWidthHeight = getWidthHeight()
    diagram.resizeDiagram(newWidthHeight, newWidthHeight)
}
window.onresize = resizeDiagram
