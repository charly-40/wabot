import tecnico from "./tecnico.js";
import general from "./general.js";
import creativo from "./creativo.js";

export const modules = {
    tecnico,
    general,
    creativo
};

export function getModule(name) {
    return modules[name];
}
