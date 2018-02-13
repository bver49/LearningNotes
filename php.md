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
