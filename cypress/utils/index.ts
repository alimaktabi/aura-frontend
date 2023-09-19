import { RoutePath } from 'types/router';

export const getTestSelector = (selectorId: string) =>
  `[data-testid=${selectorId}]`;

export const getTestSelectorStartsWith = (selectorId: string) =>
  `[data-testid^=${selectorId}]`;

export function getRoute(routePath: RoutePath) {
  // return 'http://localhost:3000' + routePath
  return routePath;
}
