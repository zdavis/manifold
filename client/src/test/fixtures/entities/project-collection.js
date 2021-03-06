import abilities from "../structures/abilities";

const projectCollection = () => ({
  type: "projectCollections",
  attributes: {
    title: "A Project Collection",
    sortOrder: "manual",
    manuallySorted: true,
    smart: false,
    featuredOnly: false,
    numberOfProjects: null,
    tagList: [],
    icon: "lamp",
    abilities: abilities()
  },
  relationships: {
    collectionProjects: [],
    subjects: [],
    projects: []
  }
});

export default projectCollection;
