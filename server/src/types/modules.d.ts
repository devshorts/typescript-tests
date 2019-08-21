declare module 'express-list-endpoints' {
    import {Application} from 'express';

    interface Endpoint {
        path: string,
        methods: string[]
    }

    function getEndpoints(app: Application): Endpoint[];

    export = getEndpoints
}
