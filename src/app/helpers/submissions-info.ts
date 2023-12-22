import { Submission } from './submission';

export interface SubmissionsInfo {
    problemState: number;
    totalAccepted: number;
    totalSubmissions: number;
    submissions: Submission[];
}
