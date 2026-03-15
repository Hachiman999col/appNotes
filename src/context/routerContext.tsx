import { createContext, useCallback, useMemo, useState } from 'react';

export type RouterType = {
  path: string;
  auth?: boolean;
};

export interface RouterContextType {
  routeName: string;
  prevRouteName: string;
  listValidRoutes: RouterType[];
  navigate: (routeName: string) => void;
  loadRoutes?: (routes: RouterType[]) => void;
  goBack: () => void;
}
export const RouterContext = createContext<RouterContextType>({
  routeName: '',
  prevRouteName: '',

  listValidRoutes: [],
  navigate: () => {},
  loadRoutes: () => {},
  goBack: () => {},
});

export function RouterProvider({
  children,
  defaultRoute,
}: {
  children: React.ReactNode;
  defaultRoute: string;
}) {
  const [routeName, setRouteName] = useState<string>(defaultRoute);
  const [prevRouteName, setPrevRouteName] = useState(defaultRoute);
  const [listValidRoutes, setListValidRoutes] = useState<RouterType[]>([]);

  const loadRoutes = (routes: RouterType[]) => {
    setListValidRoutes(routes);
  };

  const changeRoute = useCallback(
    (newRouteName: string) => {
      setPrevRouteName(routeName);
      setRouteName(newRouteName);
    },
    [routeName],
  );

  const handleGoBack = useCallback(() => {
    setRouteName(prevRouteName);
  }, [prevRouteName]);
  const contexValue = useMemo(
    () => ({
      routeName,
      prevRouteName,
      listValidRoutes,
      loadRoutes,
      navigate: changeRoute,
      goBack: handleGoBack,
    }),
    [routeName, prevRouteName, listValidRoutes, changeRoute, handleGoBack],
  );
  return (
    <RouterContext.Provider value={contexValue}>
      {children}
    </RouterContext.Provider>
  );
}
