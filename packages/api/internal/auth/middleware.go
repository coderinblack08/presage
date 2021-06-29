package auth

import (
	"os"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v2"
)

func Protected() func(c *fiber.Ctx) error {
	return jwtware.New(jwtware.Config{
		SigningMethod: "HS256",
		SigningKey:    []byte(os.Getenv("TOKEN_SECRET")),
	})
}
