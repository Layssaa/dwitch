variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "auth_api_image_url" {
  description = "ECR image URL for the auth API"
  type        = string
}

variable "channels_api_image_url" {
  description = "ECR image URL for the channels API"
  type        = string
}

variable "broadcasts_api_image_url" {
  description = "ECR image URL for the broadcasts API"
  type        = string
}

variable "user_api_image_url" {
  description = "ECR image URL for the user API"
  type        = string
}

variable "dwitch_frontend_image_url" {
  description = "ECR image URL for the dwitch frontend"
  type        = string
}

variable "auth_database_url" {
  description = "Database connection string for the auth API"
  type        = string
}

variable "channels_database_url" {
  description = "Database connection string for the channels API"
  type        = string
}

variable "broadcasts_database_url" {
  description = "Database connection string for the broadcasts API"
  type        = string
}

variable "user_database_url" {
  description = "Database connection string for the user API"
  type        = string
}

variable "rabbitmq_url" {
  description = "RabbitMQ connection string for broadcasts API"
  type        = string
}
