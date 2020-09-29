# HashMap相关问题

## 1. HashMap中相关概念

- size：

  表示HashMap中存放KV数量（为链表和树中的KV的总和）

- capacity（容量）

  capacity就是指HashMap中桶的数量，默认值为16，**容量都是2的幂**

- loadFactor（装载因子）

  装载因子用来衡量HashMap满的程度，loadFactor的默认值为0.75f。计算HashMap的实时装载因子的方法为：size/capacity，而不是占用桶的数量去除以capacity。

- threshold：

  表示当HashMap的size大于threshold时会执行resize操作。

## 2. 假如我们需要存500个数需要多大的HashMap?

- HashMap 默认的初始化大小为16，之后每次扩充，变为原来的2倍

  需要存储500个数，那么至少512个的容量。

- 又因为HashMap每次put操作都会检查一遍size（当前容量）> initailCapacity*loadFactor。

  - 默认的负载因子为0.75

    500已经大于512*0.75=384，**所以还需要自动扩容到1024**

  - 更改负载因子为1

    那么只需要512个空间

PS: 特殊情况HashMap的数还有可能都打在一个槽上，我们这里以每个都不一样为例

```
   @Test
    public void test02() throws Exception {
        HashMap<Object,Object> map = new HashMap<>();
        for (int i = 0;i<500;i++){
            map.put(i,i);
        }
        // 通过反射获取容量变量capacity,并调用map对象
        Method capacity = map.getClass().getDeclaredMethod("capacity");
        capacity.setAccessible(true);
        Integer realCapacity = (Integer) capacity.invoke(map);
        // HashMap插入500个数，实际容量为1024
        System.out.println("HashMap插入500个数，实际容量为" + realCapacity);
    }
```



## 3. HashMap的负载因子

HashMap默认的负载因子为0.75