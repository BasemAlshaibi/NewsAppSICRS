export interface IUser {
    id: number;
    username: string;
    KnownAs: string; // تم اضافته
    email: string;
    photoUrl: string;
    knownAs: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    UserPhotos: UserPhotos[]; // هذا تغيير
    status:boolean;
    role: string;
}

 
    export interface UserPhotos {
        id: number;
        url: string;
        isMain: boolean;
    }
 
