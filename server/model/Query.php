<?php

namespace query;

use models\Connection;
use PDO;
use PDOStatement;

class Query
{
    private Connection $_connection;
    private string $_sqlQuery;
    private PDOStatement $_result;
    private PDO $_pdo;

    /**
     * @param Connection $_connection
     */
    public function __construct(Connection $_connection)
    {
        $this->_connection = $_connection;

        $host = $_connection->getHost();
        $dbname = $_connection->getDatabase();
        $port = $_connection->getPort();
        $user = $_connection->getUsername();
        $pass = $_connection->getPassword();

        $dsn = "mysql:host=$host;dbname=$dbname;port=$port";
        $this->_pdo = new PDO($dsn, $user, $pass);
    }

    /**
     * @return Connection
     */
    public function getConnection(): Connection
    {
        return $this->_connection;
    }

    /**
     * @return PDO
     */
    public function getPdo(): PDO
    {
        return $this->_pdo;
    }

    /**
     * @param PDO $pdo
     * @return void
     */
    public function setPdo(PDO $pdo): void
    {
        $this->_pdo = $pdo;
    }

    /**
     * @return string
     */
    public function getSqlQuery(): string
    {
        return $this->_sqlQuery;
    }

    /**
     * @param string $sqlQuery
     */
    public function setSqlQuery(string $sqlQuery): void
    {
        $this->_sqlQuery = $sqlQuery;
    }

    /**
     * @return PDOStatement
     */
    public function getResult(): PDOStatement
    {
        return $this->_result;
    }

    /**
     * @param string $query
     * @param array $params
     * @return false|array
     */
    public function select(string $query, array $params): false|array
    {
        $this->getConnection()->connect();

        $this->_result = $this->getConnection()->getConnection()->prepare($query);
        foreach ($params as $key => $value) {
            $this->_result->bindValue($key, $value);
        }

        $this->_result->execute();
        $return = $this->_result->fetchAll(PDO::FETCH_ASSOC);

        $this->getConnection()->close();
        return $return;
    }

    /**
     * @param string $query
     * @param array $params
     * @return false|PDOStatement
     */
    public function insert(string $query, array $params): false|PDOStatement
    {
        $this->getConnection()->connect();

        $this->_result = $this->getConnection()->getConnection()->prepare($query);
        foreach ($params as $key => $value) {
            $this->_result->bindParam($key, $value);
        }
        $return = $this->_result->execute();

        $this->getConnection()->close();
        return $return;
    }

    /**
     * @param string $query
     * @param array $params
     * @return bool
     */
    public function update(string $query, array $params): bool
    {
        $this->getConnection()->connect();

        $this->_result = $this->getConnection()->getConnection()->prepare($query);
        foreach ($params as $key => $value) {
            $this->_result->bindParam($key, $value);
        }
        $return = $this->_result->execute();

        $this->getConnection()->close();
        return $return;
    }

    /**
     * @param string $query
     * @param array $params
     * @return null
     */
    public function delete(string $query, array $params): null
    {
        return null;
    }

    /**
     * @param string $query
     * @param array $params
     * @return PDOStatement|array|bool|null
     */
    public function makeQuery(string $query, array $params = []): PDOStatement|array|bool|null
    {
        $type = strtolower(explode(" ", $query)[0]);
        $return = null;
        switch ($type) {
            case "select":
                $return = $this->select($query, $params);
                break;
            case "insert":
                $return = $this->insert($query, $params);
                break;
            case "update":
                $return = $this->update($query, $params);
                break;
            case "delete":
                $return = $this->delete($query, $params);
                break;
            default:
                break;
        }
        return $return;
    }

    /**
     * The __toString method allows a class to decide how it will react when it is converted to a string.
     *
     * @return string
     * @link https://php.net/manual/en/language.oop5.magic.php#language.oop5.magic.tostring
     */
    public function __toString(): string
    {
        return "Statement: " . $this->_sqlQuery;
    }
}