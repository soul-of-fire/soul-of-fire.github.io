import { Article } from "./article";

export class Node {
    constructor(public article: Article,
                public id?: string,
                public parent?: Article, 
                public children: Node[] = []) {}
}