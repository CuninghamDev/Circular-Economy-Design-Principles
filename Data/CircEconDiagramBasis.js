const CeDiagramData = {
    actors: {
        'Utilizing and contributing to open source design (wikihouse / shared solutions)': {
            name:
                'Utilizing and contributing to open source design (wikihouse / shared solutions)',
            details: '',
            buttons: [],
            category: 'Exchange',
        },
        'Tracking material passports': {
            details:
                'Material passports are with a material throughout its entire life to ensure its continuous use. During Exchange, the product may be either in a building ready for demo, in a storage facility ready for delivery, or with a manufacturer ready for upcycling. It is the materials passport that allows designers and builders to find these materials to specify for their projects.',
            buttons: [],
            category: 'Exchange',
        },
        'Storing and distributing upcycled materials': {
            details:
                'Physical marketplace and services to enable harvest and distribution of materials from demolitions and other industries.',
            buttons: ['Upcycling'],
            category: 'Exchange',
        },
        'Connecting salvaged material supply and demand via online platforms': {
            details:
                'By-passing physical warehouse, an online platform can connect supply and demand of salvaged materials directly from site to site.',
            buttons: [],
            category: 'Exchange',
        },
        'Remanufacturing salvaged materials into new products': {
            details:
                'When used material is modified into superior product. In this case these materials would otherwise go to a landfill or a recycling facility vs being upcycled. The remanufacturer then has the opportunity to give the new material a passport.',
            buttons: [],
            category: 'Exchange',
        },
        'Capturing waste material from other industries': {
            details:
                'Also called “Industrial Symbiosis,” captures waste from unrelated industries (e.g. agriculture) and turns them into useful products (e.g. hempcrete, straw bale)',
            buttons: [],
            category: 'Exchange',
        },
        'Designing for demountability': {
            details:
                'Demountability enables material re-use on a different project in case it is no longer needed prior to end of its lifespan. This becomes important during the design process as it has a large impact on how joints and details are designed.',
            buttons: [],
            category: 'Design and Deliver',
        },
        'Designing for future recovery': {
            details:
                'Ensuring the design is demountable and has a plan is in place for who is accountable to recover materials.',
            buttons: [
                'Take-back services',
                'Product as service systems',
                'Upcycling',
            ],
            category: 'Design and Deliver',
        },
        'Designing for adaptation and mixed-use': {
            details:
                'Ability to accommodate various building programs can prolong building’s life and minimize waste of existing building stock.',
            buttons: ['Multispace and mixed-use', 'Space sharing'],
            category: 'Design and Deliver',
        },
        'Designing for modularity': {
            details:
                'Modular design enables pre-fabrication and standardization of elements which can drive further optimization.',
            buttons: [],
            category: 'Design and Deliver',
        },
        'Designing for future adaptation': {
            details:
                'Ability to accommodate various building programs can prolong building’s life and minimize waste of existing building stock.',
            buttons: ['Adaptive reuse of existing building'],
            category: 'Design and Deliver',
        },
        'Maximizing space utilization': {
            details:
                'Making sure that building program is designed to maximize use of all spaces.',
            buttons: [],
            category: 'Design and Deliver',
        },
        'Designing for longevity': {
            details:
                'The more adaptable the structure is, the more chances there are for it to survive changes in societal and user needs and therefore prevent premature end of life.',
            buttons: [],
            category: 'Design and Deliver',
        },
        'Designing for longevity': {
            details:
                'The more adaptable the structure is, the more chances there are for it to survive changes in societal and user needs and therefore prevent premature end of life.',
            buttons: [],
            category: 'Design and Deliver',
        },
        'Selling renewable energy back to grid': {
            details: 'Enables use of surplus green energy generated on site.',
            buttons: [],
            category: 'Intelligent Built Environment',
        },
        'Internet of Things/BIM for Operations': {
            details:
                'Use of sensors, tracking systems and management software can assist with more effective operations and timely maintenance to prolong building’s life.',
            buttons: [
                'Product as service systems',
                'Tracking material passports',
            ],
            category: 'Intelligent Built Environment',
        },
        'Utilizing online platform to facilitate space sharing': {
            details:
                'Web-based platforms can help to match underutilized spaces (e.g. office, homes) with potential users (e.g. Airbnb, WeWork).',
            buttons: [],
            category: 'Intelligent Built Environment',
        },
        Upcycling: {
            details: '',
            buttons: [
                'Designing for future recovery',
                'Low impact materials – cradle to cradle',
            ],
            category: 'End of Design Life',
        },
        'Utilizing take-back service material providers': {
            details:
                'Collection services offered by manufacturers/suppliers at the end of their product lifecycle for re-manufacturing and recycling (e.g. ceiling tile, carpet).',
            buttons: [
                'Product as service systems',
                'Leased building materials from manufacturer/supplier',
            ],
            category: 'End of Design Life',
        },
    },
    buttons: {
        Upcycling: {
            actorKey: '',
        },
        'Take-back services': {
            actorKey: '',
        },
        'Product as service systems': {
            actorKey: '',
        },
        'Multispace and mixed-use': {
            actorKey: '',
        },
        'Space sharing': {
            actorKey: '',
        },
        'Adaptive reuse of existing building': {
            actorKey: '',
        },
        'Tracking material passports': {
            actorKey: '',
        },
        'Designing for future recovery': {
            actorKey: '',
        },
        'Low impact materials – cradle to cradle': {
            actorKey: '',
        },
        'Leased building materials from manufacturer/supplier': {
            actorKey: '',
        },
    },
    //note the order of the categories matters and is based on the unit circle
    categories: [
        { text: 'Design and Deliver', color: '#358BB0' },
        { text: 'Exchange', color: '#61BAE0' },
        { text: 'End of Design Life', color: '#A6D08F' },
        { text: 'Intelligent Built Environment', color: '#90B47D' },
    ],
    geometry: {},
}
