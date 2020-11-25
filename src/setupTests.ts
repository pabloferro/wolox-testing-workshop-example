import '@testing-library/jest-dom';
import 'mutationobserver-shim';

jest.mock('i18next', () => ({
  t: (key: string, params: Record<string, string>) => `${key} ${JSON.stringify(params)}`
}));
