import { f as defineComponent, n as usePageFrontmatter, p as useMobile, h, B as BlogHome, z as BlogPage, D as DropTransition, I as InfoPanel, A as BloggerInfo, E as InfoList, r as resolveComponent } from "./app.77c7768c.js";
import { S as SkipLink } from "./SkipLink.03fe6705.js";
var Blog = defineComponent({
  name: "Blog",
  setup() {
    const frontmatter = usePageFrontmatter();
    const isMobile = useMobile();
    return () => [
      h(SkipLink),
      h(resolveComponent("CommonWrapper"), { sidebar: false }, {
        default: () => frontmatter.value["home"] ? h(BlogHome) : h("main", { class: "page blog", id: "main-content" }, h("div", { class: "blog-page-wrapper" }, [
          h(BlogPage),
          h(DropTransition, { delay: 0.16 }, () => h(InfoPanel))
        ])),
        navScreenBottom: () => h(BloggerInfo),
        ...isMobile.value ? { sidebar: () => h(InfoList) } : {}
      })
    ];
  }
});
export { Blog as default };
