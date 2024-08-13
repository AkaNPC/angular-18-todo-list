export interface Task {
    id: number;
    name: string;
    description: string;
    date: string;
    tag: string;
    isComplete: boolean;
    isEditing: boolean;
}