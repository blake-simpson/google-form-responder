import { GoogleFormData } from './types';

export const encodeFormData = (data: GoogleFormData) => {
  return Object.keys(data)
    .map((key) => {
      if (typeof data[key] === 'undefined' || data[key] === null) {
        return encodeURIComponent(key) + '=';
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    })
    .join('&');
};
