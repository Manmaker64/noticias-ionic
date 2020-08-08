export interface RespuestaTopHeadlines {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    source: Source;
    author: null | string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: null | string;
}

export interface Source {
    id: null | string;
    name: string;
}