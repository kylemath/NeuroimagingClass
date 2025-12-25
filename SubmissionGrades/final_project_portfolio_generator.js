/**
 * Final Project Portfolio Generator for Student Work Catalog
 * 
 * This module generates HTML portfolio pages specifically for Final Projects by:
 * 1. Collecting all Final Project submissions
 * 2. Using OpenAI API to extract content from PDFs
 * 3. Creating a beautiful HTML page focused on the final project
 * 
 * Uses OpenAI API key stored in localStorage (same as midterm grader)
 */

/**
 * Main function to generate a Final Project portfolio for a student
 */
async function generateFinalProjectPortfolio(studentName, studentData, allFiles) {
    console.log(`Generating Final Project portfolio for ${studentName}...`);
    
    try {
        // 1. Collect Final Project files and brainimation link
        const portfolioData = {
            studentName: studentName,
            finalProject: studentData.assignments?.finalProject?.files || [],
            brainimationLink: studentData.brainimationLink || ''
        };
        
        if (portfolioData.brainimationLink) {
            console.log(`Including BrainImation link: ${portfolioData.brainimationLink.substring(0, 50)}...`);
        }
        
        if (portfolioData.finalProject.length === 0) {
            throw new Error('No Final Project files found for this student');
        }
        
        // 2. Find Final Project PDF content (the main document to extract)
        const finalProjectPDFs = portfolioData.finalProject.filter(f => 
            f.name.toLowerCase().endsWith('.pdf')
        );
        
        let pdfContent = null;
        
        // If Final Project PDF exists, extract it; otherwise create default content
        if (finalProjectPDFs.length > 0) {
            // 3. Extract PDF content using LLM
            showFinalProjectStatus('Extracting content from Final Project PDF...', 'info');
            pdfContent = await extractFinalProjectPDFContent(finalProjectPDFs[0]);
        } else {
            // Create default content structure when no PDF
            console.log('⚠️ No Final Project PDF found - generating portfolio with other files only');
            showFinalProjectStatus('No PDF found - using other Final Project files...', 'info');
            pdfContent = {
                title: 'Final Project Portfolio',
                sections: [{
                    heading: 'Final Project',
                    content: '<p>This portfolio showcases the Final Project for PSYCH 403A1: Neuroimaging & Neurostimulation.</p>',
                    images: []
                }],
                references: [],
                extractedImages: []
            };
        }
        
        // 4. Generate HTML portfolio
        showFinalProjectStatus('Generating Final Project portfolio page...', 'info');
        const portfolioHTML = await generateFinalProjectPortfolioHTML(portfolioData, pdfContent);
        
        // 5. Download the portfolio
        downloadFinalProjectPortfolio(studentName, portfolioHTML);
        
        showFinalProjectStatus('✅ Final Project portfolio generated successfully!', 'success');
        
    } catch (error) {
        console.error('Final Project portfolio generation error:', error);
        showFinalProjectStatus('❌ Error: ' + error.message, 'error');
        throw error;
    }
}

/**
 * Extract content from PDF using OpenAI API with vision
 * Also extracts images from the PDF
 */
async function extractFinalProjectPDFContent(pdfFile) {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        throw new Error('No OpenAI API key found. Please save your API key first.');
    }
    
    // If it's a Google Drive file, we need to fetch it
    if (pdfFile.source === 'drive') {
        const fileContent = await fetchGoogleDriveFile(pdfFile.id);
        return await extractFinalProjectPDFWithOpenAI(fileContent, pdfFile.name, pdfFile);
    } else if (pdfFile.source === 'local' && pdfFile.file) {
        return await extractFinalProjectPDFWithOpenAI(pdfFile.file, pdfFile.name, pdfFile);
    } else {
        throw new Error('Unable to access PDF file');
    }
}

/**
 * Use PDF.js to extract text and images, convert to Markdown, then use LLM for structuring
 */
async function extractFinalProjectPDFWithOpenAI(pdfData, filename, pdfFile) {
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
        throw new Error('No API key found');
    }
    
    // Extract text and images from PDF using PDF.js
    showFinalProjectStatus('Extracting text and images from Final Project PDF...', 'info');
    const pdfExtraction = await extractFinalProjectPDFToMarkdown(pdfData);
    console.log(`Extracted ${pdfExtraction.images.length} images from PDF`);
    console.log(`Extracted ${pdfExtraction.text.length} characters of text`);
    
    // Use LLM to structure the markdown into JSON
    showFinalProjectStatus('Structuring Final Project content with AI...', 'info');
    const structuredContent = await structureFinalProjectMarkdownContent(pdfExtraction.markdown, filename, apiKey);
    
    // Add the actual extracted images to the content
    structuredContent.extractedImages = pdfExtraction.images;
    
    // Process p5.js code blocks and convert them to interactive BrainImation embeds
    processFinalProjectP5CodeBlocks(structuredContent);
    
    return structuredContent;
}

/**
 * Extract PDF to Markdown with embedded images
 * Returns: { markdown: string, text: string, images: array }
 */
async function extractFinalProjectPDFToMarkdown(pdfData) {
    // Load PDF.js if not already loaded
    if (typeof pdfjsLib === 'undefined') {
        await loadFinalProjectPDFJS();
    }
    
    let pdfDoc;
    if (pdfData instanceof File || pdfData instanceof Blob) {
        const arrayBuffer = await pdfData.arrayBuffer();
        pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    } else {
        pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
    }
    
    const extractedImages = [];
    let markdownText = '';
    let plainText = '';
    let imageCount = 0;
    
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        
        // Extract text content
        const textContent = await page.getTextContent();
        let pageText = '';
        let lastY = null;
        
        // Build text with basic structure detection
        textContent.items.forEach((item, idx) => {
            const text = item.str;
            if (!text.trim()) return;
            
            // Detect new lines based on Y position changes
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                pageText += '\n';
            }
            
            // Check if text looks like a heading (larger font size)
            const fontSize = item.transform[0];
            if (fontSize > 14 && text.length > 3) {
                pageText += '\n## ' + text + '\n';
            } else {
                pageText += text + ' ';
            }
            
            lastY = item.transform[5];
        });
        
        plainText += pageText + '\n\n';
        markdownText += pageText + '\n\n';
        
        // Extract images from page by rendering to canvas
        try {
            const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;
            
            // Check if page has meaningful content (not just white)
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const hasContent = checkFinalProjectCanvasHasContent(imageData);
            
            if (hasContent) {
                // Convert to data URL
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                imageCount++;
                
                extractedImages.push({
                    pageNum: pageNum,
                    data: dataUrl,
                    description: `Page ${pageNum} visual content`,
                    index: imageCount
                });
                
                markdownText += `\n![Image ${imageCount} from page ${pageNum}]\n\n`;
            }
        } catch (imgError) {
            console.warn(`Could not extract images from page ${pageNum}:`, imgError);
        }
        
        markdownText += '\n---\n\n'; // Page break
    }
    
    console.log(`Extracted ${extractedImages.length} images from ${pdfDoc.numPages} pages`);
    
    return {
        markdown: markdownText,
        text: plainText,
        images: extractedImages
    };
}

/**
 * Check if canvas has meaningful content (not just blank/white)
 */
function checkFinalProjectCanvasHasContent(imageData) {
    const data = imageData.data;
    let nonWhitePixels = 0;
    const threshold = 250;
    
    for (let i = 0; i < data.length; i += 400) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (r < threshold || g < threshold || b < threshold) {
            nonWhitePixels++;
            if (nonWhitePixels > 50) return true;
        }
    }
    
    return nonWhitePixels > 20;
}

/**
 * Load PDF.js library dynamically
 */
async function loadFinalProjectPDFJS() {
    if (typeof pdfjsLib !== 'undefined') return;
    
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

/**
 * Process p5.js code blocks and convert them to interactive BrainImation embeds
 */
function processFinalProjectP5CodeBlocks(structuredContent) {
    if (!structuredContent.sections) return;
    
    structuredContent.sections.forEach(section => {
        if (!section.content) return;
        
        // Find all code blocks marked as p5 sketches
        section.content = section.content.replace(
            /<pre><code class="p5-sketch" data-sketch="true">([\s\S]*?)<\/code><\/pre>/g,
            (match, code) => {
                const decodedCode = code
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'");
                
                const codeDataUri = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(decodedCode)));
                const brainimationUrl = 'https://neuroimneurostim.netlify.app/brainimation.html';
                const editorUrl = `${brainimationUrl}?code=${encodeURIComponent(codeDataUri)}&autorun=false`;
                
                return `
                    <div class="p5-embed-card">
                        <div class="p5-embed-header">
                            <span class="p5-badge">🎮 P5.js Sketch</span>
                            <span class="p5-length">${decodedCode.length} characters</span>
                        </div>
                        <pre><code class="p5-code-preview">${code}</code></pre>
                        <div class="p5-embed-actions">
                            <a href="${editorUrl}" target="_blank" class="btn-brainimation-inline">
                                ▶️ Run in BrainImation Editor
                            </a>
                            <button class="btn-show-code" onclick="this.parentElement.previousElementSibling.style.display = this.parentElement.previousElementSibling.style.display === 'none' ? 'block' : 'none'; this.textContent = this.textContent.includes('Show') ? '🔼 Hide Code' : '🔽 Show Code';">
                                🔽 Show Code
                            </button>
                        </div>
                    </div>
                `;
            }
        );
        
        // Also detect regular code blocks that look like p5 sketches
        section.content = section.content.replace(
            /<pre><code(?![^>]*class="p5-sketch")>([\s\S]*?)<\/code><\/pre>/g,
            (match, code) => {
                const decodedCode = code
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#039;/g, "'");
                
                const isP5 = /\b(setup|draw|createCanvas|background|fill|stroke|ellipse|rect|line|mouseX|mouseY|width|height|frameCount)\s*\(/.test(decodedCode);
                
                if (isP5 && decodedCode.length > 50) {
                    const codeDataUri = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(decodedCode)));
                    const brainimationUrl = 'https://neuroimneurostim.netlify.app/brainimation.html';
                    const editorUrl = `${brainimationUrl}?code=${encodeURIComponent(codeDataUri)}&autorun=false`;
                    
                    return `
                        <div class="p5-embed-card">
                            <div class="p5-embed-header">
                                <span class="p5-badge">🎮 P5.js Sketch</span>
                                <span class="p5-length">${decodedCode.length} characters</span>
                            </div>
                            <pre><code class="p5-code-preview">${code}</code></pre>
                            <div class="p5-embed-actions">
                                <a href="${editorUrl}" target="_blank" class="btn-brainimation-inline">
                                    ▶️ Run in BrainImation Editor
                                </a>
                                <button class="btn-show-code" onclick="this.parentElement.previousElementSibling.style.display = this.parentElement.previousElementSibling.style.display === 'none' ? 'block' : 'none'; this.textContent = this.textContent.includes('Show') ? '🔼 Hide Code' : '🔽 Show Code';">
                                    🔽 Show Code
                                </button>
                            </div>
                        </div>
                    `;
                }
                
                return match;
            }
        );
    });
}

/**
 * Structure markdown content using LLM for Final Project
 * Falls back to simple parsing if API is unavailable (CORS or other errors)
 */
async function structureFinalProjectMarkdownContent(markdownText, filename, apiKey) {
    // Try to use OpenAI API first, but fall back to simple parsing if CORS blocks it
    try {
        const prompt = `You are helping create a student portfolio webpage for their Final Project. Here is the extracted text from a student's Final Project report in markdown format.

Your task: Structure this into well-organized JSON for a portfolio webpage.

Markdown content:
${markdownText}

IMPORTANT: 
- Return ONLY valid, complete JSON
- Preserve all the student's original writing
- Identify section headings and organize content logically
- Note where images appear in the text (marked as ![Image N])
- Extract any references/citations at the end
- This is a FINAL PROJECT - focus on highlighting the student's research, methodology, and findings

FORMATTING RULES:
- Format CODE SNIPPETS in <pre><code> blocks
- For P5.js SKETCHES (code containing setup(), draw(), createCanvas), add:
  <pre><code class="p5-sketch" data-sketch="true">CODE_HERE</code></pre>
- Convert URLs to clickable <a href="..." target="_blank"> links
- For YouTube links, create embedded videos
- Keep regular paragraphs in <p> tags

Return valid JSON with this structure:
{
    "title": "main title of the final project",
    "sections": [
        {
            "heading": "section heading",
            "content": "section content as HTML with <p>, <ul>, <li>, <pre><code>, <a>, <iframe> tags",
            "images": [{"description": "what the image likely shows", "caption": "caption if mentioned"}]
        }
    ],
    "references": ["list of references if present"]
}

Convert markdown formatting to HTML tags. Keep paragraphs intact.`;

        const requestBody = {
            model: 'gpt-4o',
            messages: [{
                role: 'user',
                content: prompt
            }],
            max_tokens: 8000,
            temperature: 0.3,
            response_format: { type: "json_object" }
        };
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API error: ${response.status} - ${error.error?.message || 'Unknown'}`);
        }
        
        const data = await response.json();
        let content = data.choices[0].message.content.trim();
        
        // Remove markdown code blocks if present
        if (content.startsWith('```json')) {
            content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (content.startsWith('```')) {
            content = content.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        try {
            return JSON.parse(content);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            
            // Try to fix common JSON issues
            let fixedContent = content;
            if (fixedContent.includes('"') && !fixedContent.trim().endsWith('}')) {
                const quoteCount = (fixedContent.match(/"/g) || []).length;
                if (quoteCount % 2 !== 0) {
                    fixedContent += '"';
                }
                const openBraces = (fixedContent.match(/\{/g) || []).length;
                const closeBraces = (fixedContent.match(/\}/g) || []).length;
                const openBrackets = (fixedContent.match(/\[/g) || []).length;
                const closeBrackets = (fixedContent.match(/\]/g) || []).length;
                
                fixedContent += ']'.repeat(Math.max(0, openBrackets - closeBrackets));
                fixedContent += '}'.repeat(Math.max(0, openBraces - closeBraces));
            }
            
            try {
                return JSON.parse(fixedContent);
            } catch (secondError) {
                console.warn('Failed to parse OpenAI response, falling back to simple parsing');
                return structureFinalProjectMarkdownSimple(markdownText, filename);
            }
        }
    } catch (error) {
        // CORS error or network failure - fall back to simple parsing
        if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
            console.warn('⚠️ Cannot access OpenAI API (likely CORS restriction). Using simple text extraction instead.');
            console.warn('💡 For AI-powered structuring, you need to set up a backend proxy or use a serverless function.');
            showFinalProjectStatus('⚠️ Using simple extraction (OpenAI API blocked by browser)', 'warning');
            return structureFinalProjectMarkdownSimple(markdownText, filename);
        }
        throw error;
    }
}

/**
 * Simple fallback parser when AI is unavailable
 * Extracts structure from markdown without AI
 */
function structureFinalProjectMarkdownSimple(markdownText, filename) {
    console.log('📝 Using simple markdown parser (no AI)');
    
    const lines = markdownText.split('\n');
    const sections = [];
    let currentSection = null;
    let title = filename.replace('.pdf', '').replace(/_/g, ' ');
    
    // Try to find title (first large heading)
    const titleMatch = markdownText.match(/^##?\s+(.+)$/m);
    if (titleMatch) {
        title = titleMatch[1].trim();
    }
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Detect headings
        if (line.startsWith('## ')) {
            // Save previous section
            if (currentSection) {
                sections.push(currentSection);
            }
            // Start new section
            currentSection = {
                heading: line.replace(/^##\s+/, ''),
                content: '',
                images: []
            };
        } else if (line.startsWith('# ') && !title) {
            // Top-level heading might be title
            title = line.replace(/^#\s+/, '');
        } else if (currentSection) {
            // Add content to current section
            if (line.startsWith('![Image')) {
                // Note where image appears
                const imageMatch = line.match(/!\[Image (\d+)/);
                if (imageMatch) {
                    currentSection.images.push({
                        description: `Image ${imageMatch[1]} from PDF`,
                        caption: `Page content ${imageMatch[1]}`
                    });
                }
            } else if (line.length > 0) {
                // Convert line to HTML paragraph
                currentSection.content += `<p>${escapeHtml(line)}</p>\n`;
            }
        } else if (line.length > 0 && !currentSection) {
            // Content before first section
            if (!currentSection) {
                currentSection = {
                    heading: 'Overview',
                    content: '',
                    images: []
                };
            }
            currentSection.content += `<p>${escapeHtml(line)}</p>\n`;
        }
    }
    
    // Add last section
    if (currentSection) {
        sections.push(currentSection);
    }
    
    // If no sections found, create one with all text
    if (sections.length === 0) {
        const paragraphs = markdownText
            .split(/\n\n+/)
            .filter(p => p.trim().length > 0 && !p.startsWith('![Image'))
            .map(p => `<p>${escapeHtml(p.replace(/\n/g, ' '))}</p>`)
            .join('\n');
        
        sections.push({
            heading: 'Final Project Report',
            content: paragraphs,
            images: []
        });
    }
    
    return {
        title: title,
        sections: sections,
        references: []
    };
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Render Final Project files with content extracted and displayed
 */
async function renderFinalProjectFiles(files) {
    if (!files || files.length === 0) return '';
    
    const apiKey = localStorage.getItem('openai_api_key');
    const renderedContent = [];
    
    // Separate files by type
    const pdfs = files.filter(f => f.name.toLowerCase().endsWith('.pdf'));
    const videos = files.filter(f => f.name.toLowerCase().endsWith('.mov') || f.name.toLowerCase().endsWith('.mp4'));
    const images = files.filter(f => f.name.toLowerCase().endsWith('.png') || f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.jpeg'));
    const brainimations = files.filter(f => 
        f.name.toLowerCase().endsWith('.js') ||
        f.name.toLowerCase().endsWith('.txt') ||
        f.name.toLowerCase().endsWith('.rtf')
    );
    const notebooks = files.filter(f => f.name.toLowerCase().endsWith('.ipynb'));
    const others = files.filter(f => !pdfs.includes(f) && !videos.includes(f) && !images.includes(f) && !brainimations.includes(f) && !notebooks.includes(f));
    
    // Render videos
    for (const f of videos) {
        if (f.source === 'drive') {
            renderedContent.push(`
                <div class="media-card">
                    <h5>🎥 ${f.name}</h5>
                    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; background: #000;">
                        <iframe src="https://drive.google.com/file/d/${f.id}/preview" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
                                allow="autoplay; fullscreen"
                                allowfullscreen>
                        </iframe>
                    </div>
                    <p class="video-note">💡 Videos require Google Drive access. <a href="https://drive.google.com/file/d/${f.id}/view" target="_blank">Open in new tab</a> if it doesn't load.</p>
                </div>
            `);
        }
    }
    
    // Render images - download and embed as base64
    for (let i = 0; i < images.length; i++) {
        const f = images[i];
        if (f.source === 'drive') {
            try {
                showFinalProjectStatus(`Downloading image ${i+1}/${images.length}: ${f.name}...`, 'info');
                const imageDataUrl = await downloadFinalProjectDriveImageAsBase64(f.id);
                renderedContent.push(`
                    <div class="media-card">
                        <img src="${imageDataUrl}" 
                             alt="${f.name}"
                             style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 10px 0;"
                             loading="lazy">
                        <p class="media-caption">${f.name}</p>
                    </div>
                `);
            } catch (imgError) {
                console.warn(`Failed to download image ${f.name}:`, imgError);
                renderedContent.push(`
                    <div class="media-card">
                        <div style="padding: 2rem; text-align: center; background: #f5f5f5; border-radius: 8px; border: 2px dashed #ddd;">
                            <p style="color: #999; margin-bottom: 1rem;">📷 ${f.name}</p>
                            <a href="https://drive.google.com/file/d/${f.id}/view" target="_blank" style="color: #6366f1; font-weight: 600;">View on Google Drive</a>
                        </div>
                    </div>
                `);
            }
        } else if (f.source === 'local' && f.file) {
            try {
                showFinalProjectStatus(`Embedding local image ${i+1}/${images.length}: ${f.name}...`, 'info');
                const imageDataUrl = await finalProjectFileToBase64DataUrl(f.file);
                renderedContent.push(`
                    <div class="media-card">
                        <img src="${imageDataUrl}" 
                             alt="${f.name}"
                             style="width: 100%; max-width: 800px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); margin: 10px 0;"
                             loading="lazy">
                        <p class="media-caption">${f.name}</p>
                    </div>
                `);
            } catch (err) {
                console.warn(`Failed to embed local image ${f.name}:`, err);
            }
        }
    }
    
    // Render brainimations
    for (let i = 0; i < brainimations.length; i++) {
        const f = brainimations[i];
        if (f.source === 'drive') {
            try {
                showFinalProjectStatus(`Downloading code file ${i+1}/${brainimations.length}: ${f.name}...`, 'info');
                const codeContent = await downloadFinalProjectDriveTextFile(f.id);
                const codeDataUri = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(codeContent)));
                const brainimationUrl = 'https://neuroimneurostim.netlify.app/brainimation.html';
                const editorUrl = `${brainimationUrl}?code=${encodeURIComponent(codeDataUri)}&autorun=false`;
                
                const isJs = f.name.toLowerCase().endsWith('.js');
                const icon = isJs ? '🎮' : '📝';
                const fileType = isJs ? 'P5.js Sketch' : 'Code File';
                
                renderedContent.push(`
                    <div class="brainimation-card">
                        <h5>${icon} ${f.name}</h5>
                        <div class="brainimation-meta" style="font-size: 0.85em; color: #999; margin: 5px 0 10px 0;">
                            ${fileType} • P5.js Code • ${codeContent.length} characters • ✅ Embedded
                        </div>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <a href="${editorUrl}" target="_blank" class="btn-brainimation">
                                ▶️ Open in Live Editor
                            </a>
                            <a href="https://drive.google.com/file/d/${f.id}/view" target="_blank" style="color: #999; font-size: 0.85em; align-self: center; text-decoration: none; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px;">
                                📄 View Code on Drive
                            </a>
                        </div>
                    </div>
                `);
            } catch (codeError) {
                console.warn(`Failed to download code file ${f.name}:`, codeError);
            }
        }
    }
    
    // Render notebooks
    for (const f of notebooks) {
        if (f.source === 'drive') {
            const colabUrl = `https://colab.research.google.com/drive/${f.id}`;
            const driveUrl = `https://drive.google.com/file/d/${f.id}/view`;
            
            renderedContent.push(`
                <div class="notebook-card">
                    <div class="notebook-header">
                        <h5>📓 ${f.name}</h5>
                        <span class="notebook-badge">Jupyter Notebook</span>
                    </div>
                    <div class="notebook-meta">
                        <p>Interactive Python notebook with code, visualizations, and analysis</p>
                    </div>
                    <div class="notebook-actions">
                        <a href="${colabUrl}" target="_blank" class="btn-colab">
                            Open in Google Colab
                        </a>
                        <a href="${driveUrl}" target="_blank" class="btn-drive-link">
                            📄 View on Drive
                        </a>
                    </div>
                </div>
            `);
        }
    }
    
    // Render other files
    for (const f of others) {
        if (!f.name.toLowerCase().endsWith('.pdf')) {
            renderedContent.push(`<div class="file-link"><a href="${getFinalProjectFileURL(f)}" target="_blank">📄 ${f.name}</a></div>`);
        }
    }
    
    return renderedContent.join('');
}

/**
 * Generate complete HTML portfolio page for Final Project
 */
async function generateFinalProjectPortfolioHTML(portfolioData, pdfContent) {
    const nameParts = parseFinalProjectName(portfolioData.studentName);
    const firstName = nameParts.firstName || portfolioData.studentName.split(' ')[0] || 'Student';
    const lastName = nameParts.lastName || portfolioData.studentName.split(' ').slice(1).join(' ') || '';
    const lastInitial = lastName ? lastName.charAt(0) + '.' : '';
    const displayName = lastInitial ? `${firstName} ${lastInitial}` : firstName;
    
    console.log('Generating Final Project portfolio for:', { firstName, lastName, displayName, original: portfolioData.studentName });
    
    // Build table of contents from PDF sections
    let tocItems = pdfContent.sections.map((section, idx) => 
        `<li><a href="#section-${idx}">${section.heading}</a></li>`
    ).join('');
    
    // Add supplementary materials to TOC
    const supplementaryFiles = portfolioData.finalProject.filter(f => 
        !f.name.toLowerCase().endsWith('.pdf')
    );
    
    // Add BrainImation to TOC if link exists
    if (portfolioData.brainimationLink) {
        tocItems += '<li><a href="#brainimation-demo">🎮 Interactive Demo</a></li>';
    }
    
    if (supplementaryFiles.length > 0) {
        tocItems += '<li><a href="#supplementary-materials">📎 Project Materials</a></li>';
    }
    
    if (pdfContent.references && pdfContent.references.length > 0) {
        tocItems += '<li><a href="#references">📚 References</a></li>';
    }
    
    // Build section content with actual extracted images
    const extractedImages = pdfContent.extractedImages || [];
    
    const sectionHTML = pdfContent.sections.map((section, idx) => {
        const sectionImages = extractedImages.filter((img, imgIdx) => {
            const imagesPerSection = Math.ceil(extractedImages.length / pdfContent.sections.length);
            const expectedSection = Math.floor(imgIdx / imagesPerSection);
            return expectedSection === idx;
        });
        
        return `
        <section id="section-${idx}" class="content-section">
            <h2>${section.heading}</h2>
            <div class="section-content">
                ${section.content}
            </div>
            ${sectionImages.length > 0 ? `
                <div class="images">
                    ${sectionImages.map((img, imgIdx) => `
                        <figure>
                            <img src="${img.data}" 
                                 alt="${img.description}" 
                                 style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
                                 loading="lazy">
                            <figcaption>${img.description}</figcaption>
                        </figure>
                    `).join('')}
                </div>
            ` : ''}
        </section>
        `;
    }).join('');
    
    // Build BrainImation demo section if link exists
    let brainimationHTML = '';
    if (portfolioData.brainimationLink) {
        brainimationHTML = `
            <section id="brainimation-demo" class="brainimation-demo-section">
                <h2>🎮 Interactive Demo</h2>
                <p class="demo-intro">Experience the interactive p5.js visualization created for this project:</p>
                <div class="brainimation-embed-container">
                    <iframe 
                        src="${portfolioData.brainimationLink}" 
                        class="brainimation-iframe"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="brainimation-actions">
                    <a href="${portfolioData.brainimationLink}" target="_blank" class="btn-brainimation-fullscreen">
                        🔗 Open in Full Screen Editor
                    </a>
                </div>
            </section>
        `;
    }
    
    // Build supplementary materials section
    let supplementaryHTML = '';
    if (supplementaryFiles.length > 0) {
        const supplementaryContent = await renderFinalProjectFiles(supplementaryFiles);
        supplementaryHTML = `
            <section id="supplementary-materials" class="supplementary-section">
                <h2>📎 Project Materials</h2>
                <div class="supplementary-content">
                    ${supplementaryContent}
                </div>
            </section>
        `;
    }
    
    // Build references section
    const referencesHTML = pdfContent.references && pdfContent.references.length > 0 ? `
        <section id="references" class="references">
            <h2>📚 References</h2>
            <ol>
                ${pdfContent.references.map(ref => `<li>${ref}</li>`).join('')}
            </ol>
        </section>
    ` : '';
    
    // Complete HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${displayName} - Final Project Portfolio</title>
    <style>
        ${getFinalProjectPortfolioCSS()}
    </style>
</head>
<body>
    <nav class="sidebar">
        <div class="student-info">
            <h1>${displayName}</h1>
            <p class="course">PSYCH 403A1<br>Final Project</p>
        </div>
        
        <div class="navigation">
            <h3>Contents</h3>
            <ul class="toc">
                ${tocItems}
            </ul>
        </div>
        
        <div class="back-link">
            <a href="javascript:history.back()">← Back</a>
        </div>
    </nav>
    
    <main class="content">
        <header class="portfolio-header">
            <div class="project-badge">🎓 Final Project</div>
            <h1>${pdfContent.title || 'Final Project Portfolio'}</h1>
            <p class="byline">by ${displayName}</p>
            <div class="info-banner">
                <p>📄 This portfolio showcases the Final Project for PSYCH 403A1: Neuroimaging & Neurostimulation. 
                ${extractedImages.length > 0 ? `Contains ${extractedImages.length} embedded images.` : ''} 
                Videos require Google Drive access to play.</p>
            </div>
        </header>
        
        <div class="main-content">
            ${sectionHTML}
            
            ${brainimationHTML}
            
            ${supplementaryHTML}
            
            ${referencesHTML}
        </div>
    </main>
    
    <script>
        ${getFinalProjectPortfolioJS()}
    </script>
</body>
</html>`;
}

/**
 * Get CSS for Final Project portfolio pages
 */
function getFinalProjectPortfolioCSS() {
    return `
        :root {
            --primary: #6366f1;
            --secondary: #10b981;
            --accent: #f59e0b;
            --muted: #9ca3af;
            --text: #1f2937;
            --bg: #f3f4f6;
            --sidebar-bg: #1f2937;
            --sidebar-text: #f9fafb;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--bg);
            display: flex;
            min-height: 100vh;
        }
        
        /* Sidebar Navigation */
        .sidebar {
            width: 280px;
            background: var(--sidebar-bg);
            color: var(--sidebar-text);
            padding: 2rem;
            position: fixed;
            height: 100vh;
            overflow-y: auto;
            box-shadow: 4px 0 10px rgba(0,0,0,0.1);
        }
        
        .student-info h1 {
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.3;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .course {
            opacity: 0.8;
            font-size: 0.9rem;
            margin-bottom: 2rem;
            color: var(--accent);
        }
        
        .navigation h3 {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.6;
            margin: 2rem 0 1rem;
        }
        
        .toc {
            list-style: none;
        }
        
        .toc li {
            margin: 0.5rem 0;
        }
        
        .toc a {
            color: var(--sidebar-text);
            text-decoration: none;
            display: block;
            padding: 0.5rem 0.75rem;
            border-radius: 6px;
            transition: all 0.2s;
        }
        
        .toc a:hover {
            background: rgba(255,255,255,0.1);
            padding-left: 1rem;
        }
        
        .back-link {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.2);
        }
        
        .back-link a {
            color: var(--sidebar-text);
            text-decoration: none;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .back-link a:hover {
            opacity: 1;
        }
        
        /* Main Content */
        .content {
            margin-left: 280px;
            flex: 1;
            padding: 3rem;
            max-width: 900px;
        }
        
        .portfolio-header {
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 3px solid var(--primary);
        }
        
        .project-badge {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .portfolio-header h1 {
            font-size: 2.5rem;
            line-height: 1.2;
            margin-bottom: 0.5rem;
        }
        
        .byline {
            font-size: 1.1rem;
            color: var(--primary);
            font-weight: 500;
        }
        
        .info-banner {
            margin-top: 1.5rem;
            padding: 1rem 1.5rem;
            background: rgba(99, 102, 241, 0.1);
            border-left: 4px solid var(--primary);
            border-radius: 6px;
        }
        
        .info-banner p {
            margin: 0;
            font-size: 0.9rem;
            color: #555;
        }
        
        .content-section {
            margin-bottom: 3rem;
            scroll-margin-top: 2rem;
        }
        
        .content-section h2 {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .section-content {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .section-content h3 {
            font-size: 1.3rem;
            margin: 1.5rem 0 0.75rem;
            color: var(--secondary);
        }
        
        .section-content p {
            margin: 1rem 0;
        }
        
        .section-content ul, .section-content ol {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        
        .section-content li {
            margin: 0.5rem 0;
        }
        
        .section-content pre {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-left: 4px solid var(--primary);
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            margin: 1rem 0;
            font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .section-content code {
            background: #f8fafc;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace;
            font-size: 0.9em;
        }
        
        .section-content pre code {
            background: none;
            padding: 0;
        }
        
        .section-content a {
            color: var(--primary);
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s;
        }
        
        .section-content a:hover {
            border-bottom-color: var(--primary);
        }
        
        .images {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        .images figure {
            background: white;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            border: 1px solid #e5e7eb;
        }
        
        .images img {
            width: 100%;
            height: auto;
            display: block;
            border-radius: 8px;
        }
        
        figure {
            margin: 0;
        }
        
        figcaption {
            margin-top: 0.75rem;
            font-size: 0.9rem;
            font-style: italic;
            color: #6b7280;
            text-align: center;
            padding: 0.5rem;
        }
        
        .brainimation-demo-section {
            margin-top: 3rem;
            padding: 2rem;
            background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.05));
            border-radius: 16px;
            border: 2px solid rgba(99, 102, 241, 0.2);
        }
        
        .brainimation-demo-section h2 {
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 1rem;
        }
        
        .demo-intro {
            color: #555;
            margin-bottom: 1.5rem;
            font-size: 1rem;
        }
        
        .brainimation-embed-container {
            position: relative;
            width: 100%;
            padding-bottom: 75%; /* 4:3 aspect ratio */
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.2);
            background: #1a1a2e;
        }
        
        .brainimation-iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 12px;
        }
        
        .brainimation-actions {
            margin-top: 1.5rem;
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn-brainimation-fullscreen {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 12px 24px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }
        
        .btn-brainimation-fullscreen:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
        
        .supplementary-section {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #e5e7eb;
        }
        
        .supplementary-section h2 {
            font-size: 1.6rem;
            color: var(--primary);
            margin-bottom: 1.5rem;
        }
        
        .supplementary-content {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .media-card {
            margin: 1.5rem 0;
            padding: 1.5rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .media-card h5 {
            font-size: 1rem;
            margin-bottom: 0.75rem;
            color: var(--text);
            font-weight: 600;
        }
        
        .media-caption {
            font-size: 0.9rem;
            color: #6b7280;
            margin-top: 0.5rem;
            font-style: italic;
        }
        
        .video-note {
            font-size: 0.85rem;
            color: #6b7280;
            margin-top: 0.75rem;
            padding: 0.5rem;
            background: rgba(245, 158, 11, 0.1);
            border-left: 3px solid var(--accent);
            border-radius: 4px;
        }
        
        .video-note a {
            color: var(--primary);
            font-weight: 600;
        }
        
        .file-link {
            margin: 0.75rem 0;
            padding: 0.75rem 1rem;
            background: #f8fafc;
            border-radius: 6px;
            border-left: 3px solid var(--primary);
        }
        
        .file-link a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
        }
        
        .file-link a:hover {
            color: var(--primary);
        }
        
        .brainimation-card {
            background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.05));
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid rgba(99, 102, 241, 0.2);
            margin: 1rem 0;
        }
        
        .brainimation-card h5 {
            margin: 0 0 0.5rem 0;
            color: var(--primary);
            font-size: 1.1rem;
        }
        
        .btn-brainimation {
            display: inline-block;
            padding: 10px 20px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        }
        
        .btn-brainimation:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
        }
        
        .notebook-card {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(249, 115, 22, 0.05));
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid rgba(245, 158, 11, 0.3);
            margin: 1.5rem 0;
        }
        
        .notebook-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .notebook-header h5 {
            margin: 0;
            color: #f97316;
            font-size: 1.1rem;
        }
        
        .notebook-badge {
            background: #f97316;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.75em;
            font-weight: 600;
        }
        
        .notebook-meta {
            margin-bottom: 1rem;
            color: #6b7280;
            font-size: 0.9em;
        }
        
        .notebook-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .btn-colab {
            display: inline-flex;
            align-items: center;
            padding: 12px 20px;
            background: linear-gradient(135deg, #f97316, #fb923c);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .btn-colab:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(249, 115, 22, 0.5);
        }
        
        .btn-drive-link {
            color: #9ca3af;
            text-decoration: none;
            font-size: 0.85em;
            padding: 8px 12px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
        }
        
        .btn-drive-link:hover {
            border-color: #f97316;
            color: #f97316;
        }
        
        .p5-embed-card {
            background: linear-gradient(135deg, rgba(99,102,241,0.05), rgba(16,185,129,0.05));
            padding: 1.5rem;
            border-radius: 12px;
            border: 2px solid rgba(99, 102, 241, 0.3);
            margin: 1.5rem 0;
        }
        
        .p5-embed-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .p5-badge {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            padding: 6px 14px;
            border-radius: 12px;
            font-size: 0.85em;
            font-weight: 600;
        }
        
        .p5-length {
            color: #9ca3af;
            font-size: 0.85em;
        }
        
        .p5-code-preview {
            display: none;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 1rem;
            overflow-x: auto;
            margin: 1rem 0;
            font-family: 'JetBrains Mono', 'Courier New', Consolas, monospace;
            font-size: 0.85rem;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .p5-embed-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 1rem;
        }
        
        .btn-brainimation-inline {
            display: inline-flex;
            align-items: center;
            padding: 10px 18px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .btn-brainimation-inline:hover {
            transform: translateY(-2px);
        }
        
        .btn-show-code {
            padding: 10px 18px;
            background: #f8fafc;
            color: #374151;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            font-weight: 500;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .btn-show-code:hover {
            background: #f1f5f9;
            border-color: var(--primary);
        }
        
        .references {
            margin-top: 3rem;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .references h2 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: var(--primary);
        }
        
        .references ol {
            padding-left: 2rem;
        }
        
        .references li {
            margin: 0.75rem 0;
            font-size: 0.95rem;
        }
        
        @media (max-width: 1024px) {
            .sidebar {
                width: 240px;
            }
            .content {
                margin-left: 240px;
            }
        }
        
        @media (max-width: 768px) {
            body {
                flex-direction: column;
            }
            .sidebar {
                width: 100%;
                height: auto;
                position: relative;
            }
            .content {
                margin-left: 0;
                padding: 2rem 1rem;
            }
        }
    `;
}

/**
 * Get JavaScript for Final Project portfolio pages
 */
function getFinalProjectPortfolioJS() {
    return `
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Highlight current section in navigation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.toc a').forEach(link => {
                        link.style.background = '';
                    });
                    const activeLink = document.querySelector(\`.toc a[href="#\${id}"]\`);
                    if (activeLink) {
                        activeLink.style.background = 'rgba(255,255,255,0.15)';
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.content-section').forEach(section => {
            observer.observe(section);
        });
    `;
}

/**
 * Download Google Drive image and convert to base64 data URL
 */
async function downloadFinalProjectDriveImageAsBase64(fileId) {
    try {
        const blob = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
            headers: {
                'Authorization': `Bearer ${gapi.client.getToken().access_token}`
            }
        }).then(r => r.blob());
        
        return await finalProjectBlobToDataUrl(blob);
    } catch (error) {
        console.error('Error downloading Drive image:', error);
        throw error;
    }
}

/**
 * Download Google Drive text file and return as string
 */
async function downloadFinalProjectDriveTextFile(fileId) {
    try {
        const text = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
            headers: {
                'Authorization': `Bearer ${gapi.client.getToken().access_token}`
            }
        }).then(r => r.text());
        
        return text;
    } catch (error) {
        console.error('Error downloading Drive text file:', error);
        throw error;
    }
}

/**
 * Convert Blob to data URL
 */
function finalProjectBlobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Convert File to base64 data URL
 */
function finalProjectFileToBase64DataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Helper functions
 */
function parseFinalProjectName(fullName) {
    if (!fullName || typeof fullName !== 'string') {
        return { firstName: 'Student', lastName: '' };
    }
    
    const parts = fullName.trim().split(' ').filter(p => p.length > 0);
    
    if (parts.length === 0) {
        return { firstName: 'Student', lastName: '' };
    } else if (parts.length === 1) {
        return { firstName: parts[0], lastName: '' };
    } else {
        return {
            firstName: parts[0],
            lastName: parts.slice(1).join(' ')
        };
    }
}

function getFinalProjectFileURL(file) {
    if (file.source === 'drive') {
        return `https://drive.google.com/file/d/${file.id}/view`;
    }
    return '#';
}

function downloadFinalProjectPortfolio(studentName, htmlContent) {
    const nameParts = studentName.trim().split(' ').filter(p => p.length > 0);
    const firstName = nameParts[0] || 'Student';
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : '';
    const filename = lastInitial ? `${firstName}_${lastInitial}_final_project.html` : `${firstName}_final_project.html`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function showFinalProjectStatus(message, type) {
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
    } else {
        console.log(`[Final Project ${type}] ${message}`);
    }
}

// Export for use in main HTML
window.generateFinalProjectPortfolio = generateFinalProjectPortfolio;

