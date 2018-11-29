export class Article {
    article = {};
    id: number;
    constructor(raw: any) {
        this.article['title'] = raw.title;
        this.article['header'] = raw.header;
        this.article['content'] = raw.content;
        this.article['footer'] = raw.footer;
        this.article['personal'] = raw.personal;
        this.id = new Date().getTime();
    }
}