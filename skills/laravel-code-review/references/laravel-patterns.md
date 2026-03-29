# Laravel 12 Issue Detection Patterns

Comprehensive reference for Laravel 12 + PHP 8.4 code issues.

---

## Security Issues

### Mass Assignment Vulnerability

```php
// ❌ Bad: No $fillable defined
class User extends Model
{
    // Missing $fillable or $guarded
}

// ❌ Bad: Using $guarded = []
class User extends Model
{
    protected $guarded = []; // Everything is fillable!
}

// ✅ Good: Explicit $fillable
class User extends Model
{
    protected $fillable = ['name', 'email'];
}
```

### SQL Injection

```php
// ❌ Bad: Raw query with concatenation
DB::select("SELECT * FROM users WHERE id = " . $id);

// ❌ Bad: whereRaw without binding
User::whereRaw("email = '$email'")->get();

// ✅ Good: Parameter binding
DB::select("SELECT * FROM users WHERE id = ?", [$id]);
User::whereRaw("email = ?", [$email])->get();
```

### Missing Authorization

```php
// ❌ Bad: No authorization check
public function update(Request $request, Post $post)
{
    $post->update($request->all());
}

// ✅ Good: Policy check
public function update(Request $request, Post $post)
{
    $this->authorize('update', $post);
    $post->update($request->validated());
}
```

### XSS in Blade

```php
// ❌ Bad: Unescaped user input
{!! $user->bio !!}
{!! request('name') !!}

// ✅ Good: Escaped output
{{ $user->bio }}
{{ request('name') }}

// ✅ Good: If HTML needed, sanitize first
{!! clean($user->bio) !!}
```

### Missing CSRF

```php
// ❌ Bad: Form without CSRF
<form method="POST" action="/users">
    <input type="text" name="name">
</form>

// ✅ Good: Include CSRF token
<form method="POST" action="/users">
    @csrf
    <input type="text" name="name">
</form>
```

---

## N+1 Query Problems

### Basic N+1

```php
// ❌ Bad: N+1 query
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->author->name; // Query per iteration!
}

// ✅ Good: Eager loading
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->name;
}
```

### Nested Relationships

```php
// ❌ Bad: Missing nested eager load
$posts = Post::with('author')->get();
foreach ($posts as $post) {
    echo $post->author->profile->avatar; // N+1 on profile!
}

// ✅ Good: Nested eager loading
$posts = Post::with('author.profile')->get();
```

### Conditional Eager Loading

```php
// ❌ Bad: Loading unnecessary data
$posts = Post::with('comments')->get();

// ✅ Good: Constrained eager loading
$posts = Post::with(['comments' => function ($query) {
    $query->where('approved', true)->limit(5);
}])->get();
```

### Lazy Eager Loading

```php
// ❌ Bad: N+1 after initial query
$posts = Post::all();
// Later in code...
foreach ($posts as $post) {
    echo $post->tags->count();
}

// ✅ Good: Load when needed
$posts = Post::all();
$posts->load('tags');
```

---

## Controller Issues

### Fat Controller

```php
// ❌ Bad: Too much logic in controller
public function store(Request $request)
{
    $validated = $request->validate([...]);
    
    $user = User::create($validated);
    $user->assignRole('customer');
    
    Mail::to($user)->send(new WelcomeEmail($user));
    
    event(new UserRegistered($user));
    
    $token = $user->createToken('api')->plainTextToken;
    
    return response()->json([...]);
}

// ✅ Good: Delegate to service
public function store(StoreUserRequest $request, UserService $service)
{
    $user = $service->register($request->validated());
    
    return new UserResource($user);
}
```

### Missing Form Request

```php
// ❌ Bad: Inline validation
public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
    ]);
}

// ✅ Good: Form Request class
public function store(StoreUserRequest $request)
{
    $validated = $request->validated();
}
```

### Direct $request->all()

```php
// ❌ Bad: Using all() without validation
User::create($request->all());

// ❌ Bad: Using only() without validation
User::create($request->only(['name', 'email']));

// ✅ Good: Use validated data
User::create($request->validated());
```

---

## Eloquent Anti-patterns

### Inefficient Queries

```php
// ❌ Bad: Get then count
$count = User::get()->count();

// ✅ Good: Direct count
$count = User::count();

// ❌ Bad: Get then pluck
$emails = User::get()->pluck('email');

// ✅ Good: Direct pluck
$emails = User::pluck('email');

// ❌ Bad: Get then first
$user = User::where('email', $email)->get()->first();

// ✅ Good: Direct first
$user = User::where('email', $email)->first();
```

### Missing Select

```php
// ❌ Bad: Selecting all columns
$userNames = User::all()->pluck('name');

// ✅ Good: Select only needed columns
$userNames = User::select('name')->pluck('name');
```

### Large Dataset Handling

```php
// ❌ Bad: Loading all records
$users = User::all();
foreach ($users as $user) {
    $user->update(['processed' => true]);
}

// ✅ Good: Chunking
User::chunk(100, function ($users) {
    foreach ($users as $user) {
        $user->update(['processed' => true]);
    }
});

// ✅ Better: Lazy collection
User::lazy()->each(function ($user) {
    $user->update(['processed' => true]);
});
```

### Missing Indexes

```php
// ❌ Bad: Querying unindexed column
User::where('status', 'active')->get();

// Migration should have:
$table->string('status')->index();
```

---

## PHP 8.4 Issues

### Missing Constructor Property Promotion

```php
// ❌ Bad: Old-style properties
class UserService
{
    private UserRepository $repository;
    private CacheService $cache;
    
    public function __construct(
        UserRepository $repository,
        CacheService $cache
    ) {
        $this->repository = $repository;
        $this->cache = $cache;
    }
}

// ✅ Good: PHP 8+ property promotion
class UserService
{
    public function __construct(
        private readonly UserRepository $repository,
        private readonly CacheService $cache,
    ) {}
}
```

### Missing Readonly Properties

```php
// ❌ Bad: Mutable when shouldn't be
class UserDTO
{
    public function __construct(
        public string $name,
        public string $email,
    ) {}
}

// ✅ Good: Readonly for immutable data
class UserDTO
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
    ) {}
}
```

### Not Using Match Expression

```php
// ❌ Bad: Switch statement
switch ($status) {
    case 'pending':
        return 'yellow';
    case 'approved':
        return 'green';
    case 'rejected':
        return 'red';
    default:
        return 'gray';
}

// ✅ Good: Match expression
return match($status) {
    'pending' => 'yellow',
    'approved' => 'green',
    'rejected' => 'red',
    default => 'gray',
};
```

### Missing Named Arguments

```php
// ❌ Bad: Positional args unclear
$user = new User('John', 'john@example.com', true, false, null);

// ✅ Good: Named arguments for clarity
$user = new User(
    name: 'John',
    email: 'john@example.com',
    isAdmin: true,
    isVerified: false,
    avatarUrl: null,
);
```

### Missing #[Override] Attribute

```php
// ❌ Bad: No override indication
class CustomException extends Exception
{
    public function getMessage(): string
    {
        return 'Custom: ' . parent::getMessage();
    }
}

// ✅ Good: PHP 8.3+ Override attribute
class CustomException extends Exception
{
    #[\Override]
    public function getMessage(): string
    {
        return 'Custom: ' . parent::getMessage();
    }
}
```

### Implicit Nullable (Deprecated)

```php
// ❌ Bad: Implicit nullable (deprecated in 8.4)
function process(string $value = null) {}

// ✅ Good: Explicit nullable
function process(?string $value = null) {}
```

---

## Laravel 12 Specific

### Missing Enums for Constants

```php
// ❌ Bad: String constants
class Order
{
    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';
}

// ✅ Good: Backed Enum
enum OrderStatus: string
{
    case Pending = 'pending';
    case Completed = 'completed';
}

// Usage in Model
protected $casts = [
    'status' => OrderStatus::class,
];
```

### Missing API Resource

```php
// ❌ Bad: Direct model/array return
public function show(User $user)
{
    return response()->json($user);
}

// ✅ Good: API Resource
public function show(User $user)
{
    return new UserResource($user);
}
```

### Invokable Controllers

```php
// ❌ Bad: Single method controller
class ShowDashboardController extends Controller
{
    public function index()
    {
        return view('dashboard');
    }
}

// ✅ Good: Invokable controller
class ShowDashboardController extends Controller
{
    public function __invoke()
    {
        return view('dashboard');
    }
}

// Route
Route::get('/dashboard', ShowDashboardController::class);
```

### Missing Return Types

```php
// ❌ Bad: No return type
public function getUsers()
{
    return User::all();
}

// ✅ Good: Explicit return type
public function getUsers(): Collection
{
    return User::all();
}
```

---

## Blade Template Issues

### Inefficient Loops

```php
// ❌ Bad: Query in loop
@foreach(Category::all() as $category)
    {{ $category->name }}
@endforeach

// ✅ Good: Pass from controller
// Controller: return view('page', ['categories' => Category::all()]);
@foreach($categories as $category)
    {{ $category->name }}
@endforeach
```

### Missing @once Directive

```php
// ❌ Bad: Repeated scripts in loop
@foreach($items as $item)
    <script src="/js/item-handler.js"></script>
@endforeach

// ✅ Good: Include once
@foreach($items as $item)
    @once
        <script src="/js/item-handler.js"></script>
    @endonce
@endforeach
```

---

## Migration Issues

### Missing Indexes

```php
// ❌ Bad: Foreign key without index
$table->foreignId('user_id');

// ✅ Good: Constrained adds index
$table->foreignId('user_id')->constrained();

// ❌ Bad: Frequently queried column
$table->string('status');

// ✅ Good: Add index
$table->string('status')->index();
```

### Missing Soft Deletes Index

```php
// ❌ Bad: Soft deletes without index
$table->softDeletes();

// ✅ Good: Index for deleted_at
$table->softDeletes();
$table->index('deleted_at');
```

---

## Severity Classification

| Severity     | Emoji | Laravel-Specific Criteria                                     |
| ------------ | ----- | ------------------------------------------------------------- |
| Critical     | 🔴     | Security vulnerabilities, mass assignment, SQL injection, XSS |
| Warning      | 🟠     | N+1 queries, missing validation, fat controllers              |
| Optimization | 🟡     | Missing eager loading, inefficient queries, no caching        |
| Quality      | 🔵     | PHP 8.4 features, Laravel conventions, return types           |
