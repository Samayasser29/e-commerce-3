import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path:'checkout/:cartId',
    renderMode:RenderMode.Server
  },
  {
    path:'online-checkout/:cartId',
    renderMode:RenderMode.Server
  },
  {
    path:'product-details/:id',
    renderMode:RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
