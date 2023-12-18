import { Testcase } from './testcase';
import { Submission } from './submission';

export interface Problem {
    title: string;
    difficulty: number;
    state: number;
    likes: number;
    dislikes: number;
    description: string;
    code: string;
    totalAccepted: number;
    totalSubmissions: number;
    tags: string[];
    testcases: Testcase[];
    submissions: Submission[];
}
