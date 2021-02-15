import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    actors: [
      {
        actor: "Open source design",
        short: "Open Source",
        details:
          "Open source solutions can help propagate circular concepts to a larger audience (e.g. wikihouse/shared solutions)",
        buttons: [],
        category: "Resource Exchange"
      },
      {
        actor: "Material passports",
        short: "Material Passports",
        details:
          "Material passports are with a material throughout its entire life to ensure its continuous use and circulation.  The product may be in use as part of a building, in a storage facility ready for reuse, or with a manufacturer ready for upcycling/downcycling. It is the material’s passport that allows designers and builders to find these materials to specify for their projects.",
        buttons: ["Material passports"],
        category: "Resource Exchange"
      },
      {
        actor: "Storage and distribution facilities",
        short: "Storage and Distribution",
        details:
          "Physical marketplaces and services that enable harvest, holding, and distribution of materials from demolitions and other industries.",
        buttons: ["Storage and distribution facilities"],
        category: "Resource Exchange"
      },
      {
        actor: "Connecting salvage supply and demand",
        short: "Connecting",
        details:
          "Online platforms that utilized an inventory of materials in their data form to by-pass physical warehouses and connect supply and demand of salvaged materials directly from site to site.",
        buttons: ["Connecting salvage supply and demand"],
        category: "Resource Exchange"
      },
      {
        actor: "Remanufacturing salvaged materials",
        short: "Remanufacturing",
        details:
          "When used material is modified into superior product. In this case these materials would otherwise go to a landfill or a recycling facility vs being upcycled. The remanufacturer then has the opportunity to give the new material a passport.",
        buttons: [],
        category: "Resource Exchange"
      },
      {
        actor: "Capturing waste material from other industries",
        short: "Capturing Waste",
        details:
          "Also called “Industrial Symbiosis,” captures waste from unrelated industries (e.g. agriculture) and turns them into useful products (e.g. hempcrete, straw bale).",
        buttons: [],
        category: "Resource Exchange"
      },
      {
        actor: "Brownfield remediation",
        short: "Brownfield Remediation",
        details:
          "Revitalizing brownfields returns contaminated “waste” site into use, prevents development of a greenfield sites, and can restores habitat.",
        buttons: [],
        category: "Resource Exchange"
      },
      {
        actor: "Take-back services",
        short: "Take-back Services",
        details:
          "Collection services offered by manufacturers/suppliers at the end of their product lifecycle for re-manufacturing and upcycling (e.g. ceiling tile, carpet). This service depends heavily on demo entities involving manufacturers at the end of design life.",
        buttons: ["Take-back services"],
        category: "Resource Exchange"
      },
      {
        actor: "Leased materials",
        short: "Leased Materials",
        details:
          "Contracts that can be made with supplier or manufacturer to take back their product for reuse or replacement at the end of its use or lifespan. This differs from take-back services in that the materials are still owned by manufacturer, have a contract attached to them, and a plan for recovery that is upheld by supplier.",
        buttons: ["Leased Materials"],
        category: "Resource Exchange"
      },
      {
        actor: "Product as a service (Paas)",
        short: "Product as a Service",
        details:
          "Manufacturer retains ownership of the products (e.g. light fixtures) and instead sells their performance (e.g. light). This allows clients to purchase a desired product output vs the equipment itself, as a result creating an incentive for manufacturers to create long lasting/dependable equipment.",
        buttons: ["Product as a service"],
        category: "Resource Exchange"
      },
      {
        actor: "Optimizing material transportation",
        short: "Material Transportation",
        details:
          "Sourcing local materials and making sure they are efficiently loaded onto transport eliminates the waste of resources that occurs in transporting materials by minimizing the number of trips and miles to and on the construction site.",
        buttons: ["Product as a service"],
        category: "Resource Exchange"
      },
      {
        actor: "Demountable design",
        short: "Demountable Design",
        details:
          "Demountability enables material re-use on a different project in case it is no longer needed prior to the end of its lifespan. This becomes important during the design process as it has a large impact on how joints and details are designed. Mechanical fasteners enable various materials to be demounted, separated, and re-used at the end of life which is often impossible with adhesives.",
        buttons: ["Demountable design"],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for mixed-use",
        short: "Mixed-Use",
        details:
          "Ability to accommodate various building programs can optimize a building’s use and minimize waste of existing building stock.",
        buttons: ["Desinging for mixed-use"],
        category: "Design and Deliver"
      },
      {
        actor: "Modular design",
        short: "Modular Design",
        details:
          "Modular design enables pre-fabrication and standardization of elements which can drive further optimization.",
        buttons: ["Modular design"],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for adaptive reuse",
        short: "Adaptive Reuse",
        details:
          "Ability to evolve into new future programs can prolong building’s life and minimize waste of existing building stock. The more adaptable and durable the structure is, the more chances there are for it to survive changes in societal and user needs and therefore prevent premature end of life.",
        buttons: ["Desinging for adaptive reuse"],
        category: "Design and Deliver"
      },
      {
        actor: "Maximizing space utilization",
        short: "Utilization",
        details:
          "Making sure the building program is designed to maximize use of all spaces, designing out superfluous square footage in the plan to save on materials and energy.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for material optimization",
        short: "Material Optimization",
        details:
          "Designing with and cutting materials to modular or off-the-shelf dimensions reduces on site waste of materials by minimizing unusable scrap pieces and gives the materials a better chance of being reused.",
        buttons: ["Designing for material optimization"],
        category: "Design and Deliver"
      },
      {
        actor: "3D printing cradle to cradle material",
        short: "3D Printing",
        details: "3D printing allows for minimal construction waste.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Prefabrication",
        short: "Prefabrication",
        details:
          "Pre-fabrication enables construction in controlled environment and greater material/energy efficiency.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Selling renewable energy",
        short: "Renewable Energy",
        details: "Enables use of surplus green energy generated on site.",
        buttons: ["Selling renewable energy"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Internet of Things/BIM for Operations",
        short: "Operations",
        details:
          "Use of sensors, tracking systems and management software can assist with more effective operations and timely maintenance to prolong a building’s life.",
        buttons: ["Internet of things/BIM for operations"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Space utilization",
        short: "Space Utilization",
        details:
          "Web-based platforms can help to match underutilized spaces (e.g. office, homes) with potential users (e.g. Airbnb, WeWork).",
        buttons: ["Space utilization"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Existing structure",
        short: "Existing Structure",
        details:
          "The structure of a building can be reused for a future project, diverting it all from potential waste.",
        buttons: ["Existing structure"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Adaptive reuse of existing building",
        short: "Adaptive Reuse",
        details:
          "Prolongs life of the building and diverts existing structure from landfill.",
        buttons: ["Adaptive reuse of existing building"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Harvesting grey water",
        short: "Harvesting Grey Water",
        details:
          "Reusing the buildings water reduces water waste by keeping the water in use for longer.",
        buttons: ["Harvesting grey water"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Harvesting runoff",
        short: "Harvesting Runoff",
        details:
          "Harvesting runoff reduces water waste and utilizes the natural regenerative nature of the site.",
        buttons: ["Harvesting runoff"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Natural lighting and ventilation",
        short: "Light and Ventilation",
        details:
          "Can help minimize operational waste related to lighting and mechanical systems.",
        buttons: ["Natural lighting and ventilation"],
        category: "Intelligent Built Envr."
      },
      {
        actor: "Upcycling",
        short: "Upcycling",
        details:
          "Materials/elements can be designed with future upcycling in mind, therefore designing a longer material lifespan. This type of reuse requires a material to be of the same or higher quality or value than its original state. These materials may not capture waste streams but have proven to be upcycled in their own processes.",
        buttons: ["Upcycling"],
        category: "End of Design Life"
      },
      {
        actor: "Downcycling",
        short: "Downcycling",
        details:
          "Materials/elements can be designed with future uses in mind, therefore designing a longer material lifespan. This type of reuse allows the material to have a new use that is of lesser quality and functionality than its original state ie plywood to osb board to mdf board or biodegradable materials.",
        buttons: ["Downcycling"],
        category: "End of Design Life"
      },
      {
        actor: "Salvaged materials from demolitions",
        short: "Salvaged",
        details:
          "Diversion of materials from landfill for upcycling, re-use, or recycling. This can include harvesting from the project’s site or other demolitions.",
        buttons: [],
        category: "End of Design Life"
      }
    ],
    buttons: [
      {
        title: "Material passports",
        sourceActor: "Material passports",
        stage: "Intelligent Built Envr.",
        details:
          "passports can be folded into BIM to track a material’s integrity and lifespan."
      },
      {
        title: "Material passports",
        sourceActor: "Material passports",
        stage: "End of Design Life",
        details:
          "passports ensure materials are not lost in transition at the end of the buildings design life."
      },
      {
        title: "Storage and distribution facilities",
        sourceActor: "Storage and distribution facilities",
        stage: "End of Design Life",
        details:
          "these services are used at the end of a buildings design life to bring the disassembled pieces back into circulation for reuse."
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
          "when specifying materials during the design process this becomes an option for specifying a material that can be recovered."
      },
      {
        title: "Take-back services",
        sourceActor: "Take-back services",
        stage: "End of Design Life",
        details:
          "these products have a recovery plan that needs following through at the end of design life."
      },
      {
        title: "Leased materials",
        sourceActor: "Leased materials",
        stage: "Design and Deliver",
        details:
          "when specifying materials during the design process this becomes an option for specifying a material that will be recovered."
      },
      {
        title: "Leased materials",
        sourceActor: "Leased materials",
        stage: "End of Design Life",
        details:
          "these products have a recovery plan that needs following through at the end of design life."
      },
      {
        title: "Product as a service",
        sourceActor: "Product as a service",
        stage: "Design and Deliver",
        details:
          "when specifying materials during the design process this becomes an option for specifying a material that will be recovered."
      },
      {
        title: "Product as a service",
        sourceActor: "Product as a service",
        stage: "Intelligent Built Envr.",
        details:
          "suppliers can use BIM to track their product performance throughout its lifespan."
      },
      {
        title: "Product as a service",
        sourceActor: "Product as a service",
        stage: "End of Design Life",
        details:
          "these products have a recovery plan that needs following through at the end of design life."
      },
      {
        title: "Demountable design",
        sourceActor: "Demountable design",
        stage: "End of Design Life",
        details:
          "makes recovery of reusable materials possible during deconstruction."
      },
      {
        title: "Designing for mixed-use",
        sourceActor: "Designing for mixed-use",
        stage: "Intelligent Built Envr.",
        details:
          "this strategy allows for a building to maximize its occupied hours during its lifespan."
      },
      {
        title: "Modular design",
        sourceActor: "Modular design",
        stage: "Intelligent Built Envr.",
        details:
          "modularity allows for a new use of the same building part which extends its lifespan."
      },
      {
        title: "Modular design",
        sourceActor: "Modular design",
        stage: "End of Design Life",
        details:
          "at the end of design life for a modular design a rearrangement of pieces can be considered after deconstruction."
      },
      {
        title: "Designing for adaptive reuse",
        sourceActor: "Designing for adaptive reuse",
        stage: "Intelligent Built Envr.",
        details:
          "this design process allows a building to be reused as its needs evolve."
      },
      {
        title: "Designing for material optimization",
        sourceActor: "Designing for material optimization",
        stage: "End of Design Life",
        details:
          "uncut materials or materials cut to modular sizes are far more likely to make it back into a supply chain at the end of their design life."
      },
      {
        title: "Selling renewable energy",
        sourceActor: "Selling renewable energy",
        stage: "Resource Exchange",
        details:
          "selling energy back to the grid plugs a building into a bigger economic system."
      },
      {
        title: "Internet of things/BIM for operations",
        sourceActor: "Internet of things/BIM for operations",
        stage: "Design and Deliver",
        details:
          "the utilized BIM model is created in design and utilized through end of design life."
      },
      {
        title: "Space utilization",
        sourceActor: "Space utilization",
        stage: "Design and Deliver",
        details:
          "this has to be planned for and considered early on in the design phase of a project to be successful in practice."
      },
      {
        title: "Existing structure",
        sourceActor: "Existing structure",
        stage: "Resource Exchange",
        details:
          "at the inception of a demo/rebuild project the existing structure can be utilized to reduce the introduction of new materials."
      },
      {
        title: "Existing structure",
        sourceActor: "Existing structure",
        stage: "Design and Deliver",
        details:
          "using an existing structure needs consideration and planning during design and construction."
      },
      {
        title: "Existing structure",
        sourceActor: "Existing structure",
        stage: "End of Design Life",
        details:
          "this is relevant at the end of design life as it will change the way a building is demoed if its bones are to be reused."
      },
      {
        title: "Adaptive reuse of existing building",
        sourceActor: "Adaptive reuse of existing building",
        stage: "Design and Deliver",
        details:
          "if a future use of a building is known it is important to consider this during design."
      },
      {
        title: "Harvesting grey water",
        sourceActor: "Harvesting grey water",
        stage: "Design and Deliver",
        details:
          "needs consideration and planning during design and construction."
      },
      {
        title: "Harvesting runoff",
        sourceActor: "Harvesting runoff",
        stage: "Design and Deliver",
        details:
          "needs consideration and planning during design and construction."
      },
      {
        title: "Natural lighting and ventilation",
        sourceActor: "Natural lighting and ventilation",
        stage: "Design and Deliver",
        details:
          "needs consideration and planning during design and construction."
      },
      {
        title: "Upcycling",
        sourceActor: "Upcycling",
        stage: "Resource Exchange",
        details:
          "the logistics of storing, distributing and remanufacturing are a big part in realizing upcycling of materials."
      },
      {
        title: "Upcycling",
        sourceActor: "Upcycling",
        stage: "Design and Deliver",
        details:
          "when specifying materials during the design process there needs to be attention to the needs of upcycled materials, if there isn’t an inherent plan for recovery that needs to be folded into the design."
      },
      {
        title: "Downcycling",
        sourceActor: "Downcycling",
        stage: "Resource Exchange",
        details:
          "the logistics of storing, distributing and remanufacturing are a big part in realizing downcycling of materials."
      },
      {
        title: "Downcycling",
        sourceActor: "Downcycling",
        stage: "Design and Deliver",
        details:
          "when specifying materials during the design process there needs to be attention to the needs of downcycling materials, if there isn’t an inherent plan for recovery that needs to be folded into the design."
      }
    ],
    categories: [
      {
        text: "Design and Deliver",
        color: "#358BB0",
        iconPath:
          "http://research.cuningham.com/circular-economy/assets/DesignAndDeliver.svg",
        whiteIconPath:
          "http://research.cuningham.com/circular-economy/assets/DesignAndDeliver-White.svg"
      },
      {
        text: "Intelligent Built Envr.",
        color: "#A6D08F",
        iconPath:
          "http://research.cuningham.com/circular-economy/assets/IntelligentBuiltEnvironment.svg",
        whiteIconPath:
          "http://research.cuningham.com/circular-economy/assets/IntelligentBuiltEnvironment-White.svg"
      },
      {
        text: "End of Design Life",
        color: "#90B47D",
        iconPath:
          "http://research.cuningham.com/circular-economy/assets/EndOfDesignLife.svg",
        whiteIconPath:
          "http://research.cuningham.com/circular-economy/assets/EndOfDesignLife-White.svg"
      },
      {
        text: "Resource Exchange",
        color: "#61BAE0",
        iconPath:
          "http://research.cuningham.com/circular-economy/assets/BridgingMaterialsAndData.svg",
        whiteIconPath:
          "http://research.cuningham.com/circular-economy/assets/BridgingMaterialsAndData-White.svg"
      }
    ],
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
    selectActor(state, n) {
      state.selectedActor = n;
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
    }
  },
  actions: {},
  modules: {}
});
