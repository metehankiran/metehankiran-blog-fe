export const posts = [
  {
    id: 1,
    title: 'Full Stack Todo Uygulaması Geliştirme',
    excerpt: 'PHP backend ve JavaScript frontend kullanarak modern bir todo uygulaması nasıl geliştirilir?',
    date: '2024-03-20',
    tags: ['PHP', 'JavaScript', 'MySQL', 'API'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    content: `
      Modern web uygulamaları geliştirirken frontend ve backend teknolojilerinin nasıl bir arada kullanılacağını öğrenmek önemlidir. Bu yazıda, PHP backend ve JavaScript frontend kullanarak basit ama kapsamlı bir todo uygulaması geliştireceğiz.

      ## Backend API (PHP)

      Öncelikle todo'ları yönetmek için bir API oluşturalım:

      \`\`\`php
      <?php
      header('Content-Type: application/json');
      header('Access-Control-Allow-Origin: *');
      header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
      header('Access-Control-Allow-Headers: Content-Type');

      $conn = new mysqli('localhost', 'username', 'password', 'todo_db');

      if ($conn->connect_error) {
          die(json_encode(['error' => 'Veritabanı bağlantı hatası']));
      }

      // Todo'ları getir
      function getTodos() {
          global $conn;
          $result = $conn->query('SELECT * FROM todos ORDER BY created_at DESC');
          $todos = [];
          
          while ($row = $result->fetch_assoc()) {
              $todos[] = $row;
          }
          
          echo json_encode($todos);
      }

      // Yeni todo ekle
      function addTodo() {
          global $conn;
          $data = json_decode(file_get_contents('php://input'), true);
          $title = $conn->real_escape_string($data['title']);
          
          $sql = "INSERT INTO todos (title, completed) VALUES ('$title', 0)";
          
          if ($conn->query($sql)) {
              echo json_encode(['message' => 'Todo eklendi', 'id' => $conn->insert_id]);
          } else {
              echo json_encode(['error' => 'Todo eklenemedi']);
          }
      }
      \`\`\`

      ## Veritabanı Yapısı (MySQL)

      Todo'ları saklamak için basit bir tablo oluşturalım:

      \`\`\`sql
      CREATE TABLE todos (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          completed BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      \`\`\`

      ## Frontend Arayüzü (HTML & CSS)

      Kullanıcı arayüzü için modern ve responsive bir tasarım:

      \`\`\`html
      <!DOCTYPE html>
      <html lang="tr">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Todo Uygulaması</title>
          <link rel="stylesheet" href="style.css">
      </head>
      <body>
          <div class="container">
              <h1>Todo Listesi</h1>
              
              <form id="todoForm" class="todo-form">
                  <input 
                      type="text" 
                      id="todoInput" 
                      placeholder="Yeni todo ekle..."
                      required
                  >
                  <button type="submit">Ekle</button>
              </form>

              <ul id="todoList" class="todo-list"></ul>
          </div>
          
          <script src="app.js"></script>
      </body>
      </html>
      \`\`\`

      \`\`\`css
      .container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 0 1rem;
      }

      .todo-form {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
      }

      .todo-form input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
      }

      .todo-list {
          list-style: none;
          padding: 0;
      }

      .todo-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          transition: all 0.3s ease;
      }

      .todo-item.completed {
          opacity: 0.7;
          text-decoration: line-through;
      }
      \`\`\`

      ## Frontend Mantığı (JavaScript)

      Modern JavaScript kullanarak API ile etkileşim kuralım:

      \`\`\`javascript
      class TodoApp {
          constructor() {
              this.apiUrl = 'http://localhost/api/todos';
              this.todoList = document.getElementById('todoList');
              this.todoForm = document.getElementById('todoForm');
              
              this.init();
          }
          
          async init() {
              this.todoForm.addEventListener('submit', (e) => this.handleSubmit(e));
              await this.loadTodos();
          }
          
          async loadTodos() {
              try {
                  const response = await fetch(this.apiUrl);
                  const todos = await response.json();
                  
                  this.todoList.innerHTML = todos.map(todo => \`
                      <li class="todo-item \${todo.completed ? 'completed' : ''}" 
                          data-id="\${todo.id}">
                          <input type="checkbox" 
                                 \${todo.completed ? 'checked' : ''}
                                 onchange="todoApp.toggleTodo(\${todo.id})">
                          <span>\${todo.title}</span>
                          <button onclick="todoApp.deleteTodo(\${todo.id})">
                              Sil
                          </button>
                      </li>
                  \`).join('');
              } catch (error) {
                  console.error('Todo\'lar yüklenemedi:', error);
              }
          }
          
          async handleSubmit(e) {
              e.preventDefault();
              const input = document.getElementById('todoInput');
              const title = input.value.trim();
              
              if (!title) return;
              
              try {
                  await fetch(this.apiUrl, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ title })
                  });
                  
                  input.value = '';
                  await this.loadTodos();
              } catch (error) {
                  console.error('Todo eklenemedi:', error);
              }
          }
      }

      const todoApp = new TodoApp();
      \`\`\`

      ## Sonuç

      Bu örnek uygulama, modern web teknolojilerini kullanarak full-stack bir uygulama geliştirmenin temel adımlarını göstermektedir. CORS, veritabanı güvenliği, asenkron işlemler gibi önemli konuları da içermektedir.
    `
  },
  {
    id: 2,
    title: 'Modern CSS Techniques',
    excerpt: 'Explore modern CSS features and how to use them effectively in your projects.',
    date: '2024-03-10',
    tags: ['CSS', 'Web Design', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070'
  }
]; 