/**
 * React-Serialize utility re-written in TypeScript
 * Originally created by @pravdomil (https://github.com/pravdomil/react-serialize)
 */
import * as React from 'react';
import { ReactElement } from 'react';

type ObjectType = {
    [index: string]: any;
}

type DeserializableComponent = {
    type: string;
    props: { children: DeserializableComponent[]; } & ObjectType
}

type ReviverOptions = {
    type: string | React.ComponentType,
    props: { children: DeserializableComponent[] & ObjectType },
    key: string | number,
    components: { [type: string]: React.ComponentType }
}

type DeserializationOpts = {
    components?: { [type: string]: React.ComponentType };
    reviver?: (args: ReviverOptions) => ReviverOptions
}

function makeid(length: number): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

type element = DeserializableComponent[] | DeserializableComponent | string | null;
function deserializeElement<T>(element: element, options: DeserializationOpts = {}, key: string | number): element | ReactElement {
    let { components = {}, reviver } = options

    if (typeof element !== "object") {
        return element
    }

    if (element === null) {
        return element
    }

    if (element instanceof Array) {
        return element.map((el, i) => deserializeElement(el, options, i) as DeserializableComponent)
    }

    let { props } = element;
    const elementType = element.type;

    if (typeof elementType !== "string") {
        throw new Error("Deserialization error: element type must be string")
    }

    let type: React.ComponentType<{}> | string = components[elementType] || elementType.toLowerCase()

    if (props.children) {
        props = { ...props, children: deserializeElement(props.children, options, makeid(16)) as DeserializableComponent[] }
    }

    if (reviver) {
        ({ type, props, key, components } = reviver({ type, props, key, components }))
    }

    return React.createElement(type, { ...props, key })
}

export const serialize = <T extends React.Component | JSX.Element>(component: T) => {
    const getName = (value: string | Function) => {
        if (typeof value === 'string') {
            return value
        } else if (typeof value === 'function') {
            return value.name
        }
        return value
    }
    const replacer = (key: string, value: any) => {
        switch (key) {
            case "type":
                return getName(value);
            case "_owner":
            case "_store":
            case "ref":
            case "key":
                return
            default:
                return value
        }
    }

    return JSON.stringify(component, replacer);
}

export const deserialize = <T extends React.ReactElement<unknown>>(serializedComponent: string, options?: DeserializationOpts): T => {
    const componentData = JSON.parse(serializedComponent);

    return deserializeElement(componentData, options, makeid(16)) as unknown as T;
}