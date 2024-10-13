interface Author {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    img: string;
    verified: boolean;
    followers: any[];
    following: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface IPost {
    _id: string;
    author: Author;
    title: string;
    content: string;
    category: string;
    image: string;
    upVotes: number;
    premium: boolean;
    createdAt: string;
    updatedAt: string;
    downVotes: number;
    voters: any[];
    comments: any[];
  }