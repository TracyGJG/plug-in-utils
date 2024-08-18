function createObjectId() {
  return `AW_${Math.random()}`;
}

export function extractIds(srcArr, propName = 'id') {
  return srcArr.map(obj => {
    if (!obj.hasOwnProperty(propName) || !obj[propName]) {
      obj[propName] = createObjectId();
    }
    return obj[propName];
  });
}

export function distinctProperty(...idArrs) {
  return [...new Set(idArrs.flat())];
}

export function consoliateObjectsById(idProp, objIds, ...srcArrays) {
  const consolidatedObjects = srcArrays.flat();
  return objIds.map(id =>
    consolidatedObjects
      .filter(obj => obj[idProp] === id)
      .reduce((_, __) => ({ ..._, ...__ }), {})
  );
}

export function createAWObject(
  sourceObject,
  objectTypeLogic = obj => obj.type
) {
  const awObject = structuredClone(sourceObject);
  !awObject.data && (awObject.data = {});
  awObject.uuid && (awObject.data.originalUuid = awObject.uuid);
  awObject.uuid = createObjectId();
  awObject.type && (awObject.data.originalType = awObject.type);
  awObject.type = objectTypeLogic(awObject);
  return awObject;
}

export function extractObjectsByType(objectsArray, ...types) {
  return objectsArray.filter(obj => types.includes(obj.type));
}
