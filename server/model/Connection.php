<?php

namespace models;

use PDO;
use PDOException;

class Connection
{
    private string $_username;
    private string $_password;
    private string $_database;
    private string $_host;
    private string $_port;
    private PDO|null $_connection;

    /**
     * @param string $_username
     * @param string $_password
     * @param string $_database
     * @param string $_host
     * @param string $_port
     */
    public function __construct(string $_username, string $_password, string $_database,
                                string $_host = "localhost", string $_port = "3306")
    {
        $this->_username = $_username;
        $this->_password = $_password;
        $this->_database = $_database;
        $this->_host = $_host;
        $this->_port = $_port;
    }

    /**
     * @return string
     */
    public function getUsername(): string
    {
        return $this->_username;
    }

    /**
     * @param $username
     * @return void
     */
    public function setUsername($username): void
    {
        $this->_username = $username;
    }

    /**
     * @return string
     */
    public function getPassword(): string
    {
        return $this->_password;
    }

    /**
     * @param $password
     * @return void
     */
    public function setPassword($password): void
    {
        $this->_password = $password;
    }

    /**
     * @return string
     */
    public function getDatabase(): string
    {
        return $this->_database;
    }

    /**
     * @param $database
     * @return void
     */
    public function setDatabase($database): void
    {
        $this->_database = $database;
    }

    /**
     * @return string
     */
    public function getHost(): string
    {
        return $this->_host;
    }

    /**
     * @param mixed $host
     * @return void
     */
    public function setHost(mixed $host): void
    {
        $this->_host = $host;
    }

    /**
     * @return string
     */
    public function getPort(): string
    {
        return $this->_port;
    }

    /**
     * @param mixed $port
     * @return void
     */
    public function setPort(mixed $port): void
    {
        $this->_port = $port;
    }

    /**
     * @return PDO
     */
    public function getConnection(): PDO
    {
        return $this->_connection;
    }

    /**
     * @return string
     */
    private function getConnectionStr(): string
    {
        return "mysql:dbname={$this->getDatabase()};host={$this->getHost()}:{$this->getPort()}";
    }

    /**
     * @param string $err_message
     * @param bool $stackTrace
     * @return PDO|int
     */
    function connect(string $err_message = "Error con la base de datos: ",
                     bool   $stackTrace = true): PDO|int
    {
        try {
            $this->_connection = new PDO($this->getConnectionStr(),
                $this->getUsername(), $this->getPassword());
            $this->_connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->getConnection();
        } catch (PDOException $e) {
            $msg = $err_message;
            if ($stackTrace) {
                $msg .= $e->getMessage();
            }
            die($msg);
        }
    }

    /**
     * @return void
     */
    function close(): void
    {
        $this->_connection = null;
    }

    /**
     * @return string
     */
    public function __toString(): string
    {
        return $this->getConnectionStr();
    }
}