type PlainObject<T = any> = {
    [k in string]: T;
};

export const isPlainObject = (value: unknown): value is PlainObject => {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
};

export const isArray = (value: unknown): value is [] => {
    return Array.isArray(value);
};

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
    return isPlainObject(value) || isArray(value);
};

export const isEqual = (lhs: PlainObject, rhs: PlainObject) => {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
};