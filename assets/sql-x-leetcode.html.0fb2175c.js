import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as l,a as n,b as e,e as s,d as t,r as o}from"./app.b742c861.js";const c={},d=n("h1",{id:"leetcode\u4E2Dsql\u9898\u76EE",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#leetcode\u4E2Dsql\u9898\u76EE","aria-hidden":"true"},"#"),s(" Leetcode\u4E2DSQL\u9898\u76EE")],-1),u=n("h3",{id:"_595-big-countries",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_595-big-countries","aria-hidden":"true"},"#"),s(" 595. Big Countries")],-1),r={href:"https://leetcode.com/problems/big-countries/description/",target:"_blank",rel:"noopener noreferrer"},k=s("https://leetcode.com/problems/big-countries/description/"),v=t(`<h4 id="description" tabindex="-1"><a class="header-anchor" href="#description" aria-hidden="true">#</a> Description</h4><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-----------------+------------+------------+--------------+---------------+
| name            | continent  | area       | population   | gdp           |
+-----------------+------------+------------+--------------+---------------+
| Afghanistan     | Asia       | 652230     | 25500100     | 20343000      |
| Albania         | Europe     | 28748      | 2831741      | 12960000      |
| Algeria         | Africa     | 2381741    | 37100000     | 188681000     |
| Andorra         | Europe     | 468        | 78115        | 3712000       |
| Angola          | Africa     | 1246700    | 20609294     | 100990000     |
+-----------------+------------+------------+--------------+---------------+
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u9762\u79EF\u8D85\u8FC7 3,000,000 \u6216\u8005\u4EBA\u53E3\u6570\u8D85\u8FC7 25,000,000 \u7684\u56FD\u5BB6\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+--------------+-------------+--------------+
| name         | population  | area         |
+--------------+-------------+--------------+
| Afghanistan  | 25500100    | 652230       |
| Algeria      | 37100000    | 2381741      |
+--------------+-------------+--------------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema" tabindex="-1"><a class="header-anchor" href="#sql-schema" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> World<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> World <span class="token punctuation">(</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> continent <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> area <span class="token keyword">INT</span><span class="token punctuation">,</span> population <span class="token keyword">INT</span><span class="token punctuation">,</span> gdp <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> World <span class="token punctuation">(</span> NAME<span class="token punctuation">,</span> continent<span class="token punctuation">,</span> area<span class="token punctuation">,</span> population<span class="token punctuation">,</span> gdp <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;Afghanistan&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Asia&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;652230&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;25500100&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;203430000&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;Albania&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Europe&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;28748&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2831741&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;129600000&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;Algeria&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Africa&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2381741&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;37100000&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;1886810000&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;Andorra&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Europe&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;468&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;78115&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;37120000&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;Angola&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Africa&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;1246700&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;20609294&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;1009900000&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span> name<span class="token punctuation">,</span>
    population<span class="token punctuation">,</span>
    area
<span class="token keyword">FROM</span>
    World
<span class="token keyword">WHERE</span>
    area <span class="token operator">&gt;</span> <span class="token number">3000000</span>
    <span class="token operator">OR</span> population <span class="token operator">&gt;</span> <span class="token number">25000000</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_627-swap-salary" tabindex="-1"><a class="header-anchor" href="#_627-swap-salary" aria-hidden="true">#</a> 627. *Swap Salary</h3>`,9),m={href:"https://leetcode.com/problems/swap-salary/description/",target:"_blank",rel:"noopener noreferrer"},b=s("https://leetcode.com/problems/swap-salary/description/"),h=t(`<h4 id="description-1" tabindex="-1"><a class="header-anchor" href="#description-1" aria-hidden="true">#</a> Description</h4><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | m   | 2500   |
| 2  | B    | f   | 1500   |
| 3  | C    | m   | 5500   |
| 4  | D    | f   | 500    |
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EA\u7528\u4E00\u4E2A SQL \u67E5\u8BE2\uFF0C\u5C06 sex \u5B57\u6BB5\u53CD\u8F6C\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | f   | 2500   |
| 2  | B    | m   | 1500   |
| 3  | C    | f   | 5500   |
| 4  | D    | m   | 500    |

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-1" tabindex="-1"><a class="header-anchor" href="#sql-schema-1" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> salary<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> salary <span class="token punctuation">(</span> id <span class="token keyword">INT</span><span class="token punctuation">,</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> sex <span class="token keyword">CHAR</span> <span class="token punctuation">(</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> salary <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> salary <span class="token punctuation">(</span> id<span class="token punctuation">,</span> NAME<span class="token punctuation">,</span> sex<span class="token punctuation">,</span> salary <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;m&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;2500&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;1500&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;C&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;m&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;5500&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;4&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;D&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;500&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-1" tabindex="-1"><a class="header-anchor" href="#solution-1" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u7B2C\u4E00\u904D\u6CA1\u505A\u51FA\u6765\uFF0C\u5F02\u6216\u65B9\u6848\u5E94\u8BE5\u60F3\u4E0D\u5230\uFF0C\u4F46case when \u8981\u60F3\u5230\u624D\u5BF9</p></blockquote><h5 id="\u65B9\u6848\u4E00-\u5F02\u6216" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848\u4E00-\u5F02\u6216" aria-hidden="true">#</a> \u65B9\u6848\u4E00\uFF1A\u5F02\u6216</h5><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">UPDATE</span> salary
<span class="token keyword">SET</span> sex <span class="token operator">=</span> <span class="token keyword">CHAR</span> <span class="token punctuation">(</span> ASCII<span class="token punctuation">(</span>sex<span class="token punctuation">)</span> <span class="token operator">^</span> ASCII<span class="token punctuation">(</span> <span class="token string">&#39;m&#39;</span> <span class="token punctuation">)</span> <span class="token operator">^</span> ASCII<span class="token punctuation">(</span> <span class="token string">&#39;f&#39;</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u65B9\u6848\u4E8C-\u4F7F\u7528\u6761\u4EF6\u8BED\u53E5" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6848\u4E8C-\u4F7F\u7528\u6761\u4EF6\u8BED\u53E5" aria-hidden="true">#</a> \u65B9\u6848\u4E8C\uFF1A\u4F7F\u7528\u6761\u4EF6\u8BED\u53E5\uFF1A</h5><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>
<span class="token keyword">UPDATE</span> salary
    <span class="token keyword">SET</span> sex  <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">CASE</span> <span class="token keyword">WHEN</span> sex <span class="token operator">=</span> <span class="token string">&#39;m&#39;</span> 
                <span class="token keyword">THEN</span>  <span class="token string">&#39;f&#39;</span> 
                <span class="token keyword">ELSE</span> <span class="token string">&#39;m&#39;</span> 
                <span class="token keyword">END</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6216\u8005</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">UPDATE</span> salary <span class="token keyword">SET</span> sex <span class="token operator">=</span> <span class="token keyword">IF</span><span class="token punctuation">(</span>sex <span class="token operator">=</span> <span class="token string">&#39;m&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;f&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;m&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_620-not-boring-movies" tabindex="-1"><a class="header-anchor" href="#_620-not-boring-movies" aria-hidden="true">#</a> 620. Not Boring Movies</h3>`,15),g={href:"https://leetcode.com/problems/not-boring-movies/description/",target:"_blank",rel:"noopener noreferrer"},y=s("https://leetcode.com/problems/not-boring-movies/description/"),w=t(`<h4 id="description-2" tabindex="-1"><a class="header-anchor" href="#description-2" aria-hidden="true">#</a> Description</h4><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+-----------+--------------+-----------+
|   id    | movie     |  description |  rating   |
+---------+-----------+--------------+-----------+
|   1     | War       |   great 3D   |   8.9     |
|   2     | Science   |   fiction    |   8.5     |
|   3     | irish     |   boring     |   6.2     |
|   4     | Ice song  |   Fantacy    |   8.6     |
|   5     | House card|   Interesting|   9.1     |
+---------+-----------+--------------+-----------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E id \u4E3A\u5947\u6570\uFF0C\u5E76\u4E14 description \u4E0D\u662F boring \u7684\u7535\u5F71\uFF0C\u6309 rating \u964D\u5E8F\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+-----------+--------------+-----------+
|   id    | movie     |  description |  rating   |
+---------+-----------+--------------+-----------+
|   5     | House card|   Interesting|   9.1     |
|   1     | War       |   great 3D   |   8.9     |
+---------+-----------+--------------+-----------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-2" tabindex="-1"><a class="header-anchor" href="#sql-schema-2" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> cinema<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> cinema <span class="token punctuation">(</span> id <span class="token keyword">INT</span><span class="token punctuation">,</span> movie <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> description <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> rating <span class="token keyword">FLOAT</span> <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> cinema <span class="token punctuation">(</span> id<span class="token punctuation">,</span> movie<span class="token punctuation">,</span> description<span class="token punctuation">,</span> rating <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;War&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;great 3D&#39;</span><span class="token punctuation">,</span> <span class="token number">8.9</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Science&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;fiction&#39;</span><span class="token punctuation">,</span> <span class="token number">8.5</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;irish&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;boring&#39;</span><span class="token punctuation">,</span> <span class="token number">6.2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;Ice song&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Fantacy&#39;</span><span class="token punctuation">,</span> <span class="token number">8.6</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token string">&#39;House card&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Interesting&#39;</span><span class="token punctuation">,</span> <span class="token number">9.1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-2" tabindex="-1"><a class="header-anchor" href="#solution-2" aria-hidden="true">#</a> Solution</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    <span class="token operator">*</span>
<span class="token keyword">FROM</span>
    cinema
<span class="token keyword">WHERE</span>
    id <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token operator">AND</span> description <span class="token operator">!=</span> <span class="token string">&#39;boring&#39;</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    rating <span class="token keyword">DESC</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_596-classes-more-than-5-students" tabindex="-1"><a class="header-anchor" href="#_596-classes-more-than-5-students" aria-hidden="true">#</a> 596. Classes More Than 5 Students</h3>`,9),E={href:"https://leetcode.com/problems/classes-more-than-5-students/description/",target:"_blank",rel:"noopener noreferrer"},S=s("https://leetcode.com/problems/classes-more-than-5-students/description/"),I=t(`<h4 id="description-3" tabindex="-1"><a class="header-anchor" href="#description-3" aria-hidden="true">#</a> Description</h4><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+------------+
| student | class      |
+---------+------------+
| A       | Math       |
| B       | English    |
| C       | Math       |
| D       | Biology    |
| E       | Math       |
| F       | Computer   |
| G       | Math       |
| H       | Math       |
| I       | Math       |
+---------+------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u6709\u4E94\u540D\u53CA\u4EE5\u4E0A student \u7684 class\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+
| class   |
+---------+
| Math    |
+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-3" tabindex="-1"><a class="header-anchor" href="#sql-schema-3" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> courses<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> courses <span class="token punctuation">(</span> student <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> class <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> courses <span class="token punctuation">(</span> student<span class="token punctuation">,</span> class <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;A&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;B&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;English&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;C&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;D&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Biology&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;E&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;F&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Computer&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;G&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;H&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;I&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Math&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-3" tabindex="-1"><a class="header-anchor" href="#solution-3" aria-hidden="true">#</a> Solution</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    class
<span class="token keyword">FROM</span>
    courses
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
    class
<span class="token keyword">HAVING</span>
    <span class="token function">count</span><span class="token punctuation">(</span> <span class="token keyword">DISTINCT</span> student <span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">5</span><span class="token punctuation">;</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_182-duplicate-emails" tabindex="-1"><a class="header-anchor" href="#_182-duplicate-emails" aria-hidden="true">#</a> 182. Duplicate Emails</h3>`,9),T={href:"https://leetcode.com/problems/duplicate-emails/description/",target:"_blank",rel:"noopener noreferrer"},A=s("https://leetcode.com/problems/duplicate-emails/description/"),N=t(`<h4 id="description-4" tabindex="-1"><a class="header-anchor" href="#description-4" aria-hidden="true">#</a> Description</h4><p>\u90AE\u4EF6\u5730\u5740\u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u91CD\u590D\u7684\u90AE\u4EF6\u5730\u5740:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+
| Email   |
+---------+
| a@b.com |
+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-4" tabindex="-1"><a class="header-anchor" href="#sql-schema-4" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Person<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Person <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> Email <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Person <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> Email <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;a@b.com&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;c@d.com&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;a@b.com&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-4" tabindex="-1"><a class="header-anchor" href="#solution-4" aria-hidden="true">#</a> Solution</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    Email
<span class="token keyword">FROM</span>
    Person
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
    Email
<span class="token keyword">HAVING</span>
    <span class="token function">COUNT</span><span class="token punctuation">(</span> <span class="token operator">*</span> <span class="token punctuation">)</span> <span class="token operator">&gt;=</span> <span class="token number">2</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_196-delete-duplicate-emails" tabindex="-1"><a class="header-anchor" href="#_196-delete-duplicate-emails" aria-hidden="true">#</a> 196. *Delete Duplicate Emails</h3>`,10),x={href:"https://leetcode.com/problems/delete-duplicate-emails/description/",target:"_blank",rel:"noopener noreferrer"},_=s("https://leetcode.com/problems/delete-duplicate-emails/description/"),q=t(`<h4 id="description-5" tabindex="-1"><a class="header-anchor" href="#description-5" aria-hidden="true">#</a> Description</h4><p>\u90AE\u4EF6\u5730\u5740\u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+---------+
| Id | Email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664\u91CD\u590D\u7684\u90AE\u4EF6\u5730\u5740:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+------------------+
| Id | Email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-5" tabindex="-1"><a class="header-anchor" href="#sql-schema-5" aria-hidden="true">#</a> SQL Schema</h4><p>\u4E0E 182 \u76F8\u540C\u3002</p><h4 id="solution-5" tabindex="-1"><a class="header-anchor" href="#solution-5" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u63A5\u66FF\u601D\u8DEF\u88AB\u5C40\u9650\u4E86\uFF0C\u53EF\u4EE5\u81EA\u5173\u8054</p></blockquote><p>\u8FDE\u63A5:</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DELETE</span> p1
<span class="token keyword">FROM</span>
    Person p1<span class="token punctuation">,</span>
    Person p2
<span class="token keyword">WHERE</span>
    p1<span class="token punctuation">.</span>Email <span class="token operator">=</span> p2<span class="token punctuation">.</span>Email
    <span class="token operator">AND</span> p1<span class="token punctuation">.</span>Id <span class="token operator">&gt;</span> p2<span class="token punctuation">.</span>Id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B50\u67E5\u8BE2:</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DELETE</span>
<span class="token keyword">FROM</span>
    Person
<span class="token keyword">WHERE</span>
    id <span class="token operator">NOT</span> <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> id <span class="token keyword">FROM</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token function">min</span><span class="token punctuation">(</span> id <span class="token punctuation">)</span> <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> Person <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> email <span class="token punctuation">)</span> <span class="token keyword">AS</span> m <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5E94\u8BE5\u6CE8\u610F\u7684\u662F\u4E0A\u8FF0\u89E3\u6CD5\u989D\u5916\u5D4C\u5957\u4E86\u4E00\u4E2A SELECT \u8BED\u53E5\uFF0C\u5982\u679C\u4E0D\u8FD9\u4E48\u505A\uFF0C\u4F1A\u51FA\u73B0\u9519\u8BEF: You can&#39;t specify target table &#39;Person&#39; for update in FROM clause\u3002\u4EE5\u4E0B\u6F14\u793A\u4E86\u8FD9\u79CD\u9519\u8BEF\u89E3\u6CD5\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DELETE</span>
<span class="token keyword">FROM</span>
    Person
<span class="token keyword">WHERE</span>
    id <span class="token operator">NOT</span> <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token function">min</span><span class="token punctuation">(</span> id <span class="token punctuation">)</span> <span class="token keyword">AS</span> id <span class="token keyword">FROM</span> Person <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> email <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),R=s("\u53C2\u8003: "),f={href:"https://stackoverflow.com/questions/45494/mysql-error-1093-cant-specify-target-table-for-update-in-from-clause",target:"_blank",rel:"noopener noreferrer"},L=s("pMySQL Error 1093 - Can't specify target table for update in FROM clause (opens new window)"),C=n("h3",{id:"_175-combine-two-tables",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_175-combine-two-tables","aria-hidden":"true"},"#"),s(" 175. Combine Two Tables")],-1),O={href:"https://leetcode.com/problems/combine-two-tables/description/",target:"_blank",rel:"noopener noreferrer"},D=s("https://leetcode.com/problems/combine-two-tables/description/"),M=t(`<h4 id="description-6" tabindex="-1"><a class="header-anchor" href="#description-6" aria-hidden="true">#</a> Description</h4><p>Person \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| PersonId    | int     |
| FirstName   | varchar |
| LastName    | varchar |
+-------------+---------+
PersonId is the primary key column for this table.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Address \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| AddressId   | int     |
| PersonId    | int     |
| City        | varchar |
| State       | varchar |
+-------------+---------+
AddressId is the primary key column for this table.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E FirstName, LastName, City, State \u6570\u636E\uFF0C\u800C\u4E0D\u7BA1\u4E00\u4E2A\u7528\u6237\u6709\u6CA1\u6709\u586B\u5730\u5740\u4FE1\u606F\u3002</p><h4 id="sql-schema-6" tabindex="-1"><a class="header-anchor" href="#sql-schema-6" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Person<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Person <span class="token punctuation">(</span> PersonId <span class="token keyword">INT</span><span class="token punctuation">,</span> FirstName <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> LastName <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Address<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Address <span class="token punctuation">(</span> AddressId <span class="token keyword">INT</span><span class="token punctuation">,</span> PersonId <span class="token keyword">INT</span><span class="token punctuation">,</span> City <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> State <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Person <span class="token punctuation">(</span> PersonId<span class="token punctuation">,</span> LastName<span class="token punctuation">,</span> FirstName <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Wang&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Allen&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Address <span class="token punctuation">(</span> AddressId<span class="token punctuation">,</span> PersonId<span class="token punctuation">,</span> City<span class="token punctuation">,</span> State <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;New York City&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;New York&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-6" tabindex="-1"><a class="header-anchor" href="#solution-6" aria-hidden="true">#</a> Solution</h4><p>\u4F7F\u7528\u5DE6\u5916\u8FDE\u63A5\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    FirstName<span class="token punctuation">,</span>
    LastName<span class="token punctuation">,</span>
    City<span class="token punctuation">,</span>
    State
<span class="token keyword">FROM</span>
    Person P
    <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> Address A
    <span class="token keyword">ON</span> P<span class="token punctuation">.</span>PersonId <span class="token operator">=</span> A<span class="token punctuation">.</span>PersonId<span class="token punctuation">;</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_181-employees-earning-more-than-their-managers" tabindex="-1"><a class="header-anchor" href="#_181-employees-earning-more-than-their-managers" aria-hidden="true">#</a> 181. * Employees Earning More Than Their Managers</h3>`,12),F={href:"https://leetcode.com/problems/employees-earning-more-than-their-managers/description/",target:"_blank",rel:"noopener noreferrer"},B=s("https://leetcode.com/problems/employees-earning-more-than-their-managers/description/"),H=t(`<h4 id="description-7" tabindex="-1"><a class="header-anchor" href="#description-7" aria-hidden="true">#</a> Description</h4><p>Employee \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+-------+--------+-----------+
| Id | Name  | Salary | ManagerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | NULL      |
| 4  | Max   | 90000  | NULL      |
+----+-------+--------+-----------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u85AA\u8D44\u5927\u4E8E\u5176\u7ECF\u7406\u85AA\u8D44\u7684\u5458\u5DE5\u4FE1\u606F\u3002</p><h4 id="sql-schema-7" tabindex="-1"><a class="header-anchor" href="#sql-schema-7" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Employee<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Employee <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> Salary <span class="token keyword">INT</span><span class="token punctuation">,</span> ManagerId <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Employee <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> NAME<span class="token punctuation">,</span> Salary<span class="token punctuation">,</span> ManagerId <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Joe&#39;</span><span class="token punctuation">,</span> <span class="token number">70000</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Henry&#39;</span><span class="token punctuation">,</span> <span class="token number">80000</span><span class="token punctuation">,</span> <span class="token number">4</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;Sam&#39;</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;Max&#39;</span><span class="token punctuation">,</span> <span class="token number">90000</span><span class="token punctuation">,</span> <span class="token boolean">NULL</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-7" tabindex="-1"><a class="header-anchor" href="#solution-7" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u600E\u4E48\u8FC7\u6EE4\u6389\u81EA\u5DF1</p></blockquote><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    E1<span class="token punctuation">.</span>NAME <span class="token keyword">AS</span> Employee
<span class="token keyword">FROM</span>
    Employee E1
    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> Employee E2
    <span class="token keyword">ON</span> E1<span class="token punctuation">.</span>ManagerId <span class="token operator">=</span> E2<span class="token punctuation">.</span>Id
    <span class="token operator">AND</span> E1<span class="token punctuation">.</span>Salary <span class="token operator">&gt;</span> E2<span class="token punctuation">.</span>Salary<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_183-customers-who-never-order" tabindex="-1"><a class="header-anchor" href="#_183-customers-who-never-order" aria-hidden="true">#</a> 183. Customers Who Never Order</h3>`,10),P={href:"https://leetcode.com/problems/customers-who-never-order/description/",target:"_blank",rel:"noopener noreferrer"},V=s("https://leetcode.com/problems/customers-who-never-order/description/"),U=t(`<h4 id="description-8" tabindex="-1"><a class="header-anchor" href="#description-8" aria-hidden="true">#</a> Description</h4><p>Curstomers \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+-------+
| Id | Name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Orders \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u6CA1\u6709\u8BA2\u5355\u7684\u987E\u5BA2\u4FE1\u606F:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-8" tabindex="-1"><a class="header-anchor" href="#sql-schema-8" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Customers<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Customers <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Orders<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Orders <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> CustomerId <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Customers <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> NAME <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Joe&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Henry&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;Sam&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;Max&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Orders <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> CustomerId <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-8" tabindex="-1"><a class="header-anchor" href="#solution-8" aria-hidden="true">#</a> Solution</h4><p>\u5DE6\u5916\u94FE\u63A5</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    C<span class="token punctuation">.</span>Name <span class="token keyword">AS</span> Customers
<span class="token keyword">FROM</span>
    Customers C
    <span class="token keyword">LEFT</span> <span class="token keyword">JOIN</span> Orders O
    <span class="token keyword">ON</span> C<span class="token punctuation">.</span>Id <span class="token operator">=</span> O<span class="token punctuation">.</span>CustomerId
<span class="token keyword">WHERE</span>
    O<span class="token punctuation">.</span>CustomerId <span class="token operator">IS</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5B50\u67E5\u8BE2</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    Name <span class="token keyword">AS</span> Customers
<span class="token keyword">FROM</span>
    Customers
<span class="token keyword">WHERE</span>
    Id <span class="token operator">NOT</span> <span class="token operator">IN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> CustomerId <span class="token keyword">FROM</span> Orders <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_184-department-highest-salary" tabindex="-1"><a class="header-anchor" href="#_184-department-highest-salary" aria-hidden="true">#</a> 184. * Department Highest Salary</h3>`,15),W={href:"https://leetcode.com/problems/department-highest-salary/description/",target:"_blank",rel:"noopener noreferrer"},Q=s("https://leetcode.com/problems/department-highest-salary/description/"),X=t(`<h4 id="description-9" tabindex="-1"><a class="header-anchor" href="#description-9" aria-hidden="true">#</a> Description</h4><p>Employee \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Department \u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+----------+
| Id | Name     |
+----+----------+
| 1  | IT       |
| 2  | Sales    |
+----+----------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u4E00\u4E2A Department \u4E2D\u6536\u5165\u6700\u9AD8\u8005\u7684\u4FE1\u606F:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Max      | 90000  |
| Sales      | Henry    | 80000  |
+------------+----------+--------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-9" tabindex="-1"><a class="header-anchor" href="#sql-schema-9" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> Employee<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Employee <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span><span class="token punctuation">,</span> Salary <span class="token keyword">INT</span><span class="token punctuation">,</span> DepartmentId <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> Department<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Department <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> NAME <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Employee <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> NAME<span class="token punctuation">,</span> Salary<span class="token punctuation">,</span> DepartmentId <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;Joe&#39;</span><span class="token punctuation">,</span> <span class="token number">70000</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Henry&#39;</span><span class="token punctuation">,</span> <span class="token number">80000</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;Sam&#39;</span><span class="token punctuation">,</span> <span class="token number">60000</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token string">&#39;Max&#39;</span><span class="token punctuation">,</span> <span class="token number">90000</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Department <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> NAME <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&#39;IT&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;Sales&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-9" tabindex="-1"><a class="header-anchor" href="#solution-9" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u6211\u7B2C\u4E00\u904D\u7684\u65B9\u6848\u662F\u67E5\u51FA\u90E8\u95E8\u4E2D\u5DE5\u8D44\u6700\u9AD8\u7684\u5458\u5DE5\uFF0C\u518D\u5339\u914D\u8FD9\u4E2A\u516C\u53F8\u5BF9\u5E94\u7684\u4EBA\u3002\u4F46\u8FD9\u6837\u53EF\u80FD\u5B58\u5728\u591A\u4E2A\u5DE5\u8D44\u4E00\u6837\u7684\u4EBA</p></blockquote><p>\u521B\u5EFA\u4E00\u4E2A\u4E34\u65F6\u8868\uFF0C\u5305\u542B\u4E86\u90E8\u95E8\u5458\u5DE5\u7684\u6700\u5927\u85AA\u8D44\u3002\u53EF\u4EE5\u5BF9\u90E8\u95E8\u8FDB\u884C\u5206\u7EC4\uFF0C\u7136\u540E\u4F7F\u7528 MAX() \u6C47\u603B\u51FD\u6570\u53D6\u5F97\u6700\u5927\u85AA\u8D44\u3002</p><p>\u4E4B\u540E\u4F7F\u7528\u8FDE\u63A5\u627E\u5230\u4E00\u4E2A\u90E8\u95E8\u4E2D\u85AA\u8D44\u7B49\u4E8E\u4E34\u65F6\u8868\u4E2D\u6700\u5927\u85AA\u8D44\u7684\u5458\u5DE5\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    D<span class="token punctuation">.</span>NAME Department<span class="token punctuation">,</span>
    E<span class="token punctuation">.</span>NAME Employee<span class="token punctuation">,</span>
    E<span class="token punctuation">.</span>Salary
<span class="token keyword">FROM</span>
    Employee E<span class="token punctuation">,</span>
    Department D<span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> DepartmentId<span class="token punctuation">,</span> <span class="token function">MAX</span><span class="token punctuation">(</span> Salary <span class="token punctuation">)</span> Salary <span class="token keyword">FROM</span> Employee <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> DepartmentId <span class="token punctuation">)</span> M
<span class="token keyword">WHERE</span>
    E<span class="token punctuation">.</span>DepartmentId <span class="token operator">=</span> D<span class="token punctuation">.</span>Id
    <span class="token operator">AND</span> E<span class="token punctuation">.</span>DepartmentId <span class="token operator">=</span> M<span class="token punctuation">.</span>DepartmentId
    <span class="token operator">AND</span> E<span class="token punctuation">.</span>Salary <span class="token operator">=</span> M<span class="token punctuation">.</span>Salary<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_176-second-highest-salary" tabindex="-1"><a class="header-anchor" href="#_176-second-highest-salary" aria-hidden="true">#</a> 176. Second Highest Salary</h3>`,15),G={href:"https://leetcode.com/problems/second-highest-salary/description/",target:"_blank",rel:"noopener noreferrer"},Y=s("https://leetcode.com/problems/second-highest-salary/description/"),J=t(`<h4 id="description-10" tabindex="-1"><a class="header-anchor" href="#description-10" aria-hidden="true">#</a> Description</h4><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u5DE5\u8D44\u7B2C\u4E8C\u9AD8\u7684\u5458\u5DE5\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CA1\u6709\u627E\u5230\u8FD4\u56DE null \u800C\u4E0D\u662F\u4E0D\u8FD4\u56DE\u6570\u636E\u3002</p><h4 id="sql-schema-10" tabindex="-1"><a class="header-anchor" href="#sql-schema-10" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Employee<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Employee <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> Salary <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Employee <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> Salary <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">200</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">300</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-10" tabindex="-1"><a class="header-anchor" href="#solution-10" aria-hidden="true">#</a> Solution</h4><p>\u4E3A\u4E86\u5728\u6CA1\u6709\u67E5\u627E\u5230\u6570\u636E\u65F6\u8FD4\u56DE null\uFF0C\u9700\u8981\u5728\u67E5\u8BE2\u7ED3\u679C\u5916\u9762\u518D\u5957\u4E00\u5C42 SELECT\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> Salary <span class="token keyword">FROM</span> Employee <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span> <span class="token keyword">LIMIT</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span> SecondHighestSalary<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_177-nth-highest-salary" tabindex="-1"><a class="header-anchor" href="#_177-nth-highest-salary" aria-hidden="true">#</a> 177. * Nth Highest Salary</h3><h4 id="description-11" tabindex="-1"><a class="header-anchor" href="#description-11" aria-hidden="true">#</a> Description</h4><p>\u67E5\u627E\u5DE5\u8D44\u7B2C N \u9AD8\u7684\u5458\u5DE5\u3002</p><h4 id="sql-schema-11" tabindex="-1"><a class="header-anchor" href="#sql-schema-11" aria-hidden="true">#</a> SQL Schema</h4><p>\u540C 176\u3002</p><h4 id="solution-11" tabindex="-1"><a class="header-anchor" href="#solution-11" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u51FD\u6570\u4E0D\u592A\u4F1A\u5199\u4E86</p></blockquote><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> getNthHighestSalary <span class="token punctuation">(</span> N <span class="token keyword">INT</span> <span class="token punctuation">)</span> <span class="token keyword">RETURNS</span> <span class="token keyword">INT</span> <span class="token keyword">BEGIN</span>

<span class="token keyword">SET</span> N <span class="token operator">=</span> N <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">RETURN</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> Salary <span class="token keyword">FROM</span> Employee <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> Salary <span class="token keyword">DESC</span> <span class="token keyword">LIMIT</span> N<span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">END</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_178-rank-scores" tabindex="-1"><a class="header-anchor" href="#_178-rank-scores" aria-hidden="true">#</a> 178. Rank Scores</h3>`,19),j={href:"https://leetcode.com/problems/rank-scores/description/",target:"_blank",rel:"noopener noreferrer"},z=s("https://leetcode.com/problems/rank-scores/description/"),K=t(`<h4 id="description-12" tabindex="-1"><a class="header-anchor" href="#description-12" aria-hidden="true">#</a> Description</h4><p>\u5F97\u5206\u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+-------+
| Id | Score |
+----+-------+
| 1  | 3.50  |
| 2  | 3.65  |
| 3  | 4.00  |
| 4  | 3.85  |
| 5  | 4.00  |
| 6  | 3.65  |
+----+-------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5C06\u5F97\u5206\u6392\u5E8F\uFF0C\u5E76\u7EDF\u8BA1\u6392\u540D\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-------+------+
| Score | Rank |
+-------+------+
| 4.00  | 1    |
| 4.00  | 1    |
| 3.85  | 2    |
| 3.65  | 3    |
| 3.65  | 3    |
| 3.50  | 4    |
+-------+------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-12" tabindex="-1"><a class="header-anchor" href="#sql-schema-12" aria-hidden="true">#</a> SQL Schema</h4><blockquote><ol><li>\u8FD9\u9898\u5355\u5355\u7ED9\u7ED3\u679C\u8FD4\u56DE\u5E8F\u53F7\u8FD8\u4E0D\u591F\uFF0C\u540C\u540D\u7684\u90FD\u9700\u8981\u4E3A\u7B2C\u4E00\u540D</li><li>178 \u7B54\u6848\u6709\u70B9\u95EE\u9898\uFF0C\u7F51\u4E0A\u627E\u4E86\u597D\u51E0\u4E2A\u4E5F\u4E0D\u80FD\u76F4\u63A5\u6267\u884C</li></ol></blockquote><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> Scores<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> Scores <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> Score <span class="token keyword">DECIMAL</span> <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> Scores <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> Score <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">3.5</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3.65</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4.0</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3.85</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">4.0</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">3.65</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-12" tabindex="-1"><a class="header-anchor" href="#solution-12" aria-hidden="true">#</a> Solution</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    S1<span class="token punctuation">.</span>score<span class="token punctuation">,</span>
    <span class="token function">COUNT</span><span class="token punctuation">(</span> <span class="token keyword">DISTINCT</span> S2<span class="token punctuation">.</span>score <span class="token punctuation">)</span> Rank
<span class="token keyword">FROM</span>
    Scores S1
    <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> Scores S2
    <span class="token keyword">ON</span> S1<span class="token punctuation">.</span>score <span class="token operator">&lt;=</span> S2<span class="token punctuation">.</span>score
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
    S1<span class="token punctuation">.</span>id
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    S1<span class="token punctuation">.</span>score <span class="token keyword">DESC</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_180-consecutive-numbers" tabindex="-1"><a class="header-anchor" href="#_180-consecutive-numbers" aria-hidden="true">#</a> 180. * Consecutive Numbers</h3>`,11),Z={href:"https://leetcode.com/problems/consecutive-numbers/description/",target:"_blank",rel:"noopener noreferrer"},$=s("https://leetcode.com/problems/consecutive-numbers/description/"),nn=t(`<h4 id="description-13" tabindex="-1"><a class="header-anchor" href="#description-13" aria-hidden="true">#</a> Description</h4><p>\u6570\u5B57\u8868:</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+----+-----+
| Id | Num |
+----+-----+
| 1  |  1  |
| 2  |  1  |
| 3  |  1  |
| 4  |  2  |
| 5  |  1  |
| 6  |  2  |
| 7  |  2  |
+----+-----+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u627E\u8FDE\u7EED\u51FA\u73B0\u4E09\u6B21\u7684\u6570\u5B57\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+-----------------+
| ConsecutiveNums |
+-----------------+
| 1               |
+-----------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-13" tabindex="-1"><a class="header-anchor" href="#sql-schema-13" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> LOGS<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> LOGS <span class="token punctuation">(</span> Id <span class="token keyword">INT</span><span class="token punctuation">,</span> Num <span class="token keyword">INT</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> LOGS <span class="token punctuation">(</span> Id<span class="token punctuation">,</span> Num <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">1</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">2</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-13" tabindex="-1"><a class="header-anchor" href="#solution-13" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u8FDE\u7EED\u51FA\u73B0\u4E09\u6B21\uFF0C\u5C31\u5173\u8054\u81EA\u5DF1\u4E09\u6B21[\u7834\u6D95\u4E3A\u7B11]</p></blockquote><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    <span class="token keyword">DISTINCT</span> L1<span class="token punctuation">.</span>num ConsecutiveNums
<span class="token keyword">FROM</span>
    Logs L1<span class="token punctuation">,</span>
    Logs L2<span class="token punctuation">,</span>
    Logs L3
<span class="token keyword">WHERE</span> L1<span class="token punctuation">.</span>id <span class="token operator">=</span> l2<span class="token punctuation">.</span>id <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token operator">AND</span> L2<span class="token punctuation">.</span>id <span class="token operator">=</span> L3<span class="token punctuation">.</span>id <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token operator">AND</span> L1<span class="token punctuation">.</span>num <span class="token operator">=</span> L2<span class="token punctuation">.</span>num
    <span class="token operator">AND</span> l2<span class="token punctuation">.</span>num <span class="token operator">=</span> l3<span class="token punctuation">.</span>num<span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_626-exchange-seats" tabindex="-1"><a class="header-anchor" href="#_626-exchange-seats" aria-hidden="true">#</a> 626. Exchange Seats</h3>`,11),sn={href:"https://leetcode.com/problems/exchange-seats/description/",target:"_blank",rel:"noopener noreferrer"},an=s("https://leetcode.com/problems/exchange-seats/description/"),en=t(`<h4 id="description-14" tabindex="-1"><a class="header-anchor" href="#description-14" aria-hidden="true">#</a> Description</h4><p>seat \u8868\u5B58\u50A8\u7740\u5EA7\u4F4D\u5BF9\u5E94\u7684\u5B66\u751F\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+---------+
|    id   | student |
+---------+---------+
|    1    | Abbot   |
|    2    | Doris   |
|    3    | Emerson |
|    4    | Green   |
|    5    | Jeames  |
+---------+---------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u6C42\u4EA4\u6362\u76F8\u90BB\u5EA7\u4F4D\u7684\u4E24\u4E2A\u5B66\u751F\uFF0C\u5982\u679C\u6700\u540E\u4E00\u4E2A\u5EA7\u4F4D\u662F\u5947\u6570\uFF0C\u90A3\u4E48\u4E0D\u4EA4\u6362\u8FD9\u4E2A\u5EA7\u4F4D\u4E0A\u7684\u5B66\u751F\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code>+---------+---------+
|    id   | student |
+---------+---------+
|    1    | Doris   |
|    2    | Abbot   |
|    3    | Green   |
|    4    | Emerson |
|    5    | Jeames  |
+---------+---------+
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="sql-schema-14" tabindex="-1"><a class="header-anchor" href="#sql-schema-14" aria-hidden="true">#</a> SQL Schema</h4><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span>
<span class="token keyword">IF</span>
    <span class="token keyword">EXISTS</span> seat<span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> seat <span class="token punctuation">(</span> id <span class="token keyword">INT</span><span class="token punctuation">,</span> student <span class="token keyword">VARCHAR</span> <span class="token punctuation">(</span> <span class="token number">255</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> seat <span class="token punctuation">(</span> id<span class="token punctuation">,</span> student <span class="token punctuation">)</span>
<span class="token keyword">VALUES</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Abbot&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Doris&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Emerson&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;4&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Green&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span> <span class="token string">&#39;5&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Jeames&#39;</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="solution-14" tabindex="-1"><a class="header-anchor" href="#solution-14" aria-hidden="true">#</a> Solution</h4><blockquote><p>\u521A\u5F00\u59CB\u4E00\u76F4\u60F3\u7740\u7528case when \u600E\u4E48\u5904\u7406\uFF0C\u53D1\u73B0\u5F88\u96BE\u5904\u7406</p></blockquote><p>\u4F7F\u7528\u591A\u4E2A union\u3002</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">SELECT</span>
    s1<span class="token punctuation">.</span>id <span class="token operator">-</span> <span class="token number">1</span> <span class="token keyword">AS</span> id<span class="token punctuation">,</span>
    s1<span class="token punctuation">.</span>student
<span class="token keyword">FROM</span>
    seat s1
<span class="token keyword">WHERE</span>
    s1<span class="token punctuation">.</span>id MOD <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token keyword">UNION</span>
<span class="token keyword">SELECT</span>
    s2<span class="token punctuation">.</span>id <span class="token operator">+</span> <span class="token number">1</span> <span class="token keyword">AS</span> id<span class="token punctuation">,</span>
    s2<span class="token punctuation">.</span>student
<span class="token keyword">FROM</span>
    seat s2
<span class="token keyword">WHERE</span>
    s2<span class="token punctuation">.</span>id MOD <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token operator">AND</span> s2<span class="token punctuation">.</span>id <span class="token operator">!=</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token function">max</span><span class="token punctuation">(</span> s3<span class="token punctuation">.</span>id <span class="token punctuation">)</span> <span class="token keyword">FROM</span> seat s3 <span class="token punctuation">)</span> <span class="token keyword">UNION</span>
<span class="token keyword">SELECT</span>
    s4<span class="token punctuation">.</span>id <span class="token keyword">AS</span> id<span class="token punctuation">,</span>
    s4<span class="token punctuation">.</span>student
<span class="token keyword">FROM</span>
    seat s4
<span class="token keyword">WHERE</span>
    s4<span class="token punctuation">.</span>id MOD <span class="token number">2</span> <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token operator">AND</span> s4<span class="token punctuation">.</span>id <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token keyword">SELECT</span> <span class="token function">max</span><span class="token punctuation">(</span> s5<span class="token punctuation">.</span>id <span class="token punctuation">)</span> <span class="token keyword">FROM</span> seat s5 <span class="token punctuation">)</span>
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    id<span class="token punctuation">;</span>

  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u53C2\u8003\u6587\u7AE0" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003\u6587\u7AE0" aria-hidden="true">#</a> \u53C2\u8003\u6587\u7AE0</h2>`,12),tn={href:"https://pdai.tech/md/db/sql-lan/sql-lan-leetcode.html",target:"_blank",rel:"noopener noreferrer"},pn=n("strong",null,"SQL\u8BED\u8A00 - SQL\u9898\u76EE\u8FDB\u9636",-1);function ln(on,cn){const a=o("ExternalLinkIcon");return i(),l("div",null,[d,u,n("p",null,[n("a",r,[k,e(a)])]),v,n("p",null,[n("a",m,[b,e(a)])]),h,n("p",null,[n("a",g,[y,e(a)])]),w,n("p",null,[n("a",E,[S,e(a)])]),I,n("p",null,[n("a",T,[A,e(a)])]),N,n("p",null,[n("a",x,[_,e(a)])]),q,n("p",null,[R,n("a",f,[L,e(a)])]),C,n("p",null,[n("a",O,[D,e(a)])]),M,n("p",null,[n("a",F,[B,e(a)])]),H,n("p",null,[n("a",P,[V,e(a)])]),U,n("p",null,[n("a",W,[Q,e(a)])]),X,n("p",null,[n("a",G,[Y,e(a)])]),J,n("p",null,[n("a",j,[z,e(a)])]),K,n("p",null,[n("a",Z,[$,e(a)])]),nn,n("p",null,[n("a",sn,[an,e(a)])]),en,n("p",null,[n("a",tn,[pn,e(a)])])])}const rn=p(c,[["render",ln],["__file","sql-x-leetcode.html.vue"]]);export{rn as default};
