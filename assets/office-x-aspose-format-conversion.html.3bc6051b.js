import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as a,d as e}from"./app.52f5bdc7.js";const i={},t=e(`<h1 id="aspose-word\u6587\u6863\u683C\u5F0F\u8F6C\u6362" tabindex="-1"><a class="header-anchor" href="#aspose-word\u6587\u6863\u683C\u5F0F\u8F6C\u6362" aria-hidden="true">#</a> aspose.word\u6587\u6863\u683C\u5F0F\u8F6C\u6362</h1><h2 id="_1-\u7B80\u4ECB" tabindex="-1"><a class="header-anchor" href="#_1-\u7B80\u4ECB" aria-hidden="true">#</a> 1. \u7B80\u4ECB</h2><p>aspose.word\u6587\u6863\u683C\u5F0F\u8F6C\u6362\u975E\u5E38\u65B9\u4FBF\uFF0C\u5982\u679C\u53EA\u6709\u4E00\u4EFD\u6587\u4EF6\uFF08\u5982docx\uFF0Cpdf\u7B49\uFF09\u76F4\u63A5\u8C03\u7528save\u65B9\u6CD5\u5373\u53EF\u3002\u5982\u679C\u662F\u591A\u9875\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u501F\u52A9SaveOptions \u5B9E\u73B0\u3002\u5982\u56FE\u7247</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token class-name">ImageSaveOptions</span> iso <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ImageSaveOptions</span><span class="token punctuation">(</span><span class="token class-name">SaveFormat</span><span class="token punctuation">.</span><span class="token constant">JPEG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u5DE5\u5177\u7C7B" tabindex="-1"><a class="header-anchor" href="#_2-\u5DE5\u5177\u7C7B" aria-hidden="true">#</a> 2. \u5DE5\u5177\u7C7B</h2><div class="language-JAVA ext-JAVA line-numbers-mode"><pre class="language-JAVA"><code>
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
 * \u6587\u6863\u8F6C\u6362
 * @author zsz
 * @date 2022-05-25
 */
public class DocConversionUtils
{


    /**
     * \u6587\u6863\u683C\u5F0F\u8F6C\u6362
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
     * doc\u8F6Cpdf
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionPdf(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.PDF);
        return outPath;
    }
    /**
     * doc\u8F6Cdocx
     * @param docPath
     * @param outFilePath
     * @return
     */
    public static String docConversionDocx(String docPath, String outFilePath) throws Exception {
        String outPath = docConversion(docPath, outFilePath, FdConstants.OUT_FILE_TYPE.DOCX);
        return outPath;
    }


    /**
     * \u6587\u6863\u8F6CJpg\u56FE\u7247\u683C\u5F0F
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),o=[t];function c(l,p){return s(),a("div",null,o)}const r=n(i,[["render",c],["__file","office-x-aspose-format-conversion.html.vue"]]);export{r as default};
