package auth

import (
	"fmt"
	"log"
	"os"
	"presage/internal/entity"
	"presage/pkg/database"
	"time"

	"github.com/Pallinder/go-randomdata"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/markbates/goth"
	"github.com/markbates/goth/providers/google"
	"github.com/shareed2k/goth_fiber"
)

func UseAuthProviders() *fiber.App {
	goth.UseProviders(
		google.New(os.Getenv("OAUTH_KEY"), os.Getenv("OAUTH_SECRET"), "http://localhost:4000/auth/callback"),
	)

	micro := fiber.New()
	micro.Get("/login", goth_fiber.BeginAuthHandler)
	micro.Get("/auth/callback", func(ctx *fiber.Ctx) error {
		user, err := goth_fiber.CompleteUserAuth(ctx)
		if err != nil {
			log.Fatal(err)
		}
		var result struct{ Found bool }
		database.Db.Raw("select exists(select 1 from users where google_id = ?) as found", user.UserID).Scan(&result)
		username := fmt.Sprintf("%s-%s-%d", randomdata.Adjective(), randomdata.Noun(), randomdata.Number(10, 99))
		u := entity.User{
			Username:       username,
			DisplayName:    username,
			GoogleId:       user.UserID,
			ProfilePicture: user.AvatarURL,
			Email:          user.Email,
		}
		if !result.Found {
			database.Db.Create(&u)
		}
		token := jwt.New(jwt.SigningMethodHS256)
		claims := token.Claims.(jwt.MapClaims)
		claims["userId"] = u.ID
		claims["exp"] = time.Now().Add(time.Hour * 72).Unix()
		accessToken, err := token.SignedString([]byte(os.Getenv("TOKEN_SECRET")))
		if err != nil {
			return ctx.SendStatus(fiber.StatusInternalServerError)
		}
		return ctx.Redirect(fmt.Sprintf("http://localhost:3000?accessToken=%s", accessToken))
	})

	return micro
}

func authCallbackHandler(c *fiber.Ctx) error {
	user, err := goth_fiber.CompleteUserAuth(c)
	if err != nil {
		log.Fatal(err)
	}
	return c.JSON(user)
}
