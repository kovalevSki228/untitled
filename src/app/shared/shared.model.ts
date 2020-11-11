export interface Category  {
    id: number;
    title: string;
}

export interface TicketPreview  {
    id: number;
    categoryId: number;
    title: number;
    description: string;
}

export interface Ticket {
    id: number;
    categoryId: number;
    title: number;
    description: string;
    labels?: Label[];
    comments?: Comment[];
}

export interface Label {
    id: number;
    ticketId: number;
    title: string;
}

export interface Comment {
    id: number;
    ticketId: number;
    data: Date;
    title: string;
    content: string;
    autor: string;
}
