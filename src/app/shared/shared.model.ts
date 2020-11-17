export interface Category {
    id: number;
    order: number;
    title: string;
    ticketCount: number;
}

export interface TicketPreview {
    id: number;
    categoryId: number;
    title: string;
    labels: string[];
    description: string;
}

export interface Ticket {
    id: number;
    categoryId: number;
    title: string;
    description: string;
    labels: string[];
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
