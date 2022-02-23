import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let actors = [
  {
    actor: "Open source design",
    short: "Open Source",
    details:
      "Open source solutions can help propagate circular concepts to a larger audience (e.g. wikihouse / shared solutions)",
    buttons: [],
    category: "Resource Exchange",
    eval: "Have you utilized or contributed to open source design?",
    conventional:
      "Building design is proprietary and duplication of its approach, details, and construction is not encouraged",
    evalPoints: 1
  },
  {
    actor: "Material passports",
    short: "Material Passports",
    details:
      "Material passports are with a material throughout its entire life to ensure its continuous use and circulation.  The product may be in use as part of a building, in a storage facility ready for reuse, or with a manufacturer ready for upcycling / downcycling. It is the material’s passport that allows designers and builders to find and specify these materials in their projects.",
    buttons: ["Material passports"],
    category: "Resource Exchange",
    eval:
      "Are you creating and or using material passports to keep the buildings materials in use?",
    conventional:
      "Buildings do not make use of material passports to track the lifecycle of materials and components",
    evalPoints: 5
  },
  {
    actor: "Storage and distribution facilities",
    short: "Storage and Distribution",
    details:
      "Physical marketplaces and services that enable the harvest, holding, and distribution of materials from building demolitions and other industries.",
    buttons: ["Storage and distribution facilities"],
    category: "Resource Exchange",
    eval:
      "Are any of your project materials coming from a storage and distribution facility?",
    conventional: "Materials are sourced directly from manufacturers",
    evalPoints: 3
  },
  {
    actor: "Connecting salvage supply and demand",
    short: "Connecting",
    details:
      "Online platforms that utilized a digital inventory of materials to by-pass physical warehouses and connect supply and demand of salvaged materials directly from site to site.",
    buttons: ["Connecting salvage supply and demand"],
    category: "Resource Exchange"
  },
  {
    actor: "Remanufacturing salvaged materials",
    short: "Remanufacturing",
    details:
      "When previously used material is modified into a new product. In this case these materials would otherwise go to a landfill or a recycling facility vs being reused. The remanufacturer then has the opportunity to give the new material a passport.",
    buttons: [],
    category: "Resource Exchange",
    eval:
      "Are you capturing salvaged material to create new material for your project?",
    conventional:
      "All salvage material is removed from site during demolition and either landfilled or recycled",
    evalPoints: 4
  },
  {
    actor: "Capturing waste material from other industries",
    short: "Capturing Waste",
    details:
      "Also called “Industrial Symbiosis,” captures waste from unrelated industries (e.g. agriculture) and turns them into useful building products (e.g. hempcrete, straw bale).",
    buttons: [],
    category: "Resource Exchange"
  },
  {
    actor: "Brownfield remediation",
    short: "Brownfield Remediation",
    details:
      "Revitalizing brownfields returns contaminated “waste” site into use, prevents development of greenfield sites, and can restore habitat.",
    buttons: [],
    category: "Resource Exchange",
    eval: "Is your building site a brownfield?",
    conventional:
      "Construction takes place on a site with minimal challenges posed by previous use or hazardous waste",
    evalPoints: 3
  },
  {
    actor: "Take-back services",
    short: "Take-back Services",
    details:
      "Collection services offered by manufacturers / suppliers at the end of their product lifecycle for re-manufacturing and upcycling (e.g. ceiling tile, carpet). These services depend heavily on demo entities involving manufacturers at the end of design life.",
    buttons: ["Take-back services"],
    category: "Resource Exchange",
    eval:
      "Is there a plan in place for any of your building materials to be taken back by the manufacturer after the end of their design life?",
    conventional:
      "There are no plans or strategies in place to guide decision making at the end of a building material's lifecycle",
    evalPoints: 3
  },
  {
    actor: "Leased materials",
    short: "Leased Materials",
    details:
      "Contracts can be made with the supplier or manufacturer to take back their product for reuse or replacement at the end of its use or lifespan. This differs from take-back services in that the materials are still owned by manufacturer, have a contract attached to them, and a plan for recovery that is upheld by supplier.",
    buttons: ["Leased Materials"],
    category: "Resource Exchange",
    eval: "Does your project utilize leased material agreements?",
    conventional:
      "No materials will be returned to their original supplier or manufacturer at the end of their lifecycle, instead making use of conventional waste streams.",
    evalPoints: 4
  },
  {
    actor: "Product as a service (Paas)",
    short: "Product as a Service",
    details:
      "Manufacturer retains ownership of the products (e.g. light fixtures) and instead sells their performance (e.g. light). This allows clients to purchase a desired product output vs the equipment itself, as a result creating an incentive for manufacturers to create long lasting / dependable equipment.",
    buttons: ["Product as a service"],
    category: "Resource Exchange",
    eval: "Does your project utilize Product-as-Service agreements?",
    conventional:
      "The building owner owns all materials and assemblies in their building, and does not pay a rental fee or usage fee for the functions of the building.",
    evalPoints: 4
  },
  {
    actor: "Optimizing material transportation",
    short: "Material Transportation",
    details:
      "Sourcing local materials and making sure they are efficiently loaded onto transport eliminates the waste of resources that occurs in transporting materials by minimizing the number of trips and miles to the construction site.",
    buttons: ["Product as a service"],
    category: "Resource Exchange",
    eval: "Is your project utilizing local materials where possible?",
    conventional:
      "A project will make no additional effort to specify local materials, instead encouraging the builders to source the most cost effective products and materials.",
    evalPoints: 2
  },
  {
    actor: "Demountable design",
    short: "Demountable Design",
    details:
      "Demountability enables a material to be reused at the end of its design life. This becomes important during the design process as it has a large impact on how joints and details are designed. Mechanical fasteners enable various materials to be demounted, separated, and re-used which is often impossible with adhesives.",
    buttons: ["Demountable design"],
    category: "Design and Deliver",
    eval:
      "Does your project avoid the use of adhesives/use mechanical fasteners to enable various materials to be demounted, separated, and reused?",
    conventional:
      "Adhesives and permanent fasteners are used extensively throughout construction as they are an economical and effective solution to connecting elements of the building.",
    evalPoints: 5
  },
  {
    actor: "Designing for mixed-use",
    short: "Mixed-Use",
    details:
      "Ability to accommodate various building programs can optimize a building’s use and minimize waste of existing building stock.",
    buttons: ["Desinging for mixed-use"],
    category: "Design and Deliver",
    eval: "Does your building have more than one program use?",
    conventional:
      "A building will have one very specific use and would perform poorly if used in any other way.",
    evalPoints: 3
  },
  {
    actor: "Modular design",
    short: "Modular Design",
    details:
      "Modular design enables pre-fabrication and standardization of elements which can drive further optimization.",
    buttons: ["Modular design"],
    category: "Design and Deliver",
    eval:
      "Does your project utilize standardized dimensions to reduce waste and/or optimize the reuse of the material at the end of its design life?",
    conventional:
      "Buildings will make no effort to enforce common assembly sizes, and will make use of prefabrication / standardization only when there is a clear economic benifit.",
    evalPoints: 4
  },
  {
    actor: "Designing for adaptive reuse",
    short: "Adaptive Reuse",
    details:
      "Ability to evolve into new future programs can prolong a building’s life and minimize waste of existing building stock. The more adaptable and durable the structure is, the more chances there are for it to survive changes in societal and user needs and therefore prevent premature end of life.",
    buttons: ["Desinging for adaptive reuse"],
    category: "Design and Deliver",
    eval: "Is your building designed to adapt to potential future uses?",
    conventional:
      "No plan will be made regarding potential future uses that future owners may have for a building, and no little thought will be given to the building's odds of surviving to its end of life.",
    evalPoints: 4
  },
  {
    actor: "Maximizing space utilization",
    short: "Utilization",
    details:
      "Making sure the building program is designed to maximize use of all spaces, designing out superfluous square footage in the plan to save on materials and energy.",
    buttons: [],
    category: "Design and Deliver",
    eval: "Is your floorplan using all of your square footage efficiently?",
    conventional:
      "When buildings have generous lot and zoning restrictions, efficiency will become a lower priority metric for design and construction, and more building may be constructed than necessary.",
    evalPoints: 2
  },
  {
    actor: "Designing for material optimization",
    short: "Material Optimization",
    details:
      "Designing with and cutting materials to modular or off-the-shelf dimensions reduces on site waste of materials by minimizing unusable scrap pieces and gives the materials a better chance of being reused.",
    buttons: ["Designing for material optimization"],
    category: "Design and Deliver",
    eval:
      "Is your building designed to keep materials in their off-the-shelf dimensions?",
    conventional:
      "Only a minimal amount of design consideration will be given to reducing or preventing cut dimensions throughout the building and its components and assemblies.",
    evalPoints: 3
  },
  {
    actor: "3D printing cradle to cradle material",
    short: "3D Printing",
    details: "3D printing allows for minimal construction waste.",
    buttons: [],
    category: "Design and Deliver",
    eval:
      "Does your project utilize 3D printing in its construction or materials to minimize construction waste?",
    conventional: "3D printing will not be utilized in construction",
    evalPoints: 1
  },
  {
    actor: "Prefabrication",
    short: "Prefabrication",
    details:
      "Pre-fabrication enables construction in controlled environment and greater material / energy efficiency.",
    buttons: [],
    category: "Design and Deliver",
    eval:
      "Are any of your material components prefabricated to elevate their performance and reduce construction waste?",
    conventional:
      "Prefabricated components will not be utilized, and if they are their selection will be driven primarily by economic factors.",
    evalPoints: 2
  },
  {
    actor: "Selling renewable energy",
    short: "Renewable Energy",
    details: "Enables use of surplus green energy generated on site.",
    buttons: ["Selling renewable energy"],
    category: "Intelligent Built Environment",
    eval:
      "Does your building create a surplus of energy to sell back to the grid?",
    conventional:
      "A building will be entirely reliant on the grid for electricity",
    evalPoints: 1
  },
  {
    actor: "Internet of Things / BIM for Operations",
    short: "Operations",
    details:
      "Use of sensors, tracking systems and management software can assist with more effective operations and timely maintenance to prolong a building’s life.",
    buttons: ["Internet of things/BIM for operations"],
    category: "Intelligent Built Environment",
    eval:
      "Does your project utilize sensors, tracking systems, and management software to assist more effective operations and maintenance?",
    conventional:
      "The building will rely on simple sensors like thermostats and respond in a 1:1 manner (ie it's cold so turn on the heat).",
    evalPoints: 3
  },
  {
    actor: "Space utilization",
    short: "Space Utilization",
    details:
      "Web-based platforms can help to match underutilized spaces (e.g. office, homes) with potential users (e.g. Airbnb, WeWork).",
    buttons: ["Space utilization"],
    category: "Intelligent Built Environment",
    eval:
      "Is there a plan in place to keep this building occupied outside of its regular operational hours?",
    conventional:
      "Buildings will be used only for the hours in which their primary functions take place, then will sit empty between these primary functions.",
    evalPoints: 2
  },
  {
    actor: "Existing structure",
    short: "Existing Structure",
    details:
      "The structure of a building can be reused for a future project, diverting it from becoming waste.",
    buttons: ["Existing structure"],
    category: "Intelligent Built Environment",
    eval: "Does your project utilize the structure of an existing building?",
    conventional:
      "Existing structures on the site will be demolished before construction on the new building begins.",
    evalPoints: 5
  },
  {
    actor: "Adaptive reuse of existing building",
    short: "Adaptive Reuse",
    details:
      "Prolongs life of the building and diverts existing structure from landfill.",
    buttons: ["Adaptive reuse of existing building"],
    category: "Intelligent Built Environment",
    eval:
      "Are you designing within an existing building core, shell, and structure?",
    conventional:
      "Existing building shell, core and structure on the site will be demolished before construction on the new building begins.",
    evalPoints: 5
  },
  {
    actor: "Harvesting grey water",
    short: "Harvesting Grey Water",
    details:
      "Reusing the building’s water reduces waste by keeping the water in use for longer.",
    buttons: ["Harvesting grey water"],
    category: "Intelligent Built Environment",
    eval: "Does your building harvest grey water?",
    conventional:
      "Grey water will be sent back to the municipal waste water management system.",
    evalPoints: 2
  },
  {
    actor: "Harvesting runoff",
    short: "Harvesting Runoff",
    details:
      "Harvesting runoff reduces water waste and utilizes the natural regenerative nature of the site.",
    buttons: ["Harvesting runoff"],
    category: "Intelligent Built Environment",
    eval: "Does your building harvest site runoff?",
    conventional:
      "Site runoff will be directed to the municipal storm water management system.",
    evalPoints: 3
  },
  {
    actor: "Natural lighting and ventilation",
    short: "Light and Ventilation",
    details:
      "Can help minimize operational waste related to lighting and mechanical systems.",
    buttons: ["Natural lighting and ventilation"],
    category: "Intelligent Built Environment",
    eval:
      "Does your building utilize natural lighting and ventilation to cut back on use of HVAC mechanical systems?",
    conventional:
      "Building will make no effort to maximize natural lighting beyond viewshed considerations, and all ventilation will be handled mechanically by the HVAC system.",
    evalPoints: 1
  },
  {
    actor: "Upcycling",
    short: "Upcycling",
    details:
      "Materials / elements can be designed with future upcycling in mind, therefore designing a longer material lifespan. This type of reuse requires a material to be of the same or higher quality or value than its original state. These materials can capture waste streams or be upcycled in their own processes.",
    buttons: ["Upcycling"],
    category: "End of Design Life",
    eval:
      "Does you project incorporate upcycled material? And/or Have you planned upcycling into any of your materials?",
    conventional:
      "No upcycled materials will be used in the building's construction.",
    evalPoints: 4
  },
  {
    actor: "Downcycling",
    short: "Downcycling",
    details:
      "Materials / elements can be designed with future uses in mind, extending their material lifespan. This type of reuse allows a material to have a new use that is of lesser quality and functionality than its original state ie plywood to OSB board to MDF board or biodegradable materials.",
    buttons: ["Downcycling"],
    category: "End of Design Life",
    eval:
      "Does you project incorporate downcycled material? And/or does the waste management plan for demolition incorporate downcycling measures?",
    conventional:
      "Downcycled materials may be used, but this will not be coincidental, and will have minimal impact on the overall design of the building.",
    evalPoints: 1
  },
  {
    actor: "Salvaged materials from demolitions",
    short: "Salvaged",
    details:
      "Materials can be diverted from landfills for upcycling, re-use, or recycling. This can include harvesting from the project’s site or other demolitions.",
    buttons: [],
    category: "End of Design Life",
    eval:
      "Does your project utilize material directly from a different site undergoing demolition?",
    conventional:
      "Projects will use only new materials directly from a manufacturer.",
    evalPoints: 3
  }
];

let buttons = [
  {
    title: "Material passports",
    sourceActor: "Material passports",
    stage: "Intelligent Built Environment",
    details:
      "Passports can be folded into BIM to track a material’s integrity and lifespan."
  },
  {
    title: "Material passports",
    sourceActor: "Material passports",
    stage: "End of Design Life",
    details:
      "Passports ensure materials are not lost in transition at the end of the buildings design life."
  },
  {
    title: "Storage and distribution facilities",
    sourceActor: "Storage and distribution facilities",
    stage: "End of Design Life",
    details:
      "These services are used at the end of a building’s design life to bring disassembled materials back into circulation for reuse."
  },
  {
    title: "Connecting salvage supply and demand",
    sourceActor: "Connecting salvage supply and demand",
    stage: "End of Design Life",
    details:
      "Inventoried materials with known demo dates can be found and connected to new-build sites at the end of their design life."
  },
  {
    title: "Take-back services",
    sourceActor: "Take-back services",
    stage: "Design and Deliver",
    details:
      "When specifying materials during the design process this becomes an option for specifying a material that can be recovered."
  },
  {
    title: "Take-back services",
    sourceActor: "Take-back services",
    stage: "End of Design Life",
    details:
      "These products have a recovery plan that needs to be followed through on at the end of design life."
  },
  {
    title: "Leased materials",
    sourceActor: "Leased materials",
    stage: "Design and Deliver",
    details:
      "When specifying materials during the design process this becomes an option for specifying a material that will be recovered."
  },
  {
    title: "Leased materials",
    sourceActor: "Leased materials",
    stage: "End of Design Life",
    details:
      "These products have a recovery plan that needs to be followed through on at the end of design life."
  },
  {
    title: "Product as a service",
    sourceActor: "Product as a service",
    stage: "Design and Deliver",
    details:
      "When specifying materials during the design process this becomes an option for specifying a material that will be recovered."
  },
  {
    title: "Product as a service",
    sourceActor: "Product as a service",
    stage: "Intelligent Built Environment",
    details:
      "Suppliers can use BIM to track their product performance throughout its lifespan."
  },
  {
    title: "Product as a service",
    sourceActor: "Product as a service",
    stage: "End of Design Life",
    details:
      "These products have a recovery plan that needs to be followed through on at the end of design life."
  },
  {
    title: "Demountable design",
    sourceActor: "Demountable design",
    stage: "End of Design Life",
    details:
      "Makes recovery of reusable materials possible during deconstruction."
  },
  {
    title: "Designing for mixed-use",
    sourceActor: "Designing for mixed-use",
    stage: "Intelligent Built Environment",
    details:
      "This strategy allows for a building to maximize its occupied hours during its lifespan."
  },
  {
    title: "Modular design",
    sourceActor: "Modular design",
    stage: "Intelligent Built Environment",
    details:
      "Modularity can allow a new use of the same building parts which extends its lifespan."
  },
  {
    title: "Modular design",
    sourceActor: "Modular design",
    stage: "End of Design Life",
    details:
      "At the end of design life for a modular design a rearrangement of pieces can be considered after deconstruction which brings the materials into reuse."
  },
  {
    title: "Designing for adaptive reuse",
    sourceActor: "Designing for adaptive reuse",
    stage: "Intelligent Built Environment",
    details:
      "This design process allows a building to be reused as its needs evolve."
  },
  {
    title: "Designing for material optimization",
    sourceActor: "Designing for material optimization",
    stage: "End of Design Life",
    details:
      "Uncut materials or materials cut to modular sizes are far more likely to make it back into a supply chain at the end of their design life."
  },
  {
    title: "Selling renewable energy",
    sourceActor: "Selling renewable energy",
    stage: "Resource Exchange",
    details:
      "Selling energy back to the grid plugs a building into a larger economic system."
  },
  {
    title: "Internet of things/BIM for operations",
    sourceActor: "Internet of things/BIM for operations",
    stage: "Design and Deliver",
    details:
      "The BIM model is created during design and utilized through end of design life."
  },
  {
    title: "Space utilization",
    sourceActor: "Space utilization",
    stage: "Design and Deliver",
    details:
      "This must be planned for and considered early in the design phase of a project to be successful in practice."
  },
  {
    title: "Existing structure",
    sourceActor: "Existing structure",
    stage: "Resource Exchange",
    details:
      "At the inception of a demo / rebuild project the existing structure can be utilized to reduce the introduction of new materials."
  },
  {
    title: "Existing structure",
    sourceActor: "Existing structure",
    stage: "Design and Deliver",
    details:
      "Using an existing structure needs consideration and planning during design and construction."
  },
  {
    title: "Existing structure",
    sourceActor: "Existing structure",
    stage: "End of Design Life",
    details:
      "This is relevant at the end of design life as it will change the way a building is demolished if its bones are to be reused."
  },
  {
    title: "Adaptive reuse of existing building",
    sourceActor: "Adaptive reuse of existing building",
    stage: "Design and Deliver",
    details:
      "If a future use of a building is known it is important to consider this during design."
  },
  {
    title: "Harvesting grey water",
    sourceActor: "Harvesting grey water",
    stage: "Design and Deliver",
    details: "Needs consideration and planning during design and construction."
  },
  {
    title: "Harvesting runoff",
    sourceActor: "Harvesting runoff",
    stage: "Design and Deliver",
    details: "Needs consideration and planning during design and construction."
  },
  {
    title: "Natural lighting and ventilation",
    sourceActor: "Natural lighting and ventilation",
    stage: "Design and Deliver",
    details: "Needs consideration and planning during design and construction."
  },
  {
    title: "Upcycling",
    sourceActor: "Upcycling",
    stage: "Resource Exchange",
    details:
      "The logistics of storing, distributing and remanufacturing are a big component of realizing the upcycling of materials."
  },
  {
    title: "Upcycling",
    sourceActor: "Upcycling",
    stage: "Design and Deliver",
    details:
      "When specifying materials during the design process there should be attention paid to the needs of upcycled materials, if there isn’t an inherent plan for recovery that should be folded into the design."
  },
  {
    title: "Downcycling",
    sourceActor: "Downcycling",
    stage: "Resource Exchange",
    details:
      "The logistics of storing, distributing and remanufacturing are a big component of realizing downcycling of materials."
  },
  {
    title: "Downcycling",
    sourceActor: "Downcycling",
    stage: "Design and Deliver",
    details:
      "When specifying materials during the design process there should be attention paid to the needs materials able to be downcycled, if there isn’t an inherent plan for recovery that should be folded into the design."
  }
];

let categories = [
  {
    text: "Design and Deliver",
    ringText: ["Design and", "Deliver"],
    color: "#358BB0",
    iconPath:
      "http://research.cuningham.com/circular-economy/assets/DesignAndDeliver.svg",
    whiteIconPath:
      "http://research.cuningham.com/circular-economy/assets/DesignAndDeliver-White.svg"
  },
  {
    text: "Intelligent Built Environment",
    ringText: ["Intelligent Built", "Environment"],
    color: "#A6D08F",
    iconPath:
      "http://research.cuningham.com/circular-economy/assets/IntelligentBuiltEnvironment.svg",
    whiteIconPath:
      "http://research.cuningham.com/circular-economy/assets/IntelligentBuiltEnvironment-White.svg"
  },
  {
    text: "End of Design Life",
    ringText: ["End of", "Design Life"],
    color: "#90B47D",
    iconPath:
      "http://research.cuningham.com/circular-economy/assets/EndOfDesignLife.svg",
    whiteIconPath:
      "http://research.cuningham.com/circular-economy/assets/EndOfDesignLife-White.svg"
  },
  {
    text: "Resource Exchange",
    ringText: ["Resource", "Exchange"],
    color: "#61BAE0",
    iconPath:
      "http://research.cuningham.com/circular-economy/assets/BridgingMaterialsAndData.svg",
    whiteIconPath:
      "http://research.cuningham.com/circular-economy/assets/BridgingMaterialsAndData-White.svg"
  }
];

export default new Vuex.Store({
  // strict: process.env.NODE_ENV !== "production",
  state: {
    showDiagramInteractionAlert: true,
    resourcesCsvPath: "/circular-economy/data/resources.csv",
    resourcesData: undefined,
    generalResourcesCsvPath: "/circular-economy/data/general_resources.csv",
    generalResourceData: undefined,
    title: "Circular Economy in the Built Environment",
    actorSelected: false,
    categorySelected: false,
    selectedCategory: undefined,
    categorySelectTracker: undefined,
    categorySelectEnum: 0,
    selectedActor: {
      actor: "",
      buttons: "",
      category: "",
      details: "",
      short: ""
    },
    blankActor: {
      actor: "",
      buttons: "",
      category: "",
      details: "",
      short: ""
    },
    actors,
    buttons,
    categories,
    activities: [
      { text: "Construct", color: "#358BB0" },
      { text: "Use", color: "#A6D08F" },
      { text: "Deconstruct", color: "#90B47D" },
      { text: "Re-Use", color: "#61BAE0" }
    ],
    outterRing: [
      { text: "Compose", color: "#358BB0" },
      { text: "Optimize", color: "#90B47D" }
    ],
    geometry: {
      startRotation: (-1 * Math.PI) / 4 + 0.01,
      // startRotation: 0,
      arrowRotation: Math.PI * 0.04
    }
  },
  mutations: {
    toggleShowDiagramInteractionAlert(state) {
      state.showDiagramInteractionAlert = !state.showDiagramInteractionAlert;
    },
    setResourcesData(state, resourcesData) {
      state.resourcesData = resourcesData;
    },
    setGeneralResourceData(state, resourceData) {
      state.generalResourceData = resourceData;
    },
    selectActor(state, n) {
      if (n == state.blankActor) {
        state.actorSelected = false;
      } else {
        state.actorSelected = true;
      }
      state.selectedActor = n;
    },
    selectCategory(state, n) {
      state.categorySelected = n.toggle;
      if (n.isSource) {
        state.selectedCategory = n.data;
        state.categorySelectTracker = n.sourceType + state.categorySelectEnum;
        state.categorySelectEnum += 1;
      }
    },
    resetDiagram(state) {
      state.categorySelected = false;
      state.actorSelected = false;
      state.selectedActor = {
        actor: "",
        buttons: "",
        category: "",
        details: "",
        short: ""
      };
    },
    buildEvaluationTracking(state) {
      let actorsCopy = JSON.parse(JSON.stringify(state.actors));
      for (let actor of actorsCopy) {
        if (actor.evalSelected == undefined) {
          actor.evalSelected = false;
        }
      }
      state.actors = actorsCopy;
    },
    actorEvalSelected(state, actorData) {
      let actorsCopy = JSON.parse(JSON.stringify(state.actors));
      for (let actor of actorsCopy) {
        if (actor.actor == actorData.actor) {
          actor.evalSelected = !actor.evalSelected;
        }
      }
      state.actors = actorsCopy;
    },
    setState(state, n) {
      state[n.key] = n.val;
    }
  },
  getters: {
    selectedActorColor: state => {
      let actorColor = "gray";
      for (let cat of state.categories) {
        if (cat.text == state.selectedActor.category) {
          actorColor = cat.color;
        }
      }
      return actorColor;
    },
    getButtons: state => {
      let combinedStages = state.categories.concat(state.activities);
      let activeButtons = [];
      for (let button of state.buttons) {
        if (button.sourceActor == state.selectedActor.actor) {
          let matched = false;
          for (let stage of combinedStages) {
            if (button.stage == stage.text) {
              button.color = stage.color;
              button.iconPath = stage.iconPath;
              button.whiteIconPath = stage.whiteIconPath;
              matched = true;
              break;
            }
          }
          if (!matched) {
            button.color = "gray";
            button.iconPath = undefined;
          }
          activeButtons.push(button);
        }
      }
      return activeButtons;
    },
    getLifeCycles: state => {
      let lifeCycles = [];
      for (let actor of state.actors) {
        if (!lifeCycles.includes(actor.category)) {
          lifeCycles.push(actor.category);
        }
      }
      return lifeCycles;
    },
    getActorsForEvaluation: state => {
      let actorsForEval = state.actors.filter(actor => {
        if ("eval" in actor && "evalPoints" in actor) {
          return true;
        } else {
          return false;
        }
      });
      return actorsForEval;
    }
  },
  actions: {},
  modules: {}
});
