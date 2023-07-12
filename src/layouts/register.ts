// path: src/layouts/register.ts

import type { App } from 'vue';
import type { ModuleNamespace } from 'vite/types/hot';

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export function registerLayouts(app: App<Element>) {
  const layouts = import.meta.globEager<string, ModuleNamespace>('./*.vue');
  const registeredComponents = new Set<string>();

  Object.values(layouts).forEach((layout) => {
    const layoutComponent = layout.default;
    if (layoutComponent && !registeredComponents.has(layoutComponent.name)) {
      app.component(layoutComponent.name, layoutComponent);
      registeredComponents.add(layoutComponent.name);
    }
  });
}