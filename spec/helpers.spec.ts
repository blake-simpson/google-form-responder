import { encodeFormData } from '../src/helpers';

describe('encodeFormData', () => {
  it('should correctly encode simple key-value pairs', () => {
    const testData = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const result = encodeFormData(testData);
    expect(result).toBe('name=John%20Doe&email=john%40example.com');
  });

  it('should handle special characters', () => {
    const testData = {
      query: 'hello & goodbye',
      path: '/test/path?param=value',
    };

    const result = encodeFormData(testData);
    expect(result).toBe(
      'query=hello%20%26%20goodbye&path=%2Ftest%2Fpath%3Fparam%3Dvalue'
    );
  });

  it('should handle empty values', () => {
    const testData = {
      empty: '',
      normal: 'value',
    };

    const result = encodeFormData(testData);
    expect(result).toBe('empty=&normal=value');
  });

  it('should return empty string for empty object', () => {
    const testData = {};

    const result = encodeFormData(testData);
    expect(result).toBe('');
  });
});
