export interface Category {
  id: number;
  order: number;
  title: string;
}

export interface Ticket {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  labels: string[];
}

export interface Label {
  id: number;
  text: string;
}

export interface Comment {
  id: number;
  ticketId: number;
  createdAt: Date;
  content: string;
  author: Author;
}

export interface Author {
  id?: string;
  email?: string;
}

export interface User {
  id?: string;
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
}
