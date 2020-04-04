/**
 * (c) Phan Trung Nguyên <nguyenpl117@gmail.com>
 * User: nguyenpl117
 * Date: 3/19/2020
 * Time: 10:45 AM
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export class Methods<A> {
}

export type PreventCollisions<A, B, C = never> = Extract<keyof A, keyof B | keyof C> extends never
    ? Extract<keyof A | keyof C, keyof B> extends never
        ? Ctor<A & B & C>
        : 'Error: Multiple mixins implement the following methods:' & Methods<Extract<keyof A | keyof C, keyof B>>
    : 'Error: Multiple mixins implement the following methods:' & Methods<Extract<keyof A, keyof B | keyof C>>

export function mixin<A>(a: Ctor<A>): Ctor<A>
export function mixin<A, B, R = PreventCollisions<A, B, {}>>(a: Ctor<A>, b: Ctor<B>): R
export function mixin<A, B, C, R = PreventCollisions<A, B, C>>(a: Ctor<A>, b: Ctor<B>, c: Ctor<C>): R
// export function mixin<A, B, C, D, R = PreventCollisions<PreventCollisions<PreventCollisions<A, B>, C>, D>>(a: Ctor<A>, b: Ctor<B>, c: Ctor<C>, d: Ctor<D>): R
// export function mixin<A, B, C, D, E, R = PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<A, B>, C>, D>, E>>(a: Ctor<A>, b: Ctor<B>, c: Ctor<C>, d: Ctor<D>, e: Ctor<E>): R
// export function mixin<A, B, C, D, E, F, R = PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<A, B>, C>, D>, E>, F>>(a: Ctor<A>, b: Ctor<B>, c: Ctor<C>, d: Ctor<D>, e: Ctor<E>, f: Ctor<F>): R
// export function mixin<A, B, C, D, E, F, G, R = PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<PreventCollisions<A, B>, C>, D>, E>, F>, G>>(a: Ctor<A>, b: Ctor<B>, c: Ctor<C>, d: Ctor<D>, e: Ctor<E>, f: Ctor<F>, g: Ctor<G>): R
export function mixin(...as: Ctor<any>[]) {
    const x = class A {
    };
    return as.reduce((previousValue, currentValue) => {
        const prototype = new currentValue;
        Object.getOwnPropertyNames(prototype).forEach(name => {
            previousValue.prototype[name] = prototype[name];
        })

        Object.getOwnPropertyNames(currentValue.prototype).forEach(name => {
            if (! ['constructor'].includes(name) ) {
                Object.defineProperty(previousValue.prototype, name, Object.getOwnPropertyDescriptor(currentValue.prototype, name));
            }
        })
        Object.getOwnPropertyNames(currentValue).forEach(name => {
            if ( ['constructor', 'length', 'prototype', 'name'].includes(name) ) {
                return;
            }
            previousValue[name] = currentValue[name];
        });

        return previousValue;
    }, x);
}

export type Ctor<A = any> = A;

var aggregation = (baseClass, ...mixins) => {
    class base extends baseClass {
        constructor (...args) {
            super(...args);
            mixins.forEach((mixin) => {
                copyProps(this,(new mixin));
            });
        }
    }
    let copyProps = (target, source) => {  // this function copies all properties and symbols, filtering out some special ones
        Object.getOwnPropertyNames(source)
              .concat(Object.getOwnPropertySymbols(source) as any)
              .forEach((prop) => {
                  if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/))
                      Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
              })
    }
    mixins.forEach((mixin) => { // outside contructor() to allow aggregation(A,B,C).staticFunction() to be called etc.
        copyProps(base.prototype, mixin.prototype);
        copyProps(base, mixin);
    });
    return base;
}

class A {

}

class B {

    static primaryKey = 'id';

    static callName() {
        return (this as any).primaryKey;
    }

    public _name= 'nguyen'

    getName() {
        return (this as any)._name;
    }
}

class MyClass extends mixin(B) {
    constructor(public app: any) {
        super();
    }
}

const my = new MyClass({ name: 'nguyen' });
console.log(my.getName());
console.log(MyClass.primaryKey);
