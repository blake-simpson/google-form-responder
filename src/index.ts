import { encodeFormData } from './helpers';
import {
  GoogleFormData,
  GoogleFormMapping,
  GoogleFormResponderInstance,
} from './types';

const GoogleFormResponder = {
  send: async (formId: string, data: GoogleFormData): Promise<boolean> => {
    const sheetUrl = `https://docs.google.com/forms/d/${formId}/formResponse`;
    const body: Record<string, string> = {
      ...data,
      submit: 'submit',
    };

    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        body: encodeFormData(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      return response.ok;
    } catch (_error: unknown) {
      return false;
    }
  },

  create: (
    formId: string,
    mapping: GoogleFormMapping
  ): GoogleFormResponderInstance => {
    return {
      send: async (mappedData: GoogleFormData): Promise<boolean> => {
        const data = Object.keys(mapping).reduce((acc: GoogleFormData, key) => {
          acc[mapping[key]] = mappedData[key];
          return acc;
        }, {});

        return GoogleFormResponder.send(formId, data);
      },
    };
  },
};

export default GoogleFormResponder;
