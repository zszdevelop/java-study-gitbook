import { f as defineComponent, v as useRouter, k as ref, x as onClickOutside, h, C as Content, y as a } from "./app.67269af0.js";
var layout = "";
const u = () => h(a, { name: "back" }, () => h("path", { d: "M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z" })), r = () => h(a, { name: "home" }, () => h("path", { d: "M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z" }));
var i = defineComponent({ name: "SlidePage", setup() {
  const s = useRouter(), n = ref(false), i2 = ref(null), c = () => {
    n.value = false;
  };
  return onClickOutside(i2, c), () => h("div", { class: "presentation" }, [h(Content), h("div", { ref: i2, class: ["menu", { active: n.value }] }, [h("button", { class: "menu-button", onClick: () => {
    n.value = !n.value;
  } }, h("span", { class: "icon" })), h("button", { class: "back-button", onClick: () => (c(), void window.history.go(-1)) }, h(u)), h("button", { class: "home-button", onClick: () => (c(), void s.push("/")) }, h(r))])]);
} });
export { i as default };
