export interface Course {
    id: number;
    code: string;
    name: string;
    points?: number;
    professorIds: number[];
}
