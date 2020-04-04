import 'reflect-metadata';
export function Rules(options: any): MethodDecorator {
    return (target, propertyKey) => {
        if ( typeof propertyKey === 'symbol' ) {
            throw new Error('');
        }


        Reflect.defineMetadata('nguyen', options, target, propertyKey);
    }
}

class Class {

    @Rules({
        name: 'requred'

    })
    index() {

    }
}

console.log(Reflect.getMetadata('nguyen', Class.prototype, 'index'));