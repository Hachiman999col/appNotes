import { NativeModules } from 'react-native';
import { CreateFolder, CreateNote } from './types';

const { NotesModule, FolderModule } = NativeModules;

export async function postCreateNote(data: CreateNote): Promise<number | null> {
  try {
    return (await NotesModule.insertNote(data)) as number;
  } catch (error) {
    console.error('No se creo la nota', error);
    return null;
  }
}
export async function postCreatefolder(
  data: CreateFolder,
): Promise<number | null> {
  try {
    return (await FolderModule.insertFolder(data)) as number;
  } catch (error) {
    console.error('No se creo la nota', error);
    return null;
  }
}
