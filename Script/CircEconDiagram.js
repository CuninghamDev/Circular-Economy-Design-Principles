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
        this.calcGeoms()

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

        this.structuredData.actors = []

        this.structuredData.stageData = [
            {
                active: false,
                color: '#269FD3',
                text:
                    'Temporary Stand In Text Temporary Stand In Text Some More Text',
            },
        ]

        this.structuredData.geometry = {}
        this.structuredData.geometry

        this.structuredData.geometry.startRotation = (-1 * Math.PI) / 4
        this.structuredData.geometry.catRotArc =
            (Math.PI * 2) / Object.keys(this.data.categories).length
        this.structuredData.geometry.halfCatArc =
            this.structuredData.geometry.catRotArc / 2

        this.structuredData.categories = []
        for (let i in this.data.categories) {
            let cat = this.data.categories[i]
            cat.startAngle =
                this.structuredData.geometry.startRotation +
                this.structuredData.geometry.catRotArc * i
            cat.endAngle =
                cat.startAngle + this.structuredData.geometry.catRotArc
            cat.textAngle =
                cat.startAngle + this.structuredData.geometry.halfCatArc
            this.structuredData.categories.push(cat)
        }
    }
    calcGeoms() {
        //used for calculating geometries that are dependant on the canvas size
        this.structuredData.geometry.centerX = this.controllingDim / 2
        this.structuredData.geometry.centerY = this.controllingDim / 2
        this.structuredData.geometry.radius =
            (this.controllingDim / 2) * (3 / 5)
        this.structuredData.geometry.radiusWidth =
            (this.controllingDim / 2) * (3 / 8)
        this.structuredData.geometry.stageRadius =
            (this.controllingDim / 2) * (1 / 5)
    }

    generalUpdate() {
        console.log('general update pattern run')
        let self = this
        let svg = self.svg
        let div = self.div
        let data = self.structuredData
        console.log('data', data)
        let geomData = data.geometry
        let catData = data.categories
        let actorData = data.actors

        let stage = div
            .selectAll('.stage')
            .data(data.stageData)
            .join('div')
            .attr('class', 'stage circular-economy-bubble no-select small-text')
            .style('left', geomData.centerX - geomData.stageRadius + 'px')
            .style('top', geomData.centerY - geomData.stageRadius + 'px')
            .style('width', data.geometry.stageRadius * 2 + 'px')
            .style('height', data.geometry.stageRadius * 2 + 'px')
            .style('background', function (d) {
                return d.color
            })
            .text((d) => {
                return d.text
            })

        let categoryText = div
            .selectAll('.temp-category-reps')
            .data(data.categories)
            .join('div')
            .attr(
                'class',
                'temp-category-reps circular-economy-bubble no-select medium-text',
            )
            .attr('x', function (d) {
                return Math.cos(d.textAngle) * geomData.radius
            })
            .attr('y', function (d) {
                return Math.sin(d.textAngle) * geomData.radius
            })
            .style('left', function (d) {
                let relativeX = Math.cos(d.textAngle) * geomData.radius
                return (
                    geomData.centerX +
                    relativeX -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('top', function (d) {
                let relativeY = Math.sin(d.textAngle) * geomData.radius
                return (
                    geomData.centerY +
                    relativeY -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('width', geomData.radiusWidth + 'px')
            .style('height', geomData.radiusWidth + 'px')
            .style('background', function (d) {
                return d.color
            })
            .text((d) => {
                return d.text
            })
    }
}
