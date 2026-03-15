import { createContext, useMemo, useState } from 'react';

export interface GeneralContextType {
  folder: string;
  setFolderName: (txt: string) => void;
}

export const GeneralContext = createContext<GeneralContextType>({
  folder: '',
  setFolderName: () => {},
});

export function GeneralProvider({ children }: { children: React.ReactNode }) {
  const [folder, setFolder] = useState<string>('');
  const contexValue = useMemo(
    () => ({
      folder,
      setFolderName: (txt: string) => {
        setFolder(txt);
      },
    }),
    [folder, setFolder],
  );

  return (
    <GeneralContext.Provider value={contexValue}>
      {children}
    </GeneralContext.Provider>
  );
}
