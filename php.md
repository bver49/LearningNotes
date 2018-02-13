## Class

### Basic

```php
class Human {
  protected $name;
  function __construct($name){
    $this->name = $name;
  }
  function greeting(){
    echo "Hi my name is $this->name!\n";
  }
}

$derek = new Human("Derek");
$derek->greeting(); //Hi my name is Derek!
```

### Inherit

```php
class Human {
  protected $name;
  function __construct($name){
    $this->name = $name;
  }
  function greeting(){
    echo "Hi my name is $this->name!\n";
  }
}

class Adult extends Human{ 
  protected $job; 
  function __construct($name,$job){
    parent::__construct($name); //Use parent constructor
    $this->job = $job;
  }
  function greeting(){
    echo "Hi my name is $this->name!\nI am an $this->job!\n";
  }
}
$derek = new Adult("Derek","enginner");
$derek->greeting();
```

## MySQL

### Query

```php
$mysqli = new mysqli("host", "user", "pw", "db");
$mysqli->set_charset ('utf8');

$data = $mysqli->query("SELECT * FROM user WHERE id=1")->fetch_all();

$mysqli->close();
```

### Prepare statement

```php
$mysqli = new mysqli("host", "user", "pw", "db");
$mysqli->set_charset ('utf8');

$stmt = $mysqli->prepare("SELECT * FROM user WHERE id=?");
$stmt->bind_param("i", $id);

$id = 1;
$stmt->execute();
$data = $stmt->get_result()->fetch_all(); // $data = $stmt->get_result()->fetch_array();

$mysqli->close();
```
