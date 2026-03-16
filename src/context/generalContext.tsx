import { createContext, useMemo, useState } from 'react';

export interface GeneralContextType {
  folder: string;
  idNote: number | null;
  setFolderName: (txt: string) => void;
  setIdNoteDb: (id?: number) => void;
}

export const GeneralContext = createContext<GeneralContextType>({
  folder: '',
  idNote: -1,
  setFolderName: () => {},
  setIdNoteDb: () => {},
});

export function GeneralProvider({ children }: { children: React.ReactNode }) {
  const [folder, setFolder] = useState<string>('');
  const [idNote, setIdNote] = useState<number | null>(null);
  const contexValue = useMemo(
    () => ({
      folder,
      idNote,
      setFolderName: (txt: string) => {
        setFolder(txt);
      },
      setIdNoteDb: (id?: number) => {
        setIdNote(typeof id === 'number' ? id : null);
      },
    }),
    [folder, idNote, setFolder, setIdNote],
  );

  return (
    <GeneralContext.Provider value={contexValue}>
      {children}
    </GeneralContext.Provider>
  );
}
