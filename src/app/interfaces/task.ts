export interface TaskInterface {
    id: number;
    name: string;
    dueDate: string;
    assignedPeople: string[]; 
    status: string;
    technologies: string[];
}

export interface UserInterface {
    id: number,
    skills: string[],
    age: number,
    name: string
}