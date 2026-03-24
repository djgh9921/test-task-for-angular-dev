export interface FlatObject {
  [key: string]: string | number | boolean;
}

export interface Block {
  id: string;
  selectedKey: string;
}
