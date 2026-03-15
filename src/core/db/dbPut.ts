import { NativeModules } from 'react-native';
import { UpdateFolder, UpdateNote } from './types';

const { NotesModule, FolderModule } = NativeModules;

export async function putNote(data: UpdateNote): Promise<number | null> {
  try {
    return (await NotesModule.updateNote(data)) as number;
  } catch (error) {
    console.error('No se actualizo la nota', error);
    return null;
  }
}
export async function putFolder(data: UpdateFolder): Promise<number | null> {
  try {
    return (await FolderModule.updateFolder(data)) as number;
  } catch (error) {
    console.error('No se actualizo la carpeta', error);
    return null;
  }
}
