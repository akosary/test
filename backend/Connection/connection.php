<?php
require('env.php');

class Database {
    private $host;
    private $username;
    private $password;
    private $database;
    private $databaseName;
    private $port;
    
    private $connection;

    public function __construct($host, $username, $password, $database,$databaseName,$port) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        $this->databaseName = $databaseName;
        $this->port = $port;
    }

    
    public function connect(){
        try {
            $sql = $this->database . ':host=' . $this->host . ';dbname=' . $this->databaseName . ';port='. $this->port;
            $this->connection = new PDO($sql, $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // echo 'Connected successfully';
        } catch(PDOException $e) {
            echo 'Connection failed: ' . $e->getMessage();
        }
    }

    public function getConnection() {
        return $this->connection;
    }

    public function close() {
        $this->connection->close();
    }
}

$db = new Database(DATABASE_host,DATABASE_username,DATABASE_password,DATABASE,DATABASE_name,PORT);
$connection = $db->getConnection();