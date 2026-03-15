import { NativeModules } from 'react-native';

const { NotesModule, FolderModule } = NativeModules;

export async function deleteNote(id: number): Promise<number | null> {
  try {
    return (await NotesModule.deleteNote(id)) as number;
  } catch (error) {
    console.error('No se actualizo la nota', error);
    return null;
  }
}
export async function deleteAllNotes(): Promise<number | null> {
  try {
    return (await NotesModule.deleteAllNotes()) as number;
  } catch (error) {
    console.error('No se actualizo la nota', error);
    return null;
  }
}

export async function deleteFolder(id: number): Promise<number | null> {
  try {
    return (await FolderModule.deleteFolder(id)) as number;
  } catch (error) {
    console.error('No se actualizo la carpeta', error);
    return null;
  }
}
export async function deleteAllFolders(): Promise<number | null> {
  try {
    return (await FolderModule.deleteAllFolders()) as number;
  } catch (error) {
    console.error('No se actualizo la carpeta', error);
    return null;
  }
}
