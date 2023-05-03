export type User = {
  id: string;
  name: string;
  createDate: Date;
  updatedDate: Date;
  folders: Folder[];
};

export type Folder = {
  id: string;
  name: string;
  description: string;
  createDate: Date;
  updatedDate: Date;
  links: Link[];
};

export type Link = {
  id: string;
  title: string;
  description: string;
  link: string;
  createDate: Date;
  updatedDate: Date;
};
