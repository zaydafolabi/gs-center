<?php
require_once 'config.php';

echo json_encode([
    'status' => 'connected',
    'host' => $host,
    'port' => $port,
    'dbname' => $dbname,
    'username' => $username,
    'tables' => $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN)
]);
?>
