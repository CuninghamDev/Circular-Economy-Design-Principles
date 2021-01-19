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
        // this.div.style('background', '#EBEBEB')
        this.calcGeoms()

        this.svg.append('g').attr('class', 'stage')
        this.svg.append('g').attr('class', 'category-ring')
        this.svg.append('g').attr('class', 'actors-group')
        this.svg.append('defs')

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

        this.structuredData.geometry.startRotation = this.data.geometry.startRotation
        // this.structuredData.geometry.startRotation = (Math.PI / 2) * -1
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
            .selectAll('.category-text')
            .data(data.categories)
            .join('div')
            .attr(
                'class',
                'category-text category-hover circular-economy-square no-select medium-text',
            )
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
                    self.padding -
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
                    self.padding -
                    geomData.radiusWidth / 2 +
                    'px'
                )
            })
            .style('width', geomData.radiusWidth + 'px')
            .style('height', geomData.radiusWidth + 'px')
            .style('background', 'none')
            .text((d) => {
                return d.text
            })
            .style('z-index', '2')

        categoryText.on('mouseenter', function (e, d) {
            categoryHover(d, e, this)
        })
        categoryText.on('mouseleave', function (e, d) {
            categoryLeave(d, e, this)
        })
        categoryText.on('click', function (e, d) {
            categoryClick(d, e, this)
        })

        let buildCategoryPath = function (catData) {
            console.log('data to build path', catData)
            console.log('geometry data', geomData)
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
            .attr('class', function () {
                return 'category-shape category-hover'
            })
            .attr('d', function (d) {
                let pathData = buildCategoryPath(d)
                console.log('path data', pathData)
                return pathData
            })
            .attr('fill', function (d) {
                return d.color
            })
            .attr('stroke-width', '3')
            .attr('stroke', 'white')

        categoryShapes.on('mouseenter', function (e, d) {
            categoryHover(d, e, this)
        })
        categoryShapes.on('mouseleave', function (e, d) {
            categoryLeave(d, e, this)
        })
        categoryShapes.on('click', function (e, d) {
            categoryClick(d, e, this)
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
            .style('opacity', function (d) {
                if (d.categoryActive) {
                    return '1'
                } else {
                    return '0'
                }
            })
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

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// THIS SECTION WILL CONTAIN CODE THAT IS CALLED BY VARIOUS EVENTS //////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let categoryHover = function (d, e, selected) {
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(selected)
            // let allCategories = d3
            //     .selectAll('.category-hover')
            //     .transition()
            //     .style('opacity', function (d) {
            //         if (d.text == thisData.text) {
            //             return 1
            //         } else {
            //             return 0.5
            //         }
            //     })
            d3.selectAll('.actors')
                .transition()
                .style('opacity', (d) => {
                    if (d['actor data'].category == thisData.text) {
                        return 1
                    } else if (d['actor data'].categoryActive) {
                        return 0.5
                    } else {
                        return 0
                    }
                })
        }
        svg.select('defs').selectAll('#dropshadow').remove()
        let dropShadowFilter = svg
            .select('defs')
            .append('filter')
            .attr('id', 'dropshadow')
        let categoryClick = function (d, e, selected) {
            // console.log('this data', d)
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(selected)

            if (thisCategory.classed('selected-category')) {
                d3.selectAll('.category-hover')
                    .classed('selected-category', false)
                    .classed('receding-category', false)
            } else {
                d3.selectAll('.category-hover')
                    .classed('selected-category', function (d) {
                        console.log('category data', d)
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

            d3.selectAll('.selected-category')
        }

        let categoryLeave = function (d, e, selected) {
            // d3.selectAll('.category-hover').transition().style('opacity', '1')
            d3.selectAll('.actors')
                .transition()
                .style('opacity', function (d) {
                    if (d['actor data'].categoryActive) {
                        return 1
                    } else {
                        return 0
                    }
                })
        }
    }
}
