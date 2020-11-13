export interface Category  {
    id: number;
    title: string;
}

export interface TicketPreview  {
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
    labels?: string[];
    comments?: Comment[];
}

export interface Comment {
    id: number;
    ticketId: number;
    data: Date;
    title: string;
    content: string;
    autor: string;
}
