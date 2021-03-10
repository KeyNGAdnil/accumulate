function compose(...funs) {
    if (funs.length === 0) {
        return arg => arg;
    }
    if (funs.length === 1) {
        return funs[0];
    }

    return funs.reverse().reduce((a, b) => (...arg) => b(a(arg)));
}