interface Helper {
    easy: number;
    medium: number;
    hard: number;
}

interface Pair {
    title: string;
    elapsedTime: string;
}

export interface Profile {
    username: string;
    solved: Helper;
    total: Helper;
    recentAC: Pair[];
}
