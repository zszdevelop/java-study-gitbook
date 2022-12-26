import{_ as n,W as s,X as a,a0 as e}from"./framework-0cf5f349.js";const i={},t=e(`<h1 id="aspose-word文档格式转换" tabindex="-1"><a class="header-anchor" href="#aspose-word文档格式转换" aria-hidden="true">#</a> aspose.word文档格式转换</h1><h2 id="_1-简介" tabindex="-1"><a class="header-anchor" href="#_1-简介" aria-hidden="true">#</a> 1. 简介</h2><p>aspose.word文档格式转换非常方便，如果只有一份文件（如docx，pdf等）直接调用save方法即可。如果是多页的，我们可以借助SaveOptions 实现。如图片</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ImageSaveOptions</span> iso <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImageSaveOptions</span><span class="token punctuation">(</span><span class="token class-name">SaveFormat</span><span class="token punctuation">.</span><span class="token constant">JPEG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iso<span class="token punctuation">.</span><span class="token function">setResolution</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iso<span class="token punctuation">.</span><span class="token function">setPrettyFormat</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        iso<span class="token punctuation">.</span><span class="token function">setUseAntiAliasing</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Document</span> doc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Document</span><span class="token punctuation">(</span>docPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> pageCount <span class="token operator">=</span> doc<span class="token punctuation">.</span><span class="token function">getPageCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> imagesPath <span class="token operator">=</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s/images&quot;</span><span class="token punctuation">,</span> outFilePath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">File</span> imagesDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">File</span><span class="token punctuation">(</span>imagesPath<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>imagesDir<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            imagesDir<span class="token punctuation">.</span><span class="token function">mkdirs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>pageCount<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token class-name">PageSet</span> pageSet <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PageSet</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
            iso<span class="token punctuation">.</span><span class="token function">setPageSet</span><span class="token punctuation">(</span>pageSet<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> mainName <span class="token operator">=</span> <span class="token class-name">FileUtil</span><span class="token punctuation">.</span><span class="token function">mainName</span><span class="token punctuation">(</span>docPath<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token class-name">String</span> outPath <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">&quot;%s/%s_%s.jpg&quot;</span><span class="token punctuation">,</span>imagesDir<span class="token punctuation">,</span>mainName<span class="token punctuation">,</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            doc<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span>outPath<span class="token punctuation">,</span>iso<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> imagesPath<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-工具类" tabindex="-1"><a class="header-anchor" href="#_2-工具类" aria-hidden="true">#</a> 2. 工具类</h2><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>
import cn.hutool.core.io.FileUtil;
import com.aspose.words.Document;
import com.aspose.words.ImageSaveOptions;
import com.aspose.words.PageSet;
import com.aspose.words.SaveFormat;
import com.faduit.common.constant.FdConstants;
import org.jetbrains.annotations.NotNull;

import java.io.File;
import java.util.Objects;

/**
 * 文档转换
 * @author zsz
 * @date 2022-05-25
 */
public class DocConversionUtils
{


    /**
     * 文档格式转换
     * @param docPath
     * @param outFileType
     * @return
     */
    public static String docConversion(String docPath, String outFilePath, String outFileType) throws Exception {
        if (Objects.equals(outFileType, FdConstants.OUT_FILE_TYPE.JPG)){
            return docConversionJpg(docPath, outFilePath);
        }
        Document doc = new Document(docPath);
        String mainName = FileUtil.mainName(docPath);
        String outPath = String.format(&quot;%s/%s.%s&quot;,outFilePath,mainName,outFileType);
        doc.save(outPath);
        return outPath;
    }

    /**
     * doc转pdf
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionPdf(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.PDF);
        return outPath;
    }
    /**
     * doc转docx
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionDocx(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.DOCX);
        return outPath;
    }


    /**
     * 文档转Jpg图片格式
     * @param docPath
     * @param outFilePath
     * @return
     * @throws Exception
     */
    private static String docConversionJpg(String docPath, String outFilePath) throws Exception {
        ImageSaveOptions iso = new ImageSaveOptions(SaveFormat.JPEG);
        iso.setResolution(300);
        iso.setPrettyFormat(true);
        iso.setUseAntiAliasing(true);
        Document doc = new Document(docPath);
        int pageCount = doc.getPageCount();
        String imagesPath =String.format(&quot;%s/images&quot;, outFilePath);
        File imagesDir = new File(imagesPath);
        if(imagesDir.exists()){
            imagesDir.mkdirs();
        }
        for (int i = 0;i&lt;pageCount;i++){
            PageSet pageSet = new PageSet(i);
            iso.setPageSet(pageSet);
            String mainName = FileUtil.mainName(docPath);

            String outPath = String.format(&quot;%s/%s_%s.jpg&quot;,imagesDir,mainName,i+1);

            doc.save(outPath,iso);
        }
        return imagesPath;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function c(l,p){return s(),a("div",null,o)}const d=n(i,[["render",c],["__file","office-x-aspose-format-conversion.html.vue"]]);export{d as default};
