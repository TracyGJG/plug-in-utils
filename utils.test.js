import {
  consoliateObjectsById,
  createAWObject,
  distinctProperty,
  extractIds,
  extractObjectsByType,
} from './utils.js';

describe('utils', () => {
  describe('consoliateObjectsById', () => {
    test('', () => {
      const testDataOne = [
        { id: 'alpha', label: 'test 1' },
        { id: 'beta', label: 'test 2' },
        { id: 'gamma', label: 'test 3' },
        { id: 'delta', label: 'test 4' },
      ];
      const testDataTwo = [
        { id: 'alpha' },
        { id: 'beta', title: 'test 2' },
        { id: 'gamma', label: 'test 3' },
      ];
      const testDataThree = [];
      const testIds = ['alpha', 'beta', 'gamma', 'delta'];

      const result = consoliateObjectsById(
        'id',
        testIds,
        testDataOne,
        testDataTwo,
        testDataThree
      );
      expect(result.length).toBe(4);
      expect(result).toEqual([
        {
          id: 'alpha',
          label: 'test 1',
        },
        {
          id: 'beta',
          label: 'test 2',
          title: 'test 2',
        },
        {
          id: 'gamma',
          label: 'test 3',
        },
        {
          id: 'delta',
          label: 'test 4',
        },
      ]);
    });
  });

  describe('createAWObject', () => {
    test('with uuid, type, data and logic', () => {
      const testObject = {
        uuid: 'test_uuid',
        type: 'test_type',
        data: {
          test: 'data object',
        },
      };
      const objectTypeLogic = subject => subject.type.toUpperCase();

      const result = createAWObject(testObject, objectTypeLogic);
      expect(result).toBeDefined();
      expect(result.data).toEqual({
        test: 'data object',
        originalType: 'test_type',
        originalUuid: 'test_uuid',
      });
      expect(result.uuid).toBeDefined();
      expect(result.uuid).not.toBe('test_uuid');
      expect(result.type).toBe('TEST_TYPE');
    });

    test('with uuid and type but no data or logic', () => {
      const testObject = {
        uuid: 'test_uuid',
        type: 'test_type',
      };

      const result = createAWObject(testObject);
      expect(result).toBeDefined();
      expect(result.data).toEqual({
        originalType: 'test_type',
        originalUuid: 'test_uuid',
      });
      expect(result.uuid).toBeDefined();
      expect(result.uuid).not.toBe('test_uuid');
      expect(result.type).toBe('test_type');
    });

    test('with empty object but custom logic', () => {
      const testObject = {};
      const objectTypeLogic = subject => 'TEST_TYPE';

      const result = createAWObject(testObject, objectTypeLogic);
      expect(result).toBeDefined();
      expect(result.data).toEqual({});
      expect(result.uuid).toBeDefined();
      expect(result.uuid).not.toBe('test_uuid');
      expect(result.type).toBe('TEST_TYPE');
    });
  });

  describe('distinctProperty', () => {
    test('', () => {
      const testDataOne = ['alpha', 'beta', 'gamma'];
      const testDataTwo = ['beta', 'gamma', 'delta'];

      expect(distinctProperty(testDataOne, testDataTwo)).toEqual([
        'alpha',
        'beta',
        'gamma',
        'delta',
      ]);
    });
  });

  describe('extractIds', () => {
    test('returns an array of ids for all objects using default prop', () => {
      const testData = [
        { id: 'one', label: 'test 1' },
        { id: 0, label: 'test 2' },
        { id: null, label: 'test 3' },
        { label: 'test 4' },
      ];
      const result = extractIds(testData);
      expect(result.length).toBe(4);
      expect(result[0]).toBe('one');
    });

    test('returns an array of ids for all objects using custom prop', () => {
      const testData = [
        { _id: 'one', label: 'test 1' },
        { _id: 0, label: 'test 2' },
        { _id: null, label: 'test 3' },
        { label: 'test 4' },
      ];
      const result = extractIds(testData, '_id');
      expect(result.length).toBe(4);
      expect(result[0]).toBe('one');
    });
  });

  describe('extractObjectsByType', () => {
    test('empty source array', () => {
      expect(extractObjectsByType([], 'Alpha', 'Beta')).toEqual([]);
    });

    test('no matched objects', () => {
      expect(
        extractObjectsByType(
          [{ type: 'Gamma' }, { type: 'Delta' }],
          'Alpha',
          'Beta'
        )
      ).toEqual([]);
    });
    test('with matched objects', () => {
      expect(
        extractObjectsByType(
          [{ type: 'Beta' }, { type: 'Delta' }],
          'Alpha',
          'Beta'
        )
      ).toEqual([{ type: 'Beta' }]);
    });
  });
});
