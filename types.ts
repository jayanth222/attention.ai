import React from 'react';

export enum Role {
    Student = 'student',
    Teacher = 'teacher',
}

export interface User {
    name: string;
    role: Role;
    level?: number;
    xp?: number;
}

export enum Page {
    Landing,
    Login,
    StreamSelection,
    StudentDashboard,
    TeacherDashboard,
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface GroupChatMessage {
    id: number;
    user: {
        name: string;
        avatar: string;
    };
    text: string;
    timestamp: string;
}
