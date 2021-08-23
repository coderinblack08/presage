import isEqual from "lodash.isequal";
import isObject from "lodash.isobject";
import transform from "lodash.transform";

export function difference(object: any, base: any): object {
  function changes(object: any, base: any) {
    return transform(object, function (result: any, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }

  return changes(object, base);
}
