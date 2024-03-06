export const setLocalStorage = (key, value) => {
    localStorage.setItem("carts", {key: value})
}

export const getLocalStorage = (key) => {
    const cart = localStorage.getItem("carts" )
    return cart.key
}