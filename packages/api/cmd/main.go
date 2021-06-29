package main

import (
	"fmt"
	"log"
	"presage/internal/auth"
	"presage/pkg/database"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	database.Init()
	app := fiber.New()
	app.Mount("/", auth.UseAuthProviders())
	app.Get("/me", auth.Protected(), func(c *fiber.Ctx) error {
		user := c.Locals("user").(*jwt.Token)
		fmt.Println(user)
		return c.SendStatus(fiber.StatusOK)
	})
	app.Listen(":4000")
}
