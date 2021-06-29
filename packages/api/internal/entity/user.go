package entity

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID             uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Username       string    `gorm:"uniqueIndex;type:notNull"`
	GoogleId       string    `gorm:"uniqueIndex"`
	ProfilePicture string
	Email          string
	DisplayName    string
}
