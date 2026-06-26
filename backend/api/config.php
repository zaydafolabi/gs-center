<?php
// ✅ CORS HEADERS - MUST BE FIRST!
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// =============================================
// DATABASE CONNECTION (AIVEN OR RENDER)
// =============================================

// Option 1: Use environment variables (recommended for Render)
$host = getenv('DB_HOST') ?: 'mysql-32fa9876-gs-wellness.h.aivencloud.com';
$port = getenv('DB_PORT') ?: '23288';
$dbname = getenv('DB_NAME') ?: 'defaultdb';
$username = getenv('DB_USER') ?: 'avnadmin';
$password = getenv('DB_PASSWORD') ?: '';

// Or Option 2: Hardcode credentials (if environment variables not working)
// $host = 'mysql-aiven.g.aivencloud.com';
// $port = '12345';
// $dbname = 'defaultdb';
// $username = 'avnadmin';
// $password = 'YOUR_PASSWORD_HERE';

try {
    // Connect using PDO
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
}
?>