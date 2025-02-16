export const isNil = (value: unknown) => value === undefined || value === null;

export const isValidNumber = (value: number) => !(isNil(value) || isNaN(value));
