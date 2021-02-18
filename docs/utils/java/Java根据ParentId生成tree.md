# Java根据ParentId生成tree

## 1. 背景

我们在菜单列表，公司部门列表都存在多级的情况，我们通常在都将多级列表存储在同一表中。通过ParentId 来区别层级关系。最终在前端生成tree结构

## 2. 实例

以菜单列表为例：

1. 找出根节点
2. 循环根节点找出子节点
3. 递归查询

```java
 @Override
    public List<UmsMenuNode> treeList() {
        List<UmsMenu> menuList = umsMenuDao.findAll();

        // 1. 找出根节点
        List<UmsMenu> rootMenuList = new ArrayList<>();
        for (UmsMenu item : menuList){
            if (item.getParentId().equals(0L)){
                rootMenuList.add(item);
            }
        }

        // 2.循环根节点找出子节点
        List<UmsMenuNode> result = new ArrayList<>();
        for (UmsMenu item:rootMenuList){
            UmsMenuNode menuNode = covertMenuNode(item, menuList);
            result.add(menuNode);
        }


        return result;

    }
    /**
     * 将UmsMenu转化为UmsMenuNode并设置children属性
     */
    private UmsMenuNode covertMenuNode(UmsMenu menu, List<UmsMenu> menuList) {
        UmsMenuNode node = new UmsMenuNode();
        BeanUtils.copyProperties(menu, node);

        // 找出父节点为menu的节点
        List<UmsMenu> pList = new ArrayList<>();
        for (UmsMenu item : menuList){
            if (item.getParentId().equals(menu.getId())){
                pList.add(item);
            }
        }

        // 子节点递归
        List<UmsMenuNode> children = new ArrayList<>();
        for (UmsMenu item:pList){
            UmsMenuNode ayNode = covertMenuNode(item, menuList);
            children.add(ayNode);
        }

        if(children.isEmpty()){
            node.setChildren(null);
        }else {
            node.setChildren(children);
        }

        return node;
    }
```

## 3. Lambda版本

```java
 @Override
    public List<UmsMenuNode> treeListLambda() {
        List<UmsMenu> menuList = umsMenuDao.findAll();
        List<UmsMenuNode> result = menuList.stream()
                .filter(menu -> menu.getParentId().equals(0L))
                .map(menu -> covertMenuNodeLambda(menu, menuList)).collect(Collectors.toList());
        return result;
    }
    /**
     * 将UmsMenu转化为UmsMenuNode并设置children属性
     */
    private UmsMenuNode covertMenuNodeLambda(UmsMenu menu, List<UmsMenu> menuList) {
        UmsMenuNode node = new UmsMenuNode();
        BeanUtils.copyProperties(menu, node);
        List<UmsMenuNode> children = menuList.stream()
                .filter(subMenu -> subMenu.getParentId().equals(menu.getId()))
                .map(subMenu -> covertMenuNodeLambda(subMenu, menuList)).collect(Collectors.toList());
        if(children.isEmpty()){
            node.setChildren(null);
        }else {
            node.setChildren(children);
        }

        return node;
    }

```

## 4. 结果

![image-20210118172945823](https://gitee.com/zszdevelop/blogimage/raw/master/img/image-20210118172945823.png)