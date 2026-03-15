export interface ResponseApiNote {
  id: number;
  title: string;
  content: string;
  dateCreated: string;
  folder: string;
}
export interface CreateNote {
  title: string;
  content: string;
  dateCreated: string;
  folder: string;
}

export interface CountNotes {
  folder: string;
  count: number;
}
export interface UpdateNote {
  id: number;
  title: string;
  content: string;
  dateCreated: string;
}

export interface ResponseApiFolder {
  id: number;
  title: string;
  icon: string;
  dateCreated: string;
  color: string;
}
export interface CreateFolder {
  title: string;
  icon: string;
  dateCreated: string;
  color: string;
}

export interface UpdateFolder {
  title: string;
  icon: string;

  color: string;
}
export interface Note {
  id: number;
  title: string;
  content: string;
  dateCreated: string;
  folder: string;
  folderColor: string;
  folderIcon: string;
}
