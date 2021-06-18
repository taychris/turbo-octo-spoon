export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

 export interface Employee {
    newName: string;
    newAge: number;
    user: User;
 }