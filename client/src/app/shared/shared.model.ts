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
    date: Date;
    content: string;
    author: User;
}

export interface User {
    id: number;
    name: string;
    password: string;
}
