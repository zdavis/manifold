import { normalize, Schema, arrayOf } from 'normalizr';
import { camelizeKeys } from 'humps';

const schema = {
  text: new Schema('texts'),
  textSection: new Schema('textSections')
};
schema.texts = arrayOf(schema.text);
schema.text.define({
  attributes: {
    textSections: arrayOf(schema.textSection),
    tocSection: schema.textSection
  }
});

function cleanAPIObject(obj) {
  let newObj = Object.assign({}, obj);
  if(newObj.hasOwnProperty('relationships')) {
    delete newObj['relationships'];
  }
  return newObj;
}

function callAPI(endpoint, schema) {

  return fetch(endpoint)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json().then(json => {
        return { json, response };
      }, () => {
        return { response };
      });
    }
    ).then(({ json }) => {
      let cleanedJson = camelizeKeys(json.data);
      if(cleanedJson instanceof Array) {
        cleanedJson = cleanedJson.map((obj) => {
          return cleanAPIObject(obj);
        });
      } else {
        cleanedJson = cleanAPIObject(cleanedJson);
      }

      const out = normalize(cleanedJson, schema);
      return out;
    });
}

export default {

  texts: function() {
    return callAPI('/api/v1/texts.json', schema.texts);
  },

  text: function(id) {
    return callAPI(`/api/v1/texts/${id}.json`, schema.text);
  }

};

