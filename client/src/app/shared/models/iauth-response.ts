export interface IAuthResponse {
     userName : string;
     token : string;
     photoUrl : string;
     knownAs : string ;
     gender  : string;
  // introduction: string;
     message?: string  ;
     roles: string[];
  // photos: photoUser[]

}

export interface photoUser {
     id : number;
     url : string;
     isMain : boolean
}




