export const unionSet = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set([...Array.from(a), ...Array.from(b)])
}

export const intersectionSet = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set(Array.from(a).filter((e) => b.has(e)))
}

export const differenceSet = <T>(a: Set<T>, b: Set<T>): Set<T> => {
  return new Set(Array.from(a).filter((e) => !b.has(e)))
}

export const unionArray = <T>(a: Array<T>, b: Array<T>): Array<T> => {
  return Array.from(unionSet(new Set(a), new Set(b)))
}

export const intersectionArray = <T>(a: Array<T>, b: Array<T>): Array<T> => {
  return Array.from(intersectionSet(new Set(a), new Set(b)))
}

export const differenceArray = <T>(a: Array<T>, b: Array<T>): Array<T> => {
  return Array.from(differenceSet(new Set(a), new Set(b)))
}
