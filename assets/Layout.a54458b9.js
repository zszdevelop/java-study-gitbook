import { f as defineComponent, h, T as Transition, m as useScrollPromise, g as useThemeLocaleData, n as usePageFrontmatter, p as useMobile, q as computed, r as resolveComponent, s as usePageData, t as useThemeData } from "./app.f163fde1.js";
import { S as SkipLink } from "./SkipLink.cc9aa1df.js";
var fadeSlideY = "";
var FadeSlideY = defineComponent({
  name: "FadeSlideY",
  setup(_props, { slots }) {
    const scrollPromise = useScrollPromise();
    const onBeforeEnter = scrollPromise.resolve;
    const onBeforeLeave = scrollPromise.pending;
    return () => h(Transition, {
      name: "fade-slide-y",
      mode: "out-in",
      onBeforeEnter,
      onBeforeLeave
    }, () => {
      var _a;
      return (_a = slots["default"]) == null ? void 0 : _a.call(slots);
    });
  }
});
var Layout = defineComponent({
  name: "Layout",
  setup() {
    const themeData = useThemeData();
    const themeLocale = useThemeLocaleData();
    const page = usePageData();
    const frontmatter = usePageFrontmatter();
    const isMobile = useMobile();
    const sidebarDisplay = computed(() => themeLocale.value.blog.sidebarDisplay || themeData.value.blog.sidebarDisplay || "mobile");
    return () => [
      h(SkipLink),
      h(resolveComponent("CommonWrapper"), {}, {
        default: () => frontmatter.value.home ? h(resolveComponent("HomePage")) : h(FadeSlideY, () => h(resolveComponent("NormalPage"), { key: page.value.path })),
        ...sidebarDisplay.value !== "none" ? { navScreenBottom: () => h(resolveComponent("BloggerInfo")) } : {},
        ...!isMobile.value && sidebarDisplay.value === "always" ? { sidebar: () => h(resolveComponent("BloggerInfo")) } : {}
      })
    ];
  }
});
export { Layout as default };
