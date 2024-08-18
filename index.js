import {
  consoliateObjectsById,
  createAWObject,
  distinctProperty,
  extractIds,
  extractObjectsByType,
} from './utils.js';

const testDataOne = [
  { id: 'a', title: 'alpha', type: 'Beta' },
  { id: 'b', title: 'beta' },
];
const testDataTwo = [
  { uuid: 'b', label: 'beta', type: 'Beta' },
  { uuid: 'c', label: 'gamma' },
].map(obj => ({ ...obj, id: obj.uuid }));
const testDataThree = [{ type: 'Delta', title: 'delta' }];

// console.table(testDataOne);
// console.table(testDataTwo);
// console.table(testDataThree);

// Query Plug-in
// Extract distinct Ids
const distinctIds = distinctProperty(
  extractIds(testDataOne),
  extractIds(testDataTwo),
  extractIds(testDataThree)
);
console.log('distinctIds', distinctIds);

console.log('\nconsoliatedObjects');
const consoliatedObjects = consoliateObjectsById(
  'id',
  distinctIds,
  testDataOne,
  testDataTwo,
  testDataThree
);
console.table(consoliatedObjects);

console.log('\nconsolidatedAWObjects');
const consolidatedAWObjects = consoliatedObjects.map(obj =>
  createAWObject(obj)
);
console.table(consolidatedAWObjects);

// Transform Plug-in
console.log('\ntransform (extracted) nodes');
const trasnformNodes = extractObjectsByType(
  consolidatedAWObjects,
  'Alpha',
  'Beta'
);
console.table(trasnformNodes);
