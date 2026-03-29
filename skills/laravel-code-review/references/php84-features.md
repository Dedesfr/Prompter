# PHP 8.4 Features Reference

Quick reference for PHP 8.4 features to use and deprecations to avoid.

---

## New Features to Adopt

### Property Hooks (PHP 8.4)

```php
// ✅ New: Property hooks
class User
{
    public string $fullName {
        get => $this->firstName . ' ' . $this->lastName;
        set => [$this->firstName, $this->lastName] = explode(' ', $value, 2);
    }
    
    public string $email {
        set => strtolower($value);
    }
}
```

### Asymmetric Visibility (PHP 8.4)

```php
// ✅ New: Different visibility for get/set
class User
{
    public private(set) string $id;
    public protected(set) string $name;
}

// Can read $user->id publicly
// Can only set $user->id privately
```

### new Without Parentheses (PHP 8.4)

```php
// ❌ Old: Required parentheses
$user = (new User())->setName('John');

// ✅ New: No parentheses needed
$user = new User()->setName('John');
```

### Array Find Functions (PHP 8.4)

```php
// ✅ New: array_find()
$users = [
    ['name' => 'John', 'active' => false],
    ['name' => 'Jane', 'active' => true],
];

$activeUser = array_find($users, fn($u) => $u['active']);
// Returns: ['name' => 'Jane', 'active' => true]

// ✅ New: array_find_key()
$key = array_find_key($users, fn($u) => $u['active']);
// Returns: 1

// ✅ New: array_any()
$hasActive = array_any($users, fn($u) => $u['active']);
// Returns: true

// ✅ New: array_all()
$allActive = array_all($users, fn($u) => $u['active']);
// Returns: false
```

### HTML5 DOM Support (PHP 8.4)

```php
// ✅ New: Native HTML5 parsing
$dom = Dom\HTMLDocument::createFromString($html);
$dom = Dom\HTMLDocument::createFromFile('page.html');
```

---

## PHP 8.3 Features (Ensure Usage)

### #[Override] Attribute

```php
// ✅ Use Override for overridden methods
class CustomHandler extends BaseHandler
{
    #[\Override]
    public function handle(): void
    {
        // Implementation
    }
}
```

### Typed Class Constants

```php
// ✅ Type constants
class Status
{
    public const string PENDING = 'pending';
    public const string ACTIVE = 'active';
    public const int MAX_RETRY = 3;
}
```

### json_validate()

```php
// ❌ Old: Decode to validate
$valid = json_decode($json) !== null;

// ✅ New: Direct validation
$valid = json_validate($json);
```

### Randomizer Additions

```php
// ✅ New random methods
$randomizer = new Random\Randomizer();
$randomizer->getBytesFromString('abc', 10);
$randomizer->nextFloat();
$randomizer->getFloat(0.0, 1.0);
```

---

## PHP 8.2 Features (Ensure Usage)

### Readonly Classes

```php
// ✅ Entire class readonly
readonly class UserDTO
{
    public function __construct(
        public string $name,
        public string $email,
    ) {}
}
```

### Null/False/True Types

```php
// ✅ Standalone null type
function alwaysNull(): null
{
    return null;
}

// ✅ Standalone false type
function failed(): false
{
    return false;
}
```

### Disjunctive Normal Form Types

```php
// ✅ Complex union types
function process((A&B)|null $value): void {}
```

---

## PHP 8.1 Features (Ensure Usage)

### Enums

```php
// ✅ Backed enums
enum OrderStatus: string
{
    case Pending = 'pending';
    case Processing = 'processing';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    
    public function label(): string
    {
        return match($this) {
            self::Pending => 'Order Pending',
            self::Processing => 'In Progress',
            self::Completed => 'Completed',
            self::Cancelled => 'Cancelled',
        };
    }
}
```

### Readonly Properties

```php
// ✅ Immutable properties
class User
{
    public function __construct(
        public readonly int $id,
        public readonly string $email,
    ) {}
}
```

### First-Class Callables

```php
// ❌ Old: Closure::fromCallable
$fn = Closure::fromCallable([$this, 'method']);

// ✅ New: First-class callable syntax
$fn = $this->method(...);
```

### Intersection Types

```php
// ✅ Require multiple interfaces
function process(Countable&Iterator $items): void {}
```

### Fibers

```php
// ✅ Fiber for async
$fiber = new Fiber(function() {
    $value = Fiber::suspend('paused');
    return $value;
});

$result = $fiber->start();
$final = $fiber->resume('resumed');
```

---

## PHP 8.0 Features (Ensure Usage)

### Constructor Property Promotion

```php
// ❌ Old
class User
{
    private string $name;
    
    public function __construct(string $name)
    {
        $this->name = $name;
    }
}

// ✅ New: Property promotion
class User
{
    public function __construct(
        private readonly string $name,
    ) {}
}
```

### Named Arguments

```php
// ✅ Named arguments for clarity
$user = new User(
    name: 'John',
    email: 'john@example.com',
    isAdmin: false,
);
```

### Match Expression

```php
// ❌ Old: Switch
switch ($status) {
    case 'pending':
        $color = 'yellow';
        break;
    default:
        $color = 'gray';
}

// ✅ New: Match
$color = match($status) {
    'pending' => 'yellow',
    'approved' => 'green',
    default => 'gray',
};
```

### Nullsafe Operator

```php
// ❌ Old: Null checks
$country = null;
if ($user !== null && $user->address !== null) {
    $country = $user->address->country;
}

// ✅ New: Nullsafe
$country = $user?->address?->country;
```

### Union Types

```php
// ✅ Union types
function parse(string|int $value): string|false {}
```

### Attributes

```php
// ✅ Native attributes
#[Route('/users', methods: ['GET'])]
public function index(): Response {}

#[Deprecated('Use newMethod() instead')]
public function oldMethod(): void {}
```

---

## Deprecations to Fix

### PHP 8.4 Deprecations

```php
// ❌ Deprecated: Implicit nullable
function foo(string $value = null) {}

// ✅ Fixed: Explicit nullable
function foo(?string $value = null) {}

// ❌ Deprecated: session_register()
session_register('var');

// ✅ Fixed: Use $_SESSION
$_SESSION['var'] = $value;
```

### PHP 8.2 Deprecations

```php
// ❌ Deprecated: Dynamic properties
class User
{
    public string $name;
}
$user = new User();
$user->undefined = 'value'; // Deprecated!

// ✅ Fixed: Define property or use #[AllowDynamicProperties]
#[\AllowDynamicProperties]
class User
{
    public string $name;
}
```

### PHP 8.1 Deprecations

```php
// ❌ Deprecated: ${var} in strings
$name = 'John';
echo "Hello ${name}"; // Deprecated!

// ✅ Fixed: Use {$var}
echo "Hello {$name}";

// ❌ Deprecated: Passing null to non-nullable
strlen(null); // Deprecated!

// ✅ Fixed: Check for null
strlen($value ?? '');
```

---

## Type Safety Improvements

### Strict Return Types

```php
// ❌ Poor: No return type
public function getUsers()
{
    return User::all();
}

// ✅ Good: Explicit return type
public function getUsers(): Collection
{
    return User::all();
}

// ✅ Good: Never return type
public function fail(): never
{
    throw new Exception('Failed');
}

// ✅ Good: Void return type
public function log(string $message): void
{
    Log::info($message);
}
```

### Strict Parameter Types

```php
// ❌ Poor: No parameter types
public function process($data, $options)

// ✅ Good: Typed parameters
public function process(array $data, ProcessOptions $options): Result
```

---

## Detection Patterns

| Issue              | Detection Pattern                                           |
| ------------------ | ----------------------------------------------------------- |
| Missing readonly   | Class properties without `readonly` that are never modified |
| Missing match      | Switch statements that return values                        |
| Missing nullsafe   | Nested null checks with `&&`                                |
| Missing named args | Constructor calls with 4+ positional parameters             |
| Implicit nullable  | Parameters with `= null` but no `?` type                    |
| Dynamic properties | Property access on undefined properties                     |
| Old string syntax  | `${var}` instead of `{$var}`                                |
