export const $dependencies = '$dependencies';

export function Inject(namespace?: string): ParameterDecorator {
    return (target, propertyKey, parameterIndex) => {
        console.log(target, propertyKey, namespace,parameterIndex);
        // Reflect.defineMetadata(parameterIndex, namespace, target, $dependencies);
    }
}

class A {

}

class Class {

    public name = 'ngajksk';
}
