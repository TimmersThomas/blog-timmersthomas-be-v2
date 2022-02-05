/**
 * React-Serialize utility re-written in TypeScript
 * Originally created by @pravdomil (https://github.com/pravdomil/react-serialize)
 */
import * as React from 'react';
import { ReactElement } from 'react';
import { nanoid } from 'nanoid'

type ObjectType = {
    [index: string]: unknown;
}

type DeserializableComponent = {
    type: string;
    props: { children: DeserializableComponent[]; } & ObjectType
}

type ReviverOptions = {
    type: string | React.ComponentType,
    props: { children: DeserializableComponent[] } & ObjectType,
    key: string | number,
    components: { [type: string]: React.ComponentType }
}

type DeserializationOpts = {
    components?: { [type: string]: React.ComponentType };
    reviver?: (args: ReviverOptions) => ReviverOptions
}

type Element = DeserializableComponent[] | DeserializableComponent | string | null;
function deserializeElement(element: Element, key: string | number, options: DeserializationOpts = {}): Element | ReactElement {
    let { components = {} } = options
    const { reviver } = options

    if (typeof element !== "object") {
        return element
    }

    if (element === null) {
        return element
    }

    if (element instanceof Array) {
        return element.map((el, i) => deserializeElement(el, i, options) as DeserializableComponent)
    }

    let { props } = element;
    const elementType = element.type;

    if (typeof elementType !== "string") {
        throw new Error("Deserialization error: element type must be string")
    }

    let type: React.ComponentType | string = components[elementType] || elementType.toLowerCase()

    if (props.children) {
        props = { ...props, children: deserializeElement(props.children, nanoid(), options) as DeserializableComponent[] }
    }

    if (reviver) {
        // eslint-disable-next-line no-param-reassign
        ({ type, props, key, components } = reviver({ type, props, key, components }))
    }

    return React.createElement(type, { ...props, key })
}

export const serialize = <T extends React.Component | JSX.Element>(component: T): string => {
    const getName = (value: string | unknown): string | unknown=> {
        if (typeof value === 'string') {
            return value
        } if (typeof value === 'function') {
            return value.name
        }
        return value
    }
    const replacer = (key: string, value: unknown): string | unknown => {
        switch (key) {
            case "type":
                return getName(value);
            case "_owner":
            case "_store":
            case "ref":
            case "key":
                return undefined;
            default:
                return value
        }
    }

    return JSON.stringify(component, replacer);
}

export const deserialize = <T extends React.ReactElement<unknown>>(serializedComponent: string, options?: DeserializationOpts): T => {
    const componentData = JSON.parse(serializedComponent);

    return deserializeElement(componentData, nanoid(), options) as unknown as T;
}