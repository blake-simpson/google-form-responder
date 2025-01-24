import GoogleFormResponder from '../src/index';
import { encodeFormData } from '../src/helpers';

describe('GoogleFormResponder', () => {
  const formId = '1234567890';

  let fetchSpy: jest.SpyInstance;

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, status: 200 } as any)
    );
    fetchSpy = jest.spyOn(global, 'fetch');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('send', () => {
    it('should make a POST request to the correct Google Form URL', async () => {
      const data = { field1: 'value1' };
      const expectedUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;

      const result = await GoogleFormResponder.send(formId, data);

      expect(result).toBe(true);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [actualUrl, options] = fetchSpy.mock.calls[0];
      expect(actualUrl).toBe(expectedUrl);
      expect(options).toEqual({
        method: 'POST',
        body: encodeFormData({ ...data, submit: 'submit' }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });

    it('should automatically add submit parameter', async () => {
      const data = { entry: 'test' };

      await GoogleFormResponder.send(formId, data);

      const [, options] = fetchSpy.mock.calls[0];
      expect(options.body).toContain('submit=submit');
    });

    it('returns false if the form submission fails', async () => {
      fetchSpy.mockImplementation(() => Promise.reject('error'));
      const result = await GoogleFormResponder.send(formId, {});

      expect(result).toBe(false);
    });

    it('returns false if the response is not ok', async () => {
      fetchSpy.mockImplementation(() =>
        Promise.resolve({ ok: false, status: 400 } as any)
      );
      const result = await GoogleFormResponder.send(formId, {});

      expect(result).toBe(false);
    });
  });

  describe('create', () => {
    it('should create a form instance with mapped fields', async () => {
      const mapping = {
        name: 'entry.1234561',
        email: 'entry.1234562',
      };
      const data = {
        name: 'John Doe',
        email: 'john@example.com',
      };
      const expectedUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;

      const form = GoogleFormResponder.create(formId, mapping);
      const result = await form.send(data);

      expect(result).toBe(true);
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      const [actualUrl, options] = fetchSpy.mock.calls[0];
      expect(actualUrl).toBe(expectedUrl);
      expect(options).toEqual({
        method: 'POST',
        body: encodeFormData({
          'entry.1234561': 'John Doe',
          'entry.1234562': 'john@example.com',
          submit: 'submit',
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    });

    it('should handle numeric values in form data', async () => {
      const mapping = {
        count: 'entry.1234563',
      };
      const data = {
        count: 42,
      };
      const expectedUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;

      const form = GoogleFormResponder.create(formId, mapping);
      const result = await form.send(data);

      expect(result).toBe(true);
      const [actualUrl, options] = fetchSpy.mock.calls[0];
      expect(actualUrl).toBe(expectedUrl);
      expect(options.body).toBe(
        encodeFormData({
          'entry.1234563': '42',
          submit: 'submit',
        })
      );
    });
  });
});
