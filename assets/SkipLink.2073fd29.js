import { f as defineComponent, j as useRoute, k as ref, l as watch, h } from "./app.a829be87.js";
var skipLink = "";
var SkipLink = defineComponent({
  name: "SkipLink",
  props: {
    content: {
      type: String,
      default: "main-content"
    }
  },
  setup(props) {
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    const focusMainContent = ({ target }) => {
      const el = document.querySelector(target.hash);
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    };
    return () => [
      h("span", {
        ref: backToTop,
        tabindex: "-1"
      }),
      h("a", {
        href: `#${props.content}`,
        class: "skip-link sr-only",
        onClick: focusMainContent
      }, "Skip to content")
    ];
  }
});
export { SkipLink as S };
