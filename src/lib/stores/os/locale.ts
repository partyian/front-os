import { readable } from "svelte/store";

export const locale = readable(new Date, function start(set) {
    const interval = setInterval(function update() {
        set(new Date)
    }, 1000)

    return function stop() {
        clearInterval(interval);
    }
})