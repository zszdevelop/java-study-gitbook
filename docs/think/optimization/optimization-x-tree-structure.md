# 树结构优化记录

## 1. 背景

本来是很简单的一个树结构，但是我们数据库中的数据过大，导致查询SQL 和 转换为树结构的时候速度过慢

## 2. 优化前数据

| 数据量 | SQL 查询耗时 | 转为树结构 |
| ------ | ------------ | ---------- |
| 6000条 | 1881ms       | 12658ms    |

我们前端10s 就超时了，所以这里总共耗费14s 是不能接受的

## 3. 优化前代码

Controller 层

```java
 /**
     * 获取部门下拉树列表
     */
    @GetMapping("/treeselect")
    public AjaxResult treeselect(SysDept dept)
    {
        List<SysDept> depts = deptService.selectDeptList(dept);
        return AjaxResult.success(deptService.buildDeptTreeSelect(depts));
    }
```

1. 查询部门下所有数据
2. 将数据转为树结构

service 层

```java
  /**
     * 构建前端所需要下拉树结构
     * 
     * @param depts 部门列表
     * @return 下拉树结构列表
     */
    @Override
    public List<TreeSelect> buildDeptTreeSelect(List<SysDept> depts)
    {
        List<SysDept> deptTrees = buildDeptTree(depts);
        return deptTrees.stream().map(TreeSelect::new).collect(Collectors.toList());
    }
    
    
        /**
     * 构建前端所需要树结构
     * 
     * @param depts 部门列表
     * @return 树结构列表
     */
    @Override
    public List<SysDept> buildDeptTree(List<SysDept> depts)
    {
        List<SysDept> returnList = new ArrayList<SysDept>();
        List<Long> tempList = new ArrayList<Long>();
        for (SysDept dept : depts)
        {
            tempList.add(dept.getDeptId());
        }
        for (Iterator<SysDept> iterator = depts.iterator(); iterator.hasNext();)
        {
            SysDept dept = (SysDept) iterator.next();
            // 如果是顶级节点, 遍历该父节点的所有子节点
            if (!tempList.contains(dept.getParentId()))
            {
                recursionFn(depts, dept);
                returnList.add(dept);
            }
        }
        if (returnList.isEmpty())
        {
            returnList = depts;
        }
        return returnList;
    }
    
     /**
     * 递归列表
     */
    private void recursionFn(List<SysDept> list, SysDept t)
    {
        // 得到子节点列表
        List<SysDept> childList = getChildList(list, t);
        t.setChildren(childList);
        for (SysDept tChild : childList)
        {
            if (hasChild(list, tChild))
            {
                recursionFn(list, tChild);
            }
        }
    }
```

其用递归实现树结构排序，导致排序非常耗时

## 4. 优化后代码

### 4.1 使用非递归方式构建树

```java
  /**
     * 用非递归的方式实现转换为数结构
     *
     * @param depts
     * @return
     */
    @Override
    public List<Tree<Long>> buildDeptTreeSelectNoRecursion(List<SysDept> depts, Long parentId) {
        //配置
        TreeNodeConfig treeNodeConfig = new TreeNodeConfig();
        treeNodeConfig.setNameKey("label");
        // 自定义属性名 都要默认值的
        List<Tree<Long>> treeList = TreeUtil.build(depts, parentId, treeNodeConfig,
                (treeNode, tree) -> {
                    tree.setId(treeNode.getDeptId());
                    tree.setParentId(treeNode.getParentId());
                    tree.setName(treeNode.getDeptName());
                    tree.putExtra("value", treeNode.getDeptId());
                });
        return treeList;
    }
```

## 4. 优化后数据

|        | 数据量 | SQL 查询耗时 | 转为树结构 |
| ------ | ------ | ------------ | ---------- |
| 优化前 | 6000条 | 1881ms       | 12658ms    |
| 优化后 | 6000条 |              | 22ms       |

