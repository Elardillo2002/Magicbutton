<?php

namespace models;

class Player
{
    private int $id;
    private string $name;
    private int $points;

    /**
     * @param int $id
     * @param string $name
     * @param int $points
     */
    public function __construct(int $id, string $name, int $points)
    {
        $this->id = $id;
        $this->name = $name;
        $this->points = $points;
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getPoints(): int
    {
        return $this->points;
    }

    public function setPoints(int $points): void
    {
        $this->points = $points;
    }

    public function __toString(): string
    {
        return $this->getName() . ": " . $this->getPoints();
    }
}