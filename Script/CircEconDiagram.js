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

        //not necessary to instantiate the rotation here, but these are called and modified by the rotation
        //method of this class to calculate and animate diagram rotations
        // this.rotationTracker = this.structuredData.geometry.startRotation
        this.rotationTracker = this.structuredData.geometry.startRotation
        this.previousRotation = this.structuredData.geometry.startRotation
        this.rotationTime = 100
        this.svg.append('g').attr('class', 'stage')

        this.svg.append('g').attr('class', 'category-ring')
        this.svg.append('g').attr('class', 'category-text')
        this.svg.append('g').attr('class', 'activities-ring')
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
        this.rotationTime = 20
        this.getControllingDim()
        this.svg.style('position', 'absolute')
        this.svg.attr('width', this.width)
        this.svg.attr('height', this.height)
        this.svg.style('left', '0px')
        this.svg.style('top', '0px')
        this.div.style('position', 'absolute')
        this.div.style('left', '0px')
        this.div.style('top', '0px')
        this.div.style('width', this.width)
        this.div.style('height', this.height)
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
            cat.startAngle = this.structuredData.geometry.catRotArc * i
            cat.endAngle =
                cat.startAngle + this.structuredData.geometry.catRotArc
            cat.textAngle =
                cat.startAngle + this.structuredData.geometry.halfCatArc
            cat.active = true
            cat.selected = false
            this.structuredData.categories.push(cat)
        }

        this.structuredData.activities = []
        for (let i in this.data.activities) {
            let act = this.data.activities[i]
            act.startAngle = this.structuredData.geometry.catRotArc * i
            act.endAngle =
                act.startAngle + this.structuredData.geometry.catRotArc
            act.textAngle =
                act.startAngle + this.structuredData.geometry.halfCatArc
            act.active = true
            act.selected = false
            this.structuredData.activities.push(act)
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
                        actor: actorData.actor,
                        short: actorData.short,
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
        let geo = this.structuredData.geometry
        geo.centerX = this.width / 2
        geo.centerY = this.height / 2
        geo.actorSelectRadiusIncrease = 20
        geo.stagePadding = 1
        geo.activitiesPadding = 5
        geo.radius = (this.controllingDim / 2) * (6 / 15)
        geo.radiusWidth = (this.controllingDim / 2) * (4 / 20)
        geo.stageRadius = (this.controllingDim / 2) * (1 / 5)
        geo.actorRingRadius = (this.controllingDim / 2) * (9 / 10)

        geo.actorRadius = (this.controllingDim / 2) * (1 / 11)

        geo.actorArrow = {}
        geo.actorArrow.radius =
            geo.radius + geo.radiusWidth - ((this.controllingDim / 2) * 1) / 50
        geo.actorArrow.width = this.controllingDim / 2 - geo.actorArrow.radius
        geo.actorArrow.height = 36
        geo.actorArrow.growWidth = 20
        geo.actorArrow.growHeight = 18

        geo.activitiesWidth =
            geo.radius -
            geo.activitiesPadding -
            geo.stageRadius -
            geo.stagePadding
        geo.descriptionHeight = geo.activitiesWidth * 0.8
        geo.descriptionWidth = geo.activitiesWidth
        geo.descriptionYOffset = geo.stageRadius + geo.stagePadding + 10
    }
    rotate(_rotation) {
        this.rotationTracker += _rotation
        this.rotationTime = 800

        this.previousRotation = this.rotationTracker
        this.generalUpdatePattern()
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
        let activityData = data.activities

        let categoryTextPathGenerator = function (catData) {
            let startAngle = catData.startAngle
            let endAngle = catData.endAngle
            let radius = geomData.radius + geomData.radiusWidth / 5
            let centerX = 0
            let centerY = 0
            let startX = Math.cos(startAngle) * radius + centerX
            let startY = Math.sin(startAngle) * radius + centerY
            let path = d3.path()
            path.moveTo(startX, startY)
            path.arc(centerX, centerY, radius, startAngle, endAngle)
            let pathData = path.toString()
            return pathData
        }

        svg.select('.category-text').attr(
            'transform',
            'translate(' + geomData.centerX + ',' + geomData.centerY + ')',
        )

        let categoryTextGroups = svg
            .select('.category-text')
            .selectAll('g')
            .data(catData)
            .join('g')
        categoryTextGroups
            .transition()
            .duration(self.rotationTime)
            .attr(
                'transform',
                'rotate(' + (self.rotationTracker * 180) / Math.PI + ')',
            )

        let categoryTextPath = categoryTextGroups
            .selectAll('.category-text-paths')
            .data((d) => [d])
            .join((enter) =>
                enter
                    .append('path')
                    .classed('category-text-paths', true)
                    .attr('id', (d) => {
                        let idTag = d.text.split(' ').join('-')
                        let lowerCaseId = idTag.toLowerCase()
                        return 'cat-text-path-' + lowerCaseId
                    })
                    .style('fill', 'none'),
            )
            .attr('d', (d) => categoryTextPathGenerator(d))

        let categoryText = categoryTextGroups
            .selectAll('.category-text')
            .data((d) => [d])
            .join((enter) =>
                enter.append('text').classed('category-text', true),
            )
            .selectAll('.category-text-to-path')
            .data((d) => [d])
            .join(
                (enter) =>
                    enter
                        .append('textPath')
                        .classed('category-text-to-path', true)
                        .classed('pointer', true)
                        .classed('category-hover', true)
                        .attr('xlink:href', (d) => {
                            let idTag = d.text.split(' ').join('-')
                            let lowerCaseId = idTag.toLowerCase()
                            let id = '#cat-text-path-' + lowerCaseId
                            return id
                        })
                        .style('text-anchor', 'middle')
                        .attr('startOffset', '50%')
                        .text((d) => d.text.toUpperCase())
                        .style('font-family', 'Arial, Helvetica, sans-serif')
                        .style('fill', 'white')
                        .style('dominant-baseline', 'middle')
                        .style('font-size', '2vmin'),
                // (update) => update.style('font-size', '3vmin'),
            )
        categoryText.on('click', function (e, d) {
            categoryClick(d, e, this)
        })

        let buildCategoryPath = function (catData) {
            let startAngle = catData.startAngle
            let endAngle = catData.endAngle
            let arrowRotation = geomData.arrowRotation
            let radius = geomData.radius
            let exteriorRadius = radius + geomData.radiusWidth
            let centerX = 0
            let centerY = 0
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

        svg.select('.category-ring').attr(
            'transform',
            'translate(' + geomData.centerX + ',' + geomData.centerY + ')',
        )
        let categoryGroups = svg
            .select('.category-ring')
            .selectAll('g')
            .data(catData)
            .join('g')
        categoryGroups
            .transition()
            .duration(self.rotationTime)
            .attr(
                'transform',
                'rotate(' + (self.rotationTracker * 180) / Math.PI + ')',
            )
        let categoryShapes = categoryGroups
            .selectAll('.category-shapes')
            .data((d) => [d])
            .join((enter) =>
                enter
                    .append('path')
                    .classed('category-shapes', true)
                    .classed('category-hover', true)
                    .classed('pointer', true)

                    .attr('fill', function (d) {
                        return d.color
                    })
                    .attr('stroke-width', '3')
                    .attr('stroke', 'white')
                    .attr('filter', 'none')
                    .attr('transform', 'translate(0,0)')
                    .attr('opacity', 1),
            )
            .attr('d', (d) => buildCategoryPath(d))

        categoryShapes.on('click', function (e, d) {
            categoryClick(d, e, this)
        })

        let activityText = div
            .selectAll('.activity-text')
            .data(activityData)
            .join((enter) =>
                enter
                    .append('div')
                    .classed('activity-text', true)
                    .classed('activity-hover', true)
                    .classed('circular-economy-square', true)
                    .classed('no-select', true)
                    .classed('medium-text', true)
                    .classed('pointer', false)
                    .style('position', 'absolute')
                    .style('background', 'none')
                    .text((d) => d.text)
                    .style('z-index', '2'),
            )

        activityText
            .transition()
            .duration(self.rotationTime)
            .style('left', (d) => {
                let relativeX =
                    Math.cos(d.textAngle + self.rotationTracker) *
                    (geomData.activitiesWidth / 2 +
                        (geomData.stageRadius + geomData.stagePadding))
                return (
                    geomData.centerX +
                    relativeX -
                    self.padding +
                    self.categoryOffset -
                    geomData.activitiesWidth / 2 +
                    'px'
                )
            })
            .style('top', (d) => {
                let relativeY =
                    Math.sin(d.textAngle + self.rotationTracker) *
                    (geomData.activitiesWidth / 2 +
                        (geomData.stageRadius + geomData.stagePadding))
                return (
                    geomData.centerY +
                    relativeY -
                    self.padding +
                    self.categoryOffset -
                    geomData.activitiesWidth / 2 +
                    'px'
                )
            })
            .style(
                'width',
                geomData.activitiesWidth - self.categoryOffset * 2 + 'px',
            )
            .style(
                'height',
                geomData.activitiesWidth - self.categoryOffset * 2 + 'px',
            )

        let buildActivityPath = function (actData) {
            let startAngle = actData.startAngle
            let endAngle = actData.endAngle
            let interiorRadius = geomData.stageRadius + geomData.stagePadding
            let exteriorRadius = geomData.radius - geomData.activitiesPadding
            let centerX = 0
            let centerY = 0
            let x1 = Math.cos(startAngle) * interiorRadius + centerX
            let y1 = Math.sin(startAngle) * interiorRadius + centerY
            let x2 = Math.cos(startAngle) * exteriorRadius + centerX
            let y2 = Math.sin(startAngle) * exteriorRadius + centerY
            let x3 = Math.cos(endAngle) * interiorRadius + centerX
            let y3 = Math.sin(endAngle) * interiorRadius + centerY

            let path = d3.path()
            path.moveTo(x1, y1)
            path.lineTo(x2, y2)
            path.arc(centerX, centerY, exteriorRadius, startAngle, endAngle)
            path.lineTo(x3, y3)
            path.arc(
                centerX,
                centerY,
                interiorRadius,
                endAngle,
                startAngle,
                true,
            )
            let pathData = path.toString()
            return pathData
        }

        svg.select('.activities-ring').attr(
            'transform',
            'translate(' + geomData.centerX + ',' + geomData.centerY + ')',
        )

        let activityGroups = svg
            .select('.activities-ring')
            .selectAll('g')
            .data(activityData)
            .join('g')
        activityGroups
            .transition()
            .duration(self.rotationTime)
            .attr(
                'transform',
                'rotate(' + (self.rotationTracker * 180) / Math.PI + ')',
            )

        let activitiesShapes = activityGroups
            .selectAll('.activity-shapes')
            .data(function (d) {
                return [d]
            })
            .join((enter) =>
                enter
                    .append('path')
                    .classed('activity-shapes', true)
                    // .classed('pointer', true)

                    .attr('fill', function (d) {
                        return d.color
                    })
                    .attr('stroke-width', '3')
                    .attr('stroke', 'white')
                    .attr('filter', 'none')
                    .attr('transform', 'translate(0,0)')
                    .attr('opacity', 0.7),
            )
            .attr('d', function (d) {
                let pathData = buildActivityPath(d)
                return pathData
            })

        svg.select('.actors-group').attr(
            'transform',
            'translate(' + geomData.centerX + ',' + geomData.centerY + ')',
        )
        let actorCenteringGroup = svg
            .select('.actors-group')
            .selectAll('.actor-centering-groups')
            .data(actorData)
            .join('g')
            .classed('actor-centering-groups', true)
        actorCenteringGroup
            .transition()
            .duration(self.rotationTime)
            .attr(
                'transform',
                'rotate(' + (self.rotationTracker * 180) / Math.PI + ')',
            )

        let actorGroups = actorCenteringGroup
            .selectAll('.actor-rotation-groups')
            .data((d) => [d])
            .join((enter) =>
                enter
                    .append('g')
                    .classed('actor-rotation-groups', true)
                    .classed('pointer', true)
                    .attr('transform', function (d) {
                        return 'rotate(' + d.actorAngle * (180 / Math.PI) + ')'
                    })
                    .attr('opacity', 0)
                    .classed('actor-selected', false),
            )

        actorGroups.on('click', function (e, d) {
            actorClick(d, e, this)
        })

        let actorRectangles = actorGroups
            .selectAll('rect')
            .data((d) => [d])
            .join((enter) =>
                enter
                    .append('rect')
                    .attr('x', geomData.actorArrowRadius)
                    .attr('y', -18)
                    .attr('height', 36)
                    .attr('width', geomData.actorArrowLengths)
                    .style('stroke', 'white')
                    .style('stroke-width', '3px')
                    .style('fill', (d) => {
                        for (let cat of catData) {
                            if (cat.text == d['actor data'].category) {
                                return cat.color
                            }
                        }
                        return 'gray'
                    }),
            )
            .attr('x', function (d) {
                let selected = d3.select(this).classed('actor-selected')
                if (selected) {
                    return (
                        geomData.actorArrow.radius -
                        geomData.actorArrow.growWidth
                    )
                } else {
                    return geomData.actorArrow.radius
                }
            })
            .attr('y', function (d) {
                let selected = d3.select(this).classed('actor-selected')
                if (selected) {
                    return (
                        (geomData.actorArrow.height / 2 +
                            geomData.actorArrow.growHeight) *
                        -1
                    )
                } else {
                    return (geomData.actorArrow.height / 2) * -1
                }
            })
            .attr('height', function (d) {
                let selected = d3.select(this).classed('actor-selected')
                if (selected) {
                    return (
                        geomData.actorArrow.height +
                        geomData.actorArrow.growHeight * 2
                    )
                } else {
                    return geomData.actorArrow.height
                }
            })
            .attr('width', function (d) {
                let selected = d3.select(this).classed('actor-selected')
                if (selected) {
                    return (
                        geomData.actorArrow.width +
                        geomData.actorArrow.growWidth * 2
                    )
                } else {
                    return geomData.actorArrow.width
                }
            })
            .attr('filter', function (d) {
                let selected = d3.select(this).classed('actor-selected')
                if (selected) {
                    return 'url(#dropshadow)'
                } else {
                    return 'none'
                }
            })

        let actorText = actorGroups
            .selectAll('text')
            .data((d) => [d])
            .join((enter) =>
                enter
                    .append('text')
                    .style('font-family', 'Arial, Helvetica, sans-serif')
                    .style('font-size', '1.6vmin')
                    .style('fill', 'white')

                    .attr('y', 0)
                    .text((d) => d.short)

                    .attr('dominant-baseline', 'middle'),
            )
            .attr('x', function (d) {
                let testAngle =
                    (d.actorAngle + self.rotationTracker + Math.PI * 2) %
                    (Math.PI * 2)
                if (testAngle < Math.PI * 1.5 && testAngle > Math.PI * 0.5) {
                    return self.controllingDim / 2 - 5
                } else {
                    return geomData.actorArrow.radius + 10
                }
            })
            .attr('transform', function (d) {
                let testAngle =
                    (d.actorAngle + self.rotationTracker + Math.PI * 2) %
                    (Math.PI * 2)
                if (testAngle < Math.PI * 1.5 && testAngle > Math.PI * 0.5) {
                    return (
                        'rotate(180,' + (self.controllingDim / 2 - 10) + ',0)'
                    )
                } else {
                    return 'rotate(0)'
                }
            })

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////// THIS SECTION WILL CONTAIN CODE THAT IS CALLED BY VARIOUS EVENTS //////////////////////////
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let categoryClick = function (d, e, selected) {
            let thisData = d
            let thisEvent = e
            let thisCategory = d3.select(selected)

            if (thisCategory.classed('selected-category')) {
                d3.selectAll('.actor-rotation-groups')
                    .classed('category-selected-actors', false)
                    .classed('temp-category-selected-actors', false)
                    .transition()
                    .style('opacity', '0')

                d3.selectAll('.category-hover')
                    .classed('selected-category', false)
                    .classed('receding-category', false)
                    .attr('opacity', 1)
                    .filter('.category-shapes')
                    .transition()
                    .attr('filter', 'none')
                    .attr('transform', 'translate(0,0)')
            } else {
                d3.selectAll('.actor-rotation-groups')
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
                .selectAll('.category-shapes')
                .raise()
            d3.selectAll('.selected-category')
                .filter('.category-shapes')
                .transition()
                .attr('filter', 'url(#dropshadow)')
                .attr('transform', 'translate(1,-4)')
                .attr('opacity', 1)
            let allActors = d3
                .selectAll('.actor-rotation-groups')
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
            console.log(d, e, selected)
            let thisData = d
            let thisEvent = e
            let rotateDiagram =
                Math.PI * 2 -
                ((d.actorAngle + self.rotationTracker) % (Math.PI * 2))
            self.rotate(rotateDiagram)

            let thisActor = d3.select(selected)
            let actorRects = d3
                .selectAll('.actor-rotation-groups')
                .selectAll('rect')
                .classed('actor-selected', false)
            thisActor.selectAll('rect').classed('actor-selected', true)

            d3.selectAll('.actor-rotation-groups')
                .selectAll('rect')
                .transition()
                .attr('x', function (d) {
                    let selected = d3.select(this).classed('actor-selected')
                    if (selected) {
                        return (
                            geomData.actorArrow.radius -
                            geomData.actorArrow.growWidth
                        )
                    } else {
                        return geomData.actorArrow.radius
                    }
                })
                .attr('y', function (d) {
                    let selected = d3.select(this).classed('actor-selected')
                    if (selected) {
                        return (
                            (geomData.actorArrow.height / 2 +
                                geomData.actorArrow.growHeight) *
                            -1
                        )
                    } else {
                        return (geomData.actorArrow.height / 2) * -1
                    }
                })
                .attr('height', function (d) {
                    let selected = d3.select(this).classed('actor-selected')
                    if (selected) {
                        return (
                            geomData.actorArrow.height +
                            geomData.actorArrow.growHeight * 2
                        )
                    } else {
                        return geomData.actorArrow.height
                    }
                })
                .attr('width', function (d) {
                    let selected = d3.select(this).classed('actor-selected')
                    if (selected) {
                        return (
                            geomData.actorArrow.width +
                            geomData.actorArrow.growWidth * 2
                        )
                    } else {
                        return geomData.actorArrow.width
                    }
                })
                .attr('filter', function (d) {
                    let selected = d3.select(this).classed('actor-selected')
                    if (selected) {
                        return 'url(#dropshadow)'
                    } else {
                        return 'none'
                    }
                })
        }
    }
}
