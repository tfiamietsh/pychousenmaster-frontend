import { Testcase } from './testcase';

export interface Problem {
    title: string;
    difficulty: number;
    description: string;
    code: string;
    tags: string[];
    testcases: Testcase[];
}
