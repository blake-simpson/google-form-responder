export type GoogleFormData = Record<string, string | number>;

export type GoogleFormMapping = Record<string, string>;

export type GoogleFormResponderSendReturnType = (
  data: GoogleFormData
) => Promise<boolean>;

export interface GoogleFormResponderInstance {
  send: GoogleFormResponderSendReturnType;
}
