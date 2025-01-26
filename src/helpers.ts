import { GoogleFormData } from './types';

export const encodeFormData = (data: GoogleFormData) => {
  return Object.keys(data)
    .map((key) => {
      if (typeof data[key] === 'undefined' || data[key] === null) {
        return null;
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    })
    .filter((item) => item !== null)
    .join('&');
};
