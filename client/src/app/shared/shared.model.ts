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
  dateTime: Date;
  content: string;
  authorId: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
}
