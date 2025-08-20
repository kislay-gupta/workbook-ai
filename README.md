# RAG Application

A Retrieval Augmented Generation (RAG) application built with Express.js, LangChain, and Qdrant vector database. Upload PDF files or add text data, then chat with your indexed content.

## Features

- 📄 **PDF Upload**: Upload and index PDF documents
- 📝 **Text Input**: Add text data directly through the web interface
- 🌐 **Website Indexing**: Extract and index content from websites
- � **SChat Interface**: Ask questions about your indexed data
- 🔍 **Semantic Search**: Find relevant information using vector similarity
- 🤖 **AI Responses**: Get intelligent answers powered by OpenAI
- 🏗️ **Modular Architecture**: Clean, maintainable code structure

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- OpenAI API key

## Setup

1. **Clone and install dependencies**:

   ```bash
   # Install backend dependencies
   npm install

   # Install frontend dependencies
   cd client
   npm install
   cd ..

   # Or use the setup script
   npm run setup
   ```

2. **Set up environment variables**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Start Qdrant vector database**:

   ```bash
   docker-compose up -d
   ```

4. **Build the frontend**:

   ```bash
   cd client
   npm install
   npm run build
   cd ..
   ```

5. **Start the application**:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Open your browser**:
   - Production: Navigate to `http://localhost:3000` (serves built React app)
   - Development: Navigate to `http://localhost:5173` (Vite dev server with proxy to backend)

## Usage

### Adding Data Sources

1. **Upload PDF Files**:

   - Drag and drop PDF files onto the upload area
   - Or click "Choose Files" to browse and select PDFs
   - Files are automatically processed and indexed

2. **Add Text Data**:

   - Enter text in the textarea (articles, notes, documentation)
   - Click "Index Text" to add it to the knowledge base

3. **Index Website Content**:
   - Enter a website URL in the URL input field
   - Click "Index Website" to extract and index the website content
   - The system will automatically extract text content from the webpage

### Chatting with Your Data

1. Type questions in the chat input
2. Press Enter or click "Send"
3. The AI will search your indexed data and provide relevant answers
4. Sources are indicated when information is found

## API Endpoints

- `POST /api/upload` - Upload and index PDF files
- `POST /api/index-text` - Index text data
- `POST /api/index-website` - Index website content
- `POST /api/chat` - Ask questions about indexed data
- `GET /api/status` - Check system status

## Architecture

- **Frontend**: React with TypeScript and Vite
- **Backend**: Express.js with LangChain
- **Vector Database**: Qdrant
- **Embeddings**: OpenAI text-embedding-3-large
- **LLM**: OpenAI GPT-3.5-turbo-instruct

## File Structure

```
├── server.js              # Main Express server
├── src/
│   ├── config/
│   │   └── database.js    # Vector store configuration
│   ├── services/
│   │   ├── documentService.js  # Document processing logic
│   │   └── chatService.js      # Chat and Q&A logic
│   └── routes/
│       ├── uploadRoutes.js     # File upload and indexing routes
│       └── chatRoutes.js       # Chat and status routes
├── client/                # React frontend
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   └── ...            # Other React components
│   ├── vite.config.ts     # Vite configuration
│   └── package.json       # Frontend dependencies
├── chat.js                # Original PDF indexing script
├── indexing.js            # Original indexing script
├── docker-compose.yml     # Qdrant database setup
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Troubleshooting

1. **Qdrant connection issues**: Make sure Docker is running and Qdrant is started with `docker-compose up -d`
2. **OpenAI API errors**: Verify your API key is correct in the `.env` file
3. **File upload issues**: Check that the `uploads` directory is writable
4. **Memory issues**: For large documents, consider implementing text chunking strategies

## Development

The application uses ES modules (`"type": "module"` in package.json). All imports use ES6 syntax.

### Development Workflow

1. **Backend Development**:

   ```bash
   npm run dev  # Starts backend with auto-reload
   ```

2. **Frontend Development**:

   ```bash
   npm run dev-client  # Starts Vite dev server on port 5173
   ```

3. **Full Development Setup**:

   ```bash
   # Terminal 1 - Backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev-client
   ```

### Extending Functionality

- **Backend**: Add new document loaders in the `src/services/` directory
- **Frontend**: Modify React components in `client/src/`
- **API**: Add new routes in `src/routes/`
- **Database**: Modify vector store configuration in `src/config/database.js`

### Additional Features to Implement

- Implement user sessions for multi-user support
- Add authentication and authorization
- Enhance the React UI with better components
- Add real-time chat updates with WebSockets
