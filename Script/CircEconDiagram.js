class CircularEconomyDiagram {
    constructor(_data, _svgId, _divId, _containerId) {
        console.log('diagram constructed')
        this.data = _data

        this.svg = d3.select('#' + _svgId)
        this.div = d3.select('#' + _divId)
        this.container = document.getElementById(_containerId)
        this.padding = 10
        this.categoryOffset = 20
        this.structureData()
        this.resizeDiagram(this.width, this.height)
        this.calcGeoms()

        this.svg.append('g').attr('class', 'stage')
        this.svg.append('g').attr('class', 'category-ring')
        this.svg.append('g').attr('class', 'actors-group')
        this.svg.append('defs')

        let dropShadowFilter = this.svg
            .select('defs')
            .append('filter')
            .attr('id', 'dropshadow')
        dropShadowFilter
            .append('feGaussianBlur')
            .attr('in', 'SourceAlpha')
            .attr('stdDeviation', 4)
            .attr('result', 'blur')
        dropShadowFilter
            .append('feOffset')
            .attr('in', 'blur')
            .attr('dx', 5)
            .attr('dy', 8)
            .attr('result', 'offsetBlur')
        dropShadowFilter
            .append('feFlood')
            .attr('in', 'offsetBlur')
            .attr('flood-opacity', '0.5')
            .attr('result', 'offsetColor')
        dropShadowFilter
            .append('feComposite')
            .attr('in', 'offsetColor')
            .attr('in2', 'offsetBlur')
            .attr('operator', 'in')
            .attr('result', 'offsetBlur')

        let feMerge = dropShadowFilter.append('feMerge')
        feMerge.append('feMergeNode').attr('in', 'offsetBlur')
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

        this.generalUpdatePattern()
    }
    resizeDiagram() {
        console.log('diagram resized')
        this.containerBounds = this.container.getBoundingClientRect()
        this.containerLeft = this.containerBounds.left
        this.containerTop = this.containerBounds.top
        this.width = this.containerBounds.right - this.containerLeft
        this.height = this.containerBounds.bottom - this.containerTop
        this.getControllingDim()
        this.svg.style('position', 'absolute')
        this.svg.attr('width', this.controllingDim)
        this.svg.attr('height', this.controllingDim)
        this.svg.style('left', (this.width - this.controllingDim) / 2 + 'px')
        this.svg.style('top', (this.height - this.controllingDim) / 2 + 'px')
        this.div.style('position', 'absolute')
        this.div.style('left', (this.width - this.controllingDim) / 2 + 'px')
        this.div.style('top', (this.height - this.controllingDim) / 2 + 'px')
        this.div.style('width', this.controllingDim + 'px')
        this.div.style('height', this.controllingDim + 'px')
        this.calcGeoms()
        this.generalUpdatePattern()
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

        this.structuredData.geometry.startRotation = this.data.geometry.startRotation
        this.structuredData.geometry.arrowRotation = this.data.geometry.arrowRotation
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
                    let actorObj = {
                        actor: actor,
                        'actor data': actorData,
                        categoryActive: false,
                        actorActive: false,
                    }
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
        this.structuredData.geometry.actorSelectRadiusIncrease = 20
        this.structuredData.geometry.radius =
            (this.controllingDim / 2) * (7 / 12)
        this.structuredData.geometry.radiusWidth =
            (this.controllingDim / 2) * (4 / 17)
        this.structuredData.geometry.stageRadius =
            (this.controllingDim / 2) * (1 / 7)
        this.structuredData.geometry.actorRingRadius =
            (this.controllingDim / 2) * (9 / 10)
        this.structuredData.geometry.actorRadius =
            (this.controllingDim / 2) * (1 / 11)
    }

    generalUpdatePattern() {
        console.log('general update pattern run')
        let self = this
        let svg = self.svg
        let div = self.div
        let data = self.structuredData
        let geomData = data.geometry
        let catData = data.categories
        let actorData = data.actors
        console.log('actor data', actorData)
        console.log('category data', catData)
        console.log('geometry data', geomData)

        let stage = div
            .selectAll('.stage')
            .data(data.stageData)
            .join('div')
            .attr(
                'class',
                'stage circular-economy-bubble no-select medium-text stroked',
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
            .selectAll('.category-text')
            .data(data.categories)
            .join('div')
            .classed('category-text', true)
            .classed('category-hover', true)
            .classed('circular-economy-square', true)
            .classed('no-select', true)
            .classed('medium-text', true)
            .classed('pointer', true)
            .attr('x', (d) => {
                return Math.cos(d.textAngle) * geomData.radius
            })
            .attr('y', (d) => {
                return Math.sin(d.textAngle) * geomData.radius
            })
            .style('left', (d) => {
                let relativeX =
                    Math.cos(d.textAngle) *
                    (geomData.radius + geomData.radiusWidth / 2)
                return (
                    geomData.centerX +
                    relativeX -
                    self.padding +
                    self.categoryOffset -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('top', (d) => {
                let relativeY =
                    Math.sin(d.textAngle) *
                    (geomData.radius + geomData.radiusWidth / 2)
                return (
                    geomData.centerY +
                    relativeY -
                    self.padding +
                    self.categoryOffset -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style(
                'width',
                geomData.radiusWidth - self.categoryOffset * 2 + 'px',
            )
            .style(
                'height',
                geomData.radiusWidth - self.categoryOffset * 2 + 'px',
            )
            .style('background', 'none')
            .text((d) => {
                return d.text
            })
            .style('z-index', '2')

        categoryText.on('click', function (e, d) {
            categoryClick(d, e, this)
        })

        let buildCategoryPath = function (catData) {
            let startAngle = catData.startAngle
            let endAngle = catData.endAngle
            let arrowRotation = geomData.arrowRotation
            let radius = geomData.radius
            let exteriorRadius = radius + geomData.radiusWidth
            let centerX = geomData.centerX
            let centerY = geomData.centerY
            let x1 = Math.cos(startAngle) * radius + centerX
            let y1 = Math.sin(startAngle) * radius + centerY
            let x2 =
                Math.cos(startAngle + arrowRotation) *
                    (radius + (exteriorRadius - radius) / 2) +
                centerX
            let y2 =
                Math.sin(startAngle + arrowRotation) *
                    (radius + (exteriorRadius - radius) / 2) +
                centerY
            let x3 =
                Math.cos(endAngle + arrowRotation) *
                    (radius + (exteriorRadius - radius) / 2) +
                centerX
            let y3 =
                Math.sin(endAngle + arrowRotation) *
                    (radius + (exteriorRadius - radius) / 2) +
                centerY

            let path = d3.path()
            path.moveTo(x1, y1)
            path.lineTo(x2, y2)
            path.arc(centerX, centerY, exteriorRadius, startAngle, endAngle)
            path.lineTo(x3, y3)
            path.arc(centerX, centerY, radius, endAngle, startAngle, true)
            let pathData = path.toString()

            return pathData
        }

        let categoryShapes = svg
            .select('.category-ring')
            .selectAll('.category-shape')
            .data(catData)
            .join('path')
            .classed('category-shape', true)
            .classed('category-hover', true)
            .classed('pointer', true)
            .attr('d', function (d) {
                let pathData = buildCategoryPath(d)

                return pathData
            })
            .attr('fill', function (d) {
                return d.color
            })
            .attr('stroke-width', '3')
            .attr('stroke', 'white')
            .attr('filter', 'none')
            .attr('transform', 'translate(0,0)')
            .attr('opacity', 0.9)

        categoryShapes.on('click', function (e, d) {
            categoryClick(d, e, this)
        })

        let actors = div
            .selectAll('.actors')
            .data(actorData)
            .join('div')
            .classed('actors', true)
            .classed('circular-economy-bubble', true)
            .classed('no-select', true)
            .classed('stroked', true)
            .classed('pointer', true)
            .style('font-size', 'x-small')
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
            .style('opacity', function (d) {
                let loopActor = d3.select(this)
                let catSelect = loopActor.classed('category-selected-actors')
                let tempCatSelect = loopActor.classed(
                    'temp-category-selected-actors',
                )
                if (catSelect || tempCatSelect) {
                    return 1
                } else {
                    return 0
                }
            })
            .style('border-width', '2px')
        actors.on('mouseenter', function (e, d) {
            actorHover(d, e, this)
        })
        actors.on('mouseleave', function (e, d) {
            actorLeave(d, e, this)
        })
        actors.on('click', function (e, d) {
            actorClick(d, e, this)
        })

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// THIS SECTION WILL CONTAIN CODE THAT IS CALLED BY VARIOUS EVENTS //////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let categoryClick = function (d, e, selected) {
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(selected)

            if (thisCategory.classed('selected-category')) {
                d3.selectAll('.actors')
                    .classed('category-selected-actors', false)
                    .classed('temp-category-selected-actors', false)
                    .transition()
                    .style('opacity', '0')

                d3.selectAll('.category-hover')
                    .classed('selected-category', false)
                    .classed('receding-category', false)
                    .transition()
                    .attr('filter', 'none')
                    .attr('transform', 'translate(0,0)')
                    .attr('opacity', 1)
            } else {
                d3.selectAll('.actors')
                    .classed('category-selected-actors', (d) => {
                        if (d['actor data'].category == thisData.text) {
                            return true
                        } else {
                            return false
                        }
                    })
                    .classed('temp-category-selected-actors', false)

                d3.selectAll('.category-hover')
                    .classed('selected-category', function (d) {
                        if (thisData.text == d.text) {
                            return true
                        } else {
                            return false
                        }
                    })
                    .classed('receding-category', function (d) {
                        if (thisData.text == d.text) {
                            return false
                        } else {
                            return true
                        }
                    })
            }
            d3.selectAll('.receding-category')
                .transition()
                .attr('filter', 'none')
                .attr('transform', 'translate(0,0)')
                .attr('opacity', 0.9)
            d3.selectAll('.selected-category')
                .raise()
                .transition()
                .attr('filter', 'url(#dropshadow)')
                .attr('transform', 'translate(1,-4)')
                .attr('opacity', 1)
            let allActors = d3
                .selectAll('.actors')
                .transition()
                .style('opacity', function (d) {
                    let loopActor = d3.select(this)
                    let isSelected = loopActor.classed(
                        'category-selected-actors',
                    )
                    if (isSelected) {
                        return 1
                    } else {
                        return 0
                    }
                })
        }

        let actorClick = function (d, e, selected) {
            let thisData = d
            let thisEvent = e
            let thisActor = d3.select(selected).raise()

            let fadeOutTime = 20
            let moveTime = 10
            let opaqueTime = 10
            let takeStageTime = 500
            let thisActorActive =
                thisActor.classed('temp-category-selected-actors') ||
                thisActor.classed('category-selected-actors')
            if (
                d3.select('.stage').text() != thisData.actor &&
                thisActorActive
            ) {
                d3.selectAll('.actors')
                    .transition()
                    .duration(120)
                    .style('left', (d) => {
                        let relativeX =
                            Math.cos(d.actorAngle) * geomData.actorRingRadius
                        if (d.actor == thisData.actor) {
                            return (
                                geomData.centerX +
                                relativeX -
                                geomData.actorSelectRadiusIncrease -
                                self.padding -
                                geomData.actorRadius +
                                'px'
                            )
                        } else {
                            return (
                                geomData.centerX +
                                relativeX -
                                self.padding -
                                geomData.actorRadius +
                                'px'
                            )
                        }
                    })
                    .style('top', (d) => {
                        let relativeY =
                            Math.sin(d.actorAngle) * geomData.actorRingRadius
                        if (d.actor == thisData.actor) {
                            return (
                                geomData.centerY +
                                relativeY -
                                geomData.actorSelectRadiusIncrease -
                                self.padding -
                                geomData.actorRadius +
                                'px'
                            )
                        } else {
                            return (
                                geomData.centerY +
                                relativeY -
                                self.padding -
                                geomData.actorRadius +
                                'px'
                            )
                        }
                    })
                    .style('width', function (d) {
                        if (d.actor == thisData.actor) {
                            return (
                                geomData.actorRadius * 2 +
                                geomData.actorSelectRadiusIncrease * 2 +
                                'px'
                            )
                        } else {
                            return geomData.actorRadius * 2 + 'px'
                        }
                    })
                    .style('height', function (d) {
                        if (d.actor == thisData.actor) {
                            return (
                                geomData.actorRadius * 2 +
                                geomData.actorSelectRadiusIncrease * 2 +
                                'px'
                            )
                        } else {
                            return geomData.actorRadius * 2 + 'px'
                        }
                    })
                    .style('border-width', function (d) {
                        if (d.actor == thisData.actor) {
                            return '5px'
                        } else {
                            return '2px'
                        }
                    })
                    .style('font-size', function (d) {
                        if (d.actor == thisData.actor) {
                            return 'medium'
                        } else {
                            return 'x-small'
                        }
                    })

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
                        return thisData.actor
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
                        return thisData.actor
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
        }

        let actorHover = function (_d, _e, _selected) {
            let thisData = _d
            let thisEvent = _e
            let thisActor = d3.select(_selected)
            let thisActorActive =
                thisActor.classed('temp-category-selected-actors') ||
                thisActor.classed('category-selected-actors')
            if (thisActorActive) {
                let catActors = d3
                    .selectAll('.category-selected-actors')
                    .transition()
                    .style('opacity', function (d) {
                        if (d.actor == thisData.actor) {
                            return 1
                        } else {
                            return 0.47
                        }
                    })
                let tempCatActors = d3
                    .selectAll('.temp-category-selected-actors')
                    .transition()
                    .style('opacity', function (d) {
                        if (d.actor == thisData.actor) {
                            return 1
                        } else {
                            return 0.47
                        }
                    })
            }
        }

        let actorLeave = function (d, e, selected) {
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(selected)

            d3.selectAll('.temp-category-selected-actors').style('opacity', 1)
            d3.selectAll('.category-selected-actors').style('opacity', 1)
        }
    }
}
