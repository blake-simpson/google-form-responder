import { GoogleFormData } from './types';

export const encodeFormData = (data: GoogleFormData) => {
  return Object.keys(data)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
    })
    .join('&');
};
