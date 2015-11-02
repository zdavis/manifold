import { createSelector } from 'reselect';
import { forEach } from 'lodash';

const textsSelector = state => state.entities.texts;
const sectionsSelector = state => state.entities.textSections;
const routerParamsSelector = state => state.router.params;

export const currentText = createSelector(
  textsSelector,
  routerParamsSelector,
  (texts, routerParams) => (routerParams.textId ? texts[routerParams.textId] : null)
);

export const currentTextSections = createSelector(
  currentText,
  sectionsSelector,
  (text, sections) => {
    let out = {};
    if(text && text.attributes.textSections) {
      forEach(text.attributes.textSections, (sectionId) => {
        out[sectionId] = sections[sectionId];
      });
    }
    return out;
  }
);

export const currentSection = createSelector(
  currentTextSections,
  routerParamsSelector,
  (sections, routerParams) => {
    let section = null;
    if(sections && routerParams.sectionId) {
      section = sections[routerParams.sectionId];
    }
    return section;
  }
);