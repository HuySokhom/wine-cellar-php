<?php

require '../Slim/Slim.php';

$app = new Slim();

$app->get('/getProduct', 'getProducts');
$app->get('/getProduct/:id',	'getProduct');
$app->get('/product/search/:query', 'findByName');
$app->post('/saveProduct', 'addProduct');
$app->put('/getProduct/:id', 'updateProduct');
$app->delete('/deleteProduct/:id',	'deleteProduct');

$app->run();

function getProducts() {
	$sql = "select p.id, p.name, p.description, p.price, p.qty, c.id as category_id, c.name as category_name
		FROM products p LEFT JOIN category c on c.id = p.category_id  ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$products = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"data": ' . json_encode($products) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getProduct($id) {
	$sql = "SELECT * FROM products WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addProduct() {
	$request = Slim::getInstance()->request();
	$product = json_decode($request->getBody());
	$sql = "INSERT INTO products (name, category_id, description, price, qty) VALUES (:name, :category_id, :description, :price, :qty)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $product->name);
		$stmt->bindParam("category_id", $product->category_id);
		$stmt->bindParam("description", $product->description);
		$stmt->bindParam("price", $product->price);
		$stmt->bindParam("qty", $product->qty);
		$stmt->execute();
		$product->id = $db->lastInsertId();
		$db = null;
		echo json_encode($product);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateProduct($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$product = json_decode($body);
	$sql = "UPDATE products SET name=:name, category_id=:category_id, price=:price, qty=:qty, description=:description WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $product->name);
		$stmt->bindParam("category_id", $product->category_id);
		$stmt->bindParam("price", $product->price);
		$stmt->bindParam("qty", $product->qty);
		$stmt->bindParam("description", $product->description);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($product);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteProduct($id) {
	$sql = "DELETE FROM products WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM wine WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"wine": ' . json_encode($wines) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="ng";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>