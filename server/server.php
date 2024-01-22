<?php

use models\Connection;

$input = file_get_contents('php://input');
$data = json_decode($input);

if ($data && isset($data->persona)) {

    $credentials = ["root", "", "magicbutton"];

    try {
        $conn = new Connection(...$credentials);

        $persona = $data->persona;
        $id = $persona->id;
        $nombre = $persona->nombre;
        $puntuacion = $persona->puntuacion;

        $sql = "INSERT INTO points (player, points) VALUES (:id, :puntuacion)";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':puntuacion', $puntuacion);

        $stmt->execute();

        echo json_encode(["mensaje" => "Datos insertados correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => "Error al insertar datos: " . $e->getMessage()]);
    }

    $conn = null;
} else {
    echo json_encode(["error" => "No se recibieron datos válidos"]);
}