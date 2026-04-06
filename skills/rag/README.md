# OpenCode Skill: RAG Knowledge Base

## Purpose
Implement Retrieval-Augmented Generation for OpenCode - enabling AI to search and retrieve relevant documents before generating responses. Reduces hallucinations and grounds responses in real data.

## Triggers
Use this skill when:
- Building knowledge bases for codebases
- Implementing document search
- Creating AI assistants with domain knowledge
- Reducing AI hallucinations with grounding

## RAG Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ RAG PIPELINE                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  INGESTION                         RETRIEVAL               │
│  ┌──────────────┐                 ┌──────────────┐        │
│  │ Documents    │                 │ Query        │        │
│  │ (.md, .txt, │    CHUNKING     │              │        │
│  │  .pdf, .doc)│ ──────────────► │ Embed Query  │        │
│  └──────────────┘                 └──────┬───────┘        │
│         │                                    │              │
│         ▼                                    ▼              │
│  ┌──────────────┐                 ┌──────────────┐        │
│  │ Parse &      │                 │ Vector       │        │
│  │ Clean        │────────────────►│ Search       │        │
│  └──────────────┘                 └──────┬───────┘        │
│                                          │                  │
│                                          ▼                  │
│                                    ┌──────────────┐        │
│                                    │ Top K        │        │
│                                    │ Results      │        │
│                                    └──────┬───────┘        │
│                                          │                  │
│                                          ▼                  │
│                                    ┌──────────────┐        │
│                                    │ Augment      │        │
│                                    │ Prompt       │───────►│
│                                    └──────────────┘        │
│                                                             │
│                                    ┌──────────────┐        │
│                                    │ Generate     │        │
│                                    │ Response     │───────►│
│                                    └──────────────┘        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Knowledge Base Structure

```
knowledge-base/
├── docs/                    # Source documents
│   ├── architecture/
│   │   └── system-design.md
│   ├── api/
│   │   ├── endpoints.md
│   │   └── schemas.md
│   ├── guides/
│   │   ├── setup.md
│   │   └── deployment.md
│   └── references/
│       ├── commands.md
│       └── configs.md
├── chunks/                 # Processed chunks
│   └── [document-id]/
│       └── chunks.json
├── vectors/               # Vector embeddings
│   └── index.faiss
└── kb-config.json        # Knowledge base config
```

## Document Types & Processing

| Document Type | Parser | Chunk Size | Overlap |
|--------------|--------|------------|---------|
| Markdown (.md) | Custom | 500 tokens | 50 tokens |
| Code (.js, .py) | AST-based | 300 tokens | 30 tokens |
| PDF (.pdf) | OCR + text | 400 tokens | 40 tokens |
| Docs (.docx) | XML parse | 500 tokens | 50 tokens |
| URLs | Web fetch | 800 tokens | 80 tokens |

## Embedding & Retrieval

### Embedding Models
```javascript
// Local (recommended for privacy)
const embeddingModel = {
  name: 'Xenova/all-MiniLM-L6-v2',
  dimensions: 384,
  maxSequence: 512,
  provider: 'transformers.js'
}

// Cloud (OpenAI)
const embeddingModel = {
  name: 'text-embedding-3-small',
  dimensions: 1536,
  provider: 'openai'
}
```

### Vector Search
```javascript
// Semantic search function
async function semanticSearch(query, options = {}) {
  const {
    topK = 5,
    threshold = 0.7,
    filters = {},
    includeMetadata = true
  } = options
  
  // 1. Embed query
  const queryEmbedding = await embedText(query)
  
  // 2. Search vector index
  const results = await vectorDB.search({
    vector: queryEmbedding,
    topK: topK * 2, // Over-fetch for filtering
    filter: filters
  })
  
  // 3. Apply threshold
  const filtered = results.filter(r => r.score >= threshold)
  
  // 4. Deduplicate and return top K
  return filtered.slice(0, topK).map(r => ({
    content: r.payload.text,
    metadata: includeMetadata ? r.payload.metadata : undefined,
    score: r.score
  }))
}
```

### RAG Query Function
```javascript
// Main RAG function
async function ragQuery(question, context = {}) {
  const {
    knowledgeBaseId = 'default',
    topK = 5,
    systemPrompt = '',
    includeSources = true
  } = context
  
  // 1. Retrieve relevant documents
  const docs = await semanticSearch(question, {
    topK,
    filters: { knowledgeBaseId }
  })
  
  // 2. Build context string
  const contextString = docs.map((doc, i) => 
    `[Source ${i + 1}] ${doc.metadata?.source || 'Unknown'}\n${doc.content}`
  ).join('\n\n')
  
  // 3. Construct prompt
  const prompt = `
${systemPrompt}

CONTEXT:
${contextString}

QUESTION: ${question}

Based on the context above, answer the question. If the context doesn't contain enough information to answer fully, say so.
${includeSources ? 'Include citations to the source documents.' : ''}
`
  
  // 4. Generate response
  const response = await llm.complete(prompt)
  
  return {
    answer: response.text,
    sources: includeSources ? docs : undefined,
    confidence: calculateConfidence(docs)
  }
}
```

## Document Chunking Strategies

### Semantic Chunking
```javascript
// Split by natural boundaries
function semanticChunk(text, options = {}) {
  const { 
    maxTokens = 500, 
    overlap = 50,
    splitOn = ['\n\n', '\n', '. ']
  } = options
  
  const chunks = []
  const sentences = splitIntoSentences(text)
  let currentChunk = []
  let currentTokens = 0
  
  for (const sentence of sentences) {
    const sentenceTokens = countTokens(sentence)
    
    if (currentTokens + sentenceTokens > maxTokens) {
      // Save current chunk
      chunks.push({
        content: currentChunk.join(' '),
        tokenCount: currentTokens
      })
      
      // Start new chunk with overlap
      currentChunk = currentChunk.slice(-overlapSentences)
      currentTokens = countTokens(currentChunk.join(' '))
    }
    
    currentChunk.push(sentence)
    currentTokens += sentenceTokens
  }
  
  // Don't forget last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      content: currentChunk.join(' '),
      tokenCount: currentTokens
    })
  }
  
  return chunks
}
```

### Code-Aware Chunking
```javascript
// Chunk code files by function/class
function codeChunk(code, language) {
  const ast = parseAST(code, language)
  
  const chunks = []
  
  for (const node of ast) {
    if (isFunction(node) || isClass(node)) {
      chunks.push({
        type: node.type,
        name: node.name,
        content: getSource(node),
        metadata: {
          startLine: node.startLine,
          endLine: node.endLine,
          language
        }
      })
    }
  }
  
  return chunks
}
```

## Knowledge Base Types

### 1. Codebase KB
```javascript
const codebaseKB = {
  id: 'horizon-build-group',
  name: 'Horizon Build Group Website',
  description: 'Complete documentation for the Horizon Build Group website project',
  sources: [
    { type: 'glob', pattern: '**/*.html' },
    { type: 'glob', pattern: '**/*.css' },
    { type: 'glob', pattern: '**/*.js' }
  ],
  chunkStrategy: 'code',
  embedModel: 'Xenova/all-MiniLM-L6-v2'
}
```

### 2. Documentation KB
```javascript
const docsKB = {
  id: 'react-patterns',
  name: 'React Patterns & Best Practices',
  description: 'Company-wide React coding standards and patterns',
  sources: [
    { type: 'file', path: 'docs/architecture.md' },
    { type: 'file', path: 'docs/components.md' },
    { type: 'url', url: 'https://react.dev/learn' }
  ],
  chunkStrategy: 'semantic',
  embedModel: 'text-embedding-3-small'
}
```

### 3. Decision Log KB
```javascript
const decisionsKB = {
  id: 'adr',
  name: 'Architecture Decision Records',
  description: 'All ADRs and their rationale',
  sources: [
    { type: 'glob', pattern: 'docs/adr/*.md' }
  ],
  chunkStrategy: 'document',
  metadata: {
    includeTitle: true,
    includeDate: true,
    includeStatus: true
  }
}
```

## RAG Commands for OpenCode

### /kb-search
```
Usage: /kb-search <query> [kb-name]

Search the knowledge base for relevant information.

Examples:
  /kb-search "how to add a new section"
  /kb-search "form validation patterns" react-patterns
  /kb-search "deployment steps" --top 10
```

### /kb-index
```
Usage: /kb-index [kb-name]

Re-index documents in the knowledge base.

Options:
  --force     Force re-indexing
  --watch     Watch for changes
```

### /kb-add
```
Usage: /kb-add <path-or-url> [kb-name]

Add a new document to the knowledge base.

Examples:
  /kb-add docs/api.md api-docs
  /kb-add https://example.com/guide external-docs
```

## Quality Metrics

### Retrieval Metrics
| Metric | Target | Description |
|--------|--------|-------------|
| Precision@K | > 0.8 | Relevant docs in top K |
| MRR | > 0.7 | Mean reciprocal rank |
| NDCG | > 0.75 | Normalized DCG |

### Generation Metrics
| Metric | Target | Description |
|--------|--------|-------------|
| Citation Accuracy | > 0.95 | Sources actually support claims |
| Answer Completeness | > 0.8 | Questions fully answered |
| Hallucination Rate | < 0.05 | False claims in answers |

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| No relevant results | KB not indexed | Run /kb-index |
| Outdated info | Stale chunks | Re-chunk and re-index |
| Slow retrieval | Large KB | Use HNSW index |
| Poor precision | Wrong chunk strategy | Adjust chunk size |

## Checklist
- [ ] Knowledge base directory created
- [ ] Embedding model configured
- [ ] Document parsers set up
- [ ] Vector index initialized
- [ ] Test queries successful
- [ ] RAG commands configured
- [ ] Monitoring dashboard active
