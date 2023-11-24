export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  createDate: string;
  updatedDate: string;
  folders: Folder[];
};

export type Folder = {
  id: string;
  name: string;
  description: string;
  createDate: string;
  updatedDate: string;
  links: Link[];
};

export type Link = {
  id: string;
  title: string;
  description: string;
  link: string;
  createDate: string;
  updatedDate: string;
};
