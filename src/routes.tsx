import React from 'react';
import { Route } from 'react-router-dom';
export function RouteWithSubRoutes(route:any)  {
  console.log("route.....>", route)
  return (
    <Route path={route.path} element={<route.component routes={route.routes} />} />
  );
}
