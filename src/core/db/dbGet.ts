import { NativeModules } from 'react-native';
import { CountNotes, Note, ResponseApiFolder, ResponseApiNote } from './types';

const { NotesModule, FolderModule } = NativeModules;

//--- notes
export async function getAllNotes(): Promise<ResponseApiNote[]> {
  try {
    return (await NotesModule.getAllNotes()) as ResponseApiNote[];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return [];
  }
}
export async function getNotesByFolder(
  folder: string,
): Promise<ResponseApiNote[]> {
  try {
    return (await NotesModule.getNotesByFolder(folder)) as ResponseApiNote[];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return [];
  }
}
export async function getNotesWithFolderInfo(): Promise<Note[]> {
  try {
    return (await NotesModule.getNotesWithFolderInfo()) as Note[];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return [];
  }
}
export async function getNotesByid(
  folder: string,
): Promise<ResponseApiNote | null> {
  try {
    const dto = (await NotesModule.getNotesByFolder(
      folder,
    )) as ResponseApiNote[];

    if (!dto.length) return null;
    return dto[0];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return null;
  }
}
export async function getNotesCount(): Promise<CountNotes[]> {
  try {
    return (await NotesModule.getNotesCount()) as CountNotes[];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return [];
  }
}

//--- notes

export async function getAllFolders(): Promise<ResponseApiFolder[]> {
  try {
    return (await FolderModule.getAllFolders()) as ResponseApiFolder[];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return [];
  }
}
export async function getFolderById(
  id: number,
): Promise<ResponseApiFolder | null> {
  try {
    const dto = (await FolderModule.getFolderById(id)) as ResponseApiFolder[];
    if (!dto.length) return null;
    return dto[0];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return null;
  }
}
export async function getFolderByTitle(
  title: string,
): Promise<ResponseApiFolder | null> {
  try {
    const dto = (await FolderModule.getFolderByTitle(
      title,
    )) as ResponseApiFolder[];
    if (!dto.length) return null;
    return dto[0];
  } catch (error) {
    console.error('No se pudieron cargar las notas:', error);
    return null;
  }
}
