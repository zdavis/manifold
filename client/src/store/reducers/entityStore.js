import { handleActions } from 'redux-actions';

const initialState = {
  responses: {},
  entities: {}
};


function normalizeCollection(payload) {
  const entities = {};
  const results = [];
  payload.data.forEach((entity) => {
    if (!entities.hasOwnProperty(entity.type)) {
      entities[entity.type] = {};
    }
    entities[entity.type][entity.id] = entity;
    results.push({ id: entity.id, type: entity.type });
  });
  return { entities, results };
}

function normalizeEntity(payload) {
  const entity = payload.data;
  const entities = {
    [entity.type]: {}
  };
  const results = { id: entity.id, type: entity.type };
  entities[entity.type][entity.id] = entity;
  return { entities, results };
}

function normalizePayload(payload) {
  let out;
  if (payload === null) return out;
  if (Array.isArray(payload.data)) {
    out = normalizeCollection(payload);
  } else {
    out = normalizeEntity(payload);
  }
  payload.included.forEach((entity) => {
    if (entity) {
      if (!out.entities.hasOwnProperty(entity.type)) {
        out.entities[entity.type] = {};
      }
      out.entities[entity.type][entity.id] = entity;
    }
  });
  return out;
}

const mergeEntities = (stateEntities, payloadEntities) => {
  const mergedEntities = {};
  Object.keys(payloadEntities).forEach((key) => {
    mergedEntities[key] = Object.assign({}, stateEntities[key], payloadEntities[key]);
  });
  return Object.assign({}, stateEntities, mergedEntities);
};

function errorResponse(state, action) {
  const meta = action.meta;
  const responses = Object.assign({}, state.responses, {
    [meta]: {
      error_desc: action.payload.heading,
      error_code: action.payload.id,
      errors: action.payload.body,
      loaded: true
    }
  });
  return Object.assign({}, state, { responses });
}

function successResponse(state, action) {
  const payload = normalizePayload(action.payload);
  const meta = action.meta;
  const isNull = !payload;
  const isCollection = !isNull && Array.isArray(payload.results);
  const isEntity = !isNull && !isCollection;
  const responses = Object.assign({}, state.responses, {
    [meta]: {
      entity: isEntity ? payload.results : null,
      collection: isCollection ? payload.results : null,
      loaded: true
    }
  });
  if (isNull) {
    return Object.assign({}, state, { responses });
  }
  const entities = mergeEntities(state.entities, payload.entities);
  return Object.assign({}, state, { responses, entities });
}

function handleResponse(state, action) {
  const isError = action.error === true;
  return isError ? errorResponse(state, action) : successResponse(state, action);
}

function handleRequest(state, action) {
  const meta = action.meta;
  if (state.responses[meta]) return state;
  const responses = Object.assign({}, state.responses, {
    [meta]: {
      entities: null,
      loaded: false
    }
  });
  return Object.assign({}, state, { responses });
}

function handleFlush(state, action) {
  const metasToFlush = action.payload;
  const responses = Object.assign({}, state.responses);
  metasToFlush.forEach((meta) => {
    delete responses[meta];
  });
  let entities = state.entities;
  if (Object.keys(responses).length === 0) {
    entities = {};
  }
  return Object.assign({}, state, { responses, entities });
}

export default handleActions({
  ENTITY_STORE_REQUEST: handleRequest,
  ENTITY_STORE_RESPONSE: handleResponse,
  ENTITY_STORE_FLUSH: handleFlush
}, initialState);
