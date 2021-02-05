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
    actors: [
      {
        actor: "Participating in open source design",
        short: "Open Source",
        details:
          "Open source solutions can help propagate circular concepts to a larger audience (e.g. wikihouse/shared solutions)",
        buttons: [],
        category: "Exchange"
      },
      {
        actor: "Tracking material passports",
        short: "Material Passports",
        details:
          "Material passports are with a material throughout its entire life to ensure its continuous use. During Exchange, the product may be either in a building ready for demo, in a storage facility ready for delivery, or with a manufacturer ready for upcycling. It is the materials passport that allows designers and builders to find these materials to specify for their projects.",
        buttons: [],
        category: "Exchange"
      },
      {
        actor: "Storing and distributing upcycled materials",
        short: "Distribution",
        details:
          "Physical marketplace and services to enable harvest and distribution of materials from demolitions and other industries.",
        buttons: ["Upcycling"],
        category: "Exchange"
      },
      {
        actor: "Connecting salvage supply and demand via online platforms",
        short: "Online Platforms",
        details:
          "By-passing physical warehouse, an online platform can connect supply and demand of salvaged materials directly from site to site.",
        buttons: [],
        category: "Exchange"
      },
      {
        actor: "Remanufacturing salvaged materials into new products",
        short: "Remanufacturing",
        details:
          "When used material is modified into superior product. In this case these materials would otherwise go to a landfill or a recycling facility vs being upcycled. The remanufacturer then has the opportunity to give the new material a passport.",
        buttons: [],
        category: "Exchange"
      },
      {
        actor: "Capturing waste material from other industries",
        short: "Capturing Waste",
        details:
          "Also called “Industrial Symbiosis,” captures waste from unrelated industries (e.g. agriculture) and turns them into useful products (e.g. hempcrete, straw bale)",
        buttons: [],
        category: "Exchange"
      },
      {
        actor: "Designing for demountability",
        short: "Demountability",
        details:
          "Demountability enables material re-use on a different project in case it is no longer needed prior to end of its lifespan. This becomes important during the design process as it has a large impact on how joints and details are designed.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for future recovery",
        short: "Future Recovery",
        details:
          "Ensuring the design is demountable and has a plan is in place for who is accountable to recover materials.",
        buttons: [
          "Take-back services",
          "Product as service systems",
          "Upcycling"
        ],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for adaptation and mixed-use",
        short: "Adaptation",
        details:
          "Ability to accommodate various building programs can prolong building’s life and minimize waste of existing building stock.",
        buttons: ["Multispace and mixed-use", "Space sharing"],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for modularity",
        short: "Modularity",
        details:
          "Modular design enables pre-fabrication and standardization of elements which can drive further optimization.",
        buttons: [],
        category: "Design and Deliver"
      },
      // {
      //     actor: 'Designing for future adaptation',
      //     short: ''
      //     details:
      //         'Ability to accommodate various building programs can prolong building’s life and minimize waste of existing building stock.',
      //     buttons: ['Adaptive reuse of existing building'],
      //     category: 'Design and Deliver',
      // },
      {
        actor: "Maximizing space utilization",
        short: "Maximize Utilization",
        details:
          "Making sure that building program is designed to maximize use of all spaces.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Designing for longevity",
        short: "Longevity",
        details:
          "The more adaptable the structure is, the more chances there are for it to survive changes in societal and user needs and therefore prevent premature end of life.",
        buttons: [],
        category: "Design and Deliver"
      },
      {
        actor: "Selling renewable energy back to the grid",
        short: "Back to the Grid",
        details: "Enables use of surplus green energy generated on site.",
        buttons: [],
        category: "Intelligent Buildings"
      },
      {
        actor: "Internet of Things/BIM for Operations",
        short: "Digital Twin",
        details:
          "Use of sensors, tracking systems and management software can assist with more effective operations and timely maintenance to prolong building’s life.",
        buttons: ["Product as service systems", "Tracking material passports"],
        category: "Intelligent Buildings"
      },
      {
        actor: "Utilizing online platforms to facilitate space sharing",
        short: "Space Sharing",
        details:
          "Web-based platforms can help to match underutilized spaces (e.g. office, homes) with potential users (e.g. Airbnb, WeWork).",
        buttons: [],
        category: "Intelligent Buildings"
      },
      {
        actor: "Upcycling",
        short: "Upcycling",
        details:
          "Materials/elements can be designed with future upcycling in mind therefore designing a longer material lifespan. Upcycling commences when these elements reach their end of design life and are considered for their next use.",
        buttons: [
          "Designing for future recovery",
          "Low impact materials – cradle to cradle"
        ],
        category: "End of Design Life"
      },
      {
        actor: "Utilizing take-back service material providers",
        short: "Take Back Services",
        details:
          "Collection services offered by manufacturers/suppliers at the end of their product lifecycle for re-manufacturing and recycling (e.g. ceiling tile, carpet).",
        buttons: [
          "Product as service systems",
          "Leased building materials from manufacturer/supplier"
        ],
        category: "End of Design Life"
      }
    ],
    buttons: [
      {
        title: "Tracking material passports",
        sourceActor: "Tracking material passports",
        destinationActor: "Internet of Things/BIM for Operations",
        stage: "Intelligent Buildings",
        details:
          "passports can be folded into BIM during the lifespan of a building."
      },
      {
        title: "Tracking material passports",
        sourceActor: "Tracking material passports",
        destinationActor: undefined,
        stage: "Deconstruct",
        details:
          "at the end of life passports allow the materials to not get lost in transition."
      },
      {
        title: "Storage and distribution services for salvaged materials",
        sourceActor: "Storing and Distributing Upcycled Materials",
        destinationActor: undefined,
        stage: "Deconstruct",
        details:
          "During deconstruction these services are relevant as they are used to bring the disassemble pieces back into the exchange realm."
      },
      {
        title:
          "Connecting salvaged materials supply and demand via online platforms",
        sourceActor:
          "Connecting salvage supply and demand via online platforms",
        destinationActor: undefined,
        stage: "End of Design Life",
        details:
          "the accountability of these connections becomes very relevant at the end of design life."
      },
      // {
      //   title: "Brownfield remediation",
      //   sourceActor: "Brownfield remediation",
      //   destinationActor: undefined,
      //   stage: "Reuse / Use",
      //   details:
      //     "Although this becomes predominantly relevant as resourcing something, as it is repurposing a site, brownfields are adding a use to a site otherwise wasted making it relevant in reuse."
      // },
      {
        title: "Demountable design",
        sourceActor: "Designing for demountability",
        stage: "Design and Deliver",
        details:
          "Makes recovery of reusable materials possible during deconstruction."
      },
      {
        title: "Desinging for future recovery",
        sourceActor: "Desinging for future recovery",
        destinationActor: "Upcycling",
        stage: "End of Design Life",
        details: "necessary to upcycle"
      },
      {
        title: "Renewable energy",
        sourceActor: "Selling renewable energy back to the grid",
        destinationActor: undefined,
        stage: "Design and Deliver",
        details:
          "Makes selling energy back to the grid and involvement in a bigger economic system possible."
      },
      {
        title: "Modeling for future data exchange and use (IoT/BIM)",
        sourceActor: "Internet of Things/BIM for Operations",
        destinationActor: undefined,
        stage: "Design and Deliver",
        details:
          "model is created in design and utilized through end of design life."
      },
      {
        title: "Space sharing",
        sourceActor: "Utilizing online platforms to facilitate space sharing",
        destinationActor: "Designing for mixed-use",
        stage: "Design and Deliver",
        details:
          "this has to be planned for and considered early on in the design phase of a project to be successful in practice."
      },
      {
        title: "Online platform to facilitate space sharing",
        sourceActor: "Utilizing online platforms to facilitate space sharing",
        destinationActor: undefined,
        stage: "Reuse / Use",
        details:
          "These platforms can ensure a building is used and reused to its full capacity during its lifecycle. "
      }
    ],
    categories: [
      { text: "Design and Deliver", color: "#358BB0" },
      { text: "Intelligent Buildings", color: "#A6D08F" },
      { text: "End of Design Life", color: "#90B47D" },
      { text: "Exchange", color: "#61BAE0" }
    ],
    activities: [
      { text: "Construct", color: "#358BB0" },
      { text: "Reuse / Use", color: "#A6D08F" },
      { text: "Deconstruct", color: "#90B47D" },
      { text: "Resource / Source", color: "#61BAE0" }
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
              matched = true;
              break;
            }
          }
          if (!matched) {
            button.color = "gray";
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
