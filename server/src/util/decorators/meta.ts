export function Name(n: string) {
    // tslint:disable-next-line:no-any
    return (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => {
        Reflect.defineMetadata("name:value", n, target)
        return target
    }
}

