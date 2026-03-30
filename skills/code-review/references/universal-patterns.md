````markdown
# Universal Code Review Detection Patterns

Cross-language patterns for identifying common issues. Organized by category with language-specific examples.

---

## Security Issues

### Injection Flaws

**SQL Injection:**
```python
# ❌ Bad: String concatenation in query
cursor.execute("SELECT * FROM users WHERE id = " + user_id)

# ✅ Good: Parameterized query
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

```javascript
// ❌ Bad: Template literal in query
db.query(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ Good: Parameterized query
db.query("SELECT * FROM users WHERE id = $1", [userId]);
```

```go
// ❌ Bad: String formatting in query
db.Query(fmt.Sprintf("SELECT * FROM users WHERE id = %s", id))

// ✅ Good: Parameterized query
db.Query("SELECT * FROM users WHERE id = $1", id)
```

**Command Injection:**
```python
# ❌ Bad: User input in shell command
os.system("ls " + user_input)
subprocess.run(f"grep {pattern} file.txt", shell=True)

# ✅ Good: Use list form, avoid shell=True
subprocess.run(["grep", pattern, "file.txt"])
```

```javascript
// ❌ Bad: User input in exec
const { exec } = require("child_process");
exec("ls " + userInput);

// ✅ Good: Use execFile with arguments
const { execFile } = require("child_process");
execFile("ls", [userInput]);
```

### Hardcoded Secrets

```python
# ❌ Bad: Hardcoded credentials
API_KEY = "sk-1234567890abcdef"
db_password = "supersecret123"
```

```javascript
// ❌ Bad: Secrets in source code
const stripe = require("stripe")("sk_live_xxx");
```

```go
// ❌ Bad: Embedded credentials
const apiKey = "AIzaSy..."
```

**Detection patterns (all languages):**
- Strings matching: `password`, `secret`, `api_key`, `token`, `credential`
- Base64-encoded strings assigned to auth variables
- Connection strings with embedded passwords
- Private keys or certificates in source

**✅ Good: Use environment variables or secret managers**

### XSS (Cross-Site Scripting)

```javascript
// ❌ Bad: innerHTML with user data
element.innerHTML = userInput;

// ✅ Good: Use textContent or sanitize
element.textContent = userInput;
```

```python
# ❌ Bad: Jinja2 with |safe on user input
{{ user_comment|safe }}

# ✅ Good: Auto-escaped (default)
{{ user_comment }}
```

### Mass Assignment / Over-posting

```python
# ❌ Bad: Using all request data to create object
user = User(**request.data)

# ✅ Good: Whitelist fields
user = User(name=data["name"], email=data["email"])
```

```javascript
// ❌ Bad: Spreading request body into model
const user = await User.create(req.body);

// ✅ Good: Pick specific fields
const { name, email } = req.body;
const user = await User.create({ name, email });
```

```csharp
// ❌ Bad: Binding all properties
public IActionResult Create([FromBody] User user)

// ✅ Good: Use DTO or [Bind] attribute
public IActionResult Create([Bind("Name,Email")] User user)
```

---

## Performance Anti-patterns

### N+1 Query Problem

```python
# ❌ Bad: N+1 in Django
posts = Post.objects.all()
for post in posts:
    print(post.author.name)  # Query per post!

# ✅ Good: select_related / prefetch_related
posts = Post.objects.select_related("author").all()
```

```ruby
# ❌ Bad: N+1 in Rails
@posts = Post.all
@posts.each { |p| p.author.name }  # N+1!

# ✅ Good: Eager loading
@posts = Post.includes(:author).all
```

```javascript
// ❌ Bad: N+1 in Sequelize
const posts = await Post.findAll();
for (const post of posts) {
  const author = await post.getAuthor(); // N+1!
}

// ✅ Good: Include association
const posts = await Post.findAll({ include: "author" });
```

```go
// ❌ Bad: N+1 in GORM
var posts []Post
db.Find(&posts)
for _, post := range posts {
    db.First(&post.Author, post.AuthorID) // N+1!
}

// ✅ Good: Preload
db.Preload("Author").Find(&posts)
```

### Blocking Operations in Async Context

```javascript
// ❌ Bad: Synchronous file read in async server
const data = fs.readFileSync("/large/file.json");

// ✅ Good: Async version
const data = await fs.promises.readFile("/large/file.json");
```

```python
# ❌ Bad: Blocking call in async function
async def handler():
    data = requests.get(url)  # Blocks event loop!

# ✅ Good: Use async HTTP client
async def handler():
    async with aiohttp.ClientSession() as session:
        data = await session.get(url)
```

### Inefficient Algorithms

```python
# ❌ Bad: O(n²) lookup
for item in items:
    if item in large_list:  # O(n) per check
        process(item)

# ✅ Good: O(n) with set
large_set = set(large_list)
for item in items:
    if item in large_set:  # O(1) per check
        process(item)
```

```javascript
// ❌ Bad: Repeated array.includes in loop (O(n²))
items.forEach((item) => {
  if (largeArray.includes(item)) process(item);
});

// ✅ Good: Use Set (O(n))
const largeSet = new Set(largeArray);
items.forEach((item) => {
  if (largeSet.has(item)) process(item);
});
```

### Missing Pagination

```python
# ❌ Bad: Loading all records
users = User.objects.all()

# ✅ Good: Paginate
users = User.objects.all()[:25]  # or use Paginator
```

```javascript
// ❌ Bad: No limit
const users = await db.query("SELECT * FROM users");

// ✅ Good: Paginate
const users = await db.query("SELECT * FROM users LIMIT $1 OFFSET $2", [limit, offset]);
```

---

## Error Handling

### Swallowed Exceptions

```python
# ❌ Bad: Silent catch
try:
    process_data()
except Exception:
    pass

# ✅ Good: Log or handle
try:
    process_data()
except Exception as e:
    logger.error("Processing failed", exc_info=e)
    raise
```

```javascript
// ❌ Bad: Empty catch
try {
  await processData();
} catch (e) {}

// ✅ Good: Handle the error
try {
  await processData();
} catch (e) {
  logger.error("Processing failed", e);
  throw;
}
```

```go
// ❌ Bad: Ignoring error
result, _ := doSomething()

// ✅ Good: Handle the error
result, err := doSomething()
if err != nil {
    return fmt.Errorf("doSomething failed: %w", err)
}
```

### Overly Broad Exception Catching

```python
# ❌ Bad: Catching everything
except Exception:
except BaseException:

# ✅ Good: Specific exceptions
except (ValueError, KeyError) as e:
```

```java
// ❌ Bad: Catching generic Exception
catch (Exception e) { }

// ✅ Good: Specific exception types
catch (IOException | ParseException e) { }
```

### Missing Error Handling for I/O

```python
# ❌ Bad: No error handling for file I/O
data = open("config.json").read()

# ✅ Good: Handle potential errors
try:
    with open("config.json") as f:
        data = f.read()
except FileNotFoundError:
    data = default_config
```

---

## Architecture Issues

### God Object / Fat Controller

**Detection:** Class or function with >200 lines, >10 methods, or >5 dependencies.

```python
# ❌ Bad: Controller doing everything
class UserView(APIView):
    def post(self, request):
        # Validates, creates user, sends email, creates token,
        # logs event, syncs to CRM... all in one method

# ✅ Good: Delegate to service layer
class UserView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = UserService.register(serializer.validated_data)
        return Response(UserSerializer(user).data, status=201)
```

### Business Logic in Wrong Layer

**Detection:** Database queries in views/templates, HTTP concerns in models/services.

```javascript
// ❌ Bad: DB query in React component
function UserList() {
  const users = await db.query("SELECT * FROM users"); // Wrong layer!
}

// ✅ Good: API call from component, query in backend
function UserList() {
  const users = await fetch("/api/users").then((r) => r.json());
}
```

### Circular Dependencies

**Detection:** Module A imports B, B imports A.

```python
# ❌ Bad: Circular import
# file: models.py
from .services import UserService

# file: services.py
from .models import User  # Circular!
```

**Fix:** Move shared types to a separate module, use dependency injection, or use lazy imports.

---

## Code Quality

### Missing Type Annotations

```python
# ❌ Bad: No types
def process(data, options):
    return data

# ✅ Good: Type hints
def process(data: dict[str, Any], options: ProcessOptions) -> Result:
    return Result(data)
```

```javascript
// TypeScript: ❌ Bad - any type
function process(data: any): any { }

// ✅ Good: Specific types
function process(data: Record<string, unknown>): Result { }
```

### Deprecated API Usage

**Detection patterns:**
- Functions/methods marked with `@deprecated` decorators
- Import of known deprecated modules
- Usage of APIs removed in newer language versions
- Compiler/linter warnings about deprecation

### Dead Code

**Detection patterns:**
- Functions never called (no references)
- Unreachable code after `return`, `throw`, `break`
- Commented-out code blocks (>5 lines)
- Unused imports/variables
- Feature flags always evaluating to same value

### Code Duplication

**Detection:**
- Identical or near-identical blocks (>10 lines) across files
- Repeated patterns that could be extracted into a shared utility
- Copy-pasted logic with minor variations

---

## Resource Management

### Resource Leaks

```python
# ❌ Bad: Unclosed file handle
f = open("data.txt")
data = f.read()
# f never closed if exception occurs

# ✅ Good: Context manager
with open("data.txt") as f:
    data = f.read()
```

```go
// ❌ Bad: Unclosed response body
resp, _ := http.Get(url)
// resp.Body never closed

// ✅ Good: Defer close
resp, err := http.Get(url)
if err != nil { return err }
defer resp.Body.Close()
```

```java
// ❌ Bad: Unclosed connection
Connection conn = DriverManager.getConnection(url);
// conn never closed

// ✅ Good: Try-with-resources
try (Connection conn = DriverManager.getConnection(url)) {
    // use connection
}
```

### Missing Connection Pooling

**Detection:** Database or HTTP connections created per request instead of shared pool.

---

## Severity Classification

| Severity     | Emoji | Universal Criteria                                                |
| ------------ | ----- | ----------------------------------------------------------------- |
| Critical     | 🔴     | Security vulnerabilities, data loss risks, crashes, auth bypasses |
| Warning      | 🟠     | Performance issues, design flaws, error handling gaps              |
| Optimization | 🟡     | Efficiency improvements, code duplication, missing caching         |
| Quality      | 🔵     | Best practices, conventions, modern syntax, documentation          |

## Detection Priority by Language

| Language       | Top Issues to Check                                                  |
| -------------- | -------------------------------------------------------------------- |
| Python         | Type hints, injection, N+1 (Django/SQLAlchemy), async misuse         |
| JavaScript/TS  | XSS, any types, blocking event loop, missing await, memory leaks     |
| PHP            | SQL injection, XSS, mass assignment, type safety, deprecated APIs    |
| Go             | Ignored errors, goroutine leaks, unclosed readers, race conditions   |
| Rust           | Unsafe blocks, unwrap() abuse, clone() overhead, lifetime issues     |
| Java           | Resource leaks, broad catches, null safety, generics misuse          |
| Ruby           | N+1 (Rails), mass assignment, SQL injection, missing strong params   |
| C#             | Over-posting, async void, IDisposable leaks, null reference          |
| Swift          | Force unwrap abuse, retain cycles, main thread violations            |
| Kotlin         | Platform types, coroutine scope leaks, null safety bypass            |

````
