class CircularEconomyDiagram {
    constructor(_data, _svgId, _divId, _containerId) {
        console.log('diagram constructed')
        this.data = _data

        this.svg = d3.select('#' + _svgId)
        this.div = d3.select('#' + _divId)
        this.container = document.getElementById(_containerId)

        this.structureData()

        this.resizeDiagram(this.width, this.height)
        this.div.style('background', '#EBEBEB')

        this.svg.append('g').attr('class', 'stage')
        this.svg.append('g').attr('class', 'category-ring')
        this.svg.append('g').attr('class', 'actors')

        this.generalUpdate()
    }
    resizeDiagram() {
        console.log('diagram resized')
        this.containerBounds = this.container.getBoundingClientRect()
        this.containerLeft = this.containerBounds.left
        this.containerTop = this.containerBounds.top
        this.width = this.containerBounds.right - this.containerLeft
        this.height = this.containerBounds.bottom - this.containerTop
        this.getControllingDim()
        this.getControllingDim()
        this.svg.attr('width', this.width)
        this.svg.attr('height', this.height)
        this.div.style('position', 'absolute')
        this.div.style('left', (this.width - this.controllingDim) / 2 + 'px')
        this.div.style('top', (this.height - this.controllingDim) / 2 + 'px')
        this.div.style('width', this.controllingDim + 'px')
        this.div.style('height', this.controllingDim + 'px')
        this.calcGeoms()
        this.generalUpdate()
    }
    getControllingDim() {
        if (this.width < this.height) {
            this.controllingDim = this.width
        } else {
            this.controllingDim = this.height
        }
    }
    structureData() {
        console.log('diagram data structured')
        this.structuredData = {}

        this.structuredData.categories = []

        this.structuredData.actors = []

        this.structuredData.stageData = [
            {
                active: false,
                color: '#269FD3',
                text:
                    'Temporary Stand In Text Temporary Stand In Text Temporary Stand In Text Temporary Stand In Text',
            },
        ]

        this.structuredData.geometry = {}
        this.structuredData.geometry

        this.structuredData.geometry.startRotation = (-1 * Math.PI) / 4
        this.structuredData.geometry.catRotArc =
            (Math.PI * 2) / Object.keys(this.data.categories).length
        this.structuredData.geometry.halfCatArc =
            this.structuredData.geometry.catRotArc / 2

        this.calcGeoms()
    }
    calcGeoms() {
        //used for calculating geometries that are dependant on the canvas size
        this.structuredData.geometry.centerX = this.width / 2
        this.structuredData.geometry.centerY = this.height / 2
        this.structuredData.geometry.radius =
            (this.controllingDim / 2) * (4 / 5)
        this.structuredData.geometry.radiusWidth =
            (this.controllingDim / 2) * (1 / 8)
        this.structuredData.geometry.stageRadius =
            (this.controllingDim / 2) * (1 / 5)
    }

    generalUpdate() {
        console.log('general update pattern run')
        let self = this
        let svg = self.svg
        let data = self.structuredData
        let geomData = data.geometry
        let catData = data.categories
        let actorData = data.actors

        let stage = svg.select('.stage')
        stage
            .selectAll('circle')
            .data(data.stageData)
            .join('circle')
            .attr('cx', data.geometry.centerX)
            .attr('cy', data.geometry.centerY)
            .attr('r', data.geometry.stageRadius)
            .style('fill', function (d) {
                return d.color
            })
    }
}
