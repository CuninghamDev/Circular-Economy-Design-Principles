<template>
  <div class="container-fluid mt-4">
    <div class="row p-4 pb-0">
      <div class="col-xl-6 grey grey lighten-4 elevation-2 rounded-lg">
        <h3>About The Circular Economy Toolkit</h3>
        <p>
          This toolkit is one of the products of an ongoing R+D effort by
          Cuningham. This work reflects a broader push across our studios and
          design practices to embody the principles of regenerative design.
        </p>
        <p>
          This toolkit grew out of internal research efforts that included an
          extensive literature review, a self assessment of several of our past
          designs, and internal deliberations regarding how circularity can
          begin to be implemented in conventional design projects. Currently
          this toolkit includes an interactive diagram that visualizes common
          ways circular economy principles can be applied in the built
          environment, and links to numerous external resources that can help
          someone get up to speed on the details of these topics.
        </p>
      </div>
    </div>
    <div class="row p-4 pb-0">
      <div class="col-xl-6 grey grey lighten-4 elevation-2 rounded-lg">
        <h3>Future Development Goals</h3>
        <p>
          This site is under continued development, and the next major
          development push is planning to include the following features...
        </p>
        <ul>
          <li>A set of pages for selecting circular design goals</li>
          <li>
            A set of pages for tracking a project's delivery on its circular
            design goals
          </li>
        </ul>
      </div>
    </div>
    <div class="row p-4 pb-0">
      <div class="col-xl-6 grey grey lighten-4 elevation-2 rounded-lg">
        <h3>Contribute Ideas</h3>
        <p>
          We are building a form that will allow you to contribute your insights
          and ideas to this project. This feature is coming soon!
        </p>
      </div>
    </div>
    <div class="row p-4 pb-0">
      <div class="col-xl-6 grey grey lighten-4 elevation-2 rounded-lg">
        <h3>Get in Touch</h3>
        <p>
          We are always looking for new partners and collaborators in our work
          to improve the built environment. We are planning to build a contact
          form, but for the meantime reach out to Cuningham and we will make
          sure you get in touch with the right people!
        </p>
      </div>
    </div>
    <div class="row p-4 pb-0">
      <div class="col-xl-6 grey grey lighten-4 elevation-2 rounded-lg">
        <div class="container m-0 p-0">
          <div class="row m-0 p-0">
            <div class="col-8 m-0 p-0">
              <h3>Open Source</h3>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
        <p>
          This toolkit is being developed as open source software, and is
          licensed with an MIT License.
          <v-btn
            class="mt-2"
            color="grey darken-3"
            dark
            rounded
            @click="openGithubLink()"
          >
            <v-icon class="pr-2">mdi-github</v-icon>
            Source Code
          </v-btn>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  methods: {
    openGithubLink() {
      window.open(
        "https://github.com/dschipperCuningham/Circular-Economy-Design-Principles",
        "_blank"
      );
    }
  }
};
</script>
