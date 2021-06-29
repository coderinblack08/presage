package database

import (
	"fmt"
	"log"
	"os"
	"presage/internal/entity"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	Db *gorm.DB
)

func Init() {
	var err error
	dsn := "host=localhost user=postgres password=postgres dbname=presagedb port=5432 sslmode=disable"
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{},
	)
	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		panic("failed to connect database")
	}

	Db.AutoMigrate(&entity.User{})
	fmt.Println("🗂 Database Migrated")

}
