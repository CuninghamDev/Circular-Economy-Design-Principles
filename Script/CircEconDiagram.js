class CircularEconomyDiagram {
    constructor(_data, _svgId, _divId, _containerId) {
        console.log('diagram constructed')
        this.data = _data

        this.svg = d3.select('#' + _svgId)
        this.div = d3.select('#' + _divId)
        this.container = document.getElementById(_containerId)
        this.padding = 10
        this.structureData()
        this.resizeDiagram(this.width, this.height)
        this.div.style('background', '#EBEBEB')
        this.calcGeoms()

        this.svg.append('g').attr('class', 'stage')
        this.svg.append('g').attr('class', 'category-ring')
        this.svg.append('g').attr('class', 'actors-group')

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

        this.structuredData.stageData = [
            {
                active: false,
                color: '#269FD3',
                text: '',
                actor: '',
                category: '',
            },
        ]

        this.structuredData.geometry = {}
        this.structuredData.geometry

        this.structuredData.geometry.startRotation = (-1 * Math.PI) / 4
        // this.structuredData.geometry.startRotation = (Math.PI / 2) * -1
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
            cat.active = true
            cat.selected = false
            this.structuredData.categories.push(cat)
        }

        this.structuredData.actors = []
        let categorizedActorData = []
        for (let cat of this.structuredData.categories) {
            let categorizedActors = {}
            categorizedActors.category = cat.text
            categorizedActors.actorCount = 0
            categorizedActors.actors = []
            categorizedActors.startAngle = cat.startAngle
            categorizedActors.endAngle = cat.endAngle
            for (let actor in this.data.actors) {
                let actorData = this.data.actors[actor]
                if (actorData.category == categorizedActors.category) {
                    let actorObj = { actor: actor, 'actor data': actorData }
                    categorizedActors.actors.push(actorObj)
                    categorizedActors.actorCount++
                }
            }
            categorizedActorData.push(categorizedActors)
        }
        for (let catAct of categorizedActorData) {
            let radialStep =
                (catAct.endAngle - catAct.startAngle) / catAct.actorCount
            let firstStep = radialStep / 2
            for (let i in catAct.actors) {
                let actor = catAct.actors[i]
                let actorAngle = catAct.startAngle + firstStep + radialStep * i
                actor.actorAngle = actorAngle
                this.structuredData.actors.push(actor)
            }
        }
    }
    calcGeoms() {
        //used for calculating geometries that are dependant on the canvas size
        this.structuredData.geometry.centerX = this.controllingDim / 2
        this.structuredData.geometry.centerY = this.controllingDim / 2
        this.structuredData.geometry.radius =
            (this.controllingDim / 2) * (7 / 11)
        this.structuredData.geometry.radiusWidth =
            (this.controllingDim / 2) * (5 / 16)
        this.structuredData.geometry.stageRadius =
            (this.controllingDim / 2) * (2 / 7)
        this.structuredData.geometry.actorRingRadius =
            (this.controllingDim / 2) * (9 / 10)
        this.structuredData.geometry.actorRadius =
            (this.controllingDim / 2) * (1 / 10)
    }

    generalUpdate() {
        console.log('general update pattern run')
        let self = this
        let svg = self.svg
        let div = self.div
        let data = self.structuredData
        console.log('data', data)
        console.log(this)
        let geomData = data.geometry
        let catData = data.categories
        let actorData = data.actors
        console.log('actor data', actorData)

        let stage = div
            .selectAll('.stage')
            .data(data.stageData)
            .join('div')
            .attr(
                'class',
                'stage circular-economy-bubble no-select small-text stroked',
            )
            .style(
                'left',
                geomData.centerX - geomData.stageRadius - self.padding + 'px',
            )
            .style(
                'top',
                geomData.centerY - geomData.stageRadius - self.padding + 'px',
            )
            .style('width', geomData.stageRadius * 2 + 'px')
            .style('height', geomData.stageRadius * 2 + 'px')
            .style('background', (d) => {
                return d.color
            })
            .text((d) => {
                return d.text
            })
            .style('opacity', '0')

        let categoryText = div
            .selectAll('.temp-category-reps')
            .data(data.categories)
            .join('div')
            .attr(
                'class',
                'temp-category-reps circular-economy-bubble no-select medium-text',
            )
            .attr('x', (d) => {
                return Math.cos(d.textAngle) * geomData.radius
            })
            .attr('y', (d) => {
                return Math.sin(d.textAngle) * geomData.radius
            })
            .style('left', (d) => {
                let relativeX = Math.cos(d.textAngle) * geomData.radius
                return (
                    geomData.centerX +
                    relativeX -
                    self.padding -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('top', (d) => {
                let relativeY = Math.sin(d.textAngle) * geomData.radius
                return (
                    geomData.centerY +
                    relativeY -
                    self.padding -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('width', geomData.radiusWidth + 'px')
            .style('height', geomData.radiusWidth + 'px')
            .style('background', (d) => {
                return d.color
            })
            .text((d) => {
                return d.text
            })
            .style('z-index', '2')

        categoryText.on('mouseenter', function (e, d) {
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(this)
            let allCategories = d3
                .selectAll('.temp-category-reps')
                .transition()
                .style('opacity', function (d) {
                    if (d.text == thisData.text) {
                        return 1
                    } else {
                        return 0.5
                    }
                })
            d3.selectAll('.actors')
                // console.log(allActors.data())
                .transition()
                .style('opacity', (d) => {
                    if (d['actor data'].category == thisData.text) {
                        return 1
                    } else {
                        return 0.5
                    }
                })
        })
        categoryText.on('mouseleave', function () {
            d3.selectAll('.temp-category-reps')
                .transition()
                .style('opacity', '1')
            d3.selectAll('.actors').transition().style('opacity', '1')
        })

        let actors = div
            .selectAll('.actors')
            .data(actorData)
            .join('div')
            .attr(
                'class',
                'actors circular-economy-bubble no-select small-text stroked',
            )
            .style('left', (d) => {
                let relativeX =
                    Math.cos(d.actorAngle) * geomData.actorRingRadius
                return (
                    geomData.centerX +
                    relativeX -
                    self.padding -
                    geomData.actorRadius +
                    'px'
                )
            })
            .style('top', (d) => {
                let relativeY =
                    Math.sin(d.actorAngle) * geomData.actorRingRadius
                return (
                    geomData.centerY +
                    relativeY -
                    self.padding -
                    geomData.actorRadius +
                    'px'
                )
            })
            .style('width', geomData.actorRadius * 2 + 'px')
            .style('height', geomData.actorRadius * 2 + 'px')
            .style('background', (d) => {
                for (let cat of catData) {
                    if (cat.text == d['actor data'].category) {
                        return cat.color
                    }
                }
                return 'gray'
            })
            .text((d) => {
                return d.actor
            })
            .style('z-index', '4')
        actors.on('mouseenter', function (e, d) {
            let thisData = d
            let thisEvent = e
            let thisActor = d3.select(this)
            let allActors = d3.selectAll('.actors')
            console.log(allActors)
            allActors.transition().style('opacity', 0.5)
            thisActor.transition().style('opacity', 1)
            d3.selectAll('.temp-category-reps')
                .transition()
                .style('opacity', (d) => {
                    if (d.text == thisData['actor data'].category) {
                        return 1
                    } else {
                        return 0.5
                    }
                })
            let fadeOutTime = 150
            let moveTime = 10
            let opaqueTime = 10
            let takeStageTime = 500
            if (d3.select('.stage').text() != thisData['actor data'].details) {
                d3.select('.stage')
                    .transition()
                    .duration(fadeOutTime)
                    .style('opacity', 0)
                d3.select('.stage')
                    .transition()
                    .duration(moveTime)
                    .delay(fadeOutTime)
                    .style('left', function () {
                        let relativeX =
                            Math.cos(thisData.actorAngle) *
                            geomData.actorRingRadius
                        return (
                            geomData.centerX +
                            relativeX -
                            self.padding -
                            geomData.actorRadius +
                            'px'
                        )
                    })
                    .style('top', function () {
                        let relativeY =
                            Math.sin(thisData.actorAngle) *
                            geomData.actorRingRadius
                        return (
                            geomData.centerY +
                            relativeY -
                            self.padding -
                            geomData.actorRadius +
                            'px'
                        )
                    })
                    .style('width', geomData.actorRadius * 2 + 'px')
                    .style('height', geomData.actorRadius * 2 + 'px')
                    .text(function () {
                        return thisData['actor data'].details
                    })
                    .style('background', function () {
                        for (let cat of catData) {
                            if (cat.text == thisData['actor data'].category) {
                                return cat.color
                            }
                        }
                        return 'gray'
                    })
                    .style('z-index', '3')

                d3.select('.stage')
                    .transition()
                    .duration(opaqueTime)
                    .delay(fadeOutTime + moveTime)
                    .style('opacity', 1)
                d3.select('.stage')
                    .transition()
                    .duration(takeStageTime)
                    .delay(fadeOutTime + moveTime + opaqueTime)
                    .style(
                        'left',
                        geomData.centerX -
                            geomData.stageRadius -
                            self.padding +
                            'px',
                    )
                    .style(
                        'top',
                        geomData.centerY -
                            geomData.stageRadius -
                            self.padding +
                            'px',
                    )
                    .style('width', geomData.stageRadius * 2 + 'px')
                    .style('height', geomData.stageRadius * 2 + 'px')

                    .text(function () {
                        return thisData['actor data'].details
                    })
                    .style('background', function () {
                        for (let cat of catData) {
                            if (cat.text == thisData['actor data'].category) {
                                return cat.color
                            }
                        }
                        return 'gray'
                    })
            }
        })
        actors.on('mouseleave', function () {
            let allActors = d3.selectAll('.actors').transition()
            let allCategories = d3.selectAll('.temp-category-reps').transition()
            allActors.style('opacity', 1)
            allCategories.style('opacity', 1)
        })
    }
}
